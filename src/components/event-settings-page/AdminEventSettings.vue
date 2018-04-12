<template lang="pug">
  section
    tk-header-admin
    tk-event-settings-menu
    .content
      .container
        .row
          .col-sm-4#js-scrollspy 
            nav#aside
              p Event settings
              ul.js-scrollspy-nav
                li#visibilityLink(@click='visibilitySpy') 1. Event Visibility
                li#settingsLink(@click='settingsSpy') 2. Event Settings
                li#timezoneLink(@click='timezoneSpy') 3. Event Timezone
                li#paymentLink(@click='paymentSpy') 4. Payment Gateways
                li#taxesLink(@click='taxesSpy') 5. Taxes
                li#ticketLink(@click='ticketSpy') 6. Name On Ticket
                li#giftcardLink(@click='giftCardSpy') 7. Gift Cards
          .col-sm-8#internal-content
            div#visibility-scroll
              h3 1. Event Visibility
              p Control if the event is available for sales publically or is visible only for private sales
              #event-visibility.section.scrollspy
                .row
                  .col-sm-4.col-sm-offset-2
                    p.center Event Visibility
                  .col-sm-6
                    tk-custom-select-string(:options='visibility')
            div#settings-scroll
              h3 2. Event Settings
              p Adjust your event settings according to what your customers prefer
              #event-settings.section.scrollspy
                .row
                  .col-sm-4.col-sm-offset-2
                    p.center  Event Default Language
                  .col-sm-6
                    tk-custom-select-string.select(:options='language')
                    .row.margin
                      .col-sm-6
                        tk-modal-shop-languages
                      .col-sm-6.text-right
                        p.selected
                          strong 3 selected
                  .col-sm-4.col-sm-offset-2
                    p.center  Event Default Currency
                  .col-sm-6
                    tk-custom-select-string.select(:options='currency')
                    .row
                      .col-sm-6
                        tk-modal-shop-currencies
                      .col-sm-6.text-right
                        p.selected
                          strong 3 selected
            div#timezone-scroll
              h3 3. Event Timezone
              p Set the time zone in which the event will be taking place
              #event-timezone.section.scrollspy
                .row
                  .col-sm-4.col-sm-offset-2
                    p.center  Timezone
                  .col-sm-6
                    tk-custom-select-string.select(:options='timezone')
                    .row
                      .col-sm-12
                        button.action Set to my current timezone
            div#payment-scroll
              h3 4. Payment Gateways
              p Specify the payment gateways the ticket buyers will be able to use
              #payment-gateways.section.scrollspy
                .row
                  .col-sm-4.col-sm-offset-2
                  .col-sm-6
                    form(action='')
                      input(type='checkbox', name='card', id="visa")
                      label(for="visa")
                        img(src='static/visa.png')
                        | Visa, MasterCard (1.4% + 0.24$)
                      input(type='checkbox', name='card', id="american")
                      label(for="american")
                        img(src='static/american_express.png')
                        | American Express (fixed 0.50$)
                      input(type='checkbox', name='card', id="paypal")
                      label(for="paypal") 
                        img(src='static/paypal.png') 
                        | PayPal (1% + 0.45$)
                      input(type='checkbox', name='card', id="sofort")
                      label(for="sofort") 
                        img(src='static/sofort.png')
                        | Sofort (3%)
                      input(type='checkbox', name='card', id="bitcoin")
                      label(for="bitcoin")
                        img(src='static/bitcoin.png')
                        | Bitcoin (free)
            div#taxes-scroll
              h3 5. Taxes
              p.taxes-paragraph You can control the Tax Rate for the tickets sold for this event, but you bare full responsibility that this tax and rate applies to your event (the rate cannot be chaged once you Publish the event).
              .menu
                .row
                  .col-sm-7
                    .menu-content
                      .menu-body
                        button(@click='showVat', :class="{'active-nav': vat === true}") VAT
                        button(@click='showTax', :class="{'active-nav': tax === true}") Salex Tax

              #taxes.section.scrollspy
                .row
                  .col-sm-4.col-sm-offset-2
                    p.center VAT Rate
                  .col-sm-6
                    tk-vat-spinner.select
                  .col-sm-4.col-sm-offset-2
                    p.center VAT number
                  .col-sm-6
                    tk-input-type-text
            div#ticket-scroll
              h3 6. Name On Ticket
              p Specifying names on each ticket takes your customers longer to fill, so only select it if you need to
              #name-in-ticket.section.scrollspy
                .row
                  .col-sm-4.col-sm-offset-2
                  .col-sm-6
                    form(action='')
                      input#all(type='radio', name='ticket', value='all')
                      label(for="all") Buyer’s name on all tickets
                      input#specify(type='radio', name='ticket', value='specify')
                      label(for="specify") Specify name for each ticket
            div#gift-card-scroll
              h3 7. Gift Cards
              p Control the availability and appearance of the Gift Cards for this event
              #gift-cards.section.scrollspy
                .row
                  .col-sm-4.col-sm-offset-2
                  .col-sm-6
                    .gift-card-content
                      .gift-card-body
                        h4 Upload New
                        p 
                          strong Gift Card image 
                          | min 435x200 px
                        tk-secondary-button(name='browse images')
            div#save-revert
              .row
                .col-sm-12
                  tk-secondary-button(name='revert to saved')
                  tk-primary-button(name='save changes')
    tk-footer-admin
</template>

<script>
  import store from '@/store'

  export default {
    data () {
      return {
        vat: true,
        tax: false,
        visibility: ['Public', 'Private'],
        language: ['English', 'Latvian'],
        currency: ['Euro', 'USD'],
        timezone: ['UTC+3', 'GMT'],
        info: {
          'name': '',
          'logo': '',
          'domain': '',
          'default_language': '',
          'default_currency': '',
          'allowed_gateways': [],
          'layout': '',
          'giftcards_enabled': true,
          'giftcard_banner': ''
        }
      }
    },
    methods: {
      showVat () {
        this.vat = true
        this.tax = false
      },
      showTax () {
        this.vat = false
        this.tax = true
      },
      beforeRouteEnter (to, from, next) {
        if (store.getters.logInAdminToken === '') {
          next('/ticketyl')
        }
        next()
      },
      visibilitySpy () {
        document.getElementById('visibility-scroll').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})
      },
      settingsSpy () {
        document.getElementById('settings-scroll').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})
      },
      timezoneSpy () {
        document.getElementById('timezone-scroll').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})
      },
      paymentSpy () {
        document.getElementById('payment-scroll').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})
      },
      taxesSpy () {
        document.getElementById('taxes-scroll').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})
      },
      ticketSpy () {
        document.getElementById('ticket-scroll').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})
      },
      giftCardSpy () {
        document.getElementById('gift-card-scroll').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})
      }
    },
    mounted () {
      const mq = window.matchMedia('(max-width: 767px)')

      var aside = window.jQuery('#aside')
      window.jQuery(window).scroll(function () {
        var scroll = window.jQuery(window).scrollTop()
        if (mq.matches) {
          return
        }
        if (scroll >= '262') {
          aside.addClass('fixed')
        } else {
          aside.removeClass('fixed')
        }
      })
    }
  }
</script>

<style lang="less" scoped>
.content{
  margin-bottom: 120px;
}
#visibility-scroll, #settings-scroll, #timezone-scroll, #payment-scroll, #taxes-scroll, #ticket-scroll, #gift-card-scroll{
  border-bottom: 1px solid #979797;
  padding-bottom: 32px;
  margin-bottom: 32px;
}
.gift-card-content{
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.2) 100%), url('/static/giftcard_bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: table;
  height: 184px;
  width: 100%;
  .gift-card-body{
    color: #fff;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    p{
      margin-bottom: 16px;
    }
  }
}
#save-revert{
  button{
    margin-right: 32px;
  }
}
.select{
  margin-bottom: 24px;
}
.selected{
  margin: 0;
}
.margin{
  margin-bottom: 32px;
}
h3 + p{
  margin-bottom: 24px;
}
form{
  img{
    height: 22px;
    width: 22px;
    margin-right: 8px;
  }
}
.action{
  outline: 0;
  text-transform: uppercase;
  padding: 0;
  background-color: transparent;
  text-decoration: underline;
  border: none;
}
.center{
  margin: 0;
  margin-top: 12px;
}
h3{
  margin-top: 0;
}
nav{
    padding: 24px;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
    p{
      color: #9a9a9a;
      text-transform: uppercase;
      margin-bottom: 24px;
    }
    ul{
      text-decoration: none;
      padding: 0;
      list-style-type: none;
      li{
        margin-bottom: 16px;
        cursor: pointer;
        &:last-child{
          margin: 0;
        }
      }
      a{
        cursor: pointer;
        text-transform: capitalize;
        text-decoration: none;
        &:hover{
          color: #292929;
        }
      }
    }
  }
  .active{
    font-weight: bold;
  }
.fixed{
  position: fixed;
  background-color: #f7f7f7;
  z-index: 1;
  width: 360px;
  top: 32px;
}
.menu{
  border-bottom: 1px solid #979797;
  margin-bottom: 30px;
  .menu-content{
    display: table;
    height: 80px;
    width: 100%;
    .menu-body{
      display: table-cell;
      vertical-align: middle;
      button{
        font-size: 18px;
        padding: 0;
        outline: 0;
        background-color: transparent;
        border: none;
        margin-right: 61px;
      }
    }
  }
}
.active-nav{
  position: relative;
  font-weight: bold;
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
.taxes-paragraph{
  margin: 0;
}
</style>
