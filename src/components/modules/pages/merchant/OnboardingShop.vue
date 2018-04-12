<template lang="pug">
  section
    tk-header-admin
    .content
      .container
        .menu
          .row
            .col-sm-6.text-left
              .menu-content
                .menu-body
                  h5  Step 2 of 3
                  h2 Your Online Shop
                  p Setting the basic preferrences of your shop
            .col-sm-6.text-right
              .menu-content
                .menu-body
                  button(@click='skip').action Skip this step
                  tk-primary-button(name='next step - team', @click='validateBeforeSubmit')
        main
          .shop-identity
            .row
              .col-sm-8.col-sm-offset-2
                .shop-content
                  h4 Shop Identity
                  p Set up the online identity of your shop
                  .row
                    .col-sm-5.col-sm-offset-1
                      p(style='margin-top: 40px;') * Shop name
                    .col-sm-6
                      span.count {{ info.name.length }} / 50
                      tk-input-type-text(name='name', placeholder='name', data-vv-value-path='text', style='margin-bottom: 24px;', maxlength='50', v-model='info.name', v-validate="{ required: true, regex: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$\/}", :has-error="errors.has('name')", data-vv-validate-on="none")
                      p(v-if="errors.has('name')").error Shop name is required
                      button.action.action-main(v-if='!show', @click='shop') I have a shop logo
                      button.action.action-main(v-if='show', @click='shop') I don't have a shop logo
                      transition(name='slide-fade')
                        vue-dropzone(v-if='show' ref="myVueDropzone" id="customdropzone" :options="dropzoneOptions" @vdropzone-files-added='imageAdded' @vdropzone-drop='imageAdded' @vdropzone-removed-file='imageRemoved')
                      .mime-error(v-if='dndError') You can load only .png or .jpg file.
                    // input(type='checkbox', name='logo', id="shop-logo", v-model='info.several_shops')
                        label(for="shop-logo") I will be setting up several shops
                  .row
                    .col-sm-5.col-sm-offset-1
                      p.shop-domain * Shop Domain
                    .col-sm-6
                      .domain-length
                        span {{ info.domain.length }} / 24
                      tk-input-type-text-domain(name='domain', data-vv-value-path='text', style='margin-bottom: 24px;', v-model='info.subdomain', placeholder='my domain name', v-validate="'required|alpha_num'", :has-error="errors.has('domain')", data-vv-validate-on="none")
                      p(v-if="errors.has('domain')").error Shop Domain is required
                      // button(style='margin-bottom: 0;').action.action-main I have my own domain
          .shop-settings
            .row
              .col-sm-8.col-sm-offset-2
                h4 Shop Settings
                p Adjust your shop settings according to what your customers prefferences
                .row
                  .col-sm-5.col-sm-offset-1
                    p.top Shop Default Language
                  .col-sm-6
                    tk-custom-select-string(:options='languages', param="code", style='margin-bottom: 24px;', v-model='info.default_language',
                    :selected_default='default_language')
                    //- tk-modal-shop-languages(:allowed_languages='allowed_languages' v-on:languagesSaved='updateLanguages' style='margin-bottom: 24px;')
                    span.pull-right {{ languages.length }} Selected
                .row
                  .col-sm-5.col-sm-offset-1
                    p.top Shop Default Currency
                  .col-sm-6
                    tk-custom-select-string(:options='currencies', param="code" style='margin-bottom: 24px;', v-model='info.default_currency',
                    :selected_default='default_currency')
                    //- tk-modal-shop-currencies(:allowed_currencies='allowed_currencies' v-on:currenciesSaved='updateCurrencies' style='margin-bottom: 32px;')
                    span.pull-right {{ currencies.length }} Selected
                // p(style='margin-bottom: 36px;') Select all payment methods you need on your shop
                // .row(v-if='merchant_details')
                  .col-sm-5.col-sm-offset-1
                    p Payment Gateways
                  .col-sm-6
                    form
                      template(v-for='details in merchant_details.allowed_gateways')
                        input(type='checkbox', name='allowed_gateways', :id='details.id', :value='details.id', v-model='info.allowed_gateways')
                        label(:for='details.id')
                          img(:src='"static/" + details.translations.logo.en')
                          | {{ details.code }}
                // .calculator
                  h4 Example Event Cauculator
                  p Estimate based on the selected payment gateways
                  .row
                    .col-sm-2
                      tk-input-type-text(placeholder='100', style='margin-bottom: 8px;', v-on:keypress="isNumber")
                    .col-sm-5
                      p(style='margin-top: 12px; font-size: 18px;') tickets sold at average price of
                    .col-sm-2
                      tk-input-type-text-admin-currency(placeholder='50.00', style='margin-bottom: 8px;', v-on:keypress="isNumber")
                    .col-sm-3
                      p(style='margin-top: 12px; font-size: 18px;') results in a 
                  p.height(style='margin-bottom: 0px;') bruto event income of 
                    strong 5000$. 
                    | Of this amount the payment gateway fees average out to 
                    strong 94$*
                    | , Ticketyl fees are 
                    strong 100$ 
                    | (total fees - 
                    strong 3.8%
                    | ) which means your actual earnings are 
                    strong 4305$.
                //.row
                  .col-sm-11.col-sm-offset-1
                    p(style='font-size: 12px;') * We assume that all payment gateways will process an equal amount income
    tk-footer-admin-white(:active='2', name='next step - team', @click='validateBeforeSubmit')
</template>

<script>
  import * as mutationTypes from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.css'

  export default {
    data () {
      return {
        info: {
          name: '',
          logo: '',
          several_shops: '',
          subdomain: '',
          domain: 'ticketyl.com',
          default_language: 'en',
          default_currency: 'eur',
          allowed_gateways: [],
          allowed_languages: [],
          allowed_currencies: []
        },
        show: false,
        dndError: false,
        currencies: [],
        languages: [],
        dropzoneOptions: {
          thumbnailWidth: 150,
          url: 'null',
          autoProcessQueue: false,
          acceptedFiles: '.png,.jpg',
          addRemoveLinks: true,
          dictDefaultMessage: `<div class="logo-body" style="position: relative;top: 35px;">
            <img src="/static/doc_types.svg" class="doc-types">
            <h4>Drag And Drop</h4>
            <p><strong>Shop logo </strong>min 170x50 px</p>
            <button style="transition: 0.3s;background-color: #9a9a9a;text-transform: uppercase;font-size: 18px;color: #fff;min-height: 48px;padding: 10px 16px;border-radius: 0;border: none;outline: none !important;margin-top:10px;">drag and drop</button></div>`,
          previewTemplate: `<div class="dz-preview dz-file-preview">
            <div class="dz-details" style="opacity: 1 !important;height: 0;width: 0;padding: 0;background-color:transparent">
              <div class="image-container">
                <img data-dz-thumbnail style="width: 237px;" />
              </div>
            </div>
          </div>`
        }
      }
    },
    components: {
      vueDropzone: vue2Dropzone
    },
    methods: {
      imageAdded (e) {
        console.log('imageAdded')
        if (this.$refs.myVueDropzone.getRejectedFiles().length) {
          this.$refs.myVueDropzone.removeAllFiles()
          this.dndError = true
        } else {
          this.dndError = false
          this.$refs.myVueDropzone.disable()
          const files = this.$refs.myVueDropzone.getAcceptedFiles()
          const reader = new FileReader()
          if (files.length) {
            console.log(files[0].type)
            reader.readAsDataURL(files[0])
            reader.onload = e => {
              this.info.logo = e.target.result
            }
          }
        }
      },
      imageRemoved (file, error, xhr) {
        this.info.logo = ''
        this.$refs.myVueDropzone.enable()
      },
      isNumber (e) {
        var iKeyCode = (e.which) ? e.which : e.keyCode
        if (iKeyCode !== 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)) {
          e.preventDefault()
          return false
        } else {
          this.customGiftCard.name = 'Custom Gift Card'
          this.customGiftCard.amount = 1
          this.customGiftCard.code = 'eur'
          return true
        }
      },
      validateBeforeSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$store.commit(mutationTypes.ADD_SHOP, {
              configuration: {
                logo: this.info.logo,
                subdomain: this.info.subdomain,
                domain: 'ticketyl.com',
                default_language: this.info.default_language,
                default_currency: this.info.default_currency
              },
              translations: { name: { en: this.info.name } },
              allowed_gateways: this.info.allowed_gateways,
              allowed_languages: this.info.allowed_languages,
              allowed_currencies: this.info.allowed_currencies
            })
            this.$router.push({name: 'Team'})
            return
          }
        })
      },
      skip () {
        this.$router.push({name: 'Team'})
      },
      shop () {
        if (this.show === false) {
          this.show = true
        } else {
          this.show = false
        }
      },
      updateCurrencies (c) {
        this.currencies = [...c.list]
        this.info.default_currency = c.default_currency
      },
      updateLanguages (l) {
        this.languages = [...l.list]
        this.info.default_language = l.default_language
      }
    },
    mounted () {
      this.currencies = this.merchant.allowed_currencies
      this.languages = this.merchant.allowed_languages
    },
    computed: {
      ...mapGetters({
        merchant: 'merchant',
        token: 'logInAdminToken'
      }),
      default_language () {
        return this.info.default_language
      },
      default_currency () {
        return this.info.default_currency
      }
    }
  }
</script>

<style lang="less">
  #customdropzone {
    padding: 0;
    margin-bottom: 20px;
    .dz-preview .dz-remove {
      transition: 0.3s;
      background-color: #292929;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 14px;
      color: #fff;
      min-height: 39px;
      padding: 10px 16px;
      width: 150px;
      border-radius: 0;
      border: none;
      outline: none !important;
      top: 130px;
      left: 65px;
      position: relative;
      &:hover {
        background-color: #424242;
        text-decoration: none;
      }
    }
  }

  .image-container {
    height: 315px;
    width: 320px;
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .mime-error {
    color: #000;
    font-size: 13px;
    position: relative;
    top: -55px;
    text-align: center;
    font-weight: 700;
  }
</style>

<style lang="less" scoped>

.dz-remove {
  margin-left: 105px;
  padding: 10px;
  top: 110px;
  bottom: 15px;
  height: 45px;
}

#customdropzone {
  border: 4px dotted #f7f7f7;
  color: #9a9a9a;
  height: 356px;
  width: 100%;
  &:hover {
    background-color: rgba(255, 255, 255, .7)
  }
}

.shop-domain{
  margin-top: 40px;
}
.domain-length{
  font-size: 12px;
  text-align: right;
  margin-bottom: 8px;
}
.top{
  margin-top: 14px;
}
.count{
  font-size: 12px;
  margin-bottom: 8px;
  float: right;
}
.shop-content{
  padding-bottom: 41px;
  margin-bottom: 27px;
  border-bottom: 1px solid #979797;
}
.logo-content{
  margin-bottom: 37px;
}
.action-main{
  margin-bottom: 16px;
}
h4{
  margin-top: 0;
  +p{
    margin-bottom: 20px;
  }
}
.height{
  font-size: 18px;
  line-height: 40px;
}
.content{
  padding-bottom: 120px;
}
form{
  margin-bottom: 40px;
}
.calculator{
  padding: 24px 32px;
  border: 1px solid #979797;
  margin-bottom: 27px;
  h4{
    margin: 0 0 18px 0;
    +p{
      margin-bottom: 24px;
    }
  }
}
form{
  .doc-types{
    height: 56px;
    width: auto;
    margin-bottom: 24px;
  }
  img{
    height: 22px;
    width: 22px;
    margin-right: 8px;
  }
}
.logo-content{
  padding: 4px;
  text-align: center;
  color: #9a9a9a;
  background-color: #fff;
  display: table;
  height: 356px;
  width: 100%;
  .logo-body{
    border: 4px dotted #f7f7f7;
    display: table-cell;
    vertical-align: middle;
  }
}
button{
  outline: 0;
}
.action{
  padding: 0;
  border: none;
  text-transform: uppercase;
  text-decoration: underline;
  background-color: transparent;
}
.menu{
    margin-bottom: 20px;
    border-bottom: 1px solid #979797;
  .menu-content{
      display: table;
      height: 150px;
      width: 100%;
    .menu-body{
      display: table-cell;
      vertical-align: middle;
      h5{
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
      }
      h2{
        margin: 0 0 16px 0;
      }
      p{
        font-weight: bold;
        margin: 0;
      }
      button{
        margin-left: 48px;
        &:first-child{
          margin: 0;
        }
      }
    }
  }              
}
.error{
  font-size: 12px;
  margin-top: -24px !important;
  font-weight: bold;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>
