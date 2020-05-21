<template>
  <div class="AccountUserData">
    <span class="text_acc text_acc_size"><b>Персональные данные</b></span>
    <div class="container_user_data">
      <img class="img_acc" :src=user.image.imagePatch>
      <div class="container_user_FIO">
          <input class="inp_user"
                 v-bind:placeholder="user.firstName"
                 v-model="dateFirstName"
          >
        <input class="inp_user"
               v-bind:placeholder="user.lastName"
               v-model="dateLastName"
        >
          <input class="inp_user"
                 v-bind:placeholder="user.personPhone"
                 v-model="datePersonPhone"
          >
          <input class="inp_user"
                 v-bind:placeholder="user.email"
                 v-model="dateEmail"
          >
      </div>
    </div>
    <div class="container_user_gender">
      <span class="text_acc text_size_data">Дата рождения</span>
      <span class="text_acc text_size_sex">Пол</span>
    </div>
    <br>
    <div class="container_user_inp">
      <input class="inp_date">
      <input class="inp_men" type="radio" name="gender" value="Мужской">
      <span class="text_acc">Мужской</span>
      <input class="inp_girl" type="radio" name="gender" value="Женский">
      <span class="text_acc">Женский</span>
    </div>
    <div class="btn_account_container"
         v-if="isChangeBtn"
    >
      <button class="btn_password"
              @click="dateUser"
              v-model="isCodBtn"
      >Изменить данные</button>
    </div>
    <div class="btn_account_container">
<!--         v-if="isCodBtn"-->

      <input class="inp_code"
             placeholder="введите код"
             v-model="cod"
      >
      <button class="btn_code"
              @click="dataUserCode"
      >Отправить</button>
    </div>
  </div>
</template>

<script>
    export default {
      name: "AccountUserData",
      props: {
        user: {}
      },
      data() {
        return {
          cod: '',
          dateFirstName: '',
          dateLastName: '',
          datePersonPhone: '',
          dateEmail: '',
          isChangeBtn: false,
          isCodBtn: false,
        }
      },
      methods: {
        dateUser() {
          fetch(process.env.HOST + '/api/user/change/request', {
            method: 'get',
            credentials: 'include'
          }).then(response => response.json())
            // eslint-disable-next-line
            .then(commits => this.user = commits);
        },
        dataUserCode() {
          fetch(process.env.HOST + '/api/user/change/data', {
            method: 'post',
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cod: this.cod,
              email: this.dateEmail,
              firstName: this.dateFirstName,
              imagePath: this.user.image.imagePatch,
              lastName: this.dateLastName,
              phone: this.datePersonPhone
            })
          }).then(response => response.json())
            // eslint-disable-next-line
            .then(commits => this.user = commits);
        }
      },
      watch: {
        dateFirstName: function () {
          if (this.dateFirstName.length > 0) {
            this.isChangeBtn = true
          }
        },
          dateLastName: function () {
            if (this.dateLastName.length > 0) {
              this.isChangeBtn = true
            }
          },
          datePersonPhone: function () {
            if (this.datePersonPhone.length > 0) {
              this.isChangeBtn = true
            }
          },
          dateEmail: function () {
            if (this.dateEmail.length > 0) {
              this.isChangeBtn = true
            }
          },
        isCodBtn: function () {
          if (this.isChangeBtn) {
            this.isCodBtn = true
          }

        }
        }
    }
</script>

<style >
  .inp_user-hov,
  .container_mask {
    width: 474px;
    height: 50px;
    position: absolute;
    overflow: hidden;
  }
.inp_user-hov:hover{
  width: 474px;
  height: 50px;
  background: #E2F2E2;
  border-radius: 6px;
  margin-bottom: 23px;
  font-family: Roboto, serif;
  font-style: italic;
  font-weight: normal;
  font-size: 20px;
  border-top-width: 0;
  padding-top: 0;
  border-bottom-width: 0;
}
  .inp_user-hov,
  .container_mask {
    border-radius: 10px;
    z-index: 99;
    background-color: rgba(58, 1, 132, 0.19);
    transition: all 0.4s ease-in-out;
  }

  .container_mask:hover .inp_user-hov {
    opacity: 1;
  }
  .btn_account_container{
    display: flex;
    width: 663px;
    height: 74px;
  }
  .code_account{
    width: 100px;
    height: 50px;
  }
  .btn_code_account{
    width: 100px;
    height: 50px;
    margin-left: 20px;
    float: right;
  }
  .btn_code{
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
  .inp_code{
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

</style>
