<template>
  <div id="mainPageComponent">
    <Header/>
    <Navigation/>
    <CurrentBaner/>
    <BodyPage/>
    <Footer/>
  </div>
</template>
<script>
import Header from '@/components/unitComponents/Header'
import Navigation from '@/components/unitComponents/Navigation'
import CurrentBaner from '@/components/unitComponents/CurrentBaner'
import BodyPage from '@/components/unitComponents/BodyPage'
import Footer from '@/components/unitComponents/Footer'
export default {
  name: 'mainPageComponent',
  components: {
    Header,
    Navigation,
    CurrentBaner,
    BodyPage,
    Footer
  }
}
</script>

<style scoped>

</style>
