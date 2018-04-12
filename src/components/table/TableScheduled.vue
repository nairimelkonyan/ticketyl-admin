<template lang="pug">
  table
    thead
      tr.header
        th(scope='col') Subject
        th(scope='col') Sent To
        th(scope='col') Message
        th(scope='col') Sending Date (TimeS)
        th(scope='col', style='text-align: right;') Status
    tbody
      tr
        td(data-label='Subject') 
          tk-tools-second(style='margin-right: 16px;')
          | Summer Discounts
        td(data-label='Sent To') All Attendees
        td(data-label='Message') Hello there, people! Summer is here ...
        td(data-label='Sending Date') 13.06.2017 (16:00)
        td(data-label='Status', style='font-size: 12px; text-align: right;')
          strong Scheduled
      tr
        td(data-label='Subject') 
          tk-tools-second(style='margin-right: 16px;')
          | Summer Discounts
        td(data-label='Sent To') All Attendees
        td(data-label='Message') Hello there, people! Summer is here ...
        td(data-label='Sending Date') 13.06.2017 (16:00)
        td(data-label='Status', style='font-size: 12px; text-align: right;')
          strong Scheduled
      tr
        td(data-label='Subject') 
          tk-tools-second(style='margin-right: 16px;')
          | Summer Discounts
        td(data-label='Sent To') All Attendees
        td(data-label='Message') Hello there, people! Summer is here ...
        td(data-label='Sending Date') 13.06.2017 (16:00)
        td(data-label='Status', style='font-size: 12px; text-align: right;')
          strong Scheduled
      tr.footer
        td(data-label='Total', colspan='5', style='text-align: right;') Total Emails: 
          strong 3
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
  padding: 18px 8px;
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
