<template lang="pug">
  section
    .menu
      .container
        .editor-menu
          .row
            .col-sm-4.text-left.editor-menu-left
              .editor-menu-content
                .editor-menu-body
                  h4 Visual Editor
                  h2 {{ title }}
                    tk-tools(@showPriceModifications='showPriceModifications', @goToEventSettings='goToEventSettings', @cancelEvent='showCancelEvent', style='margin-left: 16px;')
                  span draft
            .col-sm-8.text-right.editor-menu-right
              .editor-menu-content
                .editor-menu-body
                  button.action View as buyer
                  tk-secondary-button(name='save as draft', @click='saveDraft')
                  tk-modal-publish-event-steps(@publish='publish')
    vue-dropzone(
      ref="dropzoneCoverImage"
      id="dropzoneCoverImage"
      :options="dropzoneCoverImageOptions"
      @vdropzone-files-added='checkCoversQuantity'
      @vdropzone-drop='checkCoversQuantity'
      @vdropzone-removed-file='coverRemoved'
      @vdropzone-thumbnail='collectCoverDataURLs')
    .carousel
      .carousel-inner
        .container
          .row
            .col-sm-12
              .carousel-content
                .carousel-body
                  .selected(style='min-height: 69px;')
                  img(src='/static/doc_types.svg')
                  h3 Drag and drop
                  p Up to 6 
                    strong event cover images 
                    | min 1200x480 px
                  label.custom-file-upload
                    input(type='file')
                    | Browse images
    main
      .container
        .row 
          .col-sm-8
            component(v-for='(section, key) in content', v-if='section', :is='section.type', :key='key', :index='key', place='main', @removeContent='removeContent', @moveContent='moveContent')
            tk-visual-editor-about-event-landing(@addContent='add')
          .col-sm-4
            tk-aside-visual
</template>

<script>
  const CONTENT_TYPES = {
    PICTURE_GALLERY: 'tk-visual-editor-small-carousel',
    LARGE_IMAGE: 'tk-visual-editor-large-image',
    EMBED_VIDEO: 'tk-visual-editor-video',
    PERFORMER_PROFILES: 'tk-visual-editor-performer',
    LOCATION_MAP: 'tk-visual-editor-map',
    GIFT_CARD_TEASER: 'tk-visual-editor-gift-card-content',
    TEXT_HEADING: 'tk-visual-editor-title'
  }

  import api from '@/services/TicketylOS/TicketylOS'
  import * as mutationTypes from '@/store/mutation-types'
  import { mapGetters, mapState } from 'vuex'
  import clone from 'clone-array'

  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.css'

  export default {
    data () {
      return {
        coverImages: [],
        dropzoneCoverImageOptions: {
          url: 'null',
          thumbnailWidth: null,
          thumbnailHeight: null,
          autoProcessQueue: false,
          acceptedFiles: '.png,.jpg',
          addRemoveLinks: true,
          maxFiles: 6,
          dictDefaultMessage: `<div class='dropzone-cover'></div>`,
          previewTemplate: `<div class="dz-preview dz-file-preview">
            <div class="dz-details" style="opacity: 1 !important;height: 0;width: 0;padding: 0;background-color:transparent">
              <div class="image-container">
                <img data-dz-thumbnail style="width: 64px;" />
                <a class="dz-remove" data-dz-remove><i class="material-icons">close</i></a>
              </div>
            </div>
          </div>`
        }
      }
    },
    components: {
      vueDropzone: vue2Dropzone
    },
    computed: {
      ...mapGetters({
        token: 'logInAdminToken'
      }),
      ...mapState({
        content: state => state.eventSetup.serie.layout.main,
        title: state => state.eventSetup.serie.translations.name.en
      })
    },
    methods: {
      add (n) {
        switch (n) {
          case 'Picture Gallery': this.addContent(CONTENT_TYPES.PICTURE_GALLERY)
            break
          case 'Gift Card Teaser': this.addContent(CONTENT_TYPES.GIFT_CARD_TEASER)
            break
          case 'Embed Video': this.addContent(CONTENT_TYPES.EMBED_VIDEO)
            break
          case 'Performer Profiles': this.addContent(CONTENT_TYPES.PERFORMER_PROFILES)
            break
          case 'Location Map': this.addContent(CONTENT_TYPES.LOCATION_MAP)
            break
          case 'Text Heading': this.addContent(CONTENT_TYPES.TEXT_HEADING)
            break
          case 'Large Image': this.addContent(CONTENT_TYPES.LARGE_IMAGE)
            break
        }
      },
      addContent (type) {
        let temp = clone(this.content)
        temp.push({ type })
        this.$store.commit(mutationTypes.UPDATE_LAYOUT_MAIN, temp)
      },
      removeContent (payload) {
        let temp = clone(this.content)
        temp.splice(payload.i, 1)
        this.$store.commit(mutationTypes.UPDATE_LAYOUT_MAIN, temp)
      },
      moveContent (payload) {
        let temp = clone(this.content)
        if (payload.direction === 'up' && payload.i !== 0) {
          const component = temp[payload.i]
          temp[payload.i] = temp[payload.i - 1]
          temp[payload.i - 1] = component
          this.$store.commit(mutationTypes.UPDATE_LAYOUT_MAIN, temp)
        } else if (payload.direction === 'down' && payload.i !== this.content.length) {
          const component = temp[payload.i]
          temp[payload.i] = temp[payload.i + 1]
          temp[payload.i + 1] = component
          this.$store.commit(mutationTypes.UPDATE_LAYOUT_MAIN, temp)
        }
      },
      checkCoversQuantity () {
        const files = this.$refs.dropzoneCoverImage.getAcceptedFiles()
        if (files.length >= 6) {
          this.$refs.dropzoneCoverImage.disable()
        } else {
          this.$refs.dropzoneCoverImage.enable()
        }
      },
      collectCoverDataURLs (file, dataUri) {
        this.coverImages.push({
          name: file.upload.filename,
          dataURL: dataUri
        })
      },
      coverRemoved (file, error, xhr) {
        for (let i = 0; i < this.coverImages.length; i++) {
          if (this.coverImages[i].name === file.upload.filename) {
            this.coverImages = this.coverImages.splice(i, 1)
            break
          }
        }
        this.checkCoversQuantity()
      },
      showPriceModifications () {
        window.jQuery('#price-modifications').modal('show')
      },
      showCancelEvent () {
        window.jQuery('#cancel-event').modal('show')
      },
      goToEventSettings () {
        this.$router.push({name: 'EventSetup'})
      },
      collectData () {
        return {
          'layout': {
            'event_cover': [
              {
                'code': 'tk-image',
                'parameters': {
                  'image_url': 'http://example.com/image1.png'
                }
              },
              {
                'code': 'tk-image',
                'parameters': {
                  'image_url': 'http://example.com/image2.png'
                }
              },
              {
                'code': 'tk-image',
                'parameters': {
                  'image_url': 'http://example.com/image3.png'
                }
              }
            ],
            'sidebar_head': [
              {
                'code': 'tk-image',
                'parameters': {
                  'image_url': 'http://example.com/logo.png'
                }
              }
            ],
            'sidebar_content': [
              {
                'code': 'tk-social-box',
                'translations': {
                  'heading': {
                    'en': 'Connect with us online'
                  }
                },
                'layout': {
                  'list': [
                    {
                      'code': 'tk-iconed-link',
                      'translations': {
                        'full_url': {
                          'en': 'http://facebook.com/eventorganizer'
                        },
                        'link_text': {
                          'en': '/eventorganizer'
                        }
                      },
                      'parameters': {
                        'icon': 'fa-facebook'
                      }
                    },
                    {
                      'code': 'tk-iconed-link',
                      'translations': {
                        'full_url': {
                          'en': 'http://twitter.com/eventorganizer'
                        },
                        'link_text': {
                          'en': '/eventorganizer'
                        }
                      },
                      'parameters': {
                        'icon': 'fa-twitter'
                      }
                    }
                  ]
                }
              },
              {
                'code': 'tk-newsletter-box',
                'translations': {
                  'heading': {
                    'en': 'Sign up to event newsletter'
                  },
                  'placeholder': {
                    'en': 'Your e-mail address'
                  }
                }
              }
            ],
            'event_info': [
              {
                'code': 'tk-info-label',
                'translations': {
                  'label': {
                    'en': 'Location'
                  },
                  'value': {
                    'en': 'Brīvības iela 154, Rīga, Latvija'
                  }
                }
              },
              {
                'code': 'tk-info-label',
                'translations': {
                  'label': {
                    'en': 'Event info'
                  },
                  'value': {
                    'en': 'Position explained'
                  }
                }
              }
            ],
            'event_content': [
              {
                'code': 'tk-google-map',
                'parameters': {
                  'lat': '26.124235245',
                  'lng': '54.124235245',
                  'search': 'Brīvības iela 146, Rīga',
                  'zoom': 14
                }
              },
              {
                'code': 'tk-youtube-embed',
                'parameters': {
                  'video_id': 'OdMTMxiIf7g'
                }
              },
              {
                'code': 'tk-image',
                'parameters': {
                  'image_url': 'http://example.com/image3.png'
                }
              },
              {
                'code': 'tk-figure-list',
                'layout': {
                  'list': [
                    {
                      'code': 'tk-figure-item',
                      'parameters': {
                        'image_url': 'http://example.com/image4.png'
                      },
                      'translations': {
                        'title': {
                          'en': 'Jesse Figueroa'
                        },
                        'subtitle': {
                          'en': 'Electric Guitar'
                        }
                      }
                    },
                    {
                      'code': 'tk-figure-item',
                      'parameters': {
                        'image_url': 'http://example.com/image5.png'
                      },
                      'translations': {
                        'title': {
                          'en': 'Joshua Casey'
                        },
                        'subtitle': {
                          'en': 'Jazz Saxophone'
                        }
                      }
                    },
                    {
                      'code': 'tk-figure-item',
                      'parameters': {
                        'image_url': 'http://example.com/image6.png'
                      },
                      'translations': {
                        'title': {
                          'en': 'Victoria Garner'
                        },
                        'subtitle': {
                          'en': 'Violin Virtuoso'
                        }
                      }
                    },
                    {
                      'code': 'tk-figure-item',
                      'parameters': {
                        'image_url': 'http://example.com/image7.png'
                      },
                      'translations': {
                        'title': {
                          'en': 'Earl Shaw'
                        },
                        'subtitle': {
                          'en': 'Spanish Guitar'
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      },
      publish () {
        console.log('p')
        this.store('public')
      },
      saveDraft () {
        this.store('draft')
      },
      store (status) {
        var data = this.collectData()
        data.event_status = status
        var id = this.eventID
        api
          .token(this.token)
          .admin().event(id).layout(data)
          .then(response => {
            // this.$router.push({name: 'VisualEditor'})
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  .carousel-inner{
    border: 4px dashed #f7f7f7;
  }
  .selected{
    margin-bottom: 24px;
  }
  .select{
    color: #fff;
    text-align: left;
    text-transform: uppercase;
  }
  .celected-body{
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
    margin-right: 16px;
    display: inline-block;
    height: 64px;
    width: 64px;
    background-image: url('/static/2.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    button{
      margin: 0;
      padding: 0;
      outline: 0;
      border: none;
      float: right;
      background-color: transparent;
      .material-icons{
        font-size: 14px;
        color: #fff;
      }
    }
    &:last-child{
      margin: 0;
    }
  }
  main{
    padding-bottom: 320px;
  }
  main{
    h1{
      margin: 0;
      margin-bottom: 6px;
      +p{
        margin-bottom: 24px;
      }
    }
  }
  .date-container{
    display: inline-block;
    width: 300px;
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
    .container{
      display: inline-block;
      width: 300px;
    }
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
  .carousel {
    height: 464px;
    padding: 4px;
    text-align: center;
    color: #9a9a9a;
    background: linear-gradient(#fff 55%, #979797);
    margin-bottom: 49px;
    .carousel-content{
      position: relative;
      display: table;
      width: 100%;
      height: 448px;
      .carousel-body{
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
  .editor-menu{
    .editor-menu-left{
      h2, h4{
        margin: 0;
      }
      h2{
        margin-bottom: 16px;
      }
      span{
        border: 1px solid #292929;
        font-weight: bold;
        padding: 4px;
        text-transform: uppercase;
      }
    }
    .editor-menu-right{
      .action{
        outline: 0;
        padding: 0;
        border: none;
        background-color: transparent;
        text-transform: uppercase;
        text-decoration: underline;
      }
      button{
        margin-left: 24px;
      }
    }
    .editor-menu-content{
      display: table;
      width: 100%;
      height: 152px;
      .editor-menu-body{
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
  input[type="file"] {
    display: none;
  }
  .custom-file-upload{
    display: inline-block;
    cursor: pointer;
    transition: 0.3s;
    background-color: #9a9a9a;
    text-transform: uppercase;
    font-size: 18px;
    color: #fff;
    min-height: 48px;
    padding: 10px 16px;
    border-radius: 0;
    border: none;
    outline: none !important;
    &:hover{
      background-color: #a9a9a9;
    }
  }
</style>

<style lang="less">
  .dropzone {
    cursor: pointer;
    height: 464px;
    position: absolute;
    width: 100%;
    z-index: 1;
    background: transparent;
    border: none;
    text-align: center;
    &:hover {
      background-color: rgba(246, 246, 246, 0.22);
    }
    .dz-preview.dz-image-preview {
      min-height: 64px;
      margin-right: 70px;
      margin-top: 54px;
      margin-left: 10px;
      .image-container {
        height: 64px;
        width: 64px;
        img {
          width: inherit;
          height: inherit;
          box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
        }
        a.dz-remove {
          opacity: 1;
          display: inline-block;
          border: none;
          padding: 0;
          margin-left: 48px;
          position: relative;
          top: -63px;
          i {
            font-size: 14px;
            color: #fff;
          }
        }
      }
      a.dz-remove {
        display: none;
      }
    }
  }
</style>