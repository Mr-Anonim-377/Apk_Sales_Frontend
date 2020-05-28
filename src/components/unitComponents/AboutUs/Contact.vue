<template>
  <section class = "section">
    <div class="section_main">
      <div class = "main"></div>
      <div class ="contact_container">
        <h1 class="text_contact_h1"><b>КОНТАКТНАЯ ИНФОРМАЦИЯ</b></h1>
        <div class="container_contacts">
          <div class="section_contact">
            <h2 class="text_contact_h2"><b>Клиентская поддержка</b></h2>
            <span class="text_contact">Специалисты клиентской поддержки принимают звонки круглосуточно без выходных.</span><br>
            <span class="text_contact">8-926-850-54-08</span>
          </div>
          <div class="section_contact">
            <h2 class="text_contact_h2"><b>Центральный офис</b></h2>
            <span class="text_contact">Москва, ул. Лиственичнная аллея, 2А <br>10 минут пешком от метро Петровско-разумовская<br>
              На машине въезд со стороны ул. Верхняя аддея<br> Для получения пропуска в офис необходимо заранее договориться о
              встрече с сотрудником.</span>
            <span class="text_contact">8-961-591-69-17</span>
          </div>
          <div class="section_contact">
            <h2 class="text_contact_h2"><b>Юридический адрес</b></h2>
            <span class="text_contact">127550, г. МОСКВА,<br> АЛЛЕЯ ЛИСТВЕННИЧНАЯ, д. 2А.</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
      name: "Contact",
      }
</script>

<style>
.contact_container{
  min-height: 500px;
  z-index: 90;
  width: 100%;
  height: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  max-width: 1140px;
  display: block;
  padding-bottom: 2%;
  position: relative;
}
  .container_contacts{
    display: flex;
  }
  .section_contact{
    display: block;
    width: 310px;
    margin-right: 27px;
    margin-top: 50px;
    margin-left: 40px;
  }
.text_contact_h1{
  text-decoration: none;
  font-family: Roboto, serif;
  font-size: 25px;
  color: #184355;
  padding-top: 50px;
}
  .text_contact_h2{
    text-decoration: none;
    font-family: Roboto, serif;
    font-size: 20px;
    color: #184355;
    margin-top: 50px;
  }
  .text_contact{
    text-decoration: none;
    font-family: Roboto, serif;
    font-size: 15px;
    color: #184355;
    margin-top: 20px;
  }
</style>
