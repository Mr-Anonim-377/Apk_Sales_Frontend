<template>
  <div class="CatalogItem">
  <section class = "section">
    <div class="section_main">
      <div class = "main_back main"></div>
      <div class = "main_border">
        <div class = "main_border_row">
          <div class="main_filters ">
            <div class="main_color"></div>
            <div class="main_filter">
              <a class="text_color">Фильры</a>
            </div>
            <div class="main_filter_electr">
              <ul class="main_category_list text_color">
                <li class ="category_list_item">
                  <a class ="category_list_link">Электроника</a>
                </li>
                <li class ="category_list_item">
                  <a class ="category_list_link">Электроника</a>
                </li>
                <li class ="category_list_item">
                  <a class ="category_list_link">Электроника</a>
                </li>
                <li class ="category_list_item">
                  <a class ="category_list_link">Электроника</a>
                </li>
                <li class ="category_list_item list_them">
                  <a class ="category_list_link">Электроника</a>
                </li>
                <li class ="category_list_item list_them_lvl">
                  <a class ="category_list_link">Электроника</a>
                </li>
              </ul>
            </div>
            <div class="filter-range">
              <div class="filter-range-title"><a class="text_prise">Цена(р):</a></div>
              <div class="price-controls">
                <label class="min-price">от <input type="text" name="min-price" value="0"></label>
                <label class="max-price">до <input type="text" name="max-price" value="3000"></label>
              </div>
              <div class="range-controls">
                <div class="scale">
                  <div class="bar"></div>
                </div>
                <div class="range-toggle range-toggle-min"></div>
                <div class="range-toggle range-toggle-max"></div>
              </div>
            </div>
            <div class="main_filter">
              <a class="text_color">Бренды</a>
            </div>
            <div class="main_filter_electr">
              <ul class="main_category_list text_color">
                <li class ="category_list_item">
                  <a class ="category_list_link">Электроника</a>
                </li>
                <li class ="category_list_item">
                  <a class ="category_list_link">Электроника</a>
                </li>
                <li class ="category_list_item">
                  <a class ="category_list_link">Электроника</a>
                </li>
                <li class ="category_list_item">
                  <a class ="category_list_link">Электроника</a>
                </li>
                <li class ="category_list_item">
                  <a class ="category_list_link">Электроника</a>
                </li>
                <li class ="category_list_item">
                  <a class ="category_list_link">Электроника</a>
                </li>
              </ul>
            </div>
            <div class="main_filter">
              <a class="text_color">Коллекции</a>
            </div>
            <div class="main_filter_electr">
              <ul class="main_category_list text_color">
                <li class ="category_list_item">
                  <a class ="category_list_link">Электроника</a>
                </li>
                <li class ="category_list_item">
                  <a class ="category_list_link">Электроника</a>
                </li>
                <li class ="category_list_item">
                  <a class ="category_list_link">Электроника</a>
                </li>
                <li class ="category_list_item">
                  <a class ="category_list_link">Электроника</a>
                </li>
                <li class ="category_list_item">
                  <a class ="category_list_link">Электроника</a>
                </li>
                <li class ="category_list_item">
                  <a class ="category_list_link">Электроника</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="main_section">
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
    export default {
        name: "CatalogItem"
    }
</script>

<style scoped>

</style>
