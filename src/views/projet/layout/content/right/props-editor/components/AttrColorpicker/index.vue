<template>
  <div class="arrt-colorpicker">
    <el-input v-model="rawColor">
      <el-color-picker slot="append"
        size="mini"
        v-model="rawColor"
        @active-change="changeColor"
        show-alpha>
      </el-color-picker>
    </el-input>
  </div>

</template>
<script>

export default {
  name: 'AttrColorpicker',

  props: {
    value: String
  },

  data () {
    return {
      rawColor: '',
      showAlpha: true
    };
  },

  watch: {
    rawColor (val) {
      let value;
      if (!val) return this.$emit('input', '');
      if (!this.isHex(val) && !this.isRgb(val)) return;
      if (this.showAlpha) {
        value = this.anyToRgba(val);
      }
      else {
        value = this.anyToHex(val);
      }
      if (!value) return;
      this.$emit('input', value);
    },
    value (val) {
      this.rawColor = val;
    }
  },

  mounted: function () {
    this.rawColor = this.value;
  },

  methods: {
    changeColor (color) {
      this.rawColor = color;
    },
    isHex (val) {
      let reg = /^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{8}$/;
      return reg.test((val || '').trim());
    },
    isRgb (val) {
      let reg = /^rgb\(\d+,\d+,[\d.]+\)$|^rgba\(\d+,\d+,\d+,[\d.]+\)$/;
      return reg.test((val || '').replace(/\s/g, ''));
    },
    anyToRgba (val) {
      let rgba;
      if (this.isRgb(val)) {
        rgba = val.replace(/rgba?\((.+)\)/, '$1').replace(/\s/g, '').split(',');
        rgba.push('1');
        rgba = rgba.slice(0, 4);
        return `rgba(${rgba.join(',')})`;
      }
      if (this.isHex(val)) {
        rgba = val.replace('#', '').replace(/(.{2})/g, '$1_').split('_').slice(0, 4).map(c => parseInt(c, 16));
        rgba[3] = (Number(rgba[3] || '255') / 255).toFixed(2);
        return `rgba(${rgba.join(',')})`;
      }
      return '';
    },
    anyToHex (val) {
      let hex;
      if (this.isRgb(val)) {
        hex = val.replace(/rgba?\((.+)\)/, '$1').replace(/\s/g, '').split(',').rgba.slice(0, 3).map(Number).map(c => c.toString(16)).map(s => s.padStart(2, '0'));
        return `#(${hex.join('')})`;
      }
      if (this.isHex(val)) {
        return val.slice(0, 7);
      }
      return '';
    }
  }
};
</script>

<style lang="scss" scoped>
.arrt-colorpicker {
  ::v-deep {
    .el-color-picker__trigger {
      border: none;
    }
  }
}
</style>
