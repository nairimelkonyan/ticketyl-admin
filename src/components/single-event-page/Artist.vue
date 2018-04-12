<template lang="pug">
  section
    #thumbnail.modal.fade(role='dialog')
      .modal-dialog(v-if="artist_data")
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .preview#current-image(v-bind:style="{ 'background-image': 'url(' + artist_image + ')' }")
          .wrapper
            .modal-header
              h3#headerTitle {{ artist_data.title | tktranslate(lang) }}
              p#headerParagraph {{ artist_data.subtitle | tktranslate(lang) }}
            .modal-body
              h3#bodyTitle {{ artist_data.body_title | tktranslate(lang) }}
              p#bodyParagraph {{ artist_data.body_paragraph | tktranslate(lang) }}
    .row
      .col-sm-4(v-for='(d, index) in main_content.layout.list')
        .poster(:style="{ 'background-image': 'url(' + d.custom_fields.image_url + ')' }")
          .poster-table(data-toggle='modal', data-target='#thumbnail', @click='getInfo(d)')
            .artist-name
              .artist
                span {{ d.translations.title | tktranslate(lang) }}
                span {{ d.translations.subtitle | tktranslate(lang) }}
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: [ 'main_content' ],
    methods: {
      getInfo (d) {
        this.artist_data = d.translations
        this.artist_image = d.custom_fields.image_url
        /*
        window.jQuery('#current-image').css('background-image', 'url(' + d.custom_fields.image_url + ')')
        window.jQuery('#headerTitle').html(d.headerTitle)
        window.jQuery('#headerParagraph').html(d.headerParagraph)
        window.jQuery('#bodyTitle').html(d.bodyTitle)
        window.jQuery('#bodyParagraph').html(d.bodyParagraph)
        */
      }
    },
    computed: {
      ...mapGetters({
        lang: 'selectedLanguage'
      })
    },
    data () {
      return {
        artist_data: null,
        artist_image: null
      }
    }
  }
</script>

<style lang="less" scoped>
section{
  .poster{
    height: 240px;
    margin-bottom: 32px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .poster-table{
      cursor: pointer;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      display: table;
      width: 100%;
      height: 100%;
      .artist-name{
        display: table-cell;
        vertical-align: middle;
        .artist{
          margin: auto;
          color: #f7f7f7;
          border: 3px solid #f7f7f7;
          padding: 2px;
          min-width: 80%;
          max-width: 80%;
          outline: none;
          background-color: transparent;
          span{
            display: block;
            &:first-child{
              font-size: 18px;
              font-weight: bold;
            }
            &:last-child{
              font-weight: 14px;
              font-weight: normal;
            }
          }
        }
      }
    }
  }
}
.modal-dialog{
    max-width: 570px;
  }
  .modal-body{
    text-align: left;
    padding: 0;
    p{
      margin-bottom: 24px;
    }
  }
  .modal-content{
    background-color: #fff;
    border-radius: 0;
    border: none;
  }
  .preview{
    height: 568px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .wrapper{
    padding: 24px 32px 32px 32px;
  }
  .modal-header{
    text-align: left;
    border-bottom: 1px solid #979797;
    padding: 0;
    h3{
      margin: 0 0 8px 0;
    }
    h3 + p{
      margin-bottom: 16px;
    }
  }
  .modal-close{
    padding: 10px 0;
    text-align: right;
    button{
      padding: 0;
      font-size: 14px;
      outline: none;
      text-transform: uppercase;
      color: #fff;
      border: none;
      background-color: transparent;
      .material-icons{
        font-size: 18px;
        vertical-align: middle;
        padding-left: 4px;
      }
    }
  }
  @media(min-width:0px) and (max-width:767px) {
    .modal-dialog, .modal-content{
      min-height: 100vh;
    }
    section .poster {
      height: 296px;
      margin-bottom: 24px;
    }
    section .poster .poster-table .artist-name button {
      width: 0;
      padding: 8px;
    }
    .wrapper {
      padding: 16px 16px 80px 16px;
    }
    .preview {
      height: 296px;
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
  }
</style>