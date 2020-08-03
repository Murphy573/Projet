/**
 * canvas转base64
 * @param {HTMLElement<Canvas>} canvas canvas元素
 * @param {String} type 'image/jpeg'....
 * @param {Number} encoder 0-1,图片的质量
 * @returns base64
 */
export function canvasToDataUrl (canvas, type, encoder = 1) {
  return canvas.toDataURL(type, encoder);
}

/**
 * File对象转换为dataURL、Blob对象转换为dataURL
 * @param {File | Blob} blob 文件类型或者blob类型
 * @param {Function} callBack 回调函数
 * @returns base64
 */
export function readBlobAsDataURL (blob, callBack = () => {}) {
  let fileReader = new FileReader();
  fileReader.onload = function (e) {
    const data =
      typeof e.target.result === 'object'
        ? window.URL.createObjectURL(new Blob([e.target.result]))
        : e.target.result;
    callBack(data);
    fileReader = null;
  };
  fileReader.readAsDataURL(blob);
}

/**
 * dataURL转换为Blob对象
 * @param {Base64} dataUrl
 * @returns Blob
 */
export function dataURLtoBlob (dataUrl) {
  let arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * dataURL转换为File对象
 * @param {Base64} dataUrl base64
 * @param {String} filename 文件名称
 * @description 兼容性：Edge(IE)浏览器不支持File对象构造函数，也就是Edge(IE)里不能new File()。
 */
export function dataURLtoFile (dataUrl, filename) {
  let arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 * 图片压缩
 * @param {File | Blob} fileRaw 图片file或图片Blob类型
 * @param {Number} maxTimes 最大压缩次数
 * @param {Number} maxSize 300 表示要压到300kb以下
 * @param {{w:Number, h:Number}} 最大长宽
 * @param {String} outputType 输出类型 png jpeg...
 * @param {Number} encoder 0-1 压缩质量
 */
export async function imageCompress (
  fileRaw,
  maxTimes = 5,
  maxSize = null,
  WHSize = null,
  outputType = 'jpeg',
  encoder = 0.3
) {
  // 如果传入的图片在最大范围内，直接返回，不作处理
  if (maxSize && fileRaw.size / 1024 < maxSize) {
    return fileRaw;
  }
  // 创建canvas以及绘图上下文
  let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    _time = 0,
    _fileRaw = fileRaw;

  let _compress = () => {
    return new Promise((resolve, reject) => {
      readBlobAsDataURL(_fileRaw, function (dataUrl) {
        let img = new Image();
        img.src = dataUrl;
        img.onload = function () {
          // 获取图片的原始尺寸
          let originW = this.width,
            originH = this.height;
          // 目标尺寸
          let targetWidth = originW,
            targetHeight = originH;

          if (WHSize) {
            // 图片尺寸超过w * h的限制
            let { w: maxWidth, h: maxHeight } = WHSize;
            if (originW > maxWidth || originH > maxHeight) {
              // 更宽，按照宽度限定尺寸
              if (originW / originH > maxWidth / maxHeight) {
                targetWidth = maxWidth;
                targetHeight = Math.round(maxWidth * (originH / originW));
              }
              else {
                targetHeight = maxHeight;
                targetWidth = Math.round(maxHeight * (originW / originH));
              }
            }
          }

          // 设置canvas的绘图区域
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          // 清除画布
          ctx.clearRect(0, 0, targetWidth, targetHeight);
          // 绘图
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          // 从canvas输出图片
          let _finalData = canvasToDataUrl(
            canvas,
            `image/${outputType}`,
            encoder
          );
          // base64转file
          _fileRaw = dataURLtoBlob(_finalData);

          img = null;
          resolve();
        };
      });
    });
  };
  try {
    while (true) {
      // 如果达到压缩次数或者已经压缩到maxSize范围内
      if (_time >= maxTimes || (maxSize && _fileRaw.size / 1024 <= maxSize)) {
        break;
      }
      _time++;
      await _compress();
    }
    // 清空canvas ctx等
    ctx = null;
    canvas = null;
    return _fileRaw;
  }
  catch (error) {}
}

/**
 * 普通文件下载
 * @param {ArrayBuffer} content
 * @param {String} filename
 */
export function fileDownload (content, filename) {
  // 创建隐藏的可下载链接
  const eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  // 字符内容转变成blob地址
  const blob = new Blob([content]);
  let _url = window.URL.createObjectURL(blob);
  eleLink.href = _url;
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
  // 释放掉blob对象
  window.URL.revokeObjectURL(_url);
}
