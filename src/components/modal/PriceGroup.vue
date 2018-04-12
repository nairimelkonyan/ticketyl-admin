<template lang="pug">
  .div
    #price-group.modal(role='dialog')
      .modal-dialog
        .modal-close
          button(@click='close') Close
            i.material-icons clear
        .modal-content
          .modal-header
            .modal-header-content
              h2 New Modification Group
              p Set and control various conditional modifications to the prices of this item
          .modal-body
            br
            br
            span Name this modification group
            br
            .row
              .col-sm-8
                tk-input-translation(placeholder="group name", :target="name", @change="translate_name", maxlength='50')
            br
            br
            p Modifications in modification group
            tk-table-price-modifications
            br
          .modal-footer
            .row
              .col-sm-6.text-left
                .footer-wrapper
                  .footer-body
                    button.action(@click='close') cancel
              .col-sm-6.text-right
                .footer-wrapper
                  .footer-body
                    tk-primary-button(name='create modification group', @click="store_group")
</template>

<script>
  import * as types from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  import modal from '@/services/Modal/Modal'

  export default {
    computed: {
      ...mapGetters({
        edit_ticket: 'edit_ticket',
        tickets: 'tickets'
      })
    },
    data () {
      return {
        name: {}
      }
    },
    methods: {
      store_group () {
        const group = {
          translations: {
            name: this.name
          },
          configuration: {
            visible: 'visible',
            status: 'public',
            included: 'excluded',
            count: '-1'
          },
          rules: this.tickets[this.edit_ticket].own_charges
        }
        this.$store.commit(types.STORE_CHARGE_GROUP, group)
        this.name = {}
        this.close()
      },
      translate_name (name) {
        this.name = name
      },
      close () {
        modal.hide('#price-group')
        modal.show('#price-modifications')
      }
    }
  }
</script>

<style lang="less" scoped>
.radio{
  margin-bottom: 24px;
}
.margin{
  margin-top: 12px;
}
.div{
  display: inline-block;
}
.save{
  padding: 24px 0;
  margin-bottom: 27px;
  border-bottom: 1px solid #979797;
}
.action{
  margin-left: 16px;
  padding: 0;
  border: none;
  background-color: transparent;
  text-transform: uppercase;
  text-decoration: underline;
}              
button{
  outline: 0;
}
.modal-dialog{
  width: 770px;
}
.modal-close{
  padding: 10px 0;
  text-align: right;
  .material-icons{
    font-size: 18px;
    vertical-align: text-bottom;
    padding-left: 4px;
  }
  button{
    padding: 0;
    font-size: 14px;
    text-transform: uppercase;
    color: #fff;
    width: auto;
    border: none;
    background-color: transparent;
    outline: none !important;
  }
}
.modal-header{
  color: #292929;
  padding: 24px 32px 0 32px;
  border-bottom: 0;
  text-align: left;
  margin-bottom: 0;
  .modal-header-content{
    border-bottom: 1px solid #979797;
    padding-bottom: 24px;
  }
  h2{
    margin-top: 0;
  }
  p{
    margin-bottom: 0;
  }
}
.modal-body{
  padding: 0 32px 24px 32px;
  text-align: left;
  h4{
    margin-bottom: 8px;
  }
}
.modal-content{
  background-color: #f7f7f7;
  border-radius: 0;
  border: none;
}
.modal-footer{
  text-transform: uppercase;
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  padding: 0 32px;
  .footer-wrapper{
    display: table;
    height: 75px;
    width: 100%;
    .footer-body{
      display: table-cell;
      vertical-align: middle;
      .action{
        text-transform: uppercase;
        border: none;
        padding: 0;
        text-decoration: underline;
        background-color: transparent;
      }
    }
  }
}
nav{
  border-bottom: 1px solid #979797;
  margin-bottom: 27px;
  .menu-content{
    display: table;
    height: 88px;
    width: 100%;
    .menu-body{
      display: table-cell;
      vertical-align: middle;
      a{
        text-transform: none;
        position: relative;
        text-decoration: none;
        margin-right: 50px;
        color: #292929;
        font-size: 18px;
        .router-link-exact-active{
          position: relative;
          width: 10px;
          height: 2px;
          -webkit-text-stroke: 1px #292929;
          &:after{
            content: "";
            position: absolute;
            width: 10px;
            height: 1px;
            background-color: #292929;
            left: 0;
            right: 0;
            bottom: -10px;
            margin: 0 auto;
          }
        }
      }
    }
  }
}
.navigation{
  .menu-content{
    display: table;
    height: 78px;
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
.modal-footer{
  text-transform: uppercase;
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  padding: 0 32px;
  .footer-wrapper{
    display: table;
    height: 75px;
    width: 100%;
    .footer-body{
      display: table-cell;
      vertical-align: middle;
      .action{
        text-transform: uppercase;
        border: none;
        padding: 0;
        text-decoration: underline;
        background-color: transparent;
      }
    }
  }
}
.assigned{
  h4{
    margin-bottom: 27px;
  }
}
</style>
