<template lang="pug">
  .div
    tk-header-ticketyl
    section
      // tk-price-modifications
      .promotion
        .row
          .col-sm-6
            .promotion-content
              .promotion-body
          .col-sm-6
            .promotion-content
              .promotion-body
                img(src='static/devices_sample.png')
      .promotion-text
        .container
          .row
            .col-sm-6
              .promotion-content
                .promotion-body
                  h1 We make event ticketing easy
                  h3 Speed up creating a ticket shop so you have more time to focus on your event
                  p Change how you do your ticket sales forever
                  tk-primary-button(name='get started for free now')
            .col-sm-6
              .promotion-content
                .promotion-body
      // #pricingPlan
        .container
          h2 Pricing Plans
          p We offer various pricing models so that you can pick
            br
            | and choose the one that suits you best
          carousel-3d
            slide(:index='0')
              .carousel-body
                h2 Event Agency
                h4 2%
                p.fee fee on all ticket sales
                p.status Most Popular
                tk-primary-button(name="Select Plan", style='width: 100%;')
            slide.second(:index='1')
              .carousel-body
                h2 Bigshot
                h4.custom Custom Offer
                p.status Everyone makes money
                tk-secondary-button(name="Select Plan", style='width: 100%;')
            slide.last(:index='2')
              .carousel-body
                h2 Beginner
                h4 50 &#8364;
                p.fee fixed monthly fee
                p.status Safe For Beginners
                tk-secondary-button(name="Select Plan", style='width: 100%;')
      .reason
        .container
          .reason-content
            .reason-body
              .row
                .col-sm-12
                  h2 The reasons to pick Ticketyl
                  h3 Here are the most important features we have created for you
              .row
                .col-sm-4
                  .setup
                    h4 Event Setup
                    p You control all aspect of how your events are set up, scheduled an repeated
                    br
                .col-sm-4
                  .visual
                    h4 Visual Editor
                    p Control the appearance of your event with a what you see is what you get content editor
                .col-sm-4
                  .promotion
                    h4 Promotion
                    p Use premade action plans like issuing tickets or announcing performers or create custom email updates
                .col-sm-4
                  .check-in
                    h4 Check in
                    p Review the ticket details of event participants at the entrance to make sure there are no breaches
                .col-sm-4
                  .analytics
                    h4 Analytics
                    p Get in-depth information about how your ticket sales are doing and which channels are performing the best
      .easy
        .container
          .row
            .col-sm-6.text-left
              .easy-content
                .easy-body
                  h2 Event ticketing can be easy!
                  p With Ticketyl - an event ticketing and management solution.
            .col-sm-6.text-right
              .easy-content
                .easy-body
                  img(src='/static/powered-by-ticketyl@3x.png')
    tk-footer-ticketyl
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'

export default {
  components: {
    Carousel3d,
    Slide
  }
}
</script>

<style lang="less" scoped>
.easy{
  background-image: url('/static/mac_bg.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  .easy-content{
    height: 264px;
    width: 100%;
    display: table;
    .easy-body{
      display: table-cell;
      vertical-align: middle;
      h2,p{
        color: #fff;
      }
      p{
        font-size: 18px;
      }
      img{
        height: 56px;
      }
    }
  }
}
.promotion-text{
  margin-top: -600px;
  h3{
    margin-bottom: 32px;
  }
  p{
    font-size: 18px;
    margin-bottom: 24px;    
  }
}
.reason{
  background-color: #fff;
  .reason-content{
    height: 600px;
    width: 100%;
    display: table;
    .reason-body{
      display: table-cell;
      vertical-align: middle;
      .setup{
        background-color: #fff;
        background-image: url('/static/icn_main_setup.svg');
        background-repeat: no-repeat;
        background-position: left;
        h4,p{
          margin-left: 80px;
        }
      }
      .visual{
        background-color: #fff;
        background-image: url('/static/icn_visual_editor.svg');
        background-repeat: no-repeat;
        background-position: left;
        h4,p{
          margin-left: 80px;
        }
      }
      .promotion{
        background-color: #fff;
        background-image: url('/static/icn_promotion.svg');
        background-repeat: no-repeat;
        background-position: left;
        h4,p{
          margin-left: 80px;
        }
      }
      .check-in{
        background-color: #fff;
        background-image: url('/static/icn_ticket_settings.svg');
        background-repeat: no-repeat;
        background-position: left;
        h4,p{
          margin-left: 80px;
        }
      }
      .analytics{
        background-color: #fff;
        background-image: url('/static/icn_analytics.svg');
        background-repeat: no-repeat;
        background-position: left;
        h4,p{
          margin-left: 80px;
        }
      }
      h2,h3{
        text-align: center;
        max-width: 570px;
        margin: auto;
      }
      h2{
        margin-bottom: 24px;
      }
      h3{
        margin-bottom: 62px;
      }
      p{
        max-width: 300px;
      }
      .col-sm-4{
        height: 160px;
      }
    }
  }
}        
.promotion, .promotion-text{
  overflow: hidden;
  background-color: #f7f7f7;
  .promotion-content{
    height: 600px;
    width: 100%;
    display: table;
    .promotion-body{
      display: table-cell;
      vertical-align: middle;
      img{
        float: right;
        height: 500px;
      }
    }
  }
}
#pricingPlan{
  text-align: center;
  padding: 50px 0;
  h2{
    margin-bottom: 20px;
  }
  p{
    font-weight: bold;
  }
}
.carousel-3d-container{
  overflow: visible !important;
  margin: 100px 0;
  .carousel-3d-slider{
    perspective: 2000px !important;
    width: 310px !important;
  }
}
.carousel-3d-slide{
  background-color: #fff;
  text-align: center;
  padding: 20px;
  width: 310px !important;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
  border: none;
  display: table;
  .carousel-body{
    display: table-cell;
    vertical-align: middle;
    &:hover{
      cursor: pointer;
    }
    h2{
      margin-bottom: 10px;
    }
    h4{
      color: #9a9a9a;
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .fee{
      font-size: 14px;
      font-weight: bold;
      color: #9a9a9a;
    }
    .status{
      font-size: 14px;
      font-weight: bold;
      color: #292929;
    }
    .custom{
      font-size: 24px;
    }
  }
}
</style>
