<template lang="pug">
  .completed-title
    h1 {{ title }}
    p {{ subtitle }}
    // p Lorem ipsum dolor sit amet
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: ['index'],
    data () {
      return {
        editingMode: true
      }
    },
    computed: {
      ...mapState({
        content: state => state.eventSetup.serie.layout.main
      }),
      title () {
        return this.content[this.index].title || ''
      },
      subtitle () {
        return this.content[this.index].subtitle || ''
      }
    }
  }
</script>

<style lang="less" scoped>
h1{
  +p{
    border-bottom: 1px solid #979797;
    padding-bottom: 32px;
    margin-bottom: 64px;
  }
}
p{
  margin-bottom: 75px;
}
.completed-title{
  position: relative;
}
</style>