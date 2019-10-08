export default function ({ route, store, redirect }) {
    console.log(store.state.authUser && store.state.authUser.username);
    if (!store.state.authUser && route.name !== 'login') {
        // return redirect('/login')
    }
 }