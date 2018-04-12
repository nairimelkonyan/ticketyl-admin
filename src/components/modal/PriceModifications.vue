<template lang="pug">
  .div
    #price-modifications.modal(role='dialog')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .modal-header
            .modal-header-content
              h2 Price Modifications
              p Set and control various conditional modifications to the prices of this item
          .modal-body
            nav
              .row
                .col-sm-12
                  .navigation
                    .menu-content
                      .menu-body
                        button(@click='showCreate', v-bind:class="{ active: create }") Create Modification
                        button(@click='showAssigned', v-bind:class="{ active: assigned }") Assigned Modifications ({{ currentTicket ? currentTicket.own_charges.length : 0 }})
            .create(v-if='create')
              h4 1. Modification
              p Define the change that has to happen once the Condition above becomes true
              .row
                .col-sm-2
                  tk-custom-select-string(:options='currencies', style='margin-bottom: 24px;', @input="set_currency")
                .col-sm-3
                  tk-input-type-text(placeholder='25.00', style='margin-bottom: 24px;', @input="set_price", ref='priceInput')
                .col-sm-3
                  tk-custom-select-string(:options='directions' param="name", style='margin-bottom: 24px;', @input="set_direction")
              hr
              h4 2. Conditions
              p Select the condition by which you want this price modification to activate
              .row
                .col-sm-6
                  tk-custom-select-string(:options='variables', param="name", style='margin-bottom: 24px;', @input="set_variable")
                  p Specify the condition
                  tk-input-type-text(placeholder='value', style='margin-bottom: 24px;', @input="set_than", ref='conditionInput')
                  tk-primary-button(name='Add condition' @click="add_condition")
              //- p Specify the condition
                .row
                  .col-sm-2
                    tk-input-type-text(placeholder='days', style='margin-bottom: 24px;')
                  .col-sm-2
                    tk-input-type-text(placeholder='hours', style='margin-bottom: 24px;')
                  .col-sm-2
                    tk-input-type-text(placeholder='minutes', style='margin-bottom: 24px;')
                  .col-sm-3
                    p.margin before the event
              div(v-for="(item, index) in data.conditions")
                hr
                tk-custom-select-string(:options='variables', :selected_default="item.when", param="name", style='margin-bottom: 5px;', @input="update_variable(index, $event)")
                .row
                  .col-sm-6
                    tk-input-type-text(:value="item.than", placeholder='value', style='margin-bottom: 24px;' @input="update_than(index, $event)")
                  .col-sm-6
                    a(@click="remove_condition(index)" style="margin-top: 13px; display: block") Remove condition
              hr
              h4 3. Repetitions
              p.radio Times this modification will happen as long as the Condition is true
              input#always(type='radio', name='ticket', value='always', v-model="data.configuration.repetition")
              label(for="always") Always
              input#one(type='radio', name='ticket', value='single', v-model="data.configuration.repetition")
              label(for="one") One purchase
            .assigned(v-if='assigned')
              h4 Assigned Modifications
              tk-table-price-modifications
              .save
                button.action(@click="storeModificationGroup") Save as modification group
              h4 Modification Groups
              form(action='')
                div(v-for="(item, index) in tickets[edit_ticket].charges.must")
                  input(type='checkbox', name='page', id="last") 
                  label(for="last") {{ item.translations.name.en }}
                    tk-tools(style='margin-left: 16px;')
          .modal-footer
            .row
              .col-sm-6.text-left
                .footer-wrapper
                  .footer-body
                    button.action(data-dismiss="modal") cancel
              .col-sm-6.text-right
                .footer-wrapper
                  .footer-body(v-if='create')
                    tk-primary-button(name='create modification', @click="store_charge")
                  .footer-body(v-if='assigned')
                    tk-primary-button(name='Close', @click="close")
</template>

<script>
  import * as types from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import modal from '@/services/Modal/Modal'

  const initialData = {
    direction: {
      name: 'Discount',
      direction: -1
    },
    price: {
      amount: '',
      currency: '€'
    },
    conditions: [],
    translations: {},
    configuration: {
      visible: 'visible',
      status: 'public',
      included: 'excluded',
      count: -1,
      repetition: 'always'
    }
  }

  const initialCurrentCondition = {
    when: {
      name: 'Time before the event',
      key: 'time_left'
    },
    is: '=',
    than: ''
  }

  export default {
    computed: {
      ...mapGetters({
        edit_ticket: 'edit_ticket',
        tickets: 'tickets'
      }),
      currentTicket () {
        if (!this.tickets) { return null }
        return this.tickets[this.edit_ticket]
      }
    },
    data () {
      return {
        create: true,
        assigned: false,
        variables: [
          {
            name: 'Time before the event',
            key: 'time_left'
          }, {
            name: 'Tickets left',
            key: 'tickets_left'
          }
        ],
        directions: [
          {
            name: 'Discount',
            direction: -1
          }, {
            name: 'Fee',
            direction: 1
          }
        ],
        currencies: [ '€', '$' ],
        current_condition: initialCurrentCondition,
        data: initialData
      }
    },
    methods: {
      close () {
        modal.hide('#price-modifications')
      },
      storeModificationGroup () {
        modal.show('#price-group')
      },
      store_charge () {
        if (this.data.price.amount) {
          this.$store.commit(types.ADD_CHARGE, this.data)
          this.data.direction.name = initialData.direction.name
          this.current_condition = initialCurrentCondition
          this.showAssigned()
        } else {
          this.$refs.priceInput.focus()
        }
      },
      update_variable (index, data) {
        this.data.conditions[index].when = data
      },
      update_than (index, data) {
        this.data.conditions[index].than = data
      },
      set_variable (data) {
        this.current_condition.when = data
      },
      set_than (data) {
        this.current_condition.than = data
      },
      set_currency (data) {
        this.data.price.currency = data
      },
      set_price (data) {
        this.data.price.amount = data
      },
      set_direction (data) {
        this.data.direction = data
      },
      add_condition () {
        if (this.current_condition.than && this.current_condition.when) {
          this.data.conditions.push({
            ...this.current_condition
          })
        } else {
          this.$refs.conditionInput.focus()
        }
      },
      remove_condition (index) {
        this.data.conditions.splice(index, 1)
      },
      showCreate () {
        this.create = true
        this.assigned = false
        this.data.conditions = []
      },
      showAssigned () {
        this.create = false
        this.assigned = true
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
