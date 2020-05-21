<template>
  <section class = "section">
    <div class="section_main_product">
      <div class = "main"></div>
        <div class="section_main_acc">
          <div class="section_user">
            <div class="container_user">
              <br>
              <AccountUserData
              :user="user"
              />
            </div>
            <div class="section_password">
              <div class="container_password">
                <br>
                <span class="text_acc"><b>Редакторовать пароль</b></span><br>
                <span class="text_acc">Введите старый пароль</span>
                <input class="inp_password"><br>
                <span class="text_acc">Введите новый пароль</span>
                <input class="inp_password"><br>
                <span class="text_acc">Повторите новый пароль</span>
                <input class="inp_password"><br>
                <button class="btn_password">Изменить пароль</button><br>
              </div>
            </div>
          </div>
          <div class="section_address">
            <div class="container_address">
              <span class="text_acc text_acc_size"><b>Данные о предыдущих заказах</b></span>
              <span class="text_acc_address">У вас нет новых заказов</span>
            </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script>
  import AccountUserData from "./AccountUserData";
export default {
  name: 'AccountBody',
  components: {AccountUserData},
  data () {
    return {
      user: {},
      order: {}
    }
  },
  created: function init() {
    fetch(process.env.HOST + '/api/user', {
      method: 'get',
      credentials: 'include'
    }) .then(response => response.json())
      // eslint-disable-next-line
      .then(commits => this.user = commits);

    fetch(process.env.HOST + '/api/user/orders', {
      method: 'get',
      credentials: 'include'
    }) .then(response => response.json())
      // eslint-disable-next-line
      .then(commits => this.order = commits);
  }
}
</script>

<style>
.section_main_acc{
  display: flex;
    position: relative;
    z-index: 90;
    width: 100%;
    height: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-right: 15px;
    padding-left: 15px;
    max-width: 1140px;
    padding-bottom: 2%;
}
  .section_user{
    display: block;
    width: 60%;
    padding-top: 57px;
  }
  .container_user_FIO{
    display: block;
  }
  .container_user{
    display: block;
    border: 2px solid #9EC1D4;
  }
.text_acc{
  font-family: Roboto, serif;
  font-style: italic;
  font-weight: normal;
  font-size: 25px;
  text-align: left;
}
  .img_acc{
    width: 120px;
    height: 155px;
    padding-top: 8px;
    margin: 15px;
  }
  .inp_user{
    width: 474px;
    height: 50px;
    margin-bottom: 23px;
    background: #E2F2E2;
    border-radius: 6px;
    font-family: Roboto, serif;
    font-style: italic;
    font-weight: normal;
    font-size: 20px;
    border-top-width: 0;
    padding-top: 0;
    border-bottom-width: 0;
  }
.container_user_data{
  display: flex;
  padding-top: 21px;
  padding-left: 9px;
}
.text_size_data,
  .text_acc_size{
    padding-left: 27px;
  }
  .container_user_gender{
    display: flex;
    padding-top: 49px;
  }
.text_size_sex{
  padding-left: 135px;
}
.inp_date{
  width: 247px;;
  height: 50px;
  background: #E2F2E2;
  border-radius: 6px;
  border-top-width: 0;
  padding-top: 0;
  padding-bottom: 0;
  border-bottom-width: 0;
}
  .container_user_inp{
    display: flex;
    padding-left: 27px;
    padding-bottom: 16px;

  }
  .inp_men{
    margin-left: 64px;
    margin-right: 7px;
    margin-top: 10px;
  }
  .inp_girl{
    margin-left: 15px;
    margin-top: 11px;
    margin-right: 9px;
  }
  .section_address{
    display: block;
    padding-top: 57px;
    padding-left: 20px;
    width: 40%;
    height: 100%;
  }
  .container_address{
    display: grid;
    border: 2px solid #9EC1D4;
    padding-left: 20px;
  }
  .text_acc_address{
    font-family: Roboto, serif;
    font-style: italic;
    font-weight: normal;
    font-size: 15px;
  }
  .section_password{
    padding-top: 20px;
  }
  .container_password{
    display: grid;
    padding-left: 20px;
    border: 2px solid #9EC1D4;
  }
.inp_password{
  width: 400px;
  height: 50px;
  border-radius: 6px;
  border-top-width: 0;
  padding-top: 0;
  padding-bottom: 0;
  border-bottom-width: 0;
  background: #E2F2E2;
}
.btn_password{
  font-family: Roboto, serif;
  width: 240px;
  height: 54px;
  font-weight: 700;
  color: white;
  text-decoration: none;
  padding: .8em 1em calc(.8em + 3px);
  border-radius: 3px;
  background: rgb(30, 144, 255);
  box-shadow: 0 -3px rgb(0, 0, 255) inset;
  transition: 0.2s;
  margin: auto;
}
.btn_password:hover {
  background: rgb(65, 105, 225);
}
.btn_password:active {
  background: rgb(65, 105, 225);
  box-shadow: 0 3px rgb(0, 0, 255) inset;
}
</style>
