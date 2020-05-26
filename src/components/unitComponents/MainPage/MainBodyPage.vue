<template>
  <section class="section">
    <div class="section_main">
      <div class="main"></div>
      <div class="main_container">
        <div class="row_custom">
          <div class="row_carousel min_size">
            <CollectionsCarusel/>
          </div>
          <div class="main_container_also">
            <BanersBodyPage :baners="baners"/>
            <FavoriteCategoriesCarusel/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import CollectionsCarusel from './MainPageCollectionsCarusel'
import BanersBodyPage from './BanersBodyPage'
import FavoriteCategoriesCarusel from './FavoriteCategoriesCarusel'
export default {
  props: {
    baners: []
  },
  components: { CollectionsCarusel, BanersBodyPage, FavoriteCategoriesCarusel }
}
</script>
<style>
  .min_size {
    min-width: 200px;
    min-height: 1400px;
  }
</style>
