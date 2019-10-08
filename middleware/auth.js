export default async function ({ route, store, redirect }) {
    // 采用 session简化形式登录
    // 状态树中无用户信息时
    if (!store.state.authUser) {
        const userInfo =  await store.dispatch('getUserInfo')
        //  约定状态码302为登陆态失效
        if (userInfo.code === 302 && route.name !== 'login') redirect('/login')
    }
 }