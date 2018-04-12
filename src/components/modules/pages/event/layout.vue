<template lang="pug">
  section
    tk-header-admin
    tk-price-modifications
    tk-cancel-event
    .menu
      .container
        .editor-menu
          .row
            .col-sm-4.text-left.editor-menu-left
              .editor-menu-content
                .editor-menu-body
                  h4 Visual Editor x
                  h2 Dinner in the Sky
                    tk-tools(@showPriceModifications='showPriceModifications', @goToEventSettings='goToEventSettings', @cancelEvent='showCancelEvent', style='margin-left: 16px;')
                  span draft
            .col-sm-8.text-right.editor-menu-right
              .editor-menu-content
                .editor-menu-body
                  button.action View as buyer
                  tk-secondary-button(name='save as draft', @click='saveDraft')
                  tk-publish-event
    .carousel
      .carousel-inner
        .container
          .row
            .col-sm-12
              .carousel-content
                .carousel-body
                  .selected
                    .celected-body
                      button
                        i.material-icons clear
                    .celected-body
                      button
                        i.material-icons clear
                    .celected-body
                      button
                        i.material-icons clear
                  img(src='/static/doc_types.svg')
                  h3 Drag and drop
                  p Up to 6 
                    strong event cover images 
                    | min 1200x480 px
                  label.custom-file-upload
                    input(type='file')
                    | Browse images
                .date-container
                  .container
                    .date
                      span.start_date 16
                      span.start_month Jul
                      span.divider -
                      span.end_date 28
                      span.end_month Aug
                    p.select (select event dates in 
                      router-link(:to="{'name': 'EventSetup'}") Event setup
                      |)
    main
      .container
        .row
          .col-sm-8
            h1 Dinner In The Sky
            p An independed TED international this year in the theme of enterpreneurship and motivation.
            tk-visual-editor-event-info
            tk-visual-editor-small-carousel
            tk-visual-editor-video
            tk-visual-editor-performer
            tk-visual-editor-map
            tk-visual-editor-gift-card-content
            tk-visual-editor-about-event-main
          .col-sm-4
            tk-aside-visual
    tk-footer-admin
</template>

<script>
  import store from '@/store'
  import Api from '@/services/ApiService'
  import { mapGetters } from 'vuex'

  export default {
    methods: {
      showPriceModifications () {
        window.jQuery('#price-modifications').modal('show')
      },
      showCancelEvent () {
        window.jQuery('#cancel-event').modal('show')
      },
      goToEventSettings () {
        this.$router.push({name: 'EventSettings'})
      },
      collectData () {
        return {
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
      },
      publish () { this.store('public') },
      saveDraft () { this.store('draft') },
      store (status) {
        var data = this.collectData()
        data.event_status = status
        var id = 17
        var api = new Api()
        api
          .token(this.token)
          .admin().event(id).layout(data)
          .then(response => { this.$router.push({name: 'VisualEditor'}) })
      }
    },
    computed: {
      ...mapGetters({
        token: 'logInAdminToken'
      })
    },
    beforeRouteEnter (to, from, next) {
      if (store.getters.logInAdminToken === '') {
        next('/ticketyl')
      }
      next()
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
      margin-bottom: 56px;
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
.carousel{
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