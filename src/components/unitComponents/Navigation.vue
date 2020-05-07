<template>
  <section class="section_nav">
    <div class="section_main">
      <div class="head_nav"></div>
      <div class="container container_nav">
        <div class="row_nav">
          <nav class="nav">
            <ul class="nav_product">
              <li class="nav_product_name" @click="isVisible = true" v-on-clickaway="onClickOutside">
                <div class="nav_category">Категории</div>
                <div class="nav_list">
                  <div class="nav_list_circle top"></div>
                  <div class="nav_list_circle buttom"></div>
                </div>
                <div class="category_pop_up" v-if="isVisible">
                  <div class="category_pop_up__blur"></div>
                  <div class="category_pop_up__result">
                    <div style="display: flex;">
                      <div class="category_pop_up__main_container_right_non" style="text-align: left;">
                        <div class="category_pop_up__unit_container"
                             v-for="(category,index) in navigtion.categoriesNavigation">
                        <div class="category_pop_up_main_unit_container_row"
                             v-bind:style="indexOfColored(index)"
                             @mouseover="mouseOverToCategory(category.childCategory, index)"
                             @mouseout="setColor(true,index)"
                        >
                          <a class="category_pop_up_main_unit text_unit_margin text_bold main_unit_text"
                             v-bind:href="'http://localhost:8081/catalog/' + category.categoryId + '&' + 1 + '&' + '&'+ '&'">
                            {{category.categoryName}}
                          </a>
                        </div>
                        </div>
                      </div>
                      <div class="category_pop_up__main_container_left_non">
                        <div class="category_pop_up__unit_container unit_container_width"
                             v-for="category in subCategory"
                             >
                          <div class="category_pop_up_main_unit_container_row unit_row_margin">
                            <a class="category_pop_up_main_unit sub_text_unit_margin text_bold"
                               v-bind:href="'http://localhost:8081/catalog/' + category.categoryId + '&' + 1 + '&' + '&'+ '&'">
                              {{category.categoryName}}
                            </a>
                          </div>
                          <div class="category_pop_up_main_unit_container_row"
                               v-for="subCategory in category.childCategory">
                            <a class="sub_text_unit_margin category_pop_up_main_unit"
                               v-bind:href="'http://localhost:8081/catalog/' + subCategory.categoryId + '&' + 1 + '&' + '&'+ '&'">
                              {{subCategory.categoryName}}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <NavigationUnit v-for="(favoriteCategory,index) in navigtion.favoriteCategories"
                              v-if="index<5" :favoriteCategory="favoriteCategory"></NavigationUnit>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import NavigationUnit from './NavigationUnit'
  import {directive as onClickaway} from 'vue-clickaway'

  export default {
    directives: {
      onClickaway: onClickaway
    },
    data() {
      return {
        collectionClickColor: {
          background: 'rgba(153, 116, 251, 0.81)'
        },
        lastIndex: -1,
        colorIsNumber: -1,
        subCategory: [],
        isSubVisible: false,
        subCategoryIndex: -1,
        navigtion: {},
        isVisible: false
      }
    },
    components: {NavigationUnit},
    created: function init() {
      fetch(process.env.HOST + '/api/navigation', {
        method: 'get'
      }).then(response => response.json())
      // eslint-disable-next-line
        .then(commits => {
          this.navigtion = commits;
          this.getByLeveOne(commits)
        })
    },
    methods: {
      indexOfColored (number) {
        if (number === this.colorIsNumber) {
          return this.collectionClickColor
        }
      },
      setColor (isColor, num) {
        this.lastIndex = num;
        if (isColor) {
          this.colorIsNumber = num
        } else {
          this.colorIsNumber = -1
        }
      },
      mouseOverToCategory (subCategory) {
        this.setColor(false, this.lastIndex);
        this.subCategory = subCategory
      },
      getByLeveOne(array) {
        for (let i = 0; i < array; i++) {
          if (array[i].parentCategoryId === null) {
            this.levelOne.push(array.categoryName)
          }
        }
      },
      onClickOutside() {
        this.isVisible = false
      },
      isVisibleSubCategoryontainer (index) {
        if (this.subCategoryIndex === index) {
          return true
        } else {
          return false
        }
      },
      setVisibleSubCategory (index) {
        this.subCategoryIndex = index
      }
    }
  }
</script>
<style>
  .category_pop_up__main_container_left_non {
    margin: 4% 4% 4% 6%;
    position: relative;
    width: 36%;
  }

  .category_pop_up__main_container_right_non {
    margin: 4% 0 4% 4%;
    position: relative;
    width: 45%;
  }

  .category_pop_up_main {
    width: 30%;
    /*margin: 4% auto;*/
    /*box-shadow: inset 0px 4px 120px rgba(147, 234, 223, 0.49);*/
    background: linear-gradient(180deg, #76f7d1 0%, rgba(122, 228, 165, 0.59) 100%), #0ee4e4;
    opacity: 0.8;
    z-index: 71;
    position: absolute;
    filter: blur(5px);
    height: 100%;
  }

  .category_pop_up_main_unit {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-top: 4%;
    text-decoration: none;
    font-family: Roboto, serif;
    color: #08303D;
    font-size: 17px;
    position: relative;
    z-index: 72;
    width: 80%;
  }

  .category_pop_up_main_unit_container_row:hover {
    -webkit-filter: drop-shadow(0 0 7px rgba(153, 116, 251, 0.81));
    filter: drop-shadow(0 0 7px rgba(153, 116, 251, 0.81));
    background-position: 0 0;
    background-color: rgba(153, 116, 251, 0.61);
  }

  .category_pop_up_main_unit_container_row:active {
    -webkit-filter: grayscale(50%) drop-shadow(0 0 7px rgba(153, 116, 251, 0.81));
    filter: grayscale(50%) drop-shadow(0 0 7px rgba(153, 116, 251, 0.81));
  }

  .category_pop_up_main_unit_container_row {
    transition: all 0.36s ease-in-out;
    margin-bottom: 4%;
    border-radius: 19px;
    text-align: left;
  }

  .category_pop_up__unit_container {
    display: block;
  }

  .unit_container_width{
    width: 100%;
  }

  .unit_row_margin {
  margin-bottom: 2%;
  }

  .text_unit_margin {
  margin-left: 9%;
  }

  .text_bold {
    font-weight: bold;
  }

  .main_unit_text {
    font-size: 21px;
  }
  .sub_text_unit_margin {
    text-align: left;
    margin-left: 5%;
  }
  a.sub_text_unit_margin.text_bold{
    margin-left: 8%;
  font-size: 19px;
  }

  a{
    text-decoration: none;
    color: #09333f;
  }

  a:hover{
    -webkit-filter: drop-shadow(0 0 5px rgba(153, 116, 251, 0.81));
    filter: drop-shadow(0 0 5px rgba(153, 116, 251, 0.81));
    background-position: 0 0;
    text-decoration: none;
    color: #09333f;
  }

</style>
