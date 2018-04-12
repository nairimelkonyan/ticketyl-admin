<template lang="pug">
  header
    .container
      .row
        .col-sm-6
          .header-content
            .header-body
              img(src='static/ticketyl-crop.png')
        .col-sm-6.text-right
          .header-content
            .header-body
              section(v-if="!logged")
                tk-ticketyl-lang(:currency='currency')
                tk-modal-log-in
                tk-modal-sign-up
              section(v-if="logged")
                tk-ticketyl-lang(:currency='currency')
                button.action(type='button', @click="to_dashboard") Dashboard
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        currency: [ 'ENG', 'LAT' ]
      }
    },
    methods: {
      to_dashboard () {
        this.$router.push({name: 'EventList'})
      }
    },
    computed: {
      ...mapGetters({
        logged: 'logged'
      })
    }
  }
</script>

<style lang="less" scoped>
.action{
  margin-left: 24px;
  padding: 0;
  border: none;
  background-color: transparent;
  text-transform: uppercase;
}
  header{
    background-color: #f7f7f7;
    .header-content{
      display: table;
      height: 144px;
      width: 100%;
      .header-body{
        display: table-cell;
        vertical-align: middle;
        img{
          height: 42px;
          vertical-align: top;
        }
      }
    }        
  }
</style>
