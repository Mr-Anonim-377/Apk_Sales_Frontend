<template>
  <footer class="section_footer">
    <div class="section_footer_size">
      <div class = "footer"></div>
      <div class = "footer_size">
        <div class="footer_section">
          <span class="text_footer_h"><b>Tech Shop</b></span><br><br>
          <span class="text_footer">Сайт создан для продажи товаров сельхоз назначения в котором каждый может найти что-то для своей дачи или предприятия</span>
        </div>
        <div class="footer_line"></div>
        <div class="footer_section footer_section_menu">
          <span class="text_footer_h"><b>MENU</b></span><br><br>
          <a v-bind:href="'/'">
          <span class="text_footer">Главная</span></a><br>
          <a v-bind:href="'/catalog/category=2&page=1&collections=&price-min=&price-max='">
          <span class="text_footer">Каталог</span></a><br>
            <a v-bind:href="'/account'">
          <span class="text_footer">Страница пользователя</span></a><br>
              <a v-bind:href="'/shopping'">
          <span class="text_footer">Корзина</span></a>
        </div>
        <div class="footer_section footer_section_size"><br>
          <a v-bind:href="'/aboutUs'">
          <span class="text_footer">О нас</span><br>
          </a>
          <a v-bind:href="'/contact'">
            <span class="text_footer">Контакты</span><br>
          </a>
          <a v-bind:href="'/politicsSave'">
            <span class="text_footer">Политика конфенденциальности</span><br>
          </a>
        </div>
        <div class="footer_line"></div>
        <div class="footer_section">
          <span class="text_footer_h"><b>Мы в социальных сетях</b></span><br><br>
          <span class="text_footer">В разработке</span><br>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style >
  .footer_section{
    display: block;
    margin-top: 20px;
    width: 323px;
  }
  .text_footer_h{
    font-family: Roboto, serif;
    font-style: italic;
    font-weight: normal;
    font-size: 25px;
    text-align: left;
    padding-top: 10px;
  }
  .footer_line{
    width: 2px;
    height: 90%;
    background: #9EC1D4;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .text_footer{
    font-family: 'Nunito', sans-serif;
    font-style: italic;
    font-weight: normal;
    font-size: 15px;
    margin-top: 20px;
    padding-bottom: 21px;
  }
  .footer_section_menu{
  }
  .footer_section_size{
    margin-top: 57px;
  }
</style>
