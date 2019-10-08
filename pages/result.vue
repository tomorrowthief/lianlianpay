<template>
  <div class="container">
    <div>
      <h1>welcome </h1>
    </div>
    <div>
        <h4>支付成功</h4>
    </div>
    <div>
        <p class="detail">金额：{{orderDetail.money}}</p>
        <p class="detail">订单ID：{{orderDetail.orderId}}</p>
    </div>
    <div class="timer">
      <p>{{ticket}} 秒后跳转至主页</p>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },

  data: () => ({
    ticket: 5,
    timer: null,
    orderDetail: {}
  }),

  mounted() {
    function getUrlVars() {
        const vars = {};
        const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
            vars[key] = decodeURIComponent(value);
        });
        return vars;
    }

    try {
        this.orderDetail = JSON.parse(getUrlVars()['info'])
    } catch (err) {

    }
    
    this.timer = setInterval(() => {
        if (this.ticket <= 0) {
            clearInterval(this.timer)
            // this.$router.replace('/')
            return
        }
        this.ticket -= 1
    }, 1000)
  },

  destroyed() {
    if (this.timer) clearInterval(this.timer)
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
.timer {
  margin-top: 100px;
}
.detail {
    text-align: left;
}
</style>
