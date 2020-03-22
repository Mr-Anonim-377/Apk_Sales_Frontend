<template>
  <div id="container_circle" class="container_circle collections_carousel">
    <button class="triangle_top"></button>
    <div class="gallery">
      <CollectionsCaruselUnit v-for = "collection in collections" :collection="collection"></CollectionsCaruselUnit>
    </div>
    <button class="triangle_bottom"></button>
  </div>
</template>
<script>
import CollectionsCaruselUnit from './CollectionsCaruselUnit'

export default {
  data () {
    return {collections: []
    }
  },
  components: {CollectionsCaruselUnit},
  created: function init () {
    fetch('http://ec2-13-58-76-77.us-east-2.compute.amazonaws.com:8080/collection/all')
      .then(response => response.json())
      // eslint-disable-next-line
      .then(commits => this.collections = commits)
  }

}

</script>
<style>
</style>
