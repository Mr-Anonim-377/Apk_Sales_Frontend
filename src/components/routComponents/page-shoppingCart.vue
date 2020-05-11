<template>
  <div class="page-shoppingCart">
    <Header/>
    <Navigation/>
    <ShoppingCardBody />
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/unitComponents/Header'
import Navigation from '@/components/unitComponents/Navigation'
import ShoppingCardBody from '../unitComponents/ShoppingCardBody'
import Footer from '@/components/unitComponents/Footer'
export default {
  name: 'page-shoppingCart',
  components: {
    Header,
    Navigation,
    ShoppingCardBody,
    Footer
  }
}
</script>

<style scoped>

</style>
