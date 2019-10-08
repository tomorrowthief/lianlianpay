<template>
  <div class="container">
    <div>
      <a-input v-model="username" placeholder="输入姓名"/>
      <a-input v-model="password" class="mgt10" type="password" placeholder="输入密码"/>
      <a-button class="mgt10" @click="goLogin" type="primary">我要登陆</a-button>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  components: {
    Logo
  },
  data: () => ({
      username: '',
      password: ''
  }),
  methods: {
    async goLogin() {
      const result = await this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      });
      if (result.code === 200) {
        console.log(this.$router.push('/'));
      }
    }
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
}
.mgt10 {
  margin-top: 10px;
}
</style>
