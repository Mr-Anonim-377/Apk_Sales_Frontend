<template>
  <section class="section">
    <div class="section_main_product">
      <div class="main"></div>
      <div class="section_main_acc">
        <div class="section_user">
          <div class="container_user">
            <br>
            <AccountUserData
              v-on:refreshUser="$emit('refreshUser', $event)"
              :user="user"
            />
          </div>
          <div class="section_password">
            <div class="container_password">
              <br>
              <span class="text_acc"><b>Редакторовать пароль</b></span><br>
              <span class="text_acc">Введите старый пароль</span>
              <input type="password" class="inp_password"
                     v-model="currentPass" :disabled="isDisabled"><br>
              <span class="text_acc">Введите новый пароль</span>
              <input type="password" class="inp_password" :disabled="isDisabled"
                     v-model="newPassOne"><br>
              <span class="text_acc">Повторите новый пароль</span>
              <input type="password" class="inp_password" :disabled="isDisabled"
                     v-model="newPassTwo"><br>
              <div v-for="error in errors" class="error_text" v-if="error">
                {{error}}
              </div>
              <div class="access_text" v-if="access">
                Данные изменены
              </div>
              <div class="btn_account_container" v-if="isCodBtn">
                <input :disable="inputCodDisable" class="inp_code"
                       type="password"
                       placeholder="введите код"
                       v-model="cod">
                <button class="btn_code" :disable="inputCodDisable"
                        @click="dataUserCode">
                  Отправить
                </button>
              </div>
              <button v-if="isChangeBtn" class="btn_password" @click="passChangeRequest()">Изменить пароль</button>
              <br>
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
import AccountUserData from './AccountUserData'

export default {
  name: 'AccountBody',
  components: {AccountUserData},
  props: {
    user: {}
  },
  data () {
    return {
      cod: '',
      order: {},
      currentPass: '',
      newPassOne: '',
      newPassTwo: '',
      isChangeBtn: false,
      isDisabled: false,
      isCodBtn: false,
      errors: [],
      access: false,
      inputCodDisable: false
    }
  },
  created: function init () {
    fetch(process.env.HOST + '/api/user/orders', {
      method: 'get',
      credentials: 'include'
    }).then(response => response.json())
      // eslint-disable-next-line
        .then(commits => this.order = commits);
  },
  watch: {
    currentPass: function () {
      if (this.currentPass.length > 0) {
        this.errors=[];
        this.isChangeBtn = true
      } else {
        this.errors=[];
        this.isChangeBtn = false
      }
    }
  },
  methods: {
    passChangeRequest () {
      this.errors = [];
      if ((this.currentPass.length + this.newPassOne.length + this.newPassOne.length) > 0) {
        if (this.newPassOne.length !== this.newPassTwo.length) {
          this.errors.push('Новые пароли не совпадают')
        } else {
          if (this.currentPass === this.newPassOne) {
            this.errors.push('Новый пароль не доен совпадать со старым')
          }
          if (this.newPassOne.length < 8) {
            this.errors.push('Пароль менее 8 символов')
          }
          if (this.newPassOne.length > 16) {
            this.errors.push('Пароль более 16 символов')
          }
          if (!/[A-Z]+/.test(this.newPassOne)) {
            this.errors.push('Пароль должен содержать символы верхнего регистра')
          }
          if (!/[a-z]+/.test(this.newPassOne) || /[а-я]+/.test(this.newPassOne)) {
            this.errors.push('Пароль должен содержать символы латиницы')
          }
        }
        if (this.errors.length === 0) {
          this.isDisabled = true;
          fetch(process.env.HOST + '/api/user/change/request', {
            method: 'get',
            credentials: 'include'
          }).then(response => {
            // if (response.status === 200) {
            this.isCodBtn = true;
            this.isChangeBtn = false
            // }
          })
        }
      } else {
        this.errors.push('Заполните поля')
      }
    },
    dataUserCode () {
      this.inputCodDisable = true;
      if (this.cod.length > 0) {
        fetch(process.env.HOST + '/api/user/change/password', {
          method: 'post',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cod: this.cod,
            passwordNew: this.newPassOne,
            passwordOld: this.currentPass
          })
        }).then(response => {
          if (response.status === 200) {
            this.isDisabled = false;
            this.errors = [];
            this.isCodBtn = false;
            this.currentPass = '';
            this.newPassOne = '';
            this.newPassTwo = '';
            this.access = true;
            this.$emit('refreshUser', true)
          } else {
            this.cod = '';
            this.errors = [];
            this.errors.push('Не верный код подтверждения')
          }
        })
      }
    }

  }
}
</script>

<style>
  .section_main_acc {
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

  .section_user {
    display: block;
    width: 60%;
    padding-top: 57px;
  }

  .btn_code {
    font-family: Roboto, serif;
    width: 140px;
    height: 54px;
    font-weight: 700;
    color: white;
    text-decoration: none;
    padding: .8em 1em calc(.8em + 3px);
    border-radius: 3px;
    background: rgb(30, 144, 255);
    box-shadow: 0 -3px rgb(0, 0, 255) inset;
    transition: 0.2s;
  }

  .btn_code:hover {
    background: rgb(65, 105, 225);
  }

  .btn_code:active {
    background: rgb(65, 105, 225);
    box-shadow: 0 3px rgb(0, 0, 255) inset;
  }

  .inp_code {
    width: 150px;
    height: 40px;
    background: #E2F2E2;
    border-radius: 6px;
    font-family: Roboto, serif;
    font-style: italic;
    font-weight: normal;
    font-size: 20px;
    border-top-width: 0;
    padding-top: 0;
    border-bottom-width: 0;
    margin-left: 175px;
    margin-top: 6px;
    margin-right: 10px;
  }

  .container_user_FIO {
    display: block;
  }

  .error_text {
    margin-bottom: 3%;
    margin-top: 1%;
    margin-left: 5%;
    border-radius: 30px;
    -webkit-filter: grayscale(30%) drop-shadow(0 0 5px rgb(255, 102, 138));
    filter: grayscale(30%) drop-shadow(0 0 5px rgb(255, 102, 138));
    color: red;
    width: 90%;
    height: fit-content;
    padding-bottom: 2px;
  }

  .container_user {
    display: block;
    border: 2px solid #9EC1D4;
  }

  .text_acc {
    font-family: Roboto, serif;
    font-style: italic;
    font-weight: normal;
    font-size: 25px;
    text-align: left;
  }

  .img_acc_container {
    padding-top: 45px;
    margin: 0 15px 15px 15px;
  }

  .inp_user {
    width: 452px;
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

  .container_user_data {
    display: flex;
    padding-top: 21px;
    padding-left: 9px;
  }

  .text_size_data,
  .text_acc_size {
    padding-left: 27px;
  }

  .container_user_gender {
    display: flex;
    padding-top: 49px;
  }

  .text_size_sex {
    padding-left: 135px;
  }

  .inp_date {
    width: 247px;;
    height: 50px;
    background: #E2F2E2;
    border-radius: 6px;
    border-top-width: 0;
    padding-top: 0;
    padding-bottom: 0;
    border-bottom-width: 0;
  }

  .container_user_inp {
    display: flex;
    padding-left: 27px;
    padding-bottom: 16px;

  }

  .inp_men {
    margin-left: 64px;
    margin-right: 7px;
    margin-top: 10px;
  }

  .inp_girl {
    margin-left: 15px;
    margin-top: 11px;
    margin-right: 9px;
  }

  .section_address {
    display: block;
    padding-top: 57px;
    padding-left: 20px;
    width: 40%;
    height: 100%;
  }

  .container_address {
    display: grid;
    border: 2px solid #9EC1D4;
    padding-left: 20px;
  }

  .text_acc_address {
    font-family: Roboto, serif;
    font-style: italic;
    font-weight: normal;
    font-size: 15px;
  }

  .section_password {
    padding-top: 20px;
  }

  .container_password {
    display: grid;
    padding-left: 20px;
    border: 2px solid #9EC1D4;
  }

  .access_text {
    margin-bottom: 3%;
    margin-top: 1%;
    border-radius: 30px;
    filter: grayscale(30%) drop-shadow(0 0 15px rgb(260, 255, 138));
    color: #1aaf17;
    width: 100%;
    height: fit-content;
    padding-bottom: 2px;
    font-size: x-large;
    margin-left: 35%;
  }

  .inp_password {
    width: 400px;
    height: 50px;
    border-radius: 6px;
    border-top-width: 0;
    padding-top: 0;
    padding-bottom: 0;
    border-bottom-width: 0;
    background: #E2F2E2;
  }

  .btn_password {
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
