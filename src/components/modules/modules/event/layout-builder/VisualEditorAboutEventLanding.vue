<template lang="pug">
  section
    tk-tools-visual-editor-landing(style='margin-right: 16px;' @addContent='addContent')
    span About this event...
</template>

<script>
export default {
  data () {
    return { }
  },
  methods: {
    addContent (n) {
      this.$emit('addContent', n)
    }
  }
}
</script>

<style lang="less" scoped>
  section{
    margin-bottom: 32px;
    span{
      color: #9a9a9a;
      text-transform: uppercase;
    }
  }
</style>