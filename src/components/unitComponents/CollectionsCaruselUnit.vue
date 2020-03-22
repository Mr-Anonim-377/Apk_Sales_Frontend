<template>
  <div class = "circle">
  <div class="article">
    <img
      class="article_pictures"
      :src="imagePatch.imagePatch"
    />
    <br>
    {{collection.collectionName}}
  </div>
  </div>
</template>

<script>

export default {
  props: {
    collection: [],
    imagePatch: String
  },

  created: function init () {
    fetch('http://ec2-13-58-76-77.us-east-2.compute.amazonaws.com:8080/image/' + this.collection.image.imageId)
      .then(response => response.json())
      // eslint-disable-next-line
      .then(commits => this.imagePatch = commits)
  }
}

</script>

<style>

</style>
