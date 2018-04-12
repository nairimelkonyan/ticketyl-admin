<template lang="pug">
  section.main-event
    .loading-screen(v-if='this.$route.name !== "Event" || !serie')
      .container
        .loading
          .spinner
            .rect1
            .rect2
            .rect3
            .rect4
            .rect5
    .section-body(v-if='serie')
      tk-carousel(v-if='serie.layout', :banner='serie.layout.event_cover', :dates='serie.acts_date_range')
      .container(v-if='serie')
        .row
          .col-sm-8
            tk-info(:translations='translations', :prices_xs='serie.acts_price_range', :event_info='serie.layout.event_info', :content='serie.layout.sidebar_content', :logo='serie.layout.sidebar_head[0]', :title='serie')
            template(v-for="c in serie.layout.event_content")
              component(:is='c.code', :translations='translations', :content='serie.layout.sidebar_content', :main_content='c')
          .col-sm-4
            tk-aside(:translations='translations', :logo='serie.layout.sidebar_head[0]', :content='serie.layout.sidebar_content', :prices='serie.acts_price_range')
</template>

<script>
import api from '@/services/TicketylOS/TicketylOS'
import { mapGetters } from 'vuex'
import SmallCarousel from '@/components/single-event-page/smallCarouselSlide'
import Carousel from '@/components/single-event-page/Carousel'
import About from '@/components/single-event-page/About'
import Aside from '@/components/single-event-page/Aside'
import Poster from '@/components/single-event-page/Artist'
import Video from '@/components/single-event-page/Video'
import Gift from '@/components/single-event-page/LookingForGiftCard'
import map from '@/components/single-event-page/map'
import EventInfo from '@/components/single-event-page/EventInfo'
import * as types from '@/store/mutation-types'

export default {
  props: ['translations', 'layout'],
  computed: {
    ...mapGetters({
      languages: 'languages',
      lang: 'selectedLanguage',
      defaultLang: 'defaultLanguage',
      serie: 'serie'
    })
  },
  created () {
    api.shop().serie(this.$route.params.id).then((model) => {
      this.$store.commit(types.SET_SERIE, model)
      api.shop().packages(model.id).then((models) => {
        this.$store.commit(types.SET_PACKAGES, models)
      })
    })
  },
  components: {
    tkSmallCarousel: SmallCarousel,
    tkCarousel: Carousel,
    tkAbout: About,
    tkFigureList: Poster,
    tkYoutubeEmbed: Video,
    tkGift: Gift,
    tkGoogleMap: map,
    tkAside: Aside,
    tkInfo: EventInfo
  }
}
</script>

<style lang="less" scoped>
  .main-event{
    margin-bottom: 80px;
  }
  .loading{
      position: relative;
      background-color: #f7f7f7;
      height: 80vh;
      width: 100%;
      margin: auto;
      .spinner{
        position: absolute;
        top: 15%;
        display: table-cell;
        vertical-align: middle;
      }
      img{
        height: 32px;
        position: absolute;
        bottom: 40px;
        left: 0;
      }
    }
    .spinner {
      position: relative;
      margin: 100px auto;
      width: 100%;
      height: 80px;
      text-align: center;
      font-size: 10px;
      img{
        height: 40px;
        position: absolute;
        left: 40px;
        bottom: 40px;
      }
    }
  .spinner > div {
    background-color: #444;
    height: 100%;
    width: 8px;
    margin-right: 4px;
    display: inline-block;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }
  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
  @-webkit-keyframes sk-stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
    20% { -webkit-transform: scaleY(1.0) }
  }
  @keyframes sk-stretchdelay {
    0%, 40%, 100% { 
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }  20% { 
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }
  @media(min-width:0px) and (max-width:767px){
    .main-event{
      margin-bottom: 0;
    }
  }
</style>
