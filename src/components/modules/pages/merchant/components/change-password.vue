<template lang="pug">
  section
    .row
      .col-sm-4.col-sm-offset-2
        p.center Current Password
      .col-sm-6
        tk-input-type-text-password(v-model="current", name="current")
      .col-sm-4.col-sm-offset-2
        p.center New Password
      .col-sm-6
          tk-input-type-text-password(v-model="fresh", name="fresh")
      .col-sm-4.col-sm-offset-2
        p.center Repeat New Password
      .col-sm-6
          tk-input-type-text-password(v-model="repeat", name="repeat")
      .col-sm-4.col-sm-offset-2
      .col-sm-6
          tk-secondary-button.last(name='change password', @click="change")
</template>

<script>
  export default {
    props: [],
    data () {
      return {
        current: null,
        fresh: null,
        repeat: null
      }
    },
    methods: {
      change () {
        this.$emit('input', {
          old_password: this.current,
          new_password: this.fresh
        })
      }
    },
    mounted () {}
  }
</script>

<style lang="less" scoped></style>
