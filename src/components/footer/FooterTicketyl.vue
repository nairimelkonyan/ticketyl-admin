<template lang="pug">
  footer
    .container
      .panel.hidden-lg.hidden-md.hidden-sm
        #headingOne.panel-heading(role='tab')
          h4.panel-title(role='button', data-toggle='collapse', data-parent='#accordion', href='#collapseOne', aria-expanded='false', aria-controls='collapseOne')
            a.collapse-footer-button
              | Relevant links
            i.material-icons keyboard_arrow_down
        #collapseOne.panel-collapse.collapse.out(role='tabpanel', aria-labelledby='headingOne')
          .panel-body
            ul
              li
                router-link(:to="{name: 'About'}") About
              li
                router-link(:to="{name: 'Faq'}") FAQ
              li
                router-link(:to="{name: 'Contact'}") Contact
              li
                router-link(:to="{name: 'Privacy'}") Privacy policy
              li
                router-link(:to="{name: 'Imprint'}") Imprint
              li
                router-link(:to="{name: 'Terms'}") Terms and conditions
        img(src='static/ticketyl.png').img-responsive.footer-img.footer-img-2
        p.footer-paragraph © 
              strong SKY TICKETING LIMITED 2017
      #main-footer.hidden-xs
        .row
          .col-sm-4
            .footer-wrapper
              .footer-body
                a(href="#")
                  img(src='static/ticketyl.png').img-responsive.footer-img
                p Payment Providers
                img(src='static/visa.png')
                img(src='static/paypal.png')
                img(src='static/master_card.png')
                img(src='static/american_express.png')
          .col-sm-4
            .footer-wrapper
              .footer-body
                p Secure website
                img(src='static/stripe.png')
                img(src='static/ssl.png')
          .col-sm-4
            .footer-wrapper
              .footer-body
                ul
                  li
                    router-link(:to="{name: 'Faq'}") FAQ
                  li
                    router-link(:to="{name: 'About'}") About
                  li
                    router-link(:to="{name: 'Imprint'}") Imprint
                ul
                  li
                    router-link(:to="{name: 'Contact'}") Contact us
                  li
                    router-link(:to="{name: 'Privacy'}") Privacy policy
                  li
                    router-link(:to="{name: 'Terms'}") Terms and conditions
      .row.hidden-xs
        .col-md-12
          .footer-bottom
            p © 
              strong SKY TICKETING LIMITED 2017
</template>

<script>
</script>

<style lang="less" scoped>
#main-footer{
  border-bottom: 1px solid #9a9a9a;
  padding-bottom: 40px;
  margin-bottom: 32px;
}
.footer-bottom {
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  p{
    margin: 0;
  }
}
.footer-wrapper {
  display: table;
  width: 100%;
  height: 200px;
}
.footer-body {
  display: table-cell;
  vertical-align: bottom;
  img {
    height: 33px;
    margin-right: 8px;
  }
}
.panel-title .material-icons {
  -ms-transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
[aria-expanded="false"] .material-icons {
  -ms-transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
[aria-expanded="true"] .material-icons {
  -ms-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
footer{
  background-color: #fff;
  padding: 0 0 32px 0;
  .footer-logo{
    text-align: left;
  }
  .footer-img{
    height: 40px;
    margin-bottom: 46px;
  }
  ul{
    float: right;
    margin: 0;
    padding: 0;
    padding-left: 104px;
    list-style-type: none;
    &:last-child{
      padding: 0;
    }
    li{
      text-align: right;
    }
  }
  a{
    transition: 0.3s;
    text-decoration: none;
    text-transform: capitalize;
    font-size: 12px;
    line-height: 28px;
    color: #292929;
    &:hover{
      text-decoration: none;
      font-size: 12px;
      color: #9a9a9a;
    }
  }
  .material-icons{
    transition: 0.1s;
    font-size: 20px;
    position: absolute;
    right: 0;
    top: 3px;
  }
}
#headingOne {
  border-bottom: 1px solid #979797;
}
.footer-img-2 {
  margin-top: 16px !important;
  margin-bottom: 16px !important;
}
.footer-paragraph  {
  text-align: center;
}
.panel{
  box-shadow: none;
  border-radius: 0;
  margin-bottom: 8px;
}
.panel-heading{
  padding: 10px 0;
}
.panel-title{
  position: relative;
}
.panel-body{
  padding: 16px 0 0 0;
}
.collapse-footer-button{
  text-transform: uppercase;
  color: #292929;
  font-size: 14px;
  font-weight: normal;
}
.collapse-footer-button:hover{
  text-transform: uppercase;
  color: #292929;
  font-size: 14px;
  font-weight: normal;
}
/* Media Queries */
/* Extra Small */
@media(min-width:0px) and (max-width:767px){
  footer{
    padding: 10px 0;
    ul{
      float: none;
      padding: 0;
      li{
        text-align: center;
      }
    }
    .panel-title{
      text-align: left;
    }
    .footer-img{
    margin: 0 auto;
    margin-bottom: 10px;
    }
    .footer-sky-ticketing{
        display: block;
        text-align: center;
    }
  }
}
</style>