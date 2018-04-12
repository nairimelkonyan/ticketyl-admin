<template lang="pug">
  section
    tk-header-admin
    .settings
      .container
        #settings
          .row
            .col-sm-4
              .settings-content
                .settings-body
                  h2 Main Settings
            .col-sm-8.text-right
              .settings-content
                .settings-body
                  //- tk-secondary-button(name='revert to saved')
                  tk-primary-button(name='save changes', @click='store')
    .container
      .navigation
        .row
          .col-sm-12
            .menu-content
              .menu-body
                router-link(:to="{name: 'MainSettings'}") My Account
                router-link.current(:to="{name: 'ShopPreferences'}") Shop Preferences
                router-link(:to="{name: 'ManageTeam'}") Manage Team
                router-link(:to="{name: 'Notifications'}") Notifications
    .content
      .container
        .row
          .col-sm-4#js-scrollspy 
            nav#aside
              p Shop Preferences
              ul.js-scrollspy-nav
                li#manageLink(@click='manageSpy') 1. Manage Shops
                li#shopLink(@click='shopSpy') 2. Shop Settings
                li#paymentLink(@click='paymentSpy') 3. Payment Gateways
                li#landingLink(@click='landingSpy') 4. Landing page Layout
                li#giftLink(@click='giftSpy') 5. Gift Cards
          .col-sm-8#internal-content
            div#manage-scroll
              h3 1. Manage Shops
              p Create new and manage your existing shops.
              #manage.section.scrollspy
                tk-settings-create-shop(@input="add_shop")
                #all-sub-events
                  span(style='display: block;') All shops
                  span.sub-event(v-for='(item, index) in shops',
                      @click='selected = index',
                      :class="{'active-subevent': selected === index}") {{ item.translations.name.en }}
                    button
                      i.material-icons close
            #shop.section.scrollspy(v-if="shop")
              h3 2. Shop Settings - TED Latvia
              p Adjust your prefferences regarding your shopping experience
              tk-settings-shop-settings(:model="shop", :available_languages="merchant.allowed_languages", :available_currencies="merchant.allowed_currencies", @input="update")
            #payment.section.scrollspy(v-if="shop")
              h3 3. Payment Gateways
              p Select all payment methods you need on your shop
              tk-settings-shop-gateways(:model="shop", :gateways="merchant.allowed_gateways", @input="update")
            #landing.section.scrollspy(v-if="shop")
              h3 4. Landing page Layout
              p Select the way your events and products are presented on the Landing page
              tk-settings-landing-settings(:model="shop", @input="update")
            #gift.section.scrollspy(v-if="shop")
              h3 5. Gift Cards
              p Control the availability and appearance of the Gift Cards for this shop
              tk-settings-giftcard-settings(:model="shop", @input="update")
            .row
              .col-sm-8
                //- tk-secondary-button.right(name='revert to saved')
                tk-primary-button( name='save changes', @click='store')
    tk-footer-admin
</template>

<script>
  import api from '@/services/TicketylOS/TicketylOS'
  import * as types from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import deepmerge from 'deepmerge'

  export default {
    data () {
      return {
        shops: [],
        selected: null
      }
    },
    computed: {
      ...mapGetters({
        token: 'logInAdminToken',
        merchant: 'merchant'
      }),
      shop () {
        if (this.selected == null) { return null }
        return this.shops[this.selected]
      }
    },
    methods: {
      add_shop (shop) {
        this.shops.push(shop)
        this.selected = this.shops.length - 1
      },
      update (data) { this.shops[this.selected] = deepmerge(this.shops[this.selected], data) },
      store () {
        api.token(this.token)
          .admin().merchant().update({ merchant: { shops: this.shops } })
          .then(response => {
            this.$store.commit(types.MECHANT_INIT, response)
          })
      },
      objects_to_codes (objects) {
        var codes = []
        for (var i in objects) { codes.push(objects[i].code) }
        return codes
      },
      manageSpy () { document.getElementById('manage').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'}) },
      shopSpy () { document.getElementById('shop').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'}) },
      paymentSpy () { document.getElementById('payment').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'}) },
      landingSpy () { document.getElementById('landing').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'}) },
      giftSpy () { document.getElementById('gift').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'}) },
      load (merchant) {
        this.shops = []
        if (merchant && merchant.shops) {
          for (var i in merchant.shops) {
            var shop = merchant.shops[i]
            this.shops.push({
              code: shop.code,
              id: shop.id,
              translations: shop.translations,
              configuration: shop.configuration,
              attributes: shop.attributes,
              allowed_gateways: this.objects_to_codes(shop.allowed_gateways),
              allowed_currencies: this.objects_to_codes(shop.allowed_currencies),
              allowed_languages: this.objects_to_codes(shop.allowed_languages)
            })
          }
        }
      }
    },
    mounted () {
      this.load(this.merchant)
      const mq = window.matchMedia('(max-width: 767px)')
      var aside = window.jQuery('#aside')
      window.jQuery(window).scroll(function () {
        var scroll = window.jQuery(window).scrollTop()
        if (mq.matches) { return }
        if (scroll >= '350') { aside.addClass('fixed') } else { aside.removeClass('fixed') }
      })
    },
    watch: {
      merchant (merchant) { this.load(merchant) }
    }
  }
</script>

<style lang="less" scoped>
.sub-event{
  cursor: pointer;
  font-size: 18px;
  display: inline-block;
  padding: 8px;
  border: 1px solid #292929;
  margin-right: 24px;
  margin-bottom: 16px;
  &:hover{
    background-color: #fff;
  }
  &.active-subevent{
    border: 2px solid #292929 !important;
  }
  button{
    padding: 0;
    background-color: transparent;
    border: none;
    outline: 0;
    .material-icons{
      padding-left: 8px;
      vertical-align: middle;
      font-size: 18px;
    }
  }
}
#manage, #shop, #payment, #landing, #gift{
  margin-bottom: 32px;
  border-bottom: 1px solid #979797;
}
.navigation{
  border-bottom: 1px solid #979797;
  margin-bottom: 32px;
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
.settings{
  background-color: #f7f7f7;
  #settings{
    border-bottom: 1px solid #979797;
  }
  .settings-content{
    display: table;
    height: 116px;
    width: 100%;
    .settings-body{
      display: table-cell;
      vertical-align: middle;
      h2{
        margin: 0;
      }
      button{
        margin-left: 24px;
      }
      .back{
        text-transform: uppercase;
        padding: 0;
        border: none;
        outline: 0;
        text-decoration: underline;
        background-color: transparent;
      }
    }
  }        
}
.content{
  margin-bottom: 120px;
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
.center{
  margin: 0;
  margin-top: 12px;
}
.current{
  position: relative;
  -webkit-text-stroke: 1px #292929;
  &:after{
    position: absolute;
    content: '';
    width: 14px;
    height: 1px;
    background-color: #292929;
    bottom: -11px;
    left: 0;
    right: 0;
    margin: auto;
  }
}
.fixed{
  position: fixed;
  background-color: #f7f7f7;
  z-index: 1;
  width: 360px;
  top: 32px;
}
input[type='text']{
  margin-bottom: 24px;
}
.margin-bottom{
  margin-bottom: 24px;
}
.last{
  margin-bottom: 32px !important;
}
.action{
  outline: 0;
  text-transform: uppercase;
  padding: 0;
  background-color: transparent;
  text-decoration: underline;
  border: none;
}
.right{
  margin-right: 32px;
}
h3{
  margin-top: 0;
  +p{
    margin-bottom: 32px;
  }
}
h4{
  margin-bottom: 24px;
}
form{
  margin-bottom: 32px;
  img{
    height: 22px;
    width: 22px;
    margin-right: 8px;
  }
}
.gift-card-content{
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.2) 100%), url('/static/giftcard_bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: table;
  height: 184px;
  width: 100%;
  margin-bottom: 32px;
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
</style>
