<template lang="pug">
  section
    div
      tk-input-type-text.select(
        ref="input"
        v-bind:value="time"
        v-on:input="update"
        v-on:keypress="validateKey"
        @focus="select"
        :name='name'
        :placeholder='placeholder'
        maxlength="5"
      )
</template>

<script>
  import moment from 'moment'
  export default {
    props: ['name', 'placeholder', 'value'],
    data () {
      return {
        time: null
      }
    },
    methods: {
      select () {
        this.$refs.input.$el.select()
      },
      validateKey (event) {
        if (event.key !== 'Backspace' && isNaN(parseInt(event.key))) {
          event.preventDefault()
        }
      },
      update (time) {
        if (typeof time === 'string') {
          this.time = this.parse(time)
          var convertedMoment = moment(this.time, 'HH:mm', true)
          if (convertedMoment.isValid()) {
            this.$emit('input', convertedMoment)
          } else {
            this.$emit('input', null)
          }
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
        this.time = this.parse(time)
      }
    },
    mounted () { this.load(this.value) },
    watch: {
      value (value) { this.load(value) }
    }
  }
</script>

<style lang="less" scoped></style>