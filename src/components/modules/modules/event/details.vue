<template lang="pug">
  .step-last
    button.action(@click='goBack')
      i.material-icons arrow_back
    .image
    .body
      h3 Is this event ready?
      h4 Make sure all of the information is correct
      p The following details cannot be changed afterwards:
      ul
        li Event Name - 
          strong {{ eventTitle }}
        li Event Location - 
          strong House of Blackheads, Riga, Latvia    
      p This is the key data about the event:
      ul
        li Total Tickets - 
          strong 200
        li Total Events (reacurring and sub-events) - 
          strong 8
        li Total Possible Earnings - 
          strong 10 000 €
      p This event is available in these languages:
        ul
          li English - 
            strong draft
          li Czech - 
            strong Done
          li German - 
            strong Draft
    footer
      .row
        .col-sm-6.text-left
          .footer-content
            .footer-body
              button.action cancel
        .col-sm-6.text-right
          .footer-content
            .footer-body
              tk-primary-button(name='publish event' @click='publish')
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {}
    },
    computed: {
      ...mapState({
        eventTitle: state => state.createdEvent.title
      })
    },
    methods: {
      goBack () {
        this.$emit('stepTwo')
      },
      publish () {
        this.$emit('publish')
      }
    }
  }
</script>

<style lang="less" scoped>
.image{
  height: 224px;
  background-image: url('/static/event_publish_bg@2x.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.body{
  padding: 24px 32px;
  text-align: left;
  ul{
    margin-bottom: 16px;
  }
  h3{
    margin-top: 0;
  }
  h3,h4{
    color: #292929;
  }
  h4{
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 16px;
    margin-bottom: 21px;
    border-bottom: 1px solid #979797;
  }
  span{
    text-transform: uppercase;
  }
}
footer{
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  padding: 0 32px;
  .footer-content{
    display: table;
    height: 80px;
    width: 100%;
    .footer-body{
      display: table-cell;
      vertical-align: middle;
      .action{
        outline: 0;
        text-transform: uppercase;
        padding: 0;
        background-color: transparent;
        text-decoration: underline;
        border: none;
      }
      p{
        color: #9a9a9a;
        font-weight: bold;
        margin: 0;
      }
    }
  }
}
</style>
