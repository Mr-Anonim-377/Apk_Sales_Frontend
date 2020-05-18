<template>
  <div class="item_autocomplete">
    <span>{{ item.name }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      item: { required: true },
      searchText: { required: true }
    }
  }
</script>
<style type="text/css">
  .item_autocomplete {
  }
</style>
