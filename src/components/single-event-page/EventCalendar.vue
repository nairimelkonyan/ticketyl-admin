<template lang="pug">
  modal-content(footer, :translations='translations')
    h3(slot='header') {{ translations.event_page_calendar | tktranslate(lang) }}
    .content
      #inner-content-calendar
        // tk-select(:select='packages', value-attr='id', type='Number', @input='setSelectedPackageId($event)')
        .row
          .col-xs-12
            .event-date-nav
              button.active-nav {{ translations.choose_event_tab | tktranslate(lang) }}
              button(@click="switchModal") {{ translations.shopping_cart_tab | tktranslate(lang) }}
                span.ticket-count(v-if='cart.length') {{ cart.length }}
        .row
          .col-sm-6
            tk-custom-select(:options='packages', @input='setSelectedPackageId($event)')
            section(v-if="!selectedSubscription")
              p.text-center(v-if="product || act") {{ translations.event_page_calendar_paragraph | tktranslate(lang) }}
              section(v-bind:style="{ display: (product || act) ? 'block' : 'none' }" v-model='selectedDate')
                tk-calendar(:enabledDates='calendarEnabledDates' v-model='selectedDate')
          .col-sm-6
            section(v-if="package")
              .ticketTypesContent
                h5 {{ translations.available_ticket_types | tktranslate(lang) }}
                //h5 {{ translations.available_ticket_types | tktranslate(lang) }}
                form
                  label(v-for='(subscription, index) in package.subscriptions').control.control--radio
                    strong.ticketType {{ translations.subscription | tktranslate(lang) }} 
                    | | {{ subscription.translations.name | tktranslate(lang) }} {{ translations.price | tktranslate(lang) }} |
                    strong  {{ subscription.price | tkprice }}
                    input(type="radio" name="radio" :id="'s' + index" v-model='product' v-bind:value='subscription')
                    .control__indicator
                  label.control.control--radio
                    strong {{ translations.ticket_label | tktranslate(lang) }} 
                    | | {{ translations.price | tktranslate(lang) }} 
                    strong {{ package.acts_price_range.min | tkprice }}
                    input(type="radio" name="radio" id="tick" v-model='product' v-bind:value='{id:0}') 
                    .control__indicator
                  
                  section(v-if="(product && product.id === 0) || act")
                    .singleTicketContent
                      .singleTicket(v-for='(e, index) in day')
                        label.control.control--radio
                          span.ticketType {{ translations.event_page_calendar_events_time | tktranslate(lang) }}: 
                            strong {{ getTime(e.datetime.date) }} 
                            | | {{ translations.price | tktranslate(lang) }}: 
                            strong {{ e.price_range.min | tkprice }}
                          input(type="radio" name="radio" :id="'t' + index" v-model='act' v-bind:value='e' v-on:change="loadSeats")
                          .control__indicator
                section.selectTickets(v-if="product && product.id !== 0")
                  .row
                    .col-sm-12.text-left
                      tk-spinner(@input="amountChanged(product, $event)", v-if='(product.availability.available - productCountInCart(product) > 0)', :maxTickets='product.availability.available - productCountInCart(product)', style='margin-bottom: 16px;')
                      span.soldOut(v-else) {{ translations.sold_out | tktranslate(lang) }}
                    .col-sm-12.text-left
                      tk-disabled-button.add(:name="translations.add_to_basket_button | tktranslate(lang)", v-if='amount < 1')
                      tk-primary-button.add(@click='addToCart', :name="translations.add_to_basket_button | tktranslate(lang)", v-if='amount > 0')


    .row(slot='footer')
      .col-sm-6
      .col-sm-6
        tk-primary-button(v-if='this.$route.name === "Checkout"' name='continue shopping' data-dismiss="modal")
        tk-primary-button(v-if='cart.length > 0 && this.$route.name !== "Checkout"' @click='toCheckout' :name="translations.event_page_ticket_list_button | tktranslate(lang)")
        tk-disabled-button(v-if='!cart.length > 0 && this.$route.name !== "Checkout"' :name="translations.event_page_ticket_list_button | tktranslate(lang)")
</template>

<script>
  import moment from 'moment'
  import * as types from '@/store/mutation-types'
  import ModalContent from '@/components/modal/ModalContentEvents'
  import { mapGetters } from 'vuex'
  import Calendar from '@/components/single-event-page/Calendar'
  import api from '@/services/TicketylOS/TicketylOS'

  export default {
    // props: ['dates', 'events'],
    name: 'EventCalendar',
    props: [
      'translations'
    ],
    data () {
      return {
        selectedEvent: null,
        selectedDate: null,
        selectedEventTime: null,
        calendarEnabledDates: [],
        // eventsOnDate: [],
        selectedSubscription: null,
        showTickets: true,
        product: null,
        amount: 0,
        act: null,
        events: [],
        day: []
      }
    },
    computed: {
      ...mapGetters({
        selectedPackageId: 'selectedPackageId',
        lang: 'selectedLanguage',
        defaultLang: 'defaultLanguage',
        cart: 'get_cart',
        packages: 'packages',
        package: 'package'
      })
    },
    methods: {
      toCheckout () {
        window.jQuery('#tickets' + this._uid).modal('hide')
        this.$router.push({name: 'Checkout'})
      },
      loadSeats (event) {
        api
          .shop().seats(this.act.id)
          .then(response => {
            if (response.length) { this.product = response[0] }
          })
      },
      productCountInCart (product) {
        var count = 0
        for (var i in this.cart) {
          if (this.cart[i].product.id === product.id) {
            count += this.cart[i].count
          }
        }
        return count
      },
      amountChanged (product, amount) {
        this.amount = amount
      },
      addToCart () {
        if (this.amount > 0) {
          var item = {
            product: this.product,
            count: this.amount
          }
          this.$store.commit(types.ADD_TO_CART, item)
          this.amount = 0
          this.act = null
          this.product = null
          this.selectedEventTime = null
        }
      },
      switchModal () {
        this.$emit('seeTickets')
      },
      translate (translate) {
        return this.$options.filters.translate(translate)
      },
      loadEvents (seriesId, packageId) {
        var filter = api.filter().category(seriesId).category(packageId)
        api.shop().events().filter(filter)
          .then(response => {
            this.events = response
          })
      },
      setSelectedPackageId (packageId) {
        this.product = null
        this.act = null
        this.calendarEnabledDates = []

        for (var i in this.packages) {
          if (this.packages[i].id === packageId) {
            this.$store.commit(types.SET_PACKAGE, this.packages[i])
          }
        }
        var seriesId = this.$store.getters.getSeriesId
        this.$store.commit(types.SET_SELECTEDPACKAGEID, packageId)
        this.loadEvents(seriesId, packageId)
      },
      getTime (a) {
        return moment(a).format('HH:mm')
      }
    },
    watch: {
      product (event) {
        this.amount = 0
        if (event) {
          if (event.id === 0) {
            this.act = null
          }
        }
        if (event && event.id !== 0 && !this.act) {
          this.act = null
          this.calendarEnabledDates = []
          for (var i in event.handler.products) {
            this.calendarEnabledDates.push(event.handler.products[i].act)
          }
        } else {
          this.calendarEnabledDates = this.events
        }
      },
      selectedDate (date) {
        this.day = []
        var mDate = moment(date)
        for (var i = 0; i < this.events.length; i++) {
          if (mDate.isSame(this.events[i].datetime.date, 'day')) {
            this.day.push(this.events[i])
          }
        }
      }
    },
    created () {
      this.calendarEnabledDates = [moment().format('YYYY-MM-DD')]
    },
    components: {
      'modal-content': ModalContent,
      tkCalendar: Calendar
    }
  }
</script>

<style lang="less" scoped>
.soldOut{
  font-size: 18px;
  color: #292929;
  background-color: #fff;
  min-height: 48px;
  margin-bottom: 16px;
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid #979797;
}
.singleTicketContent{
  padding-top: 16px;
  border-top: 1px solid #979797;
}
.singleTicket{
  margin-bottom: 20px;
}
.addToBasket{
  float: right;
}
.selectTickets{
  padding: 24px 0;
  border-top: 1px solid #979797;
  border-bottom: 1px solid #979797;
}
.ticketType{
  font-size: 18px;
}
input[type='radio']{
  margin-right: 8px;
}
.ticket-count{
  font-size: 12px;
  vertical-align: super;
  background-color: #292929;
  color: #fff;
  margin-left: 8px;
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
}
  .event-date-nav{
    margin-bottom: 40px;
    text-align: center;
    button{
      font-size: 18px;
      padding: 0;
      outline: 0;
      background-color: transparent;
      border: none;
      &:first-child{
        margin-right: 32px;
      }
      &:last-child{
        margin-left: 32px;
      }
    }
    .active-nav{
      position: relative;
      -webkit-text-stroke: 1px #292929;
      &:after{
        content: '';
        position: absolute;
        width: 8px;
        height: 1px;
        background-color: #292929;
        left: 0;
        right: 0;
        margin: auto;
        top: 32px;
      }
    }
  }
  form{
    label{
      margin-bottom: 16px;
    }
  }
  #inner-content-calendar{
    width: 700px;
    margin: 0 auto;
  }
  .content{
    max-width: 770px;
    margin: 0 auto;
  }
  span{
    font-size: 14px;
  }
  .disabled {
    background-color: gray;
  }
  p{
    margin: 16px 0;
  }
  h5{
    font-size: 14px;
    margin-top: 0;
    text-transform: uppercase;
    color: #9a9a9a;
    margin-bottom: 16px;
  }
  @media(min-width:0px) and (max-width:767px){
    .event-date-nav{
      text-align: left;
      button{
        &:first-child{
          margin-right: 0;
          margin-bottom: 16px;
          display: block;
        }
        &:last-child{
          margin-left: 0;
          display: block;
        }
      }
    }
    #inner-content-calendar{
      width: auto;
    }
    .add{
      width: 100%;
    }
    .event-date-nav{
      margin-bottom: 32px;
    }
    .ticketTypesContent{
      margin: 24px 0;
      h5{
        text-align: center;
        font-size: 18px;
      }
    }
  }
</style>
