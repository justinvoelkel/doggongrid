<template>
  <select class="content-filter" @change="runCb" v-model="selection">
    <option disabled selected>Select a specific breed</option>
    <option :value="null">None</option>
    <option v-for="(option, index) in options" :value="option" :key="index">{{option}}</option>
  </select>
</template>
<script>
  export default{
    name: 'ContentFilter',
    props:{
      options: {
        type: Array,
        default(){
          return []
        }
      },
      cb: {
        type: Function
      }
    },
    data(){
      return {
        selection: 'Select a specific breed'
      }
    },
    methods:{
      runCb(){
        // check for custom callback to fire first
        if(this.cb){
          this.cb(this.selection)
          return
        }
        // fall back to emitting to parent if no cb passed in
        this.$emit('selection', this.selection)
      }
    }
  }
</script>
<style>
  .content-filter{
      background: white;
      border:1px solid var(--primary-color);
      padding: calc(var(--base-spacing) * 2);
      font-size:16px;
  }
</style>
