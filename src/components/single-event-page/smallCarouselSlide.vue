<template lang="pug">
  .content
    .modal.fade(role='dialog', :id="'preview' + _uid")
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .modal-body#image-previews
    section
      swiper(:options="swiperOption")
          .swiper-button-next(slot="button-next")
          .swiper-button-prev(slot="button-prev")
          swiper-slide(v-for='d in main_content.layout.list', :key="d.id")
            button.image(type='button', data-toggle='modal', :data-target="'#preview' + _uid", @click='getImage(d.custom_fields.image_url)', :style="{ 'background-image': 'url(/static/' + d.custom_fields.image_url + ')' }")
          div.swiper-pagination(slot="pagination")
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: [ 'main_content' ],
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    getImage (image) {
      window.jQuery('#image-previews').css('background-image', 'url(/static/' + image + ')')
    }
  },
  data () {
    return {
      mounted: false,
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 5,
        spaceBetween: 50,
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container{
  margin-bottom: 32px;
}
.image{
  cursor: pointer;
  border-radius: 0;
  padding: 5px;
  outline: 0;
  border: none;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 140px !important;
  width: 140px !important;
  margin-right: 20px !important;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
}
.swiper-button-prev{
  background-image: url('/static/icn_left.svg');
  background-size: 8px;
  cursor: pointer;
  background-color: #fff;
  width: 40px;
  height: 100%;
  top: 22px;
  left: 0;
}
.swiper-button-next{
  background-image: url('/static/icn_right.svg');
  background-size: 8px;
  cursor: pointer;
  background-color: #fff;
  width: 40px;
  height: 100%;
  top: 22px;
  right: -1px;
}
.swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled{
  opacity: 1;
  background-color: #fff;
}
.swiper-button-disabled{
  opacity: 1;
  background-color: #fff;
}
.swiper-pagination-bullets{
  display: none;
}
.modal-content{
  background-color: #f7f7f7;
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 60px;
  border-radius: 0;
  border: none;
}
.modal-body{
  min-height: 433px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: 0;
}
.modal-dialog{
  max-width: 770px;
}
.modal-close{
  padding: 10px 0;
  text-align: right;
  button{
    padding: 0;
    outline: 0;
    font-size: 14px;
    text-transform: uppercase;
    color: #fff;
    border: none;
    background-color: transparent;
    .material-icons{
      font-size: 18px;
      vertical-align: text-bottom;
      padding-left: 4px;
    }
  }
}
/* Media Queries */
/* Extra Small */
@media(min-width:0px) and (max-width:767px){
  .modal-body{
    min-height: 100vh;
  }
  .modal-close{
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    text-align: center;
    z-index: 1;
    padding: 20px;
    button{
      color: #292929;
      border: none;
      background-color: transparent;
      padding: 0;
      text-transform: uppercase;
    }
  }
  .swiper-slide, .image{
    height: 140px !important;
    width: 140px !important;
  }
}
</style>