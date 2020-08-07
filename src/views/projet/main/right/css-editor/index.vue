<template>
  <div class="css-editor">
    <MyElScrollbar>
      <el-collapse v-model="actives">
        <el-collapse-item title="尺寸"
          name="1">
          <el-form label-position="left"
            label-width="100px"
            size="small">
            <el-form-item label="宽度">
              <el-select v-model="cmpt_activeElementCss.width"
                filterable
                default-first-option
                allow-create
                class="full-width">
                <el-option v-for="size of sizeOptionsDef"
                  :key="size.value"
                  :value="size.value"
                  :label="size.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="高度"
              class="el-form-item-bottom-0">
              <el-select v-model="cmpt_activeElementCss.height"
                filterable
                default-first-option
                allow-create
                class="full-width">
                <el-option v-for="size of sizeOptionsDef"
                  :key="size.value"
                  :value="size.value"
                  :label="size.label"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="边距"
          name="2">
          <el-form label-position="left"
            label-width="100px"
            size="small">
            <el-form-item label="上内边距">
              <el-input-number v-model="cmpt_activeElementCss.paddingTop"
                controls-position="right"
                :min="0"
                class="full-width" />
            </el-form-item>
            <el-form-item label="右内边距">
              <el-input-number v-model="cmpt_activeElementCss.paddingRight"
                controls-position="right"
                :min="0"
                class="full-width" />
            </el-form-item>
            <el-form-item label="下内边距">
              <el-input-number v-model="cmpt_activeElementCss.paddingBottom"
                controls-position="right"
                :min="0"
                class="full-width" />
            </el-form-item>
            <el-form-item label="左内边距">
              <el-input-number v-model="cmpt_activeElementCss.paddingLeft"
                controls-position="right"
                :min="0"
                class="full-width" />
            </el-form-item>
            <el-form-item label="上外边距">
              <el-input-number v-model="cmpt_activeElementCss.marginTop"
                controls-position="right"
                class="full-width" />
            </el-form-item>
            <el-form-item label="右外边距">
              <el-input-number v-model="cmpt_activeElementCss.marginRight"
                controls-position="right"
                class="full-width" />
            </el-form-item>
            <el-form-item label="下外边距">
              <el-input-number v-model="cmpt_activeElementCss.marginBottom"
                controls-position="right"
                class="full-width" />
            </el-form-item>
            <el-form-item label="左外边距">
              <el-input-number v-model="cmpt_activeElementCss.marginLeft"
                controls-position="right"
                class="full-width" />
            </el-form-item>
            <el-form-item label="高度"
              class="el-form-item-bottom-0">
              <el-input-number v-model="cmpt_activeElementCss.height"
                controls-position="right"
                :min="0"
                class="full-width" />
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="边框"
          name="3">
          <el-form label-position="left"
            label-width="100px"
            size="small">
            <el-form-item label="边框样式">
              <el-select v-model="cmpt_activeElementCss.borderStyle"
                class="full-width">
                <el-option v-for="style of borderStyleOptionsDef"
                  :key="style.value"
                  :label="style.label"
                  :value="style.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="边框宽度">
              <el-input-number v-model="cmpt_activeElementCss.borderWidth"
                controls-position="right"
                :min="0"
                class="full-width" />
            </el-form-item>
            <el-form-item label="边框颜色">
              <AttrColorpicker v-model="cmpt_activeElementCss.borderColor" />
            </el-form-item>
            <el-form-item label="圆角">
              <el-input-number v-model="cmpt_activeElementCss.borderRadius"
                controls-position="right"
                :min="0"
                class="full-width" />
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="背景"
          name="4">
          <el-form label-position="left"
            label-width="100px"
            size="small">
            <el-form-item label="背景图">
              <AttrImageUpload v-model="cmpt_activeElementCss.backgroundImage" />
            </el-form-item>
            <el-form-item label="背景色"
              class="el-form-item-bottom-0">
              <AttrColorpicker v-model="cmpt_activeElementCss.backgroundColor" />
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="文字"
          name="5">
          <el-form label-position="left"
            label-width="100px"
            size="small">
            <el-form-item label="对齐方式">
              <el-select v-model="cmpt_activeElementCss.textAlign"
                class="full-width">
                <el-option v-for="font of fontAlignOptionsDef"
                  :key="font.value"
                  :label="font.label"
                  :value="font.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="加粗">
              <el-select v-model="cmpt_activeElementCss.fontWeight"
                class="full-width">
                <el-option v-for="font of fontWeightOptionsDef"
                  :key="font.value"
                  :label="font.label"
                  :value="font.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字号">
              <el-input-number v-model="cmpt_activeElementCss.fontSize"
                controls-position="right"
                :min="0"
                class="full-width" />
            </el-form-item>
            <el-form-item label="行高">
              <el-input v-model="cmpt_activeElementCss.lineHeight"
                class="full-width" />
            </el-form-item>
            <el-form-item label="颜色"
              class="el-form-item-bottom-0">
              <AttrColorpicker v-model="cmpt_activeElementCss.color" />
            </el-form-item>
            <el-form-item label="划线">
              <el-select v-model="cmpt_activeElementCss.textDecoration"
                class="full-width">
                <el-option v-for="font of fontTextDecorationOptionsDef"
                  :key="font.value"
                  :label="font.label"
                  :value="font.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </MyElScrollbar>
  </div>
</template>

<script>
import {
  SizeOptions,
  BorderStyleOptions,
  FontWeightOptions,
  FontAlignOptions,
  FontTextDecorationOptions
} from './constant';
import AttrColorpicker from '../props-editor/components/AttrColorpicker';
import AttrImageUpload from '../props-editor/components/AttrImageUpload';
import MyElScrollbar from '@/components/my-el-scrollbar';

import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('Projet');

export default {
  name: 'CssEditor',

  components: { MyElScrollbar, AttrColorpicker, AttrImageUpload },

  props: {},

  data () {
    return {
      actives: ['5'],
      sizeOptionsDef: SizeOptions,
      borderStyleOptionsDef: BorderStyleOptions,
      fontWeightOptionsDef: FontWeightOptions,
      fontAlignOptionsDef: FontAlignOptions,
      fontTextDecorationOptionsDef: FontTextDecorationOptions
    };
  },

  computed: {
    ...mapGetters(['vx_gt_activeElementData']),
    cmpt_activeElementCss () {
      return this.vx_gt_activeElementData.css;
    }
  }
};
</script>

<style lang="scss" scoped>
.css-editor {
  height: 100%;
  overflow: hidden;

  ::v-deep {
    .el-collapse {
      .el-collapse-item {
        .el-collapse-item__wrap {
          .el-collapse-item__content {
            padding-bottom: 16px;
          }
        }
      }
    }
    .el-form {
      .el-form-item {
        margin-bottom: 10px;
        .el-form-item__label {
          font-weight: 400;
        }
      }
    }
  }
}
</style>
