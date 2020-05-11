<template>
  <div class="section_number">
    <div class="minus"></div>
    <div class="number">{{product_quantity}}</div>
    <div class="plus"></div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCartPieces',
  props: {
    product_quantity: {
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
