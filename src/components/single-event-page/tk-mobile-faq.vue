<template lang="pug">
    section
        .mob-event-info.hidden-sm.hidden-md.hidden-lg
            .divs(v-for='(f, index) in data.layout.list')
                h4(type='button', data-toggle='collapse', :data-target="'#mob_faq' + _uid + index", @click="activeLink") {{ f.translations.question | tktranslate(lang) }}
                    i.material-icons keyboard_arrow_down
                .collapse(:id="'mob_faq' + _uid + index")
                    p {{ f.translations.text | tktranslate(lang) }}
</template>

<script>
  import Asidexs from '@/components/single-event-page/Asidexs'
  import { mapGetters } from 'vuex'

  export default {
    props: [ 'translations', 'data' ],
    methods: {
      activeLink (event) {
        event.target.classList.toggle('active')
      },
      translate (translate) {
        return this.$options.filters.translate(translate)
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
        padding: 0 8px 2px 8px;
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