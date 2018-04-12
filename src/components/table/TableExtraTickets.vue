<template lang="pug">
  table
    thead
      tr.header
        th(scope='col') * Ticket name
        th(scope='col') * Quantity
        th(scope='col') Price
        th
    tbody
      tr
        td(data-label='Ticket name')
          tk-input-type-text(placeholder='Early bird')
        td(data-label='Quantity')
          tk-input-type-text(placeholder='450')
        td(data-label='Price')
          tk-input-type-text-admin-currency(placeholder='200.00')
        td
          tk-tools
      tr
        td(data-label='Ticket name')
          tk-input-type-text(placeholder='Early bird')
        td(data-label='Quantity')
          tk-input-type-text(placeholder='450')
        td(data-label='Price')
          tk-input-type-text-admin-currency(placeholder='200.00')
        td
          tk-tools
      tr
        td(data-label='Ticket name')
          tk-input-type-text(placeholder='Early bird')
        td(data-label='Quantity')
          tk-input-type-text(placeholder='450')
        td(data-label='Price')
          tk-input-type-text-admin-currency(placeholder='200.00')
        td
          tk-tools
      tr.footer
        td(data-label='Total', colspan='4')
          tk-secondary-button(name='add paid ticket')
          tk-secondary-button(name='add free ticket')
          tk-secondary-button(name='add donation ticket')
          p.total Total tickets: 
              strong 600
</template>

<script>

</script>

<style lang="less" scoped>
.total{
  margin-top: 12px;
  float: right;
  text-transform: uppercase;
}
button{
  margin-right: 24px;
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
    cursor: pointer;
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
  padding: 16px 8px;
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
