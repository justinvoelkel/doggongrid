<template>
  <dogs-grid/>
</template>

<script>
import DogsGrid from './components/DogsGrid'

export default {
  name: 'App',
  components: {
    DogsGrid
  }
}
</script>
<style>
  :root{
      --primary-color:#6930c3;
      --secondary-color:#80ffdb;
      --base-spacing: 8px;
  }
  .btn {
      background: var(--secondary-color);
      border: none;
      color: var(--primary-color);
      font-size:16px;
      padding: calc(var(--base-spacing) * 2);
  }
  .loading-ring {
      display: inline-block;
      height: calc(var(--base-spacing) * 10);
      width: calc(var(--base-spacing) * 10);
  }
  .loading-ring:after {
      animation: loading-ring 1.2s linear infinite;
      border-radius: 50%;
      border: 6px solid var(--secondary-color);
      border-color: var(--secondary-color) transparent var(--secondary-color) transparent;
      content: " ";
      display: block;
      height: calc(var(--base-spacing) * 8);
      margin: var(--base-spacing);
      width: calc(var(--base-spacing) * 8);
  }
  @keyframes loading-ring {
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
  }

</style>
