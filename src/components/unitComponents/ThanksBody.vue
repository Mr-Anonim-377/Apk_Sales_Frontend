<template>
  <section class = "section">
    <div class="section_main">
      <div class = "main"></div>
      <div class ="thankList_container">
        <div class="thankList_text">
          <h1 class="thankList_etext_h">Спасибо!</h1>
          <br>
          <p class="thankList_text">Ваш заказ успешно оформлен. Админитсратор связется с вами в ближйщее время.</p>
          <p class="thankList_text_p text_decoration">Номер вашего заказ - 333 </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ThanksBody'
}
</script>

<style>
  @import '../../../static/CSS/CSS.css';

  .thankList_text {
  padding-bottom: 15px;
  }

  .text_decoration {
    font-weight: bold;
  }
</style>
