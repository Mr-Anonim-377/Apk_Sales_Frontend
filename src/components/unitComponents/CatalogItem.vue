<template>
  <div class="CatalogItem">
  <section class = "section">
    <div class="section_main">
      <div class = "main_back main"></div>
      <div class = "main_border">
        <div class = "main_border_row">
          <CatalogItemFilter/>
          <div class="main_section">
            <CatalogItemProduct
              v-for = "productCategory in products"
              :productCategory="productCategory"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
import CatalogItemProduct from './CatalogItemProduct'
import CatalogItemFilter from './CatalogItemFilter'
export default {
  name: 'CatalogItem',
  data () {
    return {products: []}
  },
  components: {CatalogItemProduct,
    CatalogItemFilter},
  created: function init () {
    fetch(process.env.HOST + '/api/products/category', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({categoryId: 1, page: 0})
    })
      .then(response => response.json())
      // eslint-disable-next-line no-return-assign
      .then(commits => this.products = commits)
      .catch(function (error) {
        console.log('Request failed', error)
      })
  }
}
</script>

<style scoped>

</style>
