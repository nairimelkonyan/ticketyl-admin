<template lang="pug">
  section
    tk-header-admin
    .events
      .container
        .row
          .col-sm-6
            .eventlist-content
              .eventlist-body
                h2 Events
                tk-input-time(@input="xxx")
                tk-input-price
                tk-input-translation
          .col-sm-6.text-right
            .eventlist-content
              .eventlist-body
                tk-primary-button(name='create new', @click='goTo')
        nav
          .row
            .col-sm-7
              .menu-content
                .menu-body
                  a(@click="change_status(null)", :class="{ active: !status }") All
                  a(@click="change_status('upcoming')", :class="{ active: status == 'upcoming' }") Upcoming
                  a(@click="change_status('public')", :class="{ active: status == 'public' }") Public
                  a(@click="change_status('draft')", :class="{ active: status == 'draft' }") Draft
                  a(@click="change_status('passed')", :class="{ active: status == 'passed' }") Passed
                  a(@click="change_status('archived')", :class="{ active: status == 'archived' }") Archived
            .col-sm-5.text-right
              .menu-content
                .menu-body
                  tk-search-admin(@input="set_search")
                  span.search search
        .empty(v-if='!events.length')
          .empty-content
            .empty-body
              img(src='/static/calendar_emptystate.svg')
              h2 No Events Created
              p See that important-looking 
                strong black button?
              p 
                strong Click it!
        section(v-if='events.length')
          div(v-if="loading")
            p Loading...
          .row(v-if='!loading')
            .col-sm-4(v-for="(item, index) in events")
              .event(@click="open(item)")
                .event-content
                  .event-body
                    h3 Dinner In The Sky Riga
                .events-date
                  .events-date-body
                    .row
                      .col-sm-6.text-left
                        p JUL 16 - AUG 28
                      .col-sm-6.text-right
                        span draft
    tk-footer-admin
</template>

<script>
  import * as mutationTypes from '@/store/mutation-types'
  import api from '@/services/TicketylOS/TicketylOS'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        status: null,
        search: null,
        events: [],
        loading: false
      }
    },
    computed: { ...mapGetters({
      token: 'logInAdminToken'
    }) },
    methods: {
      xxx (time) {
        console.log('received', time)
        // api.filterbytime(time)
      },
      open (item) {
        this.$store.commit(mutationTypes.RESET_EVENT)
        this.$router.push({ name: 'EventSetup', query: { id: item.id } })
      },
      reload () {
        this.loading = true
        var filter = api.filter().status(this.status).search(this.search)
        api
          .token(this.token)
          .admin().merchant().series(filter.merge())
          .then(response => {
            console.log(response)
            this.loading = false
            this.events = response
            // this.$store.commit(types.SAVE_EVENT_TITLE, { title: this.name })
            // this.$store.commit(types.RESET_EVENT)
            // this.$router.push({name: 'VisualEditor'})
          })
        // setup filter
        // call api
      },
      set_search (term) {
        this.search = term
        this.reload()
      },
      change_status (status) {
        this.status = status
        this.reload()
      },
      goTo () {
        this.$store.commit(mutationTypes.RESET_EVENT)
        this.$router.push({name: 'CreateNew'})
      }
    },
    mounted () {
      this.reload()
    }
  }
</script>

<style lang="less" scoped>
a {
  cursor: pointer;
  &.active { font-weight: bold; }
}
.empty{
  text-align: center;
  .empty-content{
    display: table;
    width: 100%;
    height: 40vh;
    .empty-body{
      display: table-cell;
      vertical-align: middle;
      img{
        height: 120px;
        margin-bottom: 36px;
      }
    }
  }         
  p{
    font-size: 18px;
  }
}
.search{
  font-size: 18px;
  text-transform: uppercase;
  color: #9a9a9a;
  margin-left: 8px;
}
.event{
  margin-bottom: 32px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
  cursor: pointer;
}
.events-date{
  background-color: #fff;
  display: table;
  width: 100%;
  height: 72px;
  .events-date-body{
    padding: 24px;
    display: table-cell;
    vertical-align: middle;
    p{
      margin: 0;
    }
    span{
      text-transform: uppercase;
      font-weight: bold;
      border: 1px solid #292929;
      padding: 4px;
    }
  }
}
.event-content{
  background-image: url('/static/dits.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  color: #fff;
  display: table;
  width: 100%;
  height: 192px;
  .event-body{
    display: table-cell;
    vertical-align: middle;
  }
}
  .events{
    min-height: 80vh;
    margin-bottom: 96px;
    .eventlist-content{
      margin-bottom: 24px;
      display: table;
      height: 100px;
      width: 100%;
      .eventlist-body{
        display: table-cell;
        vertical-align: bottom;
        h2{
          margin: 0;
        }
      }
    }
    nav{
      border-bottom: 1px solid #979797;
      margin-bottom: 62px;
      .menu-content{
        display: table;
        height: 88px;
        width: 100%;
        .menu-body{
          display: table-cell;
          vertical-align: middle;
          a{
            text-transform: none;
            position: relative;
            text-decoration: none;
            margin-right: 50px;
            color: #292929;
            font-size: 18px;
            .router-link-active{
              position: relative;
              width: 10px;
              height: 2px;
              font-weight: bold;
              &:after{
                content: "";
                position: absolute;
                width: 10px;
                height: 1px;
                background-color: #292929;
                left: 0;
                right: 0;
                bottom: -10px;
                margin: 0 auto;
              }
            }
          }
        }
      }
    }               
  }
</style>
