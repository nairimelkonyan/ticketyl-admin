<template lang="pug">
  section
    div
      tk-input-type-text.select(
        ref="input",
        v-bind:value="time"
        v-on:input="update",
        :name='name',
        :placeholder='placeholder',
        maxlength="5"
      )

</template>

<script>
  // import moment from 'moment'
  export default {
    props: ['name', 'placeholder', 'value'],
    data () {
      return {
        time: null,
        amount: null,
        currency: null
      }
    },
    methods: {
      update: function (time) {
        this.time = this.parse(time)
        this.formatInput()
        if (this.time.length === 5) { // if moment.validDate()
          // on load: if string, convert to moment
          // on focus, select all
          // Konvertēt string uz moment
          // var converted_moment = moment.now()
          // converted_moment.hours(5)
          // converted_moment.minutes(20)
          // this.$emit('input', converted_moment)

          /*
            {
                amount: 12000,
                currency: this.currency
            }
          */
        } else {
          this.$emit('input', null)
        }
      },
      parse (time) {
        if (!time) { return '' }
        var result = ''
        time = time.replace(':', '')
        for (var i in time.split('')) {
          var num = parseInt(time.split('')[i])
          if (!isNaN(num)) {
            result += num.toString()
            if (parseInt(i) === 1) { result += ':' }
          }
          if (parseInt(i) > 2) { break }
        }
        return result
      },
      formatInput () {
        this.$refs.input.time = this.parse(this.time)
      },
      load (time) {
        // parse time
        this.time = time
      }
    },
    mounted () { this.load(this.value) },
    watch: {
      value (value) { this.load(value) }
    }
  }
</script>

<style lang="less" scoped>
  .input-translation {

    > div {
      position: relative;

      .dropdown {
        position: absolute;
        right: 0px;
        top: 0px;
        height: 100%;

        a.dropdown-toggle {
          position: absolute;
          top: 50%;
          right: 0px;
          padding: 0px 10px;
          white-space: nowrap;
          font-size: 16px;
          line-height: 24px;
          text-decoration: none;
          cursor: pointer;
          margin-top: -12px;

          * { vertical-align: middle; }

          .material-icons{
            font-size: 14px;
          }
        }
        .dropdown-menu {
          left: auto;
          right: 0px;
          top: 100%;
          padding: 0px;
          float: none;
          min-width: 0;
          margin: 0px;
          margin-top: -2px;
          margin-right: -1px;

          .dropdown-item {
            position: relative;
            display: block;
            padding: 10px 30px;
            text-decoration: none;
            border-top: 1px solid #cecece;
            cursor: pointer;

            &:first-child {
              border: none;
            }
          }
        }
      }
    }
  }
</style>
