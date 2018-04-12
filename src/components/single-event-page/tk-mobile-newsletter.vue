<template lang="pug">
    section
        .mob-social-info.hidden-sm.hidden-md.hidden-lg
            h4(type='button', data-toggle='collapse', :data-target="'#newsletter' + _uid", @click="activeLink") {{ translations.aside_newsletter | tktranslate(lang) }}
                i.material-icons keyboard_arrow_down
            .collapse(:id="'newsletter' + _uid")
                .send-inner
                    tk-send(:placeholder='translations.aside_newsletter_placeholder | tktranslate(lang)', v-model='email', @click='postNewsLetter')
                    p(v-if='!signedUp')
                    p(v-if='signedUp && !wrongEmail') {{ translations.aside_newsletter_success | tktranslate(lang) }}
                    p(v-if='wrongEmail') {{ translations.aside_newsletter_invalid | tktranslate(lang) }}
</template>

<script>
  import Api from '@/services/ApiService'
  import Asidexs from '@/components/single-event-page/Asidexs'
  import { mapGetters } from 'vuex'

  export default {
    props: [ 'translations', 'data' ],
    data () {
      return {
        signedUp: false,
        wrongEmail: false,
        email: ''
      }
    },
    methods: {
      activeLink (event) {
        event.target.classList.toggle('active')
      },
      postNewsLetter () {
        var mailformat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        if (this.email.match(mailformat)) {
          document.getElementById('emails').classList.remove('wrongInput')
          this.wrongEmail = false
          this.signedUp = true
          new Api().postNewsLetter({email: this.email}).then(response => {})
        } else {
          document.getElementById('emails').classList.add('wrongInput')
          document.getElementById('emails').focus()
          this.wrongEmail = true
        }
      }
    },
    computed: {
      ...mapGetters({
        lang: 'selectedLanguage'
      })
    },
    components: {
      tkAsidexs: Asidexs
    }
  }
</script>

<style lang="less" scoped>
 .active{
    font-weight: bold !important;
  }
[aria-expanded="true"] .material-icons{
    font-weight: bold;
    -ms-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
}
.socal-sm{
    display: block;
    padding: 8px;
    cursor: pointer;
    img{
        margin-right: 16px;
        width: 16px;
        height: 16px;
    }
}
.col-sm-4{
    margin-bottom: 40px;
}
.send-inner{
    padding: 8px;
}
.mob-event-info, .mob-social-info {
    padding: 8px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
    margin-bottom: 24px;
    margin-left: -15px;
    margin-right: -15px;
    h4 {
        cursor: pointer;
        padding: 8px;
        margin: 0;
        text-transform: uppercase;
        color: #9a9a9a;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
    }
    p {
        font-size: 12px;
        font-weight: bold;
        padding-top: 8px;
        margin: 0;
    }
    .material-icons{
        transition: 0.1s;
        float: right;
        vertical-align: middle;
        font-size: 18px;
        pointer-events: none;
        margin-top: 5px;
    }
}
h1{
    margin-top: 0;
    margin-bottom: 6px;
}
    section{
        h1 ~ p{
            margin-bottom: 56px;
            margin-top: 0;
        }
        .event-info{
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid #979797;
            .col-sm-4{
                h5{
                    color: #9a9a9a;
                    margin: 0 0 10px 0;
                    font-size: 14px;
                    text-transform: uppercase;
                }
                p{
                    margin-bottom: 0;
                }
            }
        }
    }
    .mob-logo{
        display: none;
    }
    /* Extra Small */
    @media(min-width:0px) and (max-width:767px){
        .mob-logo{
            display: table;
            margin: 0 auto;
            width: 104px;
            height: 104px;
            display: block;
            background-color: #f7f7f7;
            box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
            margin-top: -122px;
            margin-bottom: 24px;
            .mob-logo-content{
                width: 104px;
                height: 104px;
                display: table-cell;
                vertical-align: middle;
            }
            img{
                display: block;
                margin: 0 auto;
                height: 64px;
                width: auto;
            }
        }
        section{
            h1 {
                margin-bottom: 16px;
            }
            h1 ~ p{
                margin-bottom: 24px;
            }
            .event-info{
                padding: 20px;
                margin-left: -15px;
                margin-right: -15px;
                border-bottom: none;
                box-shadow: 
                    outset 0px 11px 8px -10px #CCC,
                    outset 0px -11px 8px -10px #CCC;
                    .row{
                        .col-sm-4:last-child{
                            margin-bottom: 0;
                        }
                    }
            }
        }
    }
</style>