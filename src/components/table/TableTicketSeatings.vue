<template lang="pug">
  section
    table(v-if='tickets && tickets.length > 0')
      thead
        tr.header
          th(scope='col') Ticket name
          th(scope='col') Quantity
          th(scope='col') Price
          th(scope='col')
      tbody
        tr(v-for='(t, index) in tickets')
          td(data-label='Ticket name')
            tk-input-translation(label="* Event title", placeholder="general, vip, back seats", :target="t.translations.name", @change="updateName($event, index)", maxlength='50')
            //- tk-input-type-text(name='name', placeholder='general, vip, back seats', :value='t.name', @input='updateName($event, index)')
          td(data-label='Quantity')
            div(v-if='t.type !== "seats.io"')
              tk-input-type-text(name='quantity', placeholder='quantity', :value='t.quantity', @input='updateQuantity($event, index)', v-on:keypress="isNumber")
            div(v-else)
              | {{ t.quantity }}
          td(v-if='t.type === "free"', data-label='Price')
            br
            p.free Free
          td(v-if='t.type !== "free"', data-label='Price')
            tk-input-type-text-admin-currency(name='price', placeholder='price', :value='t.price.amount', @input='updatePrice($event, index)', v-on:keypress="isNumber")
          td(data-label='Manage')
            tk-tools-settings(
              @delete='deleteItem(index)',
              @duplicate='duplicate(index)',
              @ticketSettings='ticketSettings(index)',
              @priceModifications='priceModifications(index)',
              @specialPricing="specialPricing(index)")
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '@/store/mutation-types'
  import modal from '@/services/Modal/Modal'

  export default {
    computed: {
      ...mapGetters({
        tickets: 'tickets'
      })
    },
    methods: {
      /*
      tickets: {
        type: '',
        name: '',
        quantity: 0,
        price: 0
      },
      */
      ticketSettings (i) {
        this.$store.commit(types.SET_TICKET_EDITABLE, i)
        modal.show('#ticket-settings')
      },
      priceModifications (i) {
        this.$store.commit(types.SET_TICKET_EDITABLE, i)
        modal.show('#price-modifications')
      },
      specialPricing (i) {
        this.$store.commit(types.SET_TICKET_EDITABLE, i)
        modal.show('#price-special')
      },
      duplicate (i) { this.$store.commit(types.DUPLICATE_ADMIN_TICKET, i) },
      deleteItem (i) { this.$store.commit(types.DELETE_ADMIN_TICKETS, i) },
      updateName (translations, index) {
        console.log(index)
        this.$store.commit(types.UPDATE_EVENT_TICKET_NAME, { translations: translations, index: index })
      },
      updateQuantity (value, index) {
        this.$store.commit(types.UPDATE_EVENT_TICKET_QUANTITY, {value, index})
      },
      updatePrice (value, index) {
        this.$store.commit(types.UPDATE_EVENT_TICKET_PRICE, {value, index, currency: 'eur'})
      },
      isNumber (e) {
        var iKeyCode = (e.which) ? e.which : e.keyCode
        if (/* iKeyCode !== 46 && iKeyCode > 31 && */ (iKeyCode < 48 || iKeyCode > 57)) {
          e.preventDefault()
          return false
        } else {
          // this.customGiftCard.name = 'Custom Gift Card'
          // this.customGiftCard.amount = 1
          // this.customGiftCard.code = 'eur'
          return true
        }
      }
    }
  }
</script>

<style lang="less" scoped>
table {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
}
table caption {
  color: #292929;
  font-size: 18px;
  margin-bottom: 18px;
}
.header{
  color: #fff;
  text-transform: none;
  background-color: #9a9a9a;
  &:hover{
    background-color: #9a9a9a !important;
  }
}
table tr {
  background: #f7f7f7;
  border-bottom: 1px solid #979797;
  &:hover{
    background-color: #e4e4e4;
  }
}
table th{
  padding: 16px;
}
table td {
  &:first-child{
    width: 60%;
  }
  padding: 16px 8px;
  text-align: left;
}
table th {
  font-size: 14px;
}
.footer{
  border-bottom: none;
}
.free{
  font-size: 18px;
  padding-left: 16px;
  margin-top: -11px;
}
@media screen and (max-width: 600px) {
  table {
    border: 0;
  }
  table caption {
    font-size: 1.3em;
  }
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  table td:before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  table td:last-child {
    border-bottom: 0;
  }
}
</style>
