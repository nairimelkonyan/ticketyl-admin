<template lang="pug">
  iframe(:src="'https://www.youtube.com/embed/' + main_content.custom_fields.video_id")
</template>

<script>
  export default {
    props: [ 'main_content' ]
  }
</script>

<style lang="less" scoped>
  iframe{
    margin-bottom: 24px;
    width: 100%;
    height: 376px;
    border: none;
  }
</style>
