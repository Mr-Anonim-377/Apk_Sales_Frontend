<template>
  <div class="review_pop_up">
    <div class="pop_up_review_container__blur" v-if="userEmail !== undefined && isCreated === false"></div>
    <div class="pop_up_review_container" v-if="userEmail !== undefined && isCreated === false">
      <div class="mark_container">
        <div class="input_container">
          <div class="input_lable">Оценка:</div>
          <masked-input v-model="mark" mask="1" placeholder="5" class="input_mark"/>
          <!--          <input maxlength="1" type="text" class="input_mark">-->
        </div>
        <div class="create_review_btn_container">
          <div @click="addReview" class="create_review_btn delete">Отправить Отзыв</div>
        </div>
      </div>
      <div class="text_review_container">
        <label class="text_area_lable" for="story">Текст отзыва:</label>

        <textarea v-model="discription" id="story" name="story"
                  rows="5" cols="33" placeholder="Отзыв о товаре">
</textarea>
      </div>
    </div>
    <div class="pop_up_error pop_up_error_container" v-if="userEmail === undefined">
      Отзывы могут оставлять только авторизированые пользователи сайта
    </div>
    <div class="pop_up_created_review" v-if="isCreated === true">
      Ваш отзыв отправлен
    </div>
  </div>
</template>
<script>
import MaskedInput from 'vue-masked-input/src/MaskedInput'

export default {
  props: {
    product: {},
    userEmail: {}
  },
  components: {MaskedInput},
  comments: {
    MaskedInput
  },
  name: 'ReviewPopUp',
  data () {
    return {
      isCreated: false,
      mark: null,
      request: {},
      discription: null
    }
  },
  methods: {
    addReview () {
      this.isCreated = true;
      this.request = {
        discription: this.discription,
        mark: this.mark === '' ? 5 : Number.parseInt(this.mark),
        productId: this.product.productId,
        reviewType: 'PRODUCT',
        title: 'Новый отзвыв о товаре ' + this.product.nameProduct,
        userEmail: this.userEmail
      };
      this.$emit('addReview', this.request)
    }
  }
}
</script>

<style>
  .pop_up_error {
    margin-top: 1%;
    margin-left: 39%;
    border-radius: 30px;
    filter: grayscale(30%) drop-shadow(0 0 5px rgb(255, 102, 138));
    color: red;
    height: fit-content;
    padding-bottom: 2px;
    width: 208px;
    text-align: center;
  }

  .pop_up_error_container {
    margin-top: 4%;
  }

  .delete {
    font-family: Roboto, serif;
  }

  .delete:hover,
  .delete:focus,
  .section_btn:hover {
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6);
    outline: 0 none;
  }

  label,
  textarea {
    font-size: .8rem;
    letter-spacing: 1px;
  }

  textarea {
    padding-left: 5px;
    background: #E2F2E2;
    border-radius: 6px;
    color: rgba(46, 21, 84, 0.82);
    padding-top: 0;
    padding-bottom: 0;
    font-weight: normal;
    font-size: 17px;
    line-height: 1.5;
    border: 1px solid #ccc;
    -webkit-box-shadow: 1px 1px 1px #999;
    box-shadow: 1px 1px 1px #999;
    height: 84%;
    margin-left: 4%;
    width: 91%;
  }

  label {
    display: block;
  }

  .review_pop_up {
    position: absolute;
    min-width: 350px;
    max-width: 350px;
    padding-bottom: 2%;
    z-index: 100;
    right: 25px;
    bottom: 100px;
    height: fit-content;
    width: fit-content;
  }

  .pop_up_review_container {
   text-align: center;
    position: relative;
    z-index: 90;
    height: 193px;
    display: block;
  }

  .pop_up_review_container__blur {
    position: absolute;
    z-index: 2;
    filter: blur(2px);
    background: linear-gradient(180deg, #53E88E 0%, rgba(141, 228, 176, 0.04) 100%), #23C1C1;
    opacity: 0.97;
    height: 100%;
    width: 100%;
    border-radius: 19px;
  }

  .mark_container {
    padding-top: 4px;
    display: flex;
    height: 40%;
  }

  .text_review_container {
    margin-top: 1%;
    height: 50%;
  }

  .input_mark {
    padding-left: 8px;
    background: #E2F2E2;
    border-radius: 6px;
    color: rgba(46, 21, 84, 0.82);
    border-top-width: 0;
    padding-top: 0;
    padding-bottom: 0;
    border-bottom-width: 0;
    font-weight: normal;
    font-size: 27px;
    width: 35px;
    height: 41px;
    margin-left: 5%;
  }

  .input_container {
    margin-top: 1%;
    width: 45%;
    display: block;
  }

  .input_lable {
    text-align: center;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 4%;
  }

  .create_review_btn_container {
    height: fit-content;
    width: fit-content;
    margin-left: 1%;
    margin-top: 33px;
  }

  .create_review_btn {
    cursor: pointer;
    font-family: Roboto, serif;
    border: solid 2px rgb(206, 148, 226);
    z-index: 100;
    position: relative;
    border-radius: 6px;
    text-align: center;
    padding: 7px;
  }

  .create_review_btn:active,
  .create_review_btn:hover {
    border: solid 2px rgb(206, 94, 226);
    text-decoration: none;
  }

  .text_area_lable {
    margin-left: 10%;
    width: fit-content;
  }

  .pop_up_created_review {
    margin-top: 1%;
    margin-left: 39%;
    border-radius: 30px;
    background: #fbf41e;
    filter: grayscale(30%) drop-shadow(0 0 5px rgb(204, 255, 147));
    color: #0bcc0b;
    height: fit-content;
    padding-bottom: 2px;
    width: 208px;
    text-align: center;
  }</style>
