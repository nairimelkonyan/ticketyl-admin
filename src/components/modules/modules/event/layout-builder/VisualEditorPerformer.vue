<template lang="pug">
  section
    .modal.fade(role='dialog', :id='"artist" + index')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content(v-if='selected !== null')
          .preview#current-image(v-if='performers[selected].photo' :style='getBGstyle(selected)')
          .wrapper
            .modal-header
              h3#headerTitle {{ performers[selected].name }}
              p#headerParagraph {{ performers[selected].title }}
            .modal-body(v-if='performers[selected].subtitle || performers[selected].description')
              h3#bodyTitle {{ performers[selected].subtitle }}
              p#bodyParagraph {{ performers[selected].description }}
          .row.modal-footer
            .col-sm-6.text-left
              .footer-wrapper
                .footer-body
                  button.action(data-dismiss="modal") cancel
            .col-sm-6.text-right
              .footer-wrapper
                .footer-body
                  tk-primary-button(name='add performer' @click='addPerformer')
    .row
      .col-sm-4
        .slide
          button(@click='moveUp')
            i.material-icons keyboard_arrow_up
          button(@click='moveDown')
            i.material-icons keyboard_arrow_down
          button(@click='remove')
            i.material-icons close
        .performer-content
          .performer-body
            h4 Create New
            p Performer profile
            tk-modal-performer(:index='index')
      .col-sm-4(v-for='(p, i) in performers')
        .performer-content.selected(:style='getBGstyle(i)')
          .performer-body.selected-border
            button(@click='removePerformer(i)') delete
              i.material-icons clear
            .poster-table(data-toggle='modal', :data-target='"#artist" + index', @click='selectPerformer(i)')
              .artist-name
                .artist
                  span {{ p.name }}
                  span {{ p.title }}
</template>

<script>
  import * as mutationTypes from '@/store/mutation-types'
  import { mapState } from 'vuex'
  import clone from 'clone-array'

  export default {
    props: ['index'],
    data () {
      return {
        selected: null
      }
    },
    computed: {
      ...mapState({
        content: state => state.eventSetup.serie.layout.main
      }),
      performers () {
        return this.content[this.index].performers
      }
    },
    methods: {
      remove () {
        this.$emit('removeContent', {
          i: this.index
        })
      },
      moveUp () {
        this.$emit('moveContent', {
          i: this.index,
          direction: 'up'
        })
      },
      moveDown () {
        this.$emit('moveContent', {
          i: this.index,
          direction: 'down'
        })
      },
      removePerformer (performerI) {
        let temp = clone(this.content)
        temp[this.index].performers.splice(performerI, 1)
        this.$store.commit(mutationTypes.UPDATE_LAYOUT_MAIN, temp)
      },
      getBGstyle (i) {
        if (this.performers[i].photo) {
          return {
            'background-image': `url('${this.performers[i].photo}')`,
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'background-size': 'cover'
          }
        } else {
          return {}
        }
      },
      selectPerformer (i) {
        this.selected = i
      },
      addPerformer () {
        window.jQuery(`#artist${this.index}`).fadeOut()
        window.jQuery('.modal-backdrop').fadeOut()
        window.jQuery(`#performer${this.index}`).modal('show')
      }
    }
  }
</script>

<style lang="less" scoped>
.modal-footer{
  text-transform: uppercase;
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  padding: 0 32px;
  width: 100%;
  margin: 0;
  .footer-wrapper{
    display: table;
    height: 75px;
    width: 100%;
    .footer-body{
      display: table-cell;
      vertical-align: middle;
      .action{
        text-transform: uppercase;
        border: none;
        padding: 0;
        text-decoration: underline;
        background-color: transparent;
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
    position: relative;
    background-color: #f7f7f7;
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
      &#bodyTitle {
        text-transform: uppercase;
        font-size: 18px;
      }
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
  section{
    margin-bottom: 32px;
    .col-sm-4{
      position: relative;
      margin-bottom: 32px;
    }
    .selected-border{
      border: none !important;
      padding: 0 !important;
    }
    .selected{
      padding: 0 !important;
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
      button{
        position: absolute;
        top: 8px;
        right: 8px;
        text-transform: uppercase;
        color: #fff;
        margin: 0;
        padding: 0;
        outline: 0;
        border: none;
        background-color: transparent;
        .material-icons{
          font-size: 16px;
          color: #fff;
          vertical-align: sub;
          margin-left: 8px;
        }
      }
    }
    .slide{
      position: absolute;
      margin-top: -32px;
      button{
        outline: 0;
        padding: 0;
        border: none;
        background-color: transparent;
        padding: 0 8px;
        border-right: 1px solid #979797;
        &:last-child{
          border-right: none;
        }
        .material-icons{
          font-size: 20px;
          vertical-align: middle;
        }
      }
    }
    .performer-content{
      padding: 4px;
      position: relative;
      background-color: #fff;
      box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
      color: #9a9a9a;
      text-align: center;
      display: table;
      height: 240px;
      width: 100%;
      .performer-body{
        border: 4px dashed #f7f7f7;
        display: table-cell;
        vertical-align: middle;
        padding: 16px;
        img{
          height: 48px;
        }
      }
    }
  }
</style>