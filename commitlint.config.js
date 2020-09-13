/**
 * 提交示例
 *
 * feat(商品详情?): 商品详情页增加缓存
 *
 * body: 商品详情页详细描述balabala...
 *
 * footer: 商品详情页描述结束balabala...
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        // 新功能（feature）
        'feat',
        // 修补bug
        'fix',
        // 文档、注释等
        'docs',
        // 格式改动：例如去空格、缩进、分号、换行等等；
        'style',
        // 代码重构
        'refactor',
        // peformance性能改动
        'perf',
        // 增加、修改测试
        'test',
        // git版本回滚
        'revert',
        // 构建过程或辅助工具的变动：npm webpack
        'chore'
      ]
    ],
    // 0:disable 1:warning  2:error
    // 类型区分大小写
    'type-case': [1, 'always', 'lowerCase'],
    // 类型缺少
    'type-empty': [2, 'never'],
    // 影响范围大小写
    'scope-case': [1, 'never', 'lowerCase'],
    // 简单描述大小写：['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    'subject-case': [0, 'never'],
    // 简单描述不能为空
    'subject-empty': [2, 'never'],
    // 简单描述结尾字符：.
    'subject-full-stop': [0, 'never'],
    // 头部最长字符120，超过警告
    'header-max-length': [1, 'always', 120],
    // 内容之前是否有空行
    'body-leading-blank': [1, 'always'],
    // 内容最长字符120，超过警告
    'body-max-line-length': [1, 'always', 120],
    // 尾部之前是否应该有空行
    'footer-leading-blank': [1, 'always'],
    // 尾部字符长度
    'footer-max-line-length': [1, 'always', 120]
  }
};
