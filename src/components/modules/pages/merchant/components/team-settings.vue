<template lang="pug">
  section
    .row
      .col-sm-4.col-sm-offset-2
        p.center Team Member Email
      .col-sm-6
        tk-input-type-text.last(placeholder="email@email.com", v-model='email', @input="change")
    .row
      .col-sm-4.col-sm-offset-2
        p.center First Name
      .col-sm-6
        tk-input-type-text.last(placeholder="", v-model='first_name', @input="change")
    .row
      .col-sm-4.col-sm-offset-2
        p.center Last Name
      .col-sm-6
        tk-input-type-text.last(placeholder="", v-model='last_name', @input="change")
    .row
      .col-sm-4.col-sm-offset-2
        p.center Permissions
      .col-sm-6
        form(action='')
          input(type='checkbox', name='permissions', id="checkbox", value="manage_shops", v-model='permissions', @change="change")
          label(for="checkbox") Manage Shops
          input(type='checkbox', name='permissions', id="manage_events", value="manage_events", v-model='permissions', @change="change")
          label(for="manage_events") Manage Events
          input(type='checkbox', name='permissions', id="manage_team", value="manage_team", v-model='permissions', @change="change")
          label(for="manage_team") Manage Team Members
          input(type='checkbox', name='permissions', id="manage_checkins", value="manage_checkins", v-model='permissions', @change="change")
          label(for="manage_checkins") Check In
          input(type='checkbox', name='permissions', id="manage_promotion", value="manage_promotion", v-model='permissions', @change="change")
          label(for="manage_promotion") Promotion
      //- .row.last
        .col-sm-4.col-sm-offset-2
          p.center Shops
        .col-sm-6
          button.action Only Dinner in the Sky
</template>

<script>
  export default {
    props: ['model'],
    data () {
      return {
        email: null,
        permissions: [],
        first_name: null,
        last_name: null
      }
    },
    methods: {
      change () {
        this.$emit('input', {
          permissions: this.permissions,
          configuration: { email: this.email },
          attributes: { first_name: this.first_name, last_name: this.last_name }
        })
      },
      load (model) {
        console.log('member', model)
        if (model && model.configuration) { this.email = model.configuration.email }
        if (model && model.attributes) { this.first_name = model.attributes.first_name }
        if (model && model.attributes) { this.last_name = model.attributes.last_name }
        this.permissions = (model.permissions) ? model.permissions : []
      }
    },
    mounted () { this.load(this.model, this.model) },
    watch: {
      model (model) { this.load(model) }
    }
  }
</script>

<style lang="less" scoped>

</style>
