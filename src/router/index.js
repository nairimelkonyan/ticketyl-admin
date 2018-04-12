import Vue from 'vue'
import Router from 'vue-router'
import ticketyl from '@/components/modules/pages/landing/ticketyl'
import AdminEventSettings from '@/components/modules/pages/event/settings'
import CreateNew from '@/components/modules/pages/create'
import EventSetup from '@/components/modules/pages/event/create'
import AdminEventList from '@/components/modules/pages/event-list'
import LandingVisualEditor from '@/components/modules/pages/event/layout'
import BookingAndSales from '@/components/modules/pages/event/sales'
import TransactionManager from '@/components/modules/pages/order/orders'
import PageSetupEmpty from '@/components/modules/pages/page/create'
import Subscription from '@/components/modules/pages/subscription/create'
import OnBoardingOrganization from '@/components/modules/pages/merchant/onboarding'

import MainSettings from '@/components/modules/pages/merchant/settings/settings'
import ShopPreferences from '@/components/modules/pages/merchant/settings/shops'
import ManageTeam from '@/components/modules/pages/merchant/settings/team'
import Notifications from '@/components/modules/pages/merchant/settings/notifications'
// import NewMember from '@/components/modules/pages/new-member-page/NewMember'
import Cashout from '@/components/modules/pages/merchant/cashout'
import NotificationsPage from '@/components/modules/pages/notifications'
import GiftCard from '@/components/modules/pages/giftcard/create'
import Promotion from '@/components/modules/pages/event/promotion'
import Analytics from '@/components/modules/pages/analytics/analytics'
import Guard from '@/services/Middleware/auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Ticketyl', component: ticketyl, beforeEnter: Guard.guest },
    { path: '/create', name: 'CreateNew', component: CreateNew, beforeEnter: Guard.auth },
    { path: '/create/event', name: 'EventSetup', component: EventSetup, beforeEnter: Guard.auth },
    { path: '/create/page', name: 'SetupEmpty', component: PageSetupEmpty, beforeEnter: Guard.auth },
    { path: '/create/gift-card', name: 'GiftCard', component: GiftCard, beforeEnter: Guard.auth },
    { path: '/create/subscription', name: 'Subscription', component: Subscription, beforeEnter: Guard.auth },
    { path: '/event/layout', name: 'VisualEditor', component: LandingVisualEditor, beforeEnter: Guard.auth },
    { path: '/event/sales', component: BookingAndSales, beforeEnter: Guard.auth },
    { path: '/event/promotion', name: 'Promotion', component: Promotion, beforeEnter: Guard.auth },
    { path: '/event/settings', component: AdminEventSettings, beforeEnter: Guard.auth },
    { path: '/merchant/settings', name: 'MainSettings', component: MainSettings, beforeEnter: Guard.auth },
    { path: '/merchant/shops', name: 'ShopPreferences', component: ShopPreferences, beforeEnter: Guard.auth },
    { path: '/merchant/team', name: 'ManageTeam', component: ManageTeam, beforeEnter: Guard.auth },
    { path: '/merchant/notifications', name: 'Notifications', component: Notifications, beforeEnter: Guard.auth },
    { path: '/merchant/cashout', name: 'Cashout', component: Cashout, beforeEnter: Guard.auth },
    { path: '/merchant/onboarding', name: 'Organization', component: OnBoardingOrganization, beforeEnter: Guard.auth },
    { path: '/events', name: 'EventList', component: AdminEventList, beforeEnter: Guard.auth },
    { path: '/analytics', name: 'Analytics', component: Analytics, beforeEnter: Guard.auth },
    { path: '/transactions', name: 'Transaction', component: TransactionManager, beforeEnter: Guard.auth },
    { path: '/notifications', name: 'NotificationsPage', component: NotificationsPage, beforeEnter: Guard.auth }
    // { path: '/new-member/123/123', component: NewMember, beforeEnter: Guard.auth }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
// reset password /u/resetPassword/:initeid/:invitehas
