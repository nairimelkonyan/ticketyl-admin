<template lang="pug">
  aside
    tk-logo(:logo='logo')
    tk-tickets(:translations="translations", :prices='prices')
    template(v-for="c in content")
      component(:is='c.code', :data='c', :translations="translations")
</template>

<script>
import { mapGetters } from 'vuex'
import Social from '@/components/single-event-page/Social'
import GiftCard from '@/components/single-event-page/GiftCard'
import Subscribe from '@/components/single-event-page/Subscribe'
import Imprint from '@/components/single-event-page/Imprint'
import Faq from '@/components/single-event-page/Faq'
import Aside from '@/components/single-event-page/Aside'
import About from '@/components/single-event-page/About'
import Total from '@/components/single-event-page/Total'
import Asidexs from '@/components/single-event-page/Asidexs'
import Logo from '@/components/single-event-page/Logo'
import Tickets from '@/components/single-event-page/Tickets'

export default {
  props: [ 'translations', 'logo', 'content', 'prices' ],
  computed: {
    ...mapGetters({
      lang: 'selectedLanguage'
    })
  },
  components: {
    tkAside: Aside,
    tkSocialBox: Social,
    tkNewsletterBox: Subscribe,
    tkEventOrganizer: Imprint,
    tkEventFaq: Faq,
    tkTotal: Total,
    tkAsideXs: Asidexs,
    tkAbout: About,
    tkLogo: Logo,
    tkTickets: Tickets,
    tkGiftCard: GiftCard
  }
}
</script>

<style lang="less" scoped>
aside{
  margin-top: -349px;
  z-index: 1;
}
@media(min-width:0px) and (max-width:767px){
  aside{
    display: none;
  }
}
</style>