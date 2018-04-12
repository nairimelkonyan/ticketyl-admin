<template lang="pug">
  swiper(:options="swiperOption")
    swiper-slide(v-for='d in banner', v-bind:key="d.id", )
      .carousel-image(:style="{ 'background-image': 'url(/static/' + d.custom_fields.image_url + ')' }")
        .date-container
          .container
            .date
              span(:class="'start_dates' + _uid") {{ dates.start.date | formatDate }}
              span(:class="'start_months' + _uid") {{ dates.start.date | formatMonth }}
              span(:class="'dividers' + _uid") -
              span(:class="'end_dates' + _uid") {{ dates.end.date | formatDate }}
              span(:class="'end_months' + _uid") {{ dates.end.date | formatMonth }}
    div.swiper-pagination(slot="pagination")
</template>

<script>
  import moment from 'moment'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    props: [ 'banner', 'dates' ],
    components: {
      swiper,
      swiperSlide
    },
    filters: {
      formatDate: function (value) {
        return moment(value).format('DD')
      },
      formatMonth: function (value) {
        return moment(value).format('MMM')
      }
    },
    mounted () {
      const mq = window.matchMedia('(max-width: 767px)')
      // const desktop = window.matchMedia('(min-width: 768px)')
      if (mq.matches) {
        window.jQuery('.start_dates' + this._uid).addClass('start_date_mob')
        window.jQuery('.start_months' + this._uid).addClass('start_month_mob')
        window.jQuery('.dividers' + this._uid).addClass('divider_mob')
        window.jQuery('.end_dates' + this._uid).addClass('end_date_mob')
        window.jQuery('.end_months' + this._uid).addClass('end_month_mob')
      } else {
        window.jQuery('.start_dates' + this._uid).removeClass('start_date_mob')
        window.jQuery('.start_dates' + this._uid).addClass('start_date')
        window.jQuery('.start_months' + this._uid).removeClass('start_month_mob')
        window.jQuery('.start_months' + this._uid).addClass('start_month')
        window.jQuery('.dividers' + this._uid).removeClass('divider_mob')
        window.jQuery('.dividers' + this._uid).addClass('divider')
        window.jQuery('.end_dates' + this._uid).removeClass('end_date_mob')
        window.jQuery('.end_dates' + this._uid).addClass('end_date')
        window.jQuery('.end_months' + this._uid).removeClass('end_month_mob')
        window.jQuery('.end_months' + this._uid).addClass('end_month')
      }
    },
    data () {
      return {
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 30,
          autoplay: 8000,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.date-container{
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  .date{
    position: relative;
    width: 180px !important;
    height: 85px !important;
    .start_date{
      top: 0;
      left: 0;
      position: absolute;
      color: #fff;
      font-size: 48px !important;
      font-weight: bold;
    }
    .start_month{
      position: absolute;
      bottom: 0;
      left: 0;
      color: #fff;
      font-size: 24px !important;
      font-weight: normal;
      text-transform: uppercase;
      font-weight: bold;
    }
    .divider{
      position: absolute;
      top: 15%;
      left: 45%;
      color: #fff;
      font-size: 48px !important;
      font-weight: normal;
    }
    .end_date{
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      font-size: 48px !important;
      font-weight: bold;
    }
    .end_month{
      position: absolute;
      bottom: 0;
      right: 0;
      color: #fff;
      font-size: 24px !important;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
}
.carousel-image{
  cursor: pointer;
  height: 448px;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.swiper-container{
  height: 448px;
  z-index: 0;
  margin-bottom: 49px;
}
.swiper-pagination{
  bottom: 32px;
  span{
    background-color: #fff !important;
  }
}
.swiper-pagination-bullet{
  background-color: #fff !important;
  opacity: 1 !important;
}
.swiper-pagination-bullet-active{
  background: #292929 !important;
}
.start_date_mob{
  font-size: 32px;
}
.start_month_mob{
  font-size: 20px;
}
.divider_mob{
  font-size: 32px;
  left: 45%;
}
.end_date_mob{
  font-size: 32px;
}
.end_month_mob{
  font-size: 20px;
}
/* Media Queries */
/* Extra Small */
@media(min-width:0px) and (max-width:767px){
  .swiper-pagination{
    top: 16px;
  }
  .date-container{
    top: 40px;
    .date{
      width: 120px !important;
      height: 68px !important;
      margin: 0 auto;
    }
  }
  .swiper-container, .carousel-image{
    height: 192px;
  }
}
.date-container{
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  .date{
    width: 112px;
    height: 62px;
    .start_date_mob{
      top: 0;
      left: 0;
      position: absolute;
      color: #fff;
      font-size: 32px;
      font-weight: bold;
    }
    .start_month_mob{
      position: absolute;
      bottom: 0;
      left: 0;
      color: #fff;
      font-size: 20px;
      font-weight: normal;
      text-transform: uppercase;
      font-weight: bold;
    }
    .divider_mob{
      position: absolute;
      top: 15%;
      left: 45%;
      color: #fff;
      font-size: 32px;
      font-weight: normal;
    }
    .end_date_mob{
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      font-size: 32px;
      font-weight: bold;
    }
    .end_month_mob{
      position: absolute;
      bottom: 0;
      right: 0;
      color: #fff;
      font-size: 20px;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
}
</style>
