<template>
  <el-input placeholder="图片路径"
    size="mini"
    v-model="myValue">
    <el-upload slot="append"
      action
      :show-file-list="false"
      :before-upload="beforeUpload"
      :http-request="uploadRequest"
      :accept="accept">
      <el-button slot="trigger"
        size="small"
        type="danger"
        :loading="uploadLoading">选择图片</el-button>
    </el-upload>
  </el-input>
</template>

<script>

export default {
  name: 'AttrImageUpload',

  props: {
    value: String,
    accept: {
      type: String,
      default: '.jpg,.jpeg,.png,.gif'
    },
    // 图片限定大小：单位M
    limit: {
      type: Number,
      default: 20
    }
  },

  data () {
    return {
      uploadLoading: false
    };
  },

  computed: {
    myValue: {
      set (v) {
        this.$emit('input', v);
      },
      get () {
        return this.value;
      }
    }
  },

  methods: {
    beforeUpload (file) {
      let imgType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase();
      const isAccept = this.accept.indexOf(imgType) > -1;
      // 图片size提示
      const isLimit = file.size / 1024 <= this.limit * 1024;
      if (!isAccept) {
        this.$message.error(`图片格式只能为${this.accept}!`);
      }
      if (!isLimit) {
        this.$message.error(`图片大小不能超过 ${this.limit}M!`);
      }
      return isAccept && isLimit;
    },
    async uploadRequest ({ file }) {
      try {
        let _formData = new FormData();
        _formData.append('file', file);
        this.uploadLoading = true;
        try {
          let hexColor = Math.floor(Math.random() * 16777216).toString(16);
          let result = await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(`https://dummyimage.com/600x400/${hexColor}.png`);
            }, 1000);
          });
          this.myValue = result;
        }
        catch (error) { }
        this.uploadLoading = false;
      }
      catch (error) { }
    }
  }
};
</script>
