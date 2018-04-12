<template lang="pug">
  // section
    .select
      .select-options(@click='select')
        span Mr
        i(class="fa fa-angle-down" aria-hidden="true")
      .select-submenu(v-if='selected')
        span Mr
        span Ms
  select(v-on:input="updateInput($event.target.value)")
    option(:value='getValue(s)', v-for='(s,i) in select' :selected="i === 0 ? 'selected' : ''") {{ (s.name)?s.name:s.translations.name.at }}
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'String'
      },
      select: Array,
      valueAttr: {
        type: String,
        default: 'value'
      }
    },
    methods: {
      getValue (option) {
        return option[this.valueAttr] // option['id']
      },
      updateInput (value) {
        if (this.type === 'String') {
          this.$emit('input', value)
        } else if (this.type === 'Number') {
          this.$emit('input', Number(value))
        }
      }
    }
  }
</script>

<style lang="less" scoped>
/*
.select-options{
  width: 100%;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  color: #292929;
  background-color: #fff;
  border: 1px solid #bfbfbf;
  text-align: left;
  .fa{
    float: right;
    margin-top: 5px;
  }
}
.select-submenu{
  font-size: 18px;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #bfbfbf;
  span{
    cursor: pointer;
    display: block;
    &:hover{
      font-weight: bold;
    }
  }
}
*/
select{
  font-size: 18px;
  position: relative;
  cursor: pointer;
  width: 100%;
  border-radius: 0;
  padding: 10px;
  min-height: 48px;
  outline: none !important;
  background: url("../../assets/ic_keyboard_arrow_down_black_24px.svg") no-repeat 98.5% #fff;
  background-size: 20px;
  -webkit-appearance: none;
  border: 1px solid #292929;
}
</style>
