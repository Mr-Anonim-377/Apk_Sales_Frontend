<template>
  <a v-bind:href="'http://localhost:8081/collection/collectionId=' + collection.collectionId +
            '&page=1&categoryIds=&price-min=&price-max='">
    <div class = "circle">
      <div class="article">
        <img
          class="article_pictures"
          :src="collection.image.imagePatch"
        />
        {{collection.collectionName}}
      </div>
    </div>
  </a>
</template>

<script>

export default {
  props: {
    collection: {}
  }
}

</script>

<style scoped>

</style>
