<template>
  <div id="page-itemCard">
    {{i}}
    <Header/>
    <Navigation/>
    <ItemCardBody/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/unitComponents/Header'
import Navigation from '@/components/unitComponents/Navigation'
import ItemCardBody from '../unitComponents/ItemCardBody'
import Footer from '@/components/unitComponents/Footer'
export default {
  props: ['i'],
  name: 'page-itemCard',
  components: {
    Header,
    Navigation,
    ItemCardBody,
    Footer
  }
}
</script>

<style>
</style>
