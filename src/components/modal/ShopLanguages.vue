<template lang="pug">
  .div
    button.action(type='button', data-toggle='modal', data-target='#languages') manage languages
    #languages.modal.fade(role='dialog')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .modal-content-wrapper
            .modal-header
              h2 Shop Languages
              p Select all languages your shop has to be available on
          .modal-body
            .menu
              .row
                .col-sm-6
                  .menu-content
                    .menu-body
                      tk-static-search(placeholder='search languages')
                .col-sm-6
                  .menu-content.border-left
                    .menu-body
                      p LANGUAGES SELECTED
                        strong {{ selected.length }}
            .body
              .row
                .col-sm-6
                  .body-content.scroll
                    .body-inside
                      ul
                        li(v-for='(item, index) in allowed_languages' @click='add(item)') {{ item.code.toUpperCase() }}
                .col-sm-6
                  .body-content.border-top
                    .body-inside
                      ul
                        li(v-for='(item, index) in selected' @click='current = item', :class='{ "current": current === item }') {{ item.code.toUpperCase() }}
                          span.pull-right(v-if='default_language === item') Default
                      .deselect
                        button.action(@click='reset()') Deselect all
                        button.action(@click='set_default()') Make default
          .modal-footer
            .row
              .col-sm-4.text-left
                .footer-wrapper
                  .footer-body
                    button.action Cancel
              .col-sm-8.text-right
                .footer-wrapper
                  .footer-body
                    tk-primary-button(name='save languages' data-dismiss="modal" @click='store', :disabled='!selected.length')
</template>

<script>
  export default {
    data () {
      return {
        selected: [],
        current: null,
        default_language: null
      }
    },
    props: ['allowed_languages', 'model'],
    methods: {
      add (item) {
        if (this.selected.indexOf(item) > -1) {
          this.selected.splice(this.selected.indexOf(item), 1)
        } else {
          this.selected.push(item)
        }
      },
      remove (item) { delete this.selected[item.code] },
      reset () {
        this.selected = []
        this.default_language = 0
        this.current = null
      },
      set_default () {
        if (this.current !== null) {
          this.default_language = this.current
        }
      },
      store () {
        this.$emit('input', {
          allowed_languages: this.selected,
          default_language: this.default_language
        })
      },
      load (model) {
        this.default_language = null
        this.selected = []
        if (model && model.allowed_languages) {
          var allowed = Object.assign({}, model.allowed_languages)
          for (var k in allowed) {
            for (var l in this.allowed_languages) {
              if (this.allowed_languages[l].code === allowed[k]) {
                this.selected.push(this.allowed_languages[l])
              }
            }
          }
        }
        if (model && model.configuration) {
          for (var i in this.allowed_languages) {
            if (this.allowed_languages[i].code === model.configuration.default_language) {
              this.default_language = this.allowed_languages[i]
            }
          }
        } else {
          this.default_language = null
        }
      }
    },
    mounted () { this.load(this.model, this.model) },
    watch: {
      model (model) { this.load(model) }
    }
  }
</script>

<style lang="less" scoped>
.div{
  display: inline-block;
}
::-webkit-scrollbar-track
{
	background-color: #e4e4e4;
}
::-webkit-scrollbar
{
	width: 4px;
}
::-webkit-scrollbar-thumb
{
	border: 4px solid #292929;
}
.deselect{
  position: absolute;
  bottom: 16px;
  left: 16px;
  button{
    &:first-child{
      margin-right: 16px;
    }
  }
}
.action{
  padding: 0;
  border: none;
  text-transform: uppercase;
  text-decoration: underline;
  background-color: transparent;
}
.body{
  .scroll{
    max-height: 356px;
    overflow-y: scroll;
  }
  .body-inside{
    ul{
      padding-top: 0;
      padding-left: 0;
      list-style-type: none;
      li{
        cursor: pointer;
        padding: 8px;
        span{
          font-size: 12px;
          font-weight: bold;
        }
        &:hover{
          background-color: #e4e4e4;
        }
        &.current{
          background-color: #d8d8d8;
        }
      }
    }
  }
  .border-top{
    position: relative;
    border-top: 1px solid #979797;
    border-left: 1px solid #979797;
    padding: 8px;
    padding-right: 0;
    height: 377px;
  }
}
.menu{
  .border-left{
    border-left: 1px solid #979797;
    padding-left: 16px;
  }
  .menu-content{
    height: 80px;
    width: 100%;
    display: table;
    .menu-body{
      display: table-cell;
      vertical-align: middle;
      p{
        text-transform: uppercase;
        margin: 0;
        strong{
          padding-left: 16px;
        }
      }
    }
  }                  
}         
button{
  outline: 0;
}
.modal-content-wrapper{
  padding: 24px 32px 0 32px;
}
.modal-dialog{
  width: 770px;
}
.modal-close{
  padding: 10px 0;
  text-align: right;
  .material-icons{
    font-size: 18px;
    vertical-align: text-bottom;
    padding-left: 4px;
  }
  button{
    padding: 0;
    font-size: 14px;
    text-transform: uppercase;
    color: #fff;
    width: auto;
    border: none;
    background-color: transparent;
    outline: none !important;
  }
}
.modal-header{
  padding: 0;
  border-bottom: 0;
  border-bottom: 1px solid #979797;
  h2{
    margin-top: 0;
    margin-bottom: 8px;
    +p{
      margin-bottom: 24px;
    }
  }
}
.modal-body{
  padding: 0 32px;
}
.modal-content{
  background-color: #f7f7f7;
  border-radius: 0;
  border: none;
}
.modal-footer{
  text-transform: uppercase;
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  padding: 0 32px;
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
</style>
