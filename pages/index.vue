<template>
  <div class="container">
    <div>
      <h1>welcome </h1>
    </div>
    <div>
      <nuxt-link to="/pay">我要使用连连支付</nuxt-link>
    </div>
    <div class="timer">
      <p>{{new Date()}}</p>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
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
</style>
