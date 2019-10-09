const Koa = require('koa')
const Router = require('koa-router')
const { Nuxt, Builder } = require('nuxt')
const axios = require('axios')
const moment = require('moment')
const bodyParser = require('koa-bodyparser')
const { sign, verify } = require('./utils/crypto')
const Utils = require('./utils/utils');


const app = new Koa()
const router = new Router()


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(bodyParser());

  app.use(async (ctx, next) => {
    // check userInfo
    const cookie = ctx.cookies.get('JSESSIONID');
    if (!cookie) {
      ctx.body=  {"code": 302, "data": true, "message": "not login"}
      await next()
    } else {
      await next()
    }
  })

  router.post('/api/userInfo', (ctx, next) => {
    // 简化login流程 只通过是否有cookie, 正常是通过cookie保存sessionId来验证
    const cookie = ctx.cookies.get('JSESSIONID');
    ctx.body = {"code": cookie ? 200 : 302, "data": cookie ? {"username": "lzx"} : null, "message": "user info"}
  })

  router.post('/api/login', async (ctx, next) => {
    // 简化login流程 只通过是否有cookie, 正常是通过cookie保存sessionId来验证
    // setCookie 设置
    ctx.cookies.set('JSESSIONID', 'sessionId', {
      maxAge: 60 * 60 * 1000,   // cookie有效时长
      httpOnly:false
    });
    ctx.body = {"code": 200, "data": {"username": "lzx"}, "message": "success login"}
  })

  router.post('/api/logout', async (ctx, next) => {
    // setCookie 清理
    ctx.cookies.set('JSESSIONID', '', {
      maxAge: 0,   // cookie有效时长
    });
    ctx.body = {"code": 200, "data": true, "message": "success logout"}
  })

  router.post('/api/pay', async (ctx, next) => {
    // 参数写死
    const param = {
      "api_version": "1.0",
      "sign_type": "RSA",
      "time_stamp": moment().format('YYYYMMDDHHMMSS'),
      "oid_partner": "201408071000001539",
      "user_id": "lzx_test_user000001",
      "busi_partner": "101001",
      "no_order": ctx.request.body.orderId,
      "dt_order": moment().format('YYYYMMDDHHMMSS'),
      "name_goods": "lzx测试",
      "money_order": ctx.request.body.money || '0.01',
      "notify_url": "http://test.lianlianpay.com.cn/help/notify.php",
      "risk_item": "{\"user_info_bind_phone\":\"15658020589\",\"user_info_dt_register\":\"20181030122130\",\"frms_ware_category \":\"1009\"}",
      "flag_pay_product": ctx.request.body.pay_type || '2',
      "flag_chnl": "2",
      "url_return": ctx.request.body.url_return
    };

    // 生成签名原串
    const sign_str = Utils.objSortAndUrlStr(param);

    // 获取签名
    const signed_str = sign(sign_str);

    // 加入参数
    param.sign = signed_str;

    const { data } = await axios.post('	https://payserverapi.lianlianpay.com/v1/paycreatebill', param);
    ctx.status = 200
    ctx.body = {"code": 200, "data": data, "message": "pay result"}
  })
  
  app.use(router.routes())


  app.use(async (ctx, next) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
