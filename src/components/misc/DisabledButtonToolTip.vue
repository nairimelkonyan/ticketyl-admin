<template lang="pug">
  button(@click="clicked", @mouseover="$emit('mouseover')") {{name}}
    .tooltip
      p Please indicate that you have read and agree to the Terms and Conditions
</template>

<script>
  export default {
    props: [
      'name'
    ],
    data () {
      return {
        show: false
      }
    },
    methods: {
      clicked () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="less" scoped>
button{
  position: relative;
  transition: 0.3s;
  background-color: #dadada;
  text-transform: uppercase;
  font-size: 18px;
  color: #9a9a9a;
  min-height: 48px;
  padding: 10px 18px;
  border: none;
  outline: none !important;
}
.tooltip {
font-size: 14px;
background: #292929;
bottom: 100%;
color: #fff;
display: block;
left: 0;
right: 0;
margin: auto;
margin-bottom: 15px;
opacity: 0;
padding: 16px;
pointer-events: none;
position: absolute;
width: 100%;
-webkit-transform: translateY(10px);
  -moz-transform: translateY(10px);
  -ms-transform: translateY(10px);
   -o-transform: translateY(10px);
    transform: translateY(10px);
-webkit-transition: all .25s ease-out;
  -moz-transition: all .25s ease-out;
  -ms-transition: all .25s ease-out;
   -o-transition: all .25s ease-out;
    transition: all .25s ease-out;
box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
  -moz-box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
  -ms-box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
   -o-box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
}
/* This bridges the gap so you can mouse into the tooltip without it disappearing */
button .tooltip:before {
bottom: -20px;
content: " ";
display: block;
height: 20px;
left: 0;
position: absolute;
width: 100%;
}
/* CSS Triangles - see Trevor's post */
button .tooltip:after {
border-left: solid transparent 10px;
border-right: solid transparent 10px;
border-top: solid #292929 10px;
bottom: -10px;
content: " ";
height: 0;
left: 50%;
margin-left: -13px;
position: absolute;
width: 0;
}
button:hover .tooltip {
opacity: 1;
pointer-events: auto;
-webkit-transform: translateY(0px);
  -moz-transform: translateY(0px);
  -ms-transform: translateY(0px);
   -o-transform: translateY(0px);
    transform: translateY(0px);
}
/* IE can just show/hide with no transition */
</style>
