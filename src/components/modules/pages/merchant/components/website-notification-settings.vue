<template lang="pug">
  section
    .row
      .col-sm-4.col-sm-offset-2
        p Permissions
      .col-sm-6
        form(action='')
          input(type='checkbox', name='permissions', id="web_new_transaction", value='web_new_transaction', v-model='notifications', @change="change")
          label(for="web_new_transaction") New Transaction
          input(type='checkbox', name='permissions', id="web_changes", value='web_changes', v-model='notifications', @change="change")
          label(for="web_changes") Changes In Transaction  
          input(type='checkbox', name='permissions', id="web_new_event", value='web_new_event', v-model='notifications', @change="change")
          label(for="web_new_event") New Event Published
          input(type='checkbox', name='permissions', id="web_withdrawal_request", value='web_withdrawal_request', v-model='notifications', @change="change")
          label(for="web_withdrawal_request") Withdrawal Requested
          input(type='checkbox', name='permissions', id="web_event_cancelled", value='web_event_cancelled', v-model='notifications', @change="change")
          label(for="web_event_cancelled") Event Cancelled
</template>

<script>
  export default {
    props: ['model'],
    data () {
      return {
        notifications: []
      }
    },
    methods: {
      change () {
        this.$emit('input', {
          notifications: this.notifications
        })
      },
      load (model) {
        if (model && model.notifications) {
          this.notifications = model.notifications
        } else {
          this.notifications = []
        }
      }
    },
    mounted () { this.load(this.model, this.model) },
    watch: {
      model (model) { this.load(model) }
    }
  }
</script>


<style lang="less" scoped></style>
