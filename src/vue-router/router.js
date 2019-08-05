import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '.././components/Home/homeComponent.vue'

Vue.use(Router)
export default new Router({
    routes: [
        {
            name: 'home',
            path: '/',
            component: HomeComponent
        }
    ]
})
