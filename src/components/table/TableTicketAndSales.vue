<template lang="pug">
  table
    thead
      tr.header
        th(scope='col') 
        th(scope='col') Number
        th(scope='col') First Name
        th(scope='col') Last Name
        th(scope='col') Email Address
        th(scope='col') Ticket Type
        th(scope='col') Sub-Event
        th(scope='col') Event Date (Time)
    tbody
      tr
        td(data-label='Action')
          tk-tools-second
        td(data-label='Number') XY38407
        td(data-label='First Name') John
        td(data-label='Last Name') Doe
        td(data-label='Email Address') john@gmail.com
        td(data-label='Ticket Type') Free Ticket
        td(data-label='Sub-Event') Brunch in the Sky
        td(data-label='Event Date') 12.06.2017 (18:00)
      tr
        td(data-label='Action')
          tk-tools-second
        td(data-label='Number') XY38407
        td(data-label='First Name') John
        td(data-label='Last Name') Doe
        td(data-label='Email Address') john@gmail.com
        td(data-label='Ticket Type') Free Ticket
        td(data-label='Sub-Event') Brunch in the Sky
        td(data-label='Event Date') 12.06.2017 (18:00)
      tr
        td(data-label='Action')
          tk-tools-second
        td(data-label='Number') XY38407
        td(data-label='First Name') John
        td(data-label='Last Name') Doe
        td(data-label='Email Address') john@gmail.com
        td(data-label='Ticket Type') Free Ticket
        td(data-label='Sub-Event') Brunch in the Sky
        td(data-label='Event Date') 12.06.2017 (18:00)
      tr
        td(data-label='Action')
          tk-tools-second
        td(data-label='Number') XY38407
        td(data-label='First Name') John
        td(data-label='Last Name') Doe
        td(data-label='Email Address') john@gmail.com
        td(data-label='Ticket Type') Free Ticket
        td(data-label='Sub-Event') Brunch in the Sky
        td(data-label='Event Date') 12.06.2017 (18:00)
      tr.footer
        td(data-label='Total', colspan='8', style='text-align: right;') Total Tickets Sold: 
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
  border-bottom: none;
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
