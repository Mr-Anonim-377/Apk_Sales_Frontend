<template>
  <header class="header">
    <div class="head_body">
      <div class="head_logo"></div>
      <div class="container">
        <div class="row_news">
          <p class="row_logo">
            <img
              class="logo_pictures"
              src="https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/Logotip.png"
            >
          </p>
          <form action method="get" class="input">
            <input class="input_search" type="search" name="q" placeholder="Искать здесь..">
            <input class="input_botton" type="button">
          </form>
          <div class="basket_regist">
            <div class="basket">
              <div class="basket_product_count">
                {{shopingCart.countProducts === null || shopingCart.countProducts === "0"
                ?0
                :shopingCart.countProducts}}
              </div>
              <img src="https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/Korzina.png"
              >
            </div>
            <div class="login_picture">
              <img src="https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/log_in 1.png"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>


<script>
  export default {
    data() {
      return {
        shopingCart: {}
      }
    },
    created: function init() {
      fetch(HOST + '/shoppingCart/cart', {
        method: 'get',
        credentials: 'include'
      }).then(response => response.json())
      // eslint-disable-next-line
        .then(commits => this.shopingCart = commits)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
