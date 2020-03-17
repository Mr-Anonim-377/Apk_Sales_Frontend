<template>
  <div id="app">
    <v-container>
<!--      <router-view/>-->
      <main-Wrapper/>
    </v-container>
  </div>
</template>
<script>
  import mainWrapper from './components/routComponents/main-Wrapper'
export default {
  name: 'app',
  components: {
    mainWrapper
  }
}
</script>
