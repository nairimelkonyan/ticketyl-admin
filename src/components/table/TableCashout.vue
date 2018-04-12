<template lang="pug">
  table
    thead
      tr.header
        th(scope='col') Date (Time)
        th(scope='col') Payment Method
        th(scope='col') VAT
        th(scope='col') Amount
        th(scope='col') 
        th(scope='col', style='text-align: right;') Status
    tbody
      tr
        td(data-label='Date') 13.06.2017 (22:00)
        td(data-label='Method') 
          strong SEPA, 
          | **** 3852, Swedbank (Eur, Latvia)
        td(data-label='Vat') 646.38 $
        td(data-label='Amount') 
          strong 3 402.00 $
        td(data-label='PDF')
          i.material-icons file_download
          button PDF Report
        td(data-label='Status') 
          span.schedule 
            .material-icons schedule
            | Processing
      tr
        td(data-label='Date') 13.06.2017 (22:00)
        td(data-label='Method')
          strong SEPA, 
          | **** 3852, Swedbank (Eur, Latvia)
        td(data-label='Vat') 646.38 $
        td(data-label='Amount')
          strong 3 402.00 $
        td(data-label='PDF')
          i.material-icons file_download
          button PDF Report
        td(data-label='Status') 
          span.sent 
            .material-icons check_circle
            | Sent
      tr
        td(data-label='Date') 13.06.2017 (22:00)
        td(data-label='Method')
          strong SEPA, 
          | **** 3852, Swedbank (Eur, Latvia)
        td(data-label='Vat') 646.38 $
        td(data-label='Amount')
          strong 3 402.00 $
        td(data-label='PDF')
          i.material-icons file_download
          button PDF Report
        td(data-label='Status')
          span.sent 
            .material-icons check_circle
            | Sent
      tr.footer
        td(data-label='Total', colspan='6', style='text-align: right;') Total Cashouts: 
          strong 3
</template>

<script>

</script>

<style lang="less" scoped>
.schedule{
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
  padding: 18px 8px;
  text-align: left;
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
