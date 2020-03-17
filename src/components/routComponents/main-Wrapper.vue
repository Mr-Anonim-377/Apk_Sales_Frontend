<template>
    <div class="main-Wrapper">
      <mainPageComponent/>
      <main-catalog/>
    </div>
</template>

<script>
  import mainPageComponent from './mainPageComponent'
  import MainCatalog from "./main-catalog";
  export default {
        name: "main-Wrapper",
      components: {
        MainCatalog,
        mainPageComponent
      }
    }
</script>

<style scoped>

</style>
