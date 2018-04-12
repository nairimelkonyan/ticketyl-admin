<template lang="pug">
  table
    thead
      tr.header
        th(scope='col') Position
        th(scope='col') Date
        th(scope='col') Thu 20 Jul
        th(scope='col') Fri 21 Jul
        th(scope='col') Sat 22 Jul
        th(scope='col') Sun 23 Jul
        th(scope='col') Mon 24 Jul
        th(scope='col') Tue 25 Jul
        th(scope='col', style='text-align: right;') Wed 26 Jul
    tbody
      tr
        td(data-label='Position', style='text-align: left !important;') Breakfast In The Sky
        td.date(data-label='Date')
        td(data-label='Date') 20
        td(data-label='Date') 0
        td(data-label='Date') 22
        td(data-label='Date') 4
        td(data-label='Date')
          span.blank x
        td(data-label='Date')
          span.blank x
        td(data-label='Date') 13
      tr
        td(data-label='Position', style='text-align: left !important;') Breakfast In The Sky
        td.date(data-label='Date')
        td(data-label='Date') 20
        td(data-label='Date') 0
        td(data-label='Date') 22
        td(data-label='Date') 4
        td(data-label='Date')
          span.blank x
        td(data-label='Date')
          span.blank x
        td(data-label='Date') 13
      tr
        td(data-label='Position', style='text-align: left !important;') Breakfast In The Sky
        td.date(data-label='Date')
        td(data-label='Date') 20
        td(data-label='Date') 0
        td(data-label='Date') 22
        td(data-label='Date') 4
        td(data-label='Date')
          span.blank x
        td(data-label='Date')
          span.blank x
        td(data-label='Date') 13
      tr
        td(data-label='Position', style='text-align: left !important;') Breakfast In The Sky
        td.date(data-label='Date')
        td(data-label='Date') 20
        td(data-label='Date') 0
        td(data-label='Date') 22
        td(data-label='Date') 4
        td(data-label='Date')
          span.blank x
        td(data-label='Date')
          span.blank x
        td(data-label='Date') 13
      tr
        td(data-label='Position', style='text-align: left !important;') Breakfast In The Sky
        td.date(data-label='Date')
        td(data-label='Date') 20
        td(data-label='Date') 0
        td(data-label='Date') 22
        td(data-label='Date') 4
        td(data-label='Date')
          span.blank x
        td(data-label='Date')
          span.blank x
        td(data-label='Date') 13
    tfoot
      tr
        td(data-label='Total', style='text-align: left !important;') Capacity
        td.date(data-label='Date')
        td(data-label='Date') 20
        td(data-label='Date') 0
        td(data-label='Date') 22
        td(data-label='Date') 4
        td(data-label='Date')
          span.blank x
        td(data-label='Date')
          span.blank x
        td(data-label='Date') 13
      tr
        td(data-label='Total', style='text-align: left !important;') Available
        td.date(data-label='Date')
        td(data-label='Date') 20
        td(data-label='Date') 0
        td(data-label='Date') 22
        td(data-label='Date') 4
        td(data-label='Date')
          span.blank x
        td(data-label='Date')
          span.blank x
        td(data-label='Date') 13
      tr
        td(data-label='Total', style='text-align: left !important;') Filled
        td.date(data-label='Date')
        td(data-label='Date') 20
        td(data-label='Date') 0
        td(data-label='Date') 22
        td(data-label='Date') 4
        td(data-label='Date')
          span.blank x
        td(data-label='Date')
          span.blank x
        td(data-label='Date') 13
      tr
        td(data-label='Total', style='text-align: left !important;') Filled %
        td.date(data-label='Date')
        td(data-label='Date') 20%
        td(data-label='Date') 0
        td(data-label='Date') 22%
        td(data-label='Date') 4%
        td(data-label='Date') 
          span.blank x
        td(data-label='Date')
          span.blank x
        td(data-label='Date') 13%
      
</template>

<script>

</script>

<style lang="less" scoped>
.blank{
  color: #979797;
  font-weight: normal;
}
.date{
  border-right: 1px solid #979797;
}
.cancelled{
  font-size: 14px;
  padding: 4px 8px;
  color: #979797;
  text-transform: uppercase;
  font-weight: bold;
  background-color: #e4e4e4;
}
.sold{
  font-size: 14px;
  padding: 4px 8px;
  color: #292929;
  text-transform: uppercase;
  font-weight: bold;
  border: 1px solid #292929;
}
.sent{
  font-size: 14px;
  padding: 4px 8px;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  background-color: #292929;
}
.material-icons{
  font-size: 18px;
  vertical-align: middle;
  margin-right: 8px;
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
  padding: 16px;
  text-align: center;
}
table th {
  font-size: 14px;
}
.footer{
  text-align: left;
}
button{
  padding: 0;
  margin: 0;
  text-transform: uppercase;
  text-decoration: underline;
  border: none;
  outline: 0;
  background-color: transparent;
}
tfoot{
  font-weight: bold;
  border-left: 1px solid #979797;
  border-right: 1px solid #979797;
  border-bottom: 1px solid #979797;
  tr{
    border: none;
  }
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
