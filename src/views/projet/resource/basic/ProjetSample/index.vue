<template>
  <!-- 组件展示代码 -->
  <div class="projet-sample"
    :style="cmpt_style">
    <ul>
      <li>文本内容：{{title}}</li>
      <li>数字：{{num}}</li>
      <li>文字颜色：{{color}}</li>
      <li>跳转链接：{{link}}</li>
      <li>开关：{{switch1}}</li>
      <li>单选框：{{radio1}}</li>
      <li>复选框{{checkbox1}}</li>
      <li>日期：{{date1}}</li>
    </ul>
  </div>
</template>

<script>
import {
  PROJET_ATTR_STRING,
  PROJET_ATTR_NUMBER,
  PROJET_ATTR_IMAGEUPLOAD,
  PROJET_ATTR_COLORPICKER,
  PROJET_ATTR_LINK,
  PROJET_ATTR_SELECT,
  PROJET_ATTR_SWITCH,
  PROJET_ATTR_RADIO,
  PROJET_ATTR_CHECKBOX,
  PROJET_ATTR_DATETIME
} from '../../../model/attr.editor';
import createComponent from '../../../model/create-component';

export default createComponent({
  name: 'ProjetSample',
  // 左侧面板展示名称
  dispayLabel: '编辑示例',
  // 左侧面板展示icon
  displayIcon: 'iconchangyongshili',

  props: {
    title: {
      type: String,
      default: '这是一段文本',
      editor: {
        label: '文本内容',
        type: PROJET_ATTR_STRING
      }
    },
    num: {
      type: Number,
      default: 0,
      editor: {
        label: '数字',
        type: PROJET_ATTR_NUMBER
      }
    },
    img: {
      type: String,
      default: '',
      editor: {
        label: '背景图片',
        type: PROJET_ATTR_IMAGEUPLOAD
      }
    },
    color: {
      type: String,
      default: '',
      editor: {
        label: '文字颜色',
        type: PROJET_ATTR_COLORPICKER
      }
    },
    link: {
      type: String,
      default: '',
      editor: {
        label: '跳转链接',
        type: PROJET_ATTR_LINK
      }
    },
    date1: {
      type: String,
      default: '2020-08-11 12:00:00',
      editor: {
        label: '日期',
        type: PROJET_ATTR_DATETIME
      }
    },
    position: {
      type: String,
      default: 'center',
      editor: {
        label: '背景图位置',
        type: PROJET_ATTR_SELECT,
        options: [
          {
            label: '居中',
            value: 'center'
          },
          {
            label: '左上',
            value: 'top left'
          },
          {
            label: '右下',
            value: 'bottom right'
          }
        ]
      }
    },
    switch1: {
      type: Boolean,
      default: true,
      editor: {
        label: '开关xxx',
        type: PROJET_ATTR_SWITCH
      }
    },
    radio1: {
      type: String,
      default: '选项2',
      editor: {
        label: '复选框',
        type: PROJET_ATTR_RADIO,
        options: [
          {
            label: '选项1',
            value: '选项1'
          },
          {
            label: '选项2',
            value: '选项2'
          },
          {
            label: '选项3',
            value: '选项3'
          },
          {
            label: '选项4',
            value: '选项4'
          },
          {
            label: '选项5',
            value: '选项5'
          },
          {
            label: '选项6',
            value: '选项6'
          }
        ]
      }
    },
    checkbox1: {
      type: Array,
      default () {
        return ['选项2'];
      },
      editor: {
        label: '单选框',
        type: PROJET_ATTR_CHECKBOX,
        options: [
          {
            label: '选项1',
            value: '选项1'
          },
          {
            label: '选项2',
            value: '选项2'
          },
          {
            label: '选项3',
            value: '选项3'
          },
          {
            label: '选项4',
            value: '选项4'
          },
          {
            label: '选项5',
            value: '选项5'
          },
          {
            label: '选项6',
            value: '选项6'
          }
        ]
      }
    }
  },

  computed: {
    cmpt_style () {
      return Object.assign(
        {},
        this.css,
        {
          backgroundImage: `url(${this.img})`,
          color: this.color,
          backgroundPosition: this.position
        });
    }
  },

  defaultCss: {
    width: 300,
    height: 112
  }
});
</script>

<style lang="scss" scoped>
.projet-sample {
  position: relative;
  word-break: break-all;
  overflow: hidden;
}
</style>
