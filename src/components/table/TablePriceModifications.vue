<template lang="pug">
  table(v-if="tickets && tickets[edit_ticket]")
    thead
      tr.header
        th(scope='col') Condition
        th(scope='col') Modification
        th(scope='col') Repetitions
        th(scope='col') Status
    tbody
      tr(v-for="(item, index) in tickets[edit_ticket].own_charges")
        td(data-label='Condition')
          tk-tools-simple(style='margin-right: 16px;', @duplicateEvent='duplicate(index)', @deleteEvent='remove(index)')
          | {{ item.conditions.length }} conditions
        td(data-label='Modification') {{ item.price.amount }} {{ item.price.currency }} {{ item.direction.name }}
        td(data-label='Repetitions') {{ item.configuration.repetition }}
        td(data-label='Status') 
          strong Active
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as mutationTypes from '@/store/mutation-types'

  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        edit_ticket: 'edit_ticket',
        tickets: 'tickets'
      })
    },
    methods: {
      duplicate (i) {
        this.$store.commit(mutationTypes.DUPLICATE_CHARGE, { i })
      },
      remove (i) {
        this.$store.commit(mutationTypes.REMOVE_CHARGE, { i })
      }
    }
  }
</script>

<style lang="less" scoped>
.inactive{
  font-weight: bold;
  color: #9a9a9a;
}
table {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
}
table caption {
  color: #292929;
  font-size: 18px;
}
.header{
  color: #fff;
  text-transform: none;
  background-color: #9a9a9a;
  &:hover{
    background-color: #9a9a9a !important;
  }
}
table tr {
  background: #f7f7f7;
  border-bottom: 1px solid #979797;
  &:hover{
    background-color: #e4e4e4;
  }
}
table th{
  padding: 16px;
}
table td {
  font-size: 18px;
  padding: 26px 16px;
  text-align: left;
}
table th {
  font-size: 14px;
}
.footer{
  text-align: left;
}
@media screen and (max-width: 600px) {
  table {
    border: 0;
  }
  table caption {
    font-size: 1.3em;
  }
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  table td:before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  table td:last-child {
    border-bottom: 0;
  }
}
</style>
