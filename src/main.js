// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
/* admin */

import loadableModal from '@/components/modules/ui/modal/modal'
Vue.component('tk-loadable-modal', loadableModal)

import settingsBillingAddress from '@/components/modules/pages/merchant/components/billing-address'
Vue.component('tk-settings-billing-address', settingsBillingAddress)
import settingsChangePassword from '@/components/modules/pages/merchant/components/change-password'
Vue.component('tk-settings-change-password', settingsChangePassword)
import settingscreateShop from '@/components/modules/pages/merchant/components/create-shop'
Vue.component('tk-settings-create-shop', settingscreateShop)
import settingsDeleteAccount from '@/components/modules/pages/merchant/components/delete-account'
Vue.component('tk-settings-delete-account', settingsDeleteAccount)
import settingsEmailNotifications from '@/components/modules/pages/merchant/components/email-notification-settings'
Vue.component('tk-settings-email-notifications', settingsEmailNotifications)
import settingsGiftcardSettings from '@/components/modules/pages/merchant/components/giftcard-settings'
Vue.component('tk-settings-giftcard-settings', settingsGiftcardSettings)
import settingsLandingSettings from '@/components/modules/pages/merchant/components/landing-settings'
Vue.component('tk-settings-landing-settings', settingsLandingSettings)
import settingsNewsletterSubscription from '@/components/modules/pages/merchant/components/newsletter-subscription'
Vue.component('tk-settings-newsletter-subscription', settingsNewsletterSubscription)
import settingsPersonalInfo from '@/components/modules/pages/merchant/components/personal-info'
Vue.component('tk-settings-personal-info', settingsPersonalInfo)
import settingsShopGateways from '@/components/modules/pages/merchant/components/shop-gateways'
Vue.component('tk-settings-shop-gateways', settingsShopGateways)
import settingsShopSettings from '@/components/modules/pages/merchant/components/shop-settings'
Vue.component('tk-settings-shop-settings', settingsShopSettings)
import settingsTeamSettings from '@/components/modules/pages/merchant/components/team-settings'
Vue.component('tk-settings-team-settings', settingsTeamSettings)
import settingsWebsiteNotifications from '@/components/modules/pages/merchant/components/website-notification-settings'
Vue.component('tk-settings-website-notifications', settingsWebsiteNotifications)

/* seatsio */
import SeatsIODesigner from '@/components/modules/modules/event/seatsio/SeatsIO'
Vue.component('tk-seats-io-designer', SeatsIODesigner)

/* translatable inputs */
import InputTranslation from '@/components/modules/ui/input/translation'
import InputTime from '@/components/modules/ui/input/time'
import InputPrice from '@/components/modules/ui/input/price'
Vue.component('tk-input-translation', InputTranslation)
Vue.component('tk-input-time', InputTime)
Vue.component('tk-input-price', InputPrice)
import TextareaTranslation from '@/components/modules/ui/textarea/translation'
Vue.component('tk-textarea-translation', TextareaTranslation)

/* event setup modules */
import SubeventManager from '@/components/modules/pages/event-edit/SubeventManager'
import DatesManager from '@/components/modules/pages/event-edit/DatesManager'
import SeatingManager from '@/components/modules/pages/event-edit/SeatingManager'
import LocationManager from '@/components/modules/pages/event-edit/LocationManager'
import ActMultiedit from '@/components/modules/pages/event-edit/ActMultiedit'
Vue.component('tk-subevent-manager', SubeventManager)
Vue.component('tk-dates-manager', DatesManager)
Vue.component('tk-seating-manager', SeatingManager)
Vue.component('tk-location-manager', LocationManager)
Vue.component('tk-act-multiedit', ActMultiedit)

/* layout builder components */
Vue.component('tk-layout-builder', LayoutBuilder)
import LayoutBuilder from '@/components/modules/modules/event/layout-builder/index'
import AsideVisual from '@/components/modules/modules/event/layout-builder/AsideVisual'
Vue.component('tk-aside-visual', AsideVisual)
import AsideVisualTickets from '@/components/modules/modules/event/layout-builder/AsideVisualTickets'
Vue.component('tk-aside-visual-tickets', AsideVisualTickets)
import AsideVisualLogo from '@/components/modules/modules/event/layout-builder/AsideVisualLogo'
Vue.component('tk-aside-visual-logo', AsideVisualLogo)
import VisualEditorTitle from '@/components/modules/modules/event/layout-builder/VisualEditorTitle'
Vue.component('tk-visual-editor-title', VisualEditorTitle)
import VisualEditorAboutEventLanding from '@/components/modules/modules/event/layout-builder/VisualEditorAboutEventLanding'
Vue.component('tk-visual-editor-about-event-landing', VisualEditorAboutEventLanding)
import MapVisual from '@/components/modules/modules/event/layout-builder/MapVisual'
Vue.component('tk-map-visual', MapVisual)
import VisualEditorCarousel from '@/components/modules/modules/event/layout-builder/VisualEditorCarousel'
Vue.component('tk-visual-editor-carousel', VisualEditorCarousel)
import VisualEditorfaq from '@/components/modules/modules/event/layout-builder/VisualEditorfaq'
Vue.component('tk-visual-editor-faq', VisualEditorfaq)
import VisualEditorSocial from '@/components/modules/modules/event/layout-builder/VisualEditorSocial'
Vue.component('tk-visual-editor-social', VisualEditorSocial)
import VisualEditorNewsletter from '@/components/modules/modules/event/layout-builder/VisualEditorNewsletter'
Vue.component('tk-visual-editor-newsletter', VisualEditorNewsletter)
import VisualEditorAsideGiftCard from '@/components/modules/modules/event/layout-builder/VisualEditorAsideGiftCard'
Vue.component('tk-visual-editor-aside-gift-card', VisualEditorAsideGiftCard)
import VisualEditorAsideGiftCardContent from '@/components/modules/modules/event/layout-builder/VisualEditorAsideGiftCardContent'
Vue.component('tk-visual-editor-aside-gift-card-content', VisualEditorAsideGiftCardContent)
import VisualEditorGiftCardContent from '@/components/modules/modules/event/layout-builder/VisualEditorGiftCardContent'
Vue.component('tk-visual-editor-gift-card-content', VisualEditorGiftCardContent)
import VisualEditorMainGiftCard from '@/components/modules/modules/event/layout-builder/VisualEditorMainGiftCard'
Vue.component('tk-visual-editor-gift-card', VisualEditorMainGiftCard)
import VisualEditorMap from '@/components/modules/modules/event/layout-builder/VisualEditorMap'
Vue.component('tk-visual-editor-map', VisualEditorMap)
import VisualEditorLargeImage from '@/components/modules/modules/event/layout-builder/VisualEditorLargeImage'
Vue.component('tk-visual-editor-large-image', VisualEditorLargeImage)
import VisualEditorVideo from '@/components/modules/modules/event/layout-builder/VisualEditorVideo'
Vue.component('tk-visual-editor-video', VisualEditorVideo)
import VisualEditorPerformer from '@/components/modules/modules/event/layout-builder/VisualEditorPerformer'
Vue.component('tk-visual-editor-performer', VisualEditorPerformer)
import VisualEditorSmallCarousel from '@/components/modules/modules/event/layout-builder/VisualEditorSmallCarousel'
Vue.component('tk-visual-editor-small-carousel', VisualEditorSmallCarousel)
import VisualEditorAboutEvent from '@/components/modules/modules/event/layout-builder/VisualEditorAboutEvent'
Vue.component('tk-visual-editor-about-event', VisualEditorAboutEvent)
import VisualEditorAboutEventAside from '@/components/modules/modules/event/layout-builder/VisualEditorAboutEventAside'
Vue.component('tk-visual-editor-about-event-aside', VisualEditorAboutEventAside)
import VisualEditorMainEventInfo from '@/components/modules/modules/event/layout-builder/VisualEditorMainEventInfo'
Vue.component('tk-visual-editor-event-info', VisualEditorMainEventInfo)

import PriceModifications from '@/components/modal/PriceModifications'
Vue.component('tk-price-modifications', PriceModifications)
import PriceGroup from '@/components/modal/PriceGroup'
Vue.component('tk-price-group-modal', PriceGroup)
import PriceSpecial from '@/components/modal/PriceSpecial'
Vue.component('tk-price-special-modal', PriceSpecial)
import AddFaq from '@/components/modal/AddFaq'
Vue.component('tk-add-faq', AddFaq)
import TicketylSignUp from '@/components/modal/TicketylSignUp'
Vue.component('tk-modal-sign-up', TicketylSignUp)
import TicketylLogIn from '@/components/modal/TicketylLogIn'
Vue.component('tk-modal-log-in', TicketylLogIn)
import ShopLanguages from '@/components/modal/ShopLanguages'
Vue.component('tk-modal-shop-languages', ShopLanguages)
import ShopCurrencies from '@/components/modal/ShopCurrencies'
Vue.component('tk-modal-shop-currencies', ShopCurrencies)
import TicketSettings from '@/components/modal/TicketSettings'
Vue.component('tk-modal-ticket-settings', TicketSettings)
import PublishEvent from '@/components/modules/modals/publish-event'
Vue.component('tk-publish-event', PublishEvent)

import GatewayChoice from '@/components/modules/modules/shop/gateway-choice'
import FacilitatedGateways from '@/components/modules/modules/shop/facilitated-gateways'
import StripeSetup from '@/components/modules/modules/shop/stripe-setup'
import CommissionChoice from '@/components/modules/modules/shop/commission-choice'
import EventDetails from '@/components/modules/modules/event/details'

Vue.component('tk-shop-gateway-choice', GatewayChoice)
Vue.component('tk-shop-facilitated-gateways', FacilitatedGateways)
Vue.component('tk-shop-stripe-setup', StripeSetup)
Vue.component('tk-event-details', EventDetails)
Vue.component('tk-shop-commission-choice', CommissionChoice)

import Subscription from '@/components/modal/Subscription'
Vue.component('tk-modal-subscription', Subscription)
import Social from '@/components/modal/Social'
Vue.component('tk-modal-social', Social)
import Video from '@/components/modal/Video'
Vue.component('tk-modal-video', Video)
import PerformerCreate from '@/components/modal/PerformerCreate'
Vue.component('tk-modal-performer', PerformerCreate)
import ErrorMessage from '@/components/modal/ErrorMessage'
Vue.component('tk-error-message', ErrorMessage)
import CancelEvent from '@/components/modal/CancelEvent'
Vue.component('tk-cancel-event', CancelEvent)
import DuplicateDay from '@/components/modal/DuplicateDay'
Vue.component('tk-duplicate-day', DuplicateDay)

import TablePriceModifications from '@/components/table/TablePriceModifications'
Vue.component('tk-table-price-modifications', TablePriceModifications)
import TableScheduled from '@/components/table/TableScheduled'
Vue.component('tk-table-scheduled', TableScheduled)
import TableHistory from '@/components/table/TableHistory'
Vue.component('tk-table-history', TableHistory)
import TableSubscription from '@/components/table/TableSubscription'
Vue.component('tk-table-subscription', TableSubscription)
import TableGiftCard from '@/components/table/TableGiftCard'
Vue.component('tk-table-gift-card', TableGiftCard)
import Calendar from '@/components/single-event-page/Calendar'
Vue.component('tk-calendar', Calendar)
import CalendarInterface from '@/components/misc/Calendar/index'
Vue.component('tk-calendar-interface', CalendarInterface)
import TimePicker from '@/components/misc/TimePicker'
Vue.component('tk-timepicker', TimePicker)
import ShopButton from '@/components/misc/ShopButton'
Vue.component('tk-shop-button', ShopButton)
import TableTransactionManager from '@/components/table/TableTransactionManager'
Vue.component('tk-table-transaction-manager', TableTransactionManager)
import StaticSearch from '@/components/misc/StaticSearch'
Vue.component('tk-static-search', StaticSearch)

import ToolsVisualEditorLanding from '@/components/misc/ToolsVisualEditorLanding'
Vue.component('tk-tools-visual-editor-landing', ToolsVisualEditorLanding)
import ToolsVisualEditorAside from '@/components/misc/ToolsVisualEditorAside'
Vue.component('tk-tools-visual-editor-aside', ToolsVisualEditorAside)

import TicketSettingsModal from '@/components/modal/TicketSettingsModal'
Vue.component('tk-ticket-seatings-modal', TicketSettingsModal)
import TableExtraTickets from '@/components/table/TableExtraTickets'
Vue.component('tk-table-extra-tickets', TableExtraTickets)
import TableTicketSeatings from '@/components/table/TableTicketSeatings'
Vue.component('tk-table-ticket-seatings', TableTicketSeatings)
import TableTicketAndSales from '@/components/table/TableTicketAndSales'
Vue.component('tk-table-ticket-and-sales', TableTicketAndSales)
import TableEventOverview from '@/components/table/TableEventOverview'
Vue.component('tk-table-event-overview', TableEventOverview)
import SearchAdmin from '@/components/misc/SearchAdmin'
Vue.component('tk-search-admin', SearchAdmin)
import ToolsVisualEditorMain from '@/components/misc/ToolsVisualEditorMain'
Vue.component('tk-tools-visual-editor-main', ToolsVisualEditorMain)
import Tools from '@/components/misc/Tools'
Vue.component('tk-tools', Tools)
import ToolsSettings from '@/components/misc/ToolsSettings'
Vue.component('tk-tools-settings', ToolsSettings)
import ToolsSecond from '@/components/misc/ToolsSecond'
Vue.component('tk-tools-second', ToolsSecond)
import ToolsSimple from '@/components/misc/ToolsSimple'
Vue.component('tk-tools-simple', ToolsSimple)
import TicketylLang from '@/components/misc/TicketylLang'
Vue.component('tk-ticketyl-lang', TicketylLang)
import FooterTicketyl from '@/components/footer/FooterTicketyl'
Vue.component('tk-footer-ticketyl', FooterTicketyl)
import HeaderAdmin from '@/components/header/HeaderAdmin'
Vue.component('tk-header-admin', HeaderAdmin)
import HeaderTicketyl from '@/components/header/HeaderTicketyl'
Vue.component('tk-header-ticketyl', HeaderTicketyl)
import ShopSwitch from '@/components/misc/ShopSwitch'
Vue.component('tk-shop-switch', ShopSwitch)
import AccountPrice from '@/components/misc/AccountPrice'
Vue.component('tk-account-price', AccountPrice)
import Notifications from '@/components/misc/Notifications'
Vue.component('tk-notifications', Notifications)
import AdminUser from '@/components/misc/AdminUser'
Vue.component('tk-admin-user', AdminUser)
import FooterAdminWhite from '@/components/footer/FooterAdminWhite'
Vue.component('tk-footer-admin-white', FooterAdminWhite)
import FooterAdmin from '@/components/footer/FooterAdmin'
Vue.component('tk-footer-admin', FooterAdmin)
import AdminEventSettings from '@/components/event-settings-page/AdminEventSettings'
Vue.component('tk-event-settings', AdminEventSettings)
import EventSettingsMenu from '@/components/event-settings-page/EventSettingsMenu'
Vue.component('tk-event-settings-menu', EventSettingsMenu)
import EventList from '@/components/modules/pages/event-list'
Vue.component('tk-eventlist', EventList)
import CashoutMethod from '@/components/misc/CashoutMethod'
Vue.component('tk-cashout-method', CashoutMethod)
import TableCashout from '@/components/table/TableCashout'
Vue.component('tk-table-cashout', TableCashout)
import TableAnalyticsEvent from '@/components/table/TableAnalyticsEvent'
Vue.component('tk-table-analytics-event', TableAnalyticsEvent)
import TableAnalyticsLoad from '@/components/table/TableAnalyticsLoad'
Vue.component('tk-table-analytics-load', TableAnalyticsLoad)

/* shop misc */
import Cookies from '@/components/misc/Cookies'
Vue.component('tk-cookies', Cookies)
import map from '@/components/single-event-page/map'
Vue.component('tk-map', map)
import Timer from '@/components/misc/Timer'
Vue.component('tk-timer', Timer)
import Select from '@/components/misc/Select'
Vue.component('tk-select', Select)
import CustomSelect from '@/components/misc/CustomSelect'
Vue.component('tk-custom-select', CustomSelect)
import CustomSelectEmpty from '@/components/misc/CustomSelectEmpty'
Vue.component('tk-custom-select-empty', CustomSelectEmpty)
import CustomSelectUni from '@/components/misc/CustomSelectUni'
Vue.component('tk-custom-select-uni', CustomSelectUni)
import CustomSelectString from '@/components/misc/CustomSelectString'
Vue.component('tk-custom-select-string', CustomSelectString)
import PrimaryButton from '@/components/misc/PrimaryButton'
Vue.component('tk-primary-button', PrimaryButton)
import SecondaryButton from '@/components/misc/SecondaryButton'
Vue.component('tk-secondary-button', SecondaryButton)
import DisabledButton from '@/components/misc/DisabledButton'
Vue.component('tk-disabled-button', DisabledButton)
import DisabledButtonToolTip from '@/components/misc/DisabledButtonToolTip'
Vue.component('tk-disabled-button-tool-tip', DisabledButtonToolTip)
import Send from '@/components/misc/Send'
Vue.component('tk-send', Send)
import DiscountInput from '@/components/single-event-page/DiscountInput'
Vue.component('tk-discount-input', DiscountInput)
import DiscountInputTickets from '@/components/single-event-page/DiscountInputTickets'
Vue.component('tk-discount-input-tickets', DiscountInputTickets)
import InputTypeText from '@/components/misc/InputTypeText'
Vue.component('tk-input-type-text', InputTypeText)
import InputTypeTextPassword from '@/components/misc/InputTypeTextPassword'
Vue.component('tk-input-type-text-password', InputTypeTextPassword)
import InputTypeTextDomain from '@/components/misc/InputTypeTextDomain'
Vue.component('tk-input-type-text-domain', InputTypeTextDomain)
import InputTypeTextAdminCurrency from '@/components/misc/InputTypeTextAdminCurrency'
Vue.component('tk-input-type-text-admin-currency', InputTypeTextAdminCurrency)
import InputTypeTextCurrency from '@/components/misc/InputTypeTextCurrency'
Vue.component('tk-input-type-text-currency', InputTypeTextCurrency)
import InputTypeTextPhone from '@/components/misc/InputTypeTextPhone'
Vue.component('tk-input-type-text-phone', InputTypeTextPhone)
import InputTypeTextForgot from '@/components/misc/InputTypeTextForgot'
Vue.component('tk-input-type-text-forgot', InputTypeTextForgot)
import TextArea from '@/components/misc/TextArea'
Vue.component('tk-text-area', TextArea)
import Warning from '@/components/misc/Warning'
Vue.component('tk-warning', Warning)
import WarningCheckbox from '@/components/misc/WarningCheckbox'
Vue.component('tk-warning-checkbox', WarningCheckbox)
import Spinner from '@/components/misc/Spinner'
Vue.component('tk-spinner', Spinner)

import Table from '@/components/misc/Table'
Vue.component('tk-table', Table)

import Tablexs from '@/components/misc/Tablexs'
Vue.component('tk-table-xs', Tablexs)

Vue.filter('tkprice', function (price) {
  if (price) {
    return (price.amount / 100).toFixed(2).toString() + ' ' + price.currency.translations.symbol.en
  }
  return null
})
Vue.filter('tktranslate', function (object, lang, fallback) {
  if (!object) { return 'column.404' }
  if (object[lang]) { return object[lang] }
  if (object[fallback]) { return object[fallback] }
  return 'translation.404'
})
Vue.filter('tktime', {
  parse: function (time) {
    if (!time) { return '' }
    var result = ''
    time = time.replace(':', '')
    for (var i in time.split('')) {
      var num = parseInt(time.split('')[i])
      if (!isNaN(num)) {
        result += num.toString()
        if (parseInt(i) === 1) { result += ':' }
      }
      if (parseInt(i) > 2) { break }
    }
    return result
  },
  read: function (value) {
    return this.parse(value)
  },
  write: function (value) {
    return this.parse(value)
  }
})

import jQuery from 'jquery'
import VueNumeric from 'vue-numeric'
import Vue2Filters from 'vue2-filters'
import { directive as onClickOutside } from 'vue-on-click-outside'
import store from './store'
import VeeValidate from 'vee-validate'
// load vuex i18n module
import vuexI18n from 'vuex-i18n'
import Scrollspy from 'vue2-scrollspy'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCILt4m-5ujba6NgTJM03899OmkRFV3NT0',
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})
Vue.use(Scrollspy)
Vue.use(VeeValidate)

global.jQuery = jQuery
require('bootstrap')
require('bootstrap/dist/css/bootstrap.min.css')
require('./assets/css/style.less')
require('swiper/dist/css/swiper.css')

Vue.use(VueAwesomeSwiper)
Vue.use(Vuex)
Vue.use(Vue2Filters)
Vue.directive('on-click-outside', onClickOutside)
Vue.use(VueNumeric)

Vue.config.productionTip = false

Vue.use(vuexI18n.plugin, store)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
