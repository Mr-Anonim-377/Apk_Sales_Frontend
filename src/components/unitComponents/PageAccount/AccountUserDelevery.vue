<template>
  <div class="section_address">
    <div class="container_address">
      <span class="text_acc text_acc_size"><b>Данные о предыдущих заказах</b></span>
      <span
        class="text_acc_address"
        v-if="order.length === 0">
        У вас нет заказов
      </span>
      <div v-if="order.length > 0" v-for="itemOrder in order" class="total_text_acc_container">
        <div class="text_acc_container">
          <span class="text_acc_address margin_right">Оплачен: <b>{{itemOrder.isPayment?'Да':'Нет'}}</b></span>
          <span class="text_acc_address">Тип оплаты: <b>{{itemOrder.paymentType === 'cash'? 'Наличные':'Картой'}}</b></span>
        </div>
        <div>
          <span class="text_acc_address">Адрес доставки: <b>{{itemOrder.orderDelivery.adressDelivery}}</b></span>
        </div>
        <div>
          <span class="text_acc_address">Статус заказа: <b>{{itemOrder.orderStatus}}</b></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AccountUserDelevery",
        props: {
          user: {}
        },
      data () {
        return {
          order: []
        }
      },
      created: function init() {
        fetch(process.env.HOST + '/api/user/orders', {
          method: 'get',
          credentials: 'include'
        }) .then(response => response.json())
          // eslint-disable-next-line
          .then(commits => this.order = commits);
      }
    }
</script>

<style scoped>
  .total_text_acc_container {
    padding-bottom: 10px;
   display: block;
    border-bottom: 1px solid #1768af;
    margin-bottom: 4%;
    margin-top: 4%;
    margin-right: 20px;
  }

  .text_acc_container {
  display: flex;
  }

  .margin_right {
  margin-right: 32%;
  }
</style>
