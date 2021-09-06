<template>
<div class="doggon-grid">
  <slot></slot>
</div>
</template>
<script>
  export default{
    name: 'ResponsiveGrid'
  }
</script>
<style lang="scss">
  .doggon-grid{
      display: flex;
      flex-flow: row wrap;
      align-items: stretch;
  }
</style>
