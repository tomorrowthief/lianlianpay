<template>
  <div class="container">
    <div>
      
      <a-form
        :form="form"
      >
        <a-form-item
          label="金额"
          :label-col="{ span: 12 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input-number
            v-decorator="[
              'money',
              {rules: [{ required: true, message: 'Please input your money!' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="支付方式"
          :label-col="{ span: 12 }"
          :wrapper-col="{ span: 12 }"
        >
        <a-radio-group
          v-decorator="[
            'pay_type',
            {rules: [{ required: true, message: 'Please select pay_type!' }]}
          ]"
        >
          <a-radio-button value="2">网银支付</a-radio-button>
          <a-radio-button value="0">快捷支付</a-radio-button>
        </a-radio-group>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="goPay">去支付</a-button>
        </a-form-item>
      </a-form>  
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    formLayout: 'horizontal',
    form: null
  }),
  created() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    goPay() {
      // this.form.validateFields(
      //   (err, { money, pay_type }) => {
      //     if (!err) {
      //       this.$store.dispatch('pay', {
      //         money,
      //         pay_type,
      //         orderId: `lzx_test_${Date.now()}`,
      //         url_return: `${window.location.origin}/result?info=${JSON.stringify({
      //           money,
      //           pay_type,
      //           orderId: `lzx_test_${Date.now()}`,
      //         })}`
      //       })
      //     }
      //   },
      // );
      console.log(`${window.location.origin}/result?info=${encodeURIComponent(JSON.stringify({
                money: 1,
                pay_type: 1,
                orderId: `lzx_test_${Date.now()}`,
              }))}`)
      // window.location.href = `${window.location.origin}/result?info=${encodeURIComponent(JSON.stringify({
      //           money: 1,
      //           pay_type: 1,
      //           orderId: `lzx_test_${Date.now()}`,
      //         }))}`
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

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
