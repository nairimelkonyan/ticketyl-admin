<template lang="pug">
  section
    .row
      .col-sm-12
        .slide
          button(@click='moveUp')
            i.material-icons keyboard_arrow_up
          button(@click='moveDown')
            i.material-icons keyboard_arrow_down
          button(@click='remove')
            i.material-icons close
        .social-content
          .social-body
            p Connect with us online
            .social(v-for='(link, i) in socials')
              img(v-if='link.icon' :src='`/static/icn_${link.icon}.svg`')
              span(:class='{ "no-icon": !link.icon }')
                a(:href='link.url') {{ link.url }}
                button
                  i.material-icons(@click='removeSocial(i)') close
            tk-modal-social(:index='index', style='margin-top: 16px;')
</template>

<script>
import * as mutationTypes from '@/store/mutation-types'
import { mapState } from 'vuex'

export default {
  props: ['index'],
  data () {
    return { }
  },
  computed: {
    ...mapState({
      content: state => state.createdEvent.visual_editor.aside
    }),
    socials () {
      return this.content[this.index].socials
    }
  },
  methods: {
    remove () {
      this.$store.commit(mutationTypes.REMOVE_ASIDE_CONTENT, {
        i: this.index
      })
    },
    moveUp () {
      this.$store.commit(mutationTypes.MOVE_UP_ASIDE_CONTENT, {
        i: this.index
      })
    },
    moveDown () {
      this.$store.commit(mutationTypes.MOVE_DOWN_ASIDE_CONTENT, {
        i: this.index
      })
    },
    removeSocial (socialI) {
      this.$store.commit(mutationTypes.REMOVE_SOCIAL, {
        social_i: socialI,
        i: this.index
      })
    }
  }
}
</script>

<style lang="less" scoped>
  section{
    margin-bottom: 64px;
    .col-sm-12{
      position: relative;
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
    .social-content{
      background-color: #f7f7f7;
      box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
      text-align: center;
      display: table;
      width: 100%;
      .social-body{
        text-align: left;
        padding: 20px 15px;
        display: table-cell;
        vertical-align: middle;
        .add{
          font-size: 14px;
          padding: 0;
          border: none;
          outline: 0;
          background-color: transparent;
          text-transform: uppercase;
          text-decoration: underline;
          .material-icons{
            font-size: 18px;
            padding-right: 16px;
            vertical-align: middle;
          }
        }
        .social{
          margin-bottom: 8px;
        }
        img{
          width: 24px;
          height: 16px;
          margin-right: 24px;
        }
        p{
          text-transform: uppercase;
          color: #9a9a9a;
        }
        span{
          &.no-icon {
            margin-left: 48px;
          }
          button{
            padding: 0;
            border: none;
            outline: 0;
            background-color: transparent;
            padding-left: 16px;
            .material-icons{
              font-size: 14px;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
</style>