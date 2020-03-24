<template>
    <div id="main-catalog">
      {{i}}
      <Header/>
      <Navigation/>
      <CatalogItem/>
      <Footer/>
    </div>
</template>

<script>
  import Header from '@/components/unitComponents/Header'
  import Navigation from '@/components/unitComponents/Navigation'
  import CatalogItem from '../unitComponents/CatalogItem'
  import Footer from '@/components/unitComponents/Footer'
    export default {
    props: ['i'],
        name: 'main-catalog',
      components: {
        Header,
        Navigation,
        CatalogItem,
        Footer
      }
    }
</script>

<style>
  @import '../../../static/CSS/CSS.css';
</style>
