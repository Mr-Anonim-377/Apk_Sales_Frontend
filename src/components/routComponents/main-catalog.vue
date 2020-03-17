<template>
    <div class="main-catalog">
      <Header/>
      <Navigation/>
      <CatalogItem/>
      <Footer/>
    </div>
</template>

<script>
  import Header from '@/components/unitComponents/Header'
  import Navigation from '@/components/unitComponents/Navigation'
  import CatalogItem from "../unitComponents/CatalogItem"
  import Footer from '@/components/unitComponents/Footer'
    export default {
        name: "main-catalog",
      components: {
        Header,
        Navigation,
        CatalogItem,
        Footer
      }
    }
</script>

<style scoped>

</style>
