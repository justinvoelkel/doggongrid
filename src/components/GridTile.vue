<template>
  <div class="grid-tile">
    <slot></slot>
  </div>
</template>

<script>
  export default{
    name: 'GridTile'
  }
</script>
<style lang="scss">
  .grid-tile{
      display:flex;
      flex: 1;
  }
</style>
