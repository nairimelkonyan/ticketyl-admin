<template lang="pug">
  section
    tk-header-admin
    .content
      .container
        .menu
          .row
            .col-sm-6.text-left
              .menu-content
                .menu-body
                  h5  Step 1 of 3
                  h2 Organization Setup 
                  p We need this info to tailor your Ticketyl experience
            .col-sm-6.text-right
              .menu-content
                .menu-body
                  button(@click='skip').action Skip this step
                  tk-primary-button(name='next step - shop', @click='goTo')
        main
          .business-industry
            .row
              .col-sm-8.col-sm-offset-2
                .business-content
                  h4 Business Industry
                  p Which of the following classifications would describe your business the best?
                  .row
                    .col-sm-5.col-sm-offset-1
                      p Business Type
                    .col-sm-6
                      tk-custom-select-string(:options='category', v-model='info.business_type')
          .organization-type
            .row
              .col-sm-8.col-sm-offset-2
                .organization-content
                  h4 Organization Type
                  p Which of these statements describes you the best?
                  .row
                    .col-sm-11.col-sm-offset-1
                      form(action='')
                        input#single(type='radio', name='ticket', value='single', @click='hide', v-model='info.organization_type')
                        label(for="single") It is just me doing the event
                        input#team(type='radio', name='ticket', value='team', @click='show', v-model='info.organization_type')
                        label(for="team") We are a small team doing an event
                        input#pro(type='radio', name='ticket', value='pro', @click='show', v-model='info.organization_type')
                        label(for="pro") We are a pro event agency doing several events
                transition(name='slide-fade')
                  .business(v-if='business')
                    .details-content
                      h4 Business details
                      .row
                        .col-sm-5.col-sm-offset-1
                          p Company Name
                        .col-sm-6
                          tk-input-type-text(v-model='info.business_details.company_name')
                      .row
                        .col-sm-5.col-sm-offset-1
                          p Registration No.
                        .col-sm-6
                          tk-input-type-text(v-model='info.business_details.registration_no')
                      .row
                        .col-sm-5.col-sm-offset-1
                          p Tax Number
                        .col-sm-6
                          tk-input-type-text(v-model='info.business_details.tax_no')
                    .address-content
                      h4 Business address
                      .row
                        .col-sm-5.col-sm-offset-1
                          p Country
                        .col-sm-6
                          tk-custom-select-string(:options='countries', v-model='info.business_address.country', style='margin-bottom: 24px;', )
                      .row
                        .col-sm-5.col-sm-offset-1
                          p Street, Address, Number
                        .col-sm-6
                          tk-input-type-text(v-model='info.business_address.street_address')
                      .row
                        .col-sm-5.col-sm-offset-1
                          p City / Province
                        .col-sm-6
                          tk-input-type-text(v-model='info.business_address.city')
                      .row
                        .col-sm-5.col-sm-offset-1
                          p ZIP / Postal Code
                        .col-sm-6
                          tk-input-type-text(v-model='info.business_address.zip')
    tk-footer-admin-white(:active='1', name='next step - shop', @click='goTo')
</template>

<script>
  import * as types from '@/store/mutation-types'
  // import store from '@/store'

  export default {
    data () {
      return {
        info: {
          business_type: 'Tourist attraction',
          organization_type: '',
          business_details: {
            company_name: '',
            registration_no: '',
            tax_no: ''
          },
          business_address: {
            country: 'Austria',
            street_address: '',
            city: '',
            zip: ''
          }
        },
        business: false,
        category: [ 'Tourist attraction', 'Camp, trip', 'Fitness', 'Concert, theatrical performance', 'Conference', 'Workshop', 'Studio', 'Dinner, Ball, Gala', 'Exhibition, fair, tradeshow', 'Networking event', 'Party', 'Racing, rally', 'Seminar', 'Tour', 'Sports game', 'Classes', 'Spa/Massage/Saloon' ],
        countries: [
          'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia',
          'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia',
          'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia',
          'Slovenia', 'Spain', 'Sweden', 'United Kingdom'
        ]
      }
    },
    methods: {
      skip () {
        this.$router.push({name: 'Shop'})
      },
      goTo () {
        const configuration = {
          business_type: this.info.business_type,
          organization_type: this.info.organization_type,
          billing_country: this.info.business_address.country,
          billing_city: this.info.business_address.city,
          billing_address: this.info.business_address.address,
          billing_zip: this.info.business_address.zip
        }
        this.$store.commit(types.ADD_ORGANIZATION, { configuration: configuration })
        this.$router.push({name: 'Shop'})
      },
      show () {
        this.business = true
      },
      hide () {
        this.business = false
      }
    }
  }
</script>

<style lang="less" scoped>
button{
  outline: none;
}
.address-content{
  padding-bottom: 8px;
  margin-bottom: 27px;
  p{
    margin-top: 12px;
  }
  input[type='text']{
    margin-bottom: 24px;
  }
}
.details-content{
  padding-bottom: 8px;
  margin-bottom: 27px;
  border-bottom: 1px solid #979797;
  p{
    margin-top: 12px;
  }
  input[type='text']{
    margin-bottom: 24px;
  }
}
form{
  label{
    &:last-child{
      margin-bottom: 0;
    }
  }
}
main{
  padding-bottom: 120px;
}
.action{
  padding: 0;
  border: none;
  text-transform: uppercase;
  text-decoration: underline;
  background-color: transparent;
}
h4{
  margin-top: 0;
  margin-bottom: 18px;
  +p{
    margin-bottom: 56px;
  }
}
.organization-content{
  padding-bottom: 32px;
  margin-bottom: 27px;
  border-bottom: 1px solid #979797;
  p{
    margin-bottom: 24px;
  }
}
.business-content{
  padding-bottom: 32px;
  margin-bottom: 27px;
  border-bottom: 1px solid #979797;
  p{
    margin-top: 14px;
  }
}
.menu{
    margin-bottom: 20px;
    border-bottom: 1px solid #979797;
  .menu-content{
      display: table;
      height: 150px;
      width: 100%;
    .menu-body{
      display: table-cell;
      vertical-align: middle;
      h5{
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
      }
      h2{
        margin: 0 0 16px 0;
      }
      p{
        font-weight: bold;
        margin: 0;
      }
      button{
        margin-left: 48px;
        &:first-child{
          margin: 0;
        }
      }
    }
  }              
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>
