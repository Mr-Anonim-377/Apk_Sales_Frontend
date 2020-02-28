<template>
  <ul class = "circle">
  <li class="article" href=""> <img class="article_pictures"  v-bind:src="imagePatch.imagePatch"  />
    <br>
    {{collection.collectionName}}
  </li>
  </ul>
</template>

<script>

export default {
  props: {
    collection: {},
    imagePatch: String
  },

  created: function init () {
    fetch('http://ec2-13-58-76-77.us-east-2.compute.amazonaws.com:8080/image/' + this.collection.imageId)
      .then(response => response.json())
      // eslint-disable-next-line
      .then(commits => this.imagePatch = commits)
  }
}
</script>

<style>

</style>
