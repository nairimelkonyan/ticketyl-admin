<template lang="pug">
  footer
    .container
      .row
        .col-sm-2.text-left(v-for="(o, index) in activeText")
          .footer.content
            .footer.body
              a.gray(v-if="(index+1) >= parseInt(active)" :href="o.url") {{ index+1 }} {{ o.text }}
              a(v-else :href="o.url")
                strong 
                  i.material-icons done
                  | {{ index+1 }} {{ o.text }}
        .col-sm-6.text-right
          .footer.content
            .footer.body
              // button.action Skip this event
              tk-primary-button(:name='name', @click="$emit('click')")
</template>

<script>
  export default {
    props: {
      name: String,
      active: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        currency: [ 'DITS at', 'DITS cz' ],
        activeText: [
          {
            text: 'Organization',
            url: '/onboarding-organization'
          }, {
            text: 'Online Shop',
            url: '/onboarding-shop'
          }, {
            text: 'Team Setup',
            url: '/onboarding-team'
          }
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  footer{
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
    color: #292929;
    text-align: center;
    background-color: #fff;
    .footer.content{
      display: table;
      height: 80px;
      width: 100%;
      .footer.body{
        display: table-cell;
        vertical-align: middle;
        .material-icons{
          vertical-align: sub;
          font-size: 18px;
          margin-right: 8px;
        }
        a, span{
          text-transform: none;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
          color: initial;
        }
        a.gray{
          font-weight: bold;
          color: #9a9a9a;
        }
        button{
          &:last-child{
            margin-left: 32px;
          }
        }
        .action{
          border: none;
          padding: 0;
          outline: 0;
          background-color: transparent;
          text-transform: uppercase;
          text-decoration: underline;
        }
      }
    }        
  }
</style>
