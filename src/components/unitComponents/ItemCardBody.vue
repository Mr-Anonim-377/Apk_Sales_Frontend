<template>
  <section class="section">
    <div class="section_main">
      <div class = "main"></div>
      <div class="product_container">
        <div class="card_row_test">
          <div class="card_left">
            <div class="photo">
              <img class="photo_good"  />
            </div>
            <div class="card_info">
              <a class="card_text"> <strong> Объем (мл): 100.00 <br> Тип аромата: Фруктовый <br> Тип аромата:
                Цветочный <br>Коллекция аромата: Dolce Gabbana <br> Light Blue <br>Аромат представлен: 2001
                <br>Верхняя нота: Зеленое яблоко <br>Верхняя нота: Лимон <br> Верхняя нота: Белый кедр <br>
                Верхняя нота: Колокольчик </strong></a>
            </div>
            <div class="title">
              <h1 class="text_title">Популярное в категории:</h1>
            </div>
            <div class="carousel_card">
              <a class="carousel_article_left"></a>
              <img class="carousel_good carousel_good_new"/>
              <img  class="carousel_good"/>
              <a class="carousel_article_right"></a>
            </div>
            <div class="container_text_carousel">
              <a class="text_carousel">Карта памяти <br> AEGO 16 GB <br>  <strong>1212.00 руб</strong></a>
              <a class="text_carousel">Карта памяти <br> AEGO 16 GB <br> <strong> 1212.00 руб</strong></a>
            </div>
          </div>
          <div class="card_right">
            <div class="carousel_container">
              <a class="text_title_new">Похожие товары</a>
              <div class="carousel_card">
                <a class="carousel_article_left "></a>
                <img class="carousel_good carousel_article" />
                <img  class="carousel_good carousel_article" />
                <img  class="carousel_good carousel_article"/>
                <a class="carousel_article_right"></a>
              </div>
            </div>
            <div class="product-description">
              <div class="product-description_title product-description_title_new">Описание</div>
              <a class="product-description_paragraph">Косметика и парфюмерия Dolcegabbana Dolce Gabbana
                Light Blue Туалетная вода Dolce Gabbana Light Blue - чувственный и искрящийся аромат,
                который символизирует юность и наслаждение жизни, подчеркивая индивидуальность и очарование
                своей обладательницы. Свежее звучание композиции на основе переплетения цветочных и
                фруктовых букетов - это одно из достоинств парфюма, которое дает возможность погрузиться в
                упоительное ощущение прохлады лазурных просторов.</a>
            </div>
            <div class="cart-btn">
              <button class="cart-btn-wrap" href ="">Добавить в корзину</button>
            </div>
            <div class="text_cart_title text_cart_title_new">Оценка пользователей</div>
            <div class="cart_score">
              <div class="score"></div>
              <div class="score"></div>
              <div class="score"></div>
              <div class="score score_col"></div>
              <div class="score score_col"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'ItemCardBody'
}
</script>

<style>
  .carousel_card{
    max-width: 660px;
    width: 1200px;
    display: flex;
    box-sizing: inherit;
  }
  .card_right{
    text-align: center;
  }
</style>
