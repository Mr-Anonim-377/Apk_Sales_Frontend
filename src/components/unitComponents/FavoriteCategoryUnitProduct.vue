<template>
    <div>
      <img class="product"
      src="https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/product.png"
    ></div>
</template>

<script>
export default {
  props: {favoriteCategoryProduct: {
    created: function init () {
      fetch('http://ec2-13-58-76-77.us-east-2.compute.amazonaws.com:8080/productsReviews/all" -H "accept: application/json', {
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
        .then(response => response.json())
        // eslint-disable-next-line
        .then(commits => this.favoriteCategoryProducts = commits)
    }
  }
  }
}
</script>

<style scoped>

</style>
