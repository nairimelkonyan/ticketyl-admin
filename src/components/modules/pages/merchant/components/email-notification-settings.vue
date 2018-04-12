<template lang="pug">
  section
    .row
      .col-sm-4.col-sm-offset-2
        p Active Notifications
      .col-sm-6
        form(action='')
          input(type='checkbox', name='card', id="email_new_transaction", value='email_new_transaction', v-model='notifications', @change="change")
          label(for="email_new_transaction") New Transaction
          input(type='checkbox', name='card', id="email_changes", value='email_changes', v-model='notifications', @change="change")
          label(for="email_changes") Changes In Transaction
          input(type='checkbox', name='card', id="email_new_event", value='email_new_event', v-model='notifications', @change="change")
          label(for="email_new_event") New Event Published
          input(type='checkbox', name='card', id="email_withdrawal_request", value='email_withdrawal_request', v-model='notifications', @change="change")
          label(for="email_withdrawal_request") Withdrawal Requested
          input(type='checkbox', name='card', id="email_event_cancelled", value='email_event_cancelled',v-model='notifications', @change="change")
          label(for="email_event_cancelled") Event Cancelled
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
