<template>
  <div id="main-catalog">
    <Header/>
    <Navigation/>
    <CatalogItem
      :categoryId="categoryId"
      :page="page"
      :collectionIds="collectionIds"
      :priceMin="priceMin"
      :priceMax="priceMax"
    />
    <Footer/>
  </div>
</template>

<script>
  import Header from '../unitComponents/Header'
  import Navigation from '@/components/unitComponents/Navigation'
  import CatalogItem from '../unitComponents/CatalogItem'
  import Footer from '@/components/unitComponents/Footer'

  export default {
    props: ['categoryId', 'page', 'collectionIds', 'priceMin', 'priceMax'],
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
