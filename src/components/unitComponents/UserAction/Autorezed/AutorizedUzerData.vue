<template>
  <div class="pop_up_registration">
    <div class="pop_up__blur"></div>
    <div class="autoresation_wait_container" v-if="isLogOut">
      <div class="banter-loader">
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
      </div>
    </div>
    <div class="user_pop_up_card_container" v-if="!isLogOut">
      <div class="user_data_container">
        <div class="user_image_container">
          <img v-bind:src="user.image.imagePatch">
        </div>
        <div class="user_principal_log_out_container">
          <div class="user_principal_container">
            <div class="user_first_name">{{user.lastName}}</div>
            <div class="user_last_name">{{user.firstName}}</div>
          </div>
          <div class="log_out_btn"
               @click="logOut()">
            <p>Log Out</p>
          </div>
        </div>
      </div>
      <div class="user_meta_container">
        <div class="user_phone_container">
          <div class="meta_data_hint">тел:</div>
          <div class="user_phone">{{getUserPhone(user.personPhone)}}</div>
        </div>
        <div class="user_email_container">
          <div class="meta_data_hint">mail:</div>
          <div class="user_email">{{user.email}}</div>
        </div>
      </div>
      <div class="all_user_data_btn_container">
        <a class="all_user_data_btn">Вся информация</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogInPopUp',
  props: {
    user: {}
  },
  data () {
    return {
      colorIsNumber: 1,
      isLogOut: false
    }
  },
  methods: {
    logOut () {
      this.isLogOut = true;
      fetch(process.env.HOST + '/api/user/logOut', {
        method: 'get',
        credentials: 'include'
      }).then(response => {
        if (response.ok) {
          this.$emit('refreshUser', true)
        }
      })
    },
    getUserPhone (phone) {
    return phone.substring(0, 2) + '-' + phone.substring(2, 5) + '-' + phone.substring(5, 8) + '-' + phone.substring(8, 10) + '-' + phone.substring(10, 12)
    }
  },
  created: function init () {

  }
}</script>

<style>
  div{
  font-size: 15px;
  }

  .log_in_container_block p {
    padding-left: 10%;
    text-align: left;
    margin-bottom: 5px;
  }

  .pop_up_registration {
    width: 200px;
    min-height: 70px;
  }

  .use_pop_up_container input {
    font-size: 16px;
    width: 70%;
    border-radius: 19px;
    background: #E2F2E2;
    padding-left: 14px;
    color: rgba(46, 21, 84, 0.82);
    border-top-width: 0;
    padding-top: 0px;
    padding-bottom: 3px;
    border-bottom-width: 0;
  }

  .user_pop_up_card_container {
    position: relative;
    z-index: 90;
    height: fit-content;
    display: block;
    padding-bottom: 5%;
  }

  .user_data_container {
    display: flex;
    height: fit-content;
  }

  .user_principal_container {
    height: fit-content;
    display: block;
  }

  .user_image_container {
    margin-top: 14%;
    margin-left: 5%;
    width: 80px;
    height: 83px;
  }

  .user_image_container img {
    border-radius: 50%;
  }

  .user_meta_container {
    margin-top: 8px;
  }

  .user_email {
  }
  .user_phone_container {
    margin-left: 7%;
    display: block;
  }

  .meta_data_hint {
    margin-right: 1%;
  }

  .user_email_container {
    margin-top: 3%;
    margin-left: 7%;
    display: block;
  }

  .user_last_name {
    margin-top: 4%;
  }

  .all_user_data_btn {

  }

  .all_user_data_btn_container {
    padding-bottom: 4px;
    margin-top: 4%;
  }

  .user_principal_log_out_container {
    display: block;
    width: fit-content;
    margin-top: 12%;
    margin-left: 0;
    height: fit-content;
  }

  .log_out_btn {
    margin-left: 21px;
    transition: all .12s ease-out;
    border: 2px solid rgb(164, 245, 106);
    height: 31px;
    width: 74px;
    z-index: 100;
    border-radius: 6px;
    text-align: center;
    margin-top: 5px;
    position: relative;
    right: 5px;
  }

  .log_out_btn p {
    cursor: pointer;
    text-align: center;
    font-size: 15px;
    font-family: Alef, serif;
    -moz-user-select: none;
    -ms-user-select: none;
    color: #09333f;
  }

  .log_out_btn:hover {
    text-decoration: none;
    border: 2px solid rgb(159, 236, 111);
  }

  .log_out_btn:active {
    text-decoration: none;
    border: 2px solid rgb(133, 193, 79);
  }

</style>
