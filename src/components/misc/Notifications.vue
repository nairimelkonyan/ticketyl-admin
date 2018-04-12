<template lang="pug">
  .dropdown.notification
    button#dLabel(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
      img(src="static/icn_notifications.svg")
    ul.dropdown-menu(aria-labelledby='dLabel')
      template(v-for="n in notifications")
        .div
          li
            p {{n.topic}}
            p {{n.text}}
            p {{n.time}}
        li.divider
      li
        router-link(to='/notifications') See All Notifications
</template>

<script>
export default {
  name: 'Notifications',
  data () {
    return {
      notifications: [{
        topic: 'Languages',
        text: 'Event Dinner In The Sky is missing German translation',
        time: '2 minutes ago'
      }, {
        topic: 'Sales',
        text: 'Event Dinner In The Sky is missing German translation',
        time: '7 hours ago ago'
      }, {
        topic: 'Requests',
        text: 'Event Dinner In The Sky is missing German translation',
        time: '1 month ago'
      }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .dropdown-menu{
    background-color: #fff;
    padding: 0;
    border-radius: 0;
    min-width: 280px;
    top: 170%;
    left: -220%;
    .div{
      transition: 0.3s;
      padding: 15px 15px 5px 15px;
    }
    .div:hover{
      cursor: pointer;
      background-color: #f7f7f7;
    }
    p{
      font-size: 12px;
    }
    p:first-child{
      font-size: 14px;
      text-transform: uppercase;
      color: #9a9a9a;
    }
    p:last-child{
      font-size: 10px;
      color: #9a9a9a;
      margin: 0;
      padding-bottom: 10px;
    }
    a{
      text-align: center;
      padding: 15px 0;
      font-size: 12px;
      text-transform: uppercase;
      text-decoration: underline;
      cursor: pointer;
      color: #292929;
    }
    a:hover{
      background-color: transparent;
      text-decoration: underline;
    }
    .divider{
      margin: 0;
      box-shadow: 0 0.5px 0.5px 0 rgba(0,0,0,0.2);
    }
  }
  .dropdown-menu:after{
    position: absolute;
    z-index: -2;
    left: 42%;
    top: -10px;
    width: 0;
    height: 0;
    content: '';
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #fff;
  }
  .notification {
    display: inline-block;
    color: black;
    button{
      outline: 0;
      font-size: 16px;
      padding-right: 32px;
      color: #fff;
      border: none;
      background-color: transparent;
      img{
        vertical-align: top;
      }
    }
  }
</style>
