<template>
  <div class="section_set">
    <div class="section_number">
      <div class="section_btn"
           @click="addMinus()"
      >
        <div class="minus"
        ></div>
      </div>
      <div class="number">{{numberPieces}}</div>
      <div class="section_btn"
           @click="addPlus()"
      >
        <div class="plus"></div>
      </div>
      <br>
    </div>
    <div class="btn_border delete"
      @click="addDelete()"
    >Удалить</div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCartPieces',
  props: {
    productQuantity: {},
    productId: {},
    numberPieces: {}
  },
  methods: {
    addPlus () {
      fetch(process.env.HOST + '/api/shoppingCart?numberPieces=1&' + 'productId=' + this.productId, {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
        .then(response => this.$emit('addPlus', true))
    },
    addMinus () {
      fetch(process.env.HOST + '/api/shoppingCart?numberPieces=1&' + 'productId=' + this.productId, {
        method: 'delete',
        credentials: 'include',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
        .then(response => this.$emit('addMinus', true))
    },
    addDelete () {
      fetch(process.env.HOST + '/api/shoppingCart/deleteProduct?productId=' + this.productId, {
        method: 'delete',
        credentials: 'include',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
        .then(response => this.$emit('addDelete', true))
    }
  }
}
</script>

<style scoped>
  .plus {
    background: #C12378;
    height: 30px;
    width: 7px;
    position: relative;
    left: 20px;
    margin-top: 3px;
    margin-left: -4px;
  }
  .plus:after {
    content: "";
    height: 7px;
    width: 30px;
    background: #C12378;
    position: absolute;
    left: -12px;
    top: 12px;
  }
  .minus{
    height: 7px;
    width: 30px;
    background: #C12378;
    position: relative;
    top: 14px;
    margin-left: 5px;
  }
  .section_number{
    display: flex;
    padding-top: 28px;
    padding-left: 40px;
  }
  .number{
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 10px;
    text-decoration: none;
    font-family: Roboto, serif;
    font-size: 42px;
    color: #08303D;
    width: 103px;
  }
  .section_btn{
    height: 39px;
    width: 40px;
    margin-top: 24px;
  }
  .section_set{
    text-align: center;
  }
  .delete {
    font-family: Roboto, serif;
    margin-left: 82px;
  }
  .delete:hover,
  .delete:focus,
  .section_btn:hover{
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6);
    outline: 0 none;
  }
</style>
