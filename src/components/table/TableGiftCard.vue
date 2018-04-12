<template lang="pug">
  table
    thead
      tr.header
        th(scope='col') Sub-Event
        th(scope='col') Start
          i.material-icons arrow_drop_down
        th(scope='col') Tickets
        th(scope='col') Prices
        th(scope='col') Exp. Revenue
    tbody
      tr
        td(data-label='Sub-Event')
          input(type='checkbox', name='page', id="1") 
          label(for="1") Brunch In The Sky
        td(data-label='Start') 13.06.2017 (16:00)
        td(data-label='Tickets') 50
        td(data-label='Prices') 20.00 € - 45.00 €
        td(data-label='Revenue') 2400.00 $
      tr
        td(data-label='Sub-Event')
          input(type='checkbox', name='page', id="2") 
          label(for="2") Brunch In The Sky
        td(data-label='Start') 13.06.2017 (16:00)
        td(data-label='Tickets') 50
        td(data-label='Prices') 20.00 € - 45.00 €
        td(data-label='Revenue') 2400.00 $
      tr
        td(data-label='Sub-Event')
          input(type='checkbox', name='page', id="3") 
          label(for="3") Brunch In The Sky
        td(data-label='Start') 13.06.2017 (16:00)
        td(data-label='Tickets') 50
        td(data-label='Prices') 20.00 € - 45.00 €
        td(data-label='Revenue') 2400.00 $
      tr
        td(data-label='Sub-Event')
          input(type='checkbox', name='page', id="4") 
          label(for="4") Brunch In The Sky
        td(data-label='Start') 13.06.2017 (16:00)
        td(data-label='Tickets') 50
        td(data-label='Prices') 20.00 € - 45.00 €
        td(data-label='Revenue') 2400.00 $
      tr.footer
        td(data-label='Total', colspan='5', style='text-align: right;')
          span TOTAL EVENTS: 
            strong 4
          span TOTAL TICKETS:
            strong 450
          span TOTAL EXP. REVENUE:
            strong 14 900.00 $
</template>

<script>

</script>

<style lang="less" scoped>
table {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  tbody{
    font-size: 18px;
    .footer{
      font-size: 14px;
      span{
        margin-left: 40px;
        strong{
          margin-left: 8px;
        }
      }
    }
  }
  .material-icons{
    font-size: 14px;
    padding-left: 8px;
    vertical-align: middle;
  }
  label{
    margin: 0;
  }
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
  padding: 26px 16px;
  text-align: left;
  &:last-child{
    text-align: right;
  }
}
table th {
  font-size: 14px;
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
