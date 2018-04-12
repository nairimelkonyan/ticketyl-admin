<template lang="pug">
  .div
    #price-special.modal(role='dialog')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .modal-header
            .modal-header-content
              h2 Special Pricing
              p Set special prices for handicapped, elderly, students, VIP or any other attendee group
          .modal-body
            #special-pricing
              .row
                .col-sm-12
                  br
                  form(action='')
                    input#nospecial(type='radio', name='pricing', v-model='allow' value='false')
                    label(for="nospecial") No special pricing
                    input#special(type='radio', name='pricing', value='true', v-model="allow")
                    label(for="special") Allow special pricing
              .row(v-if="allow === 'true'")
                .col-sm-10.col-sm-offset-1
                  form(action='')
                    div(v-for="(item, index) in types")
                      input(type='checkbox', name='pricing', :id="item.code", :checked="tickets[edit_ticket].special_pricing[item.code]" @change="select(item)")
                      label(:for="item.code") {{ item.translations.name.en }}
                      .discountprice_changed(v-if="tickets[edit_ticket].special_pricing[item.code]")
                        .row
                          .col-sm-3.col-sm-offset-1
                            tk-input-type-text-admin-currency(:value="tickets[edit_ticket].special_pricing[item.code].amount", @input="price_changed(item, $event)")
                          .col-sm-3
                            tk-input-type-text(:value="tickets[edit_ticket].special_pricing[item.code].quantity", placeholder='amount', @input="count_changed(item, $event)")
          .modal-footer
            .row
              .col-sm-6.text-left
                .footer-wrapper
                  .footer-body
                    button.action(data-dismiss='modal') cancel
              .col-sm-6.text-right
                .footer-wrapper
                  .footer-body
                    tk-primary-button(name='Close', @click="close")
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
        allow: false,
        types: [
          {
            code: 'student',
            translations: {
              name: {
                en: 'Student'
              }
            }
          },
          {
            code: 'senior',
            translations: {
              name: {
                en: 'Senior'
              }
            }
          }, {
            code: 'handicapped',
            translations: {
              name: {
                en: 'Handicapped'
              }
            }
          }
        ]
      }
    },
    methods: {
      close () {
        modal.hide('#price-special')
      },
      price_changed (item, price) {
        this.$store.commit(types.SET_SPECIAL_PRICE_AMOUNT, { item: item, amount: price })
      },
      count_changed (item, count) {
        this.$store.commit(types.SET_SPECIAL_PRICE_QUANTITY, { item: item, quantity: count })
      },
      select (item) {
        if (this.tickets[this.edit_ticket].special_pricing[item.code]) {
          this.$store.commit(types.REMOVE_SPECIAL_PRICE, item)
        } else {
          this.$store.commit(types.ADD_SPECIAL_PRICE, item)
        }
      }
    },
    watch: {
      edit_ticket (index) {
        this.allow = Object.keys(this.tickets[index].special_pricing).length > 0
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
