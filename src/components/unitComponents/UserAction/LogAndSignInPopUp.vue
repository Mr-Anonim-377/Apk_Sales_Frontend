<template>
  <div class="pop_up_registration">
    <div class="pop_up__blur"></div>
    <div class="users_choice_action">
      <div
        v-bind:class="indexOfColored(1)"
        @mousemove="setColorIsNumber(1)"
        class="action_container">Log In
      </div>
      <div
        v-bind:class="indexOfColored(2)"
        @mousemove="setColorIsNumber(2)"
        class="action_container ation_container_left">Sign in
      </div>
    </div>
    <div class="use_pop_up_container" v-if="colorIsNumber === 1">
      <form v-on:submit="logIn" action="#" method="post" >
        <div class="log_in_container_block">
          <p>
            Login
          </p>
          <input type="text" v-model="login">
        </div>
        <div class="logIn_input_container log_in_container_block">
          <p>
            Password
          </p>
          <input type="password" v-model="password">
        </div>
        <div class="pop_up_error_container">
          <div class="pop_up_error" v-if="logInError.length !== 0" >{{logInError}}</div>
        </div>
        <button type="submit" class="pop_up_button">Log In</button>
      </form>
    </div>
    <div class="use_pop_up_container" v-if="colorIsNumber === 2">
      <form  v-on:submit="signIn" action="#" method="post">
        <div class="log_in_container_block">
          <p>
            E-mail
          </p>
          <input type="text" v-model="email">
        </div>
        <div class="logIn_input_container log_in_container_block">
          <p>
            Phone
          </p>
          <masked-input @input="registerPhone = arguments[1]" mask="\+\7 (111) 111-11-11" placeholder="" />
        </div>
        <div class="logIn_input_container log_in_container_block">
          <p>
            Last name
          </p>
          <input type="text" v-model="lastName">
        </div>
        <div class="logIn_input_container log_in_container_block">
          <p>
            First name
          </p>
          <input type="text" v-model="firstName">
        </div>
        <div class="logIn_input_container log_in_container_block">
          <p>
            Password
          </p>
          <input type="password" v-model="registerPass">
          <div class="pop_up_error_container">
            <div class="pop_up_error" v-if="helpStrByError.length > 0" v-for="itemError in helpStrByError">{{itemError}}</div>
          </div>
          <button type="submit" class="pop_up_button">Sign In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MaskedInput from 'vue-masked-input'
export default {
  components: {
    MaskedInput
  },
  name: 'LogInPopUp',
  props: {},
  data () {
    return {
      colorIsNumber: 1,
      login: '',
      password: '',

      helpStrByError: [],
      logInError: '',

      email: '',
      registerPhone: '',
      lastName: '',
      firstName: '',
      registerPass: ''
    }
  },
  methods: {
    validateEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email)
    },
    logIn: function (event) {
      event.preventDefault();
      fetch(process.env.HOST + '/api/user/logIn', {
        method: 'post',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userLogin: this.login, userPassword: this.password})
      }).then(response => response.json()).then(commits => {
        if (commits.type === 'LoginNotValidate') {
          this.logInError = 'Не верный логин'
        } else
        if (commits.type === 'PasswordNotValidate') {
          this.logInError = 'Не верный пароль'
        } else if (commits.type === 'InternalServerError') {
          this.logInError = 'Сервис не доступен, ортитесь к Администратору'
        } else {
          this.$emit('refreshUser', true)
        }
      })
    },
    indexOfColored (number) {
      if (number === this.colorIsNumber) {
        return 'activeAction'
      }
    },
    setColorIsNumber (num) {
      this.colorIsNumber = num
    },
    signIn: function (event) {
      event.preventDefault();
      this.helpStrByError = [];
      if (!this.validateEmail(this.email)) {
        this.helpStrByError.push('Не правильная почта')
      }
      if (this.registerPass.length < 8) {
        this.helpStrByError.push('Пароль менее 8 символов')
      }
      if (this.registerPass.length > 16) {
        this.helpStrByError.push('Пароль более 16 символов')
      }
      if (!/[A-Z]+/.test(this.registerPass)) {
        this.helpStrByError.push('Пароль должен содержать символы верхнего регистра')
      }
      if (!/[a-z]+/.test(this.registerPass)) {
        this.helpStrByError.push('Пароль должен содержать символы')
      }
      if (/[а-я]+/.test(this.registerPass)) {
        this.helpStrByError.push('Пароль не должен содержать русские буквы')
      }
      if (this.helpStrByError.length === 0) {
        var request = {
          email: this.email,
          firstName: this.firstName,
          imagePath: 'http://img0.joyreactor.cc/pics/post/ПеКа-кавайная-няка-42804.png',
          lastName: this.lastName,
          password: this.registerPass,
          phone: '+7' + this.registerPhone
        };
        fetch(process.env.HOST + '/api/user/register', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request)
        }).then(response => {
          if (response.ok) {
            this.$emit('refreshUser', true)
          }
        })
      }
    }

  },
  created: function init () {
  }
}
</script>

<style>
  .log_in_container_block p {
    padding-left: 10%;
    text-align: left;
    margin-bottom: 5px;
  }

  .pop_up_registration {
    width: 200px;
    min-height: 70px;
  }

  .use_pop_up_container {
    margin-top: 10%;
    z-index: 99;
    height: fit-content;
    padding-bottom: 10px;
    position: relative;
  }

  .use_pop_up_container input {
    font-size: 16px;
    width: 84%;
    border-radius: 19px;
    background: #E2F2E2;
    padding-left: 9px;
    color: rgba(46, 21, 84, 0.82);
    border-top-width: 0;
    padding-top: 0px;
    padding-bottom: 3px;
    border-bottom-width: 0;
  }

  .logIn_input_container {
    margin-top: 6%;
  }

  .users_choice_action {
    margin-top: 7%;
    display: flex;
    z-index: 99;
    height: 20px;
    position: relative;
  }

  .action_container {
    transition: all .12s ease-out;
    margin-left: 6px;
    height: fit-content;
    border-radius: 19px;
    width: 45%;
    padding-bottom: 2px;
    margin-top: 5px;
  }

  .action_container:hover {
    text-decoration: none;
    border: 2px solid rgb(164, 245, 106);
  }

  .activeAction {
    text-decoration: none;
    border: 2px solid rgb(164, 245, 106);
  }

  .action_container:active {
    text-decoration: none;
    border: 2px solid rgb(164, 245, 106);
  }

  .log_in_container_block {
    display: block;
  }

  .pop_up_button {
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;
    margin-top: 6%;
    text-align: center;
  }
  .pop_up_button:hover {
    -webkit-filter: drop-shadow(0 0 5px rgba(178, 38, 205, 0.81));
    filter: drop-shadow(0 0 5px rgba(178, 38, 205, 0.81));
    background-position: 0 0;
  }

  .pop_up_button:active {
    -webkit-filter: grayscale(30%) drop-shadow(0 0 5px rgba(178, 38, 205, 0.81));
    filter: grayscale(30%) drop-shadow(0 0 5px rgba(178, 38, 205, 0.81));
  }

  .logInBtn_container {

  }

  .pop_up_error {
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

  .pop_up_error_container {
    margin-top: 4%;
  }
</style>
