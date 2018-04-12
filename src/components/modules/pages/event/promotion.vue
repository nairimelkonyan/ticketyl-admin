<template lang="pug">
  section
    tk-header-admin
    .content
      .container
        .row
          .col-sm-6
            .setup-content
              .setup-body
                p Promotion
                h2 Dinner in the Sky
                  tk-tools(style='margin-left: 8px;')
                span Public
          .col-sm-6.text-right
            .setup-content
              .setup-body
                tk-primary-button(name='update event')
        .navigation
          .row
            .col-sm-12
              .menu-content
                .menu-body
                  button(@click='showAttendees', v-bind:class="{ active: attendees }") Email Attendees
                  button(@click='showEmails', v-bind:class="{ active: emails }") Scheduled Emails
                  button(@click='showAnnouncements', v-bind:class="{ active: announcements }") Announcements
        .announcements(v-if='announcements')
          .row
            .col-sm-10.col-sm-offset-1
              h3 1. Announce Extra Tickets
              p Create and organize new tickets for this event
              tk-table-extra-tickets
        .emails(v-if='emails')
          .row
            .col-sm-12
              h3 Scheduled Emails
              tk-table-scheduled
        .attendees(v-if='attendees')
          .row
            .col-sm-6.col-sm-offset-3
              h3 Email Attendees
              p Create a message to everyone going to this event
              span Name
              tk-input-type-text
              span Reply To
              tk-input-type-text
              span Send To
              tk-custom-select-string.select
              span Subject
              tk-input-type-text
              span Message
              tk-text-area
              span Send Test Email
              tk-send.send
              span.email Send Email
              .row
                .col-sm-12            
                  input#now(type='radio', name='ticket', value='now', @click='hide')
                  label(for="now") Now
              .row
                .col-sm-3
                  input#later(type='radio', name='ticket', value='later', @click='show')
                  label(for="later") Later at
                .col-sm-4
                  tk-input-type-text(placeholder='date')
                .col-sm-4
                  tk-input-type-text(placeholder='time')
              .row.days
                .col-sm-4
                  input#pro(type='radio', name='ticket', value='pro', @click='show')
                  label(for="pro") Before the event
                .col-sm-2
                  tk-input-type-text(placeholder='days')
                .col-sm-3
                  tk-input-type-text(placeholder='hours')
                .col-sm-3
                  tk-input-type-text(placeholder='minutes')
              tk-secondary-button(name='send email')
    tk-footer-admin
</template>

<script>
  export default {
    data () {
      return {
        attendees: true,
        emails: false,
        announcements: false
      }
    },
    methods: {
      showAttendees () {
        this.attendees = true
        this.emails = false
        this.announcements = false
      },
      showEmails () {
        this.attendees = false
        this.emails = true
        this.announcements = false
      },
      showAnnouncements () {
        this.attendees = false
        this.emails = false
        this.announcements = true
      }
    }
  }
</script>

<style lang="less" scoped>
.content{
  margin-bottom: 160px;
}
.setup-content{
  display: table;
  height: 152px;
  width: 100%;
  .setup-body{
    display: table-cell;
    vertical-align: middle;
    p{
      font-size: 18px;
      font-weight: bold;
      margin: 0;
    }
    h2{
      max-width: 700px;
      word-wrap: break-word;
      margin: 0 0 16px 0;
    }
    span{
      font-weight: bold;
      border: 1px solid #292929;
      text-transform: uppercase;
      padding: 4px;
    }
    button{
      margin-left: 24px;
    }
  }
}
.navigation{
  border-top: 1px solid #979797;
  border-bottom: 1px solid #979797;
  margin-bottom: 29px;
  .menu-content{
    display: table;
    height: 88px;
    width: 100%;
    .menu-body{
      display: table-cell;
      vertical-align: middle;
      button{
        border: none;
        outline: 0;
        background-color: transparent;
        padding: 0;
        text-transform: none;
        position: relative;
        text-decoration: none;
        margin-right: 50px;
        color: #292929;
        font-size: 18px;
      }
    }
  }
}
.active{
  position: relative;
  height: 2px;
  font-weight: bold;
  &:after{
    content: "";
    position: absolute;
    width: 10px;
    height: 1px;
    background-color: #292929;
    left: 0;
    right: 0;
    bottom: -32px;
    margin: 0 auto;
  }
}
.attendees{
  h3{
    margin: 0 0 14px 0;
    +p{
      font-size: 18px;
      margin-bottom: 18px;
    }
  }
  span{
    display: inline-block;
    margin-bottom: 8px;
  }
  input[type='text']{
    margin-bottom: 24px;
  }
  .select, .send{
    margin-bottom: 24px;
  }
  .email{
    margin-bottom: 16px;
  }
  .days{
    margin-bottom: 32px;
  }
  label{
    margin-top: 12px;
  }
}
.emails{
  h3{
    margin: 0 0 18px 0;
  }
}
.announcements{
  h3{
    margin: 0 0 14px 0;
    +p{
      font-size: 18px;
      margin-bottom: 36px;
    }
  }
}
</style>