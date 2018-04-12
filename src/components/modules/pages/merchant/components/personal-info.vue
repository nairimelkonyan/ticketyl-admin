<template lang="pug">
  section
    .row
      .col-sm-4.col-sm-offset-2
        p.center Title
      .col-sm-6
        tk-custom-select-string(v-model='title', :options='titles', style='margin-bottom: 24px;', @input="change")
      .col-sm-4.col-sm-offset-2
        p.center First Name
      .col-sm-6
        tk-input-type-text(v-model='first_name', @input="change")
      .col-sm-4.col-sm-offset-2
        p.center Last Name
      .col-sm-6
         tk-input-type-text(v-model='last_name', @input="change")
      .col-sm-4.col-sm-offset-2
        p.center Email Address
      .col-sm-6
         tk-input-type-text(v-model='email', @input="change").last
</template>

<script>
  export default {
    props: ['model'],
    data () {
      return {
        title: null,
        first_name: null,
        last_name: null,
        email: null,
        titles: ['Mr.', 'Mrs.', 'Ms.']
      }
    },
    methods: {
      change () {
        this.$emit('input', {
          configuration: {
            title: this.title,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email
          }
        })
      }
    },
    mounted () {
      if (this.model && this.model.configuration) {
        this.title = this.model.configuration.title
        this.first_name = this.model.configuration.first_name
        this.last_name = this.model.configuration.last_name
        this.email = this.model.configuration.email
      }
    }
  }
</script>

<style lang="less" scoped></style>
