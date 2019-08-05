import Vue from 'vue';
import Router from 'vue-router';
import HomeComponent from '.././components/Home/homeComponent.vue';
import GameComponent from '../components/Game/gameComponent.vue';

Vue.use(Router)
export default new Router({
    routes: [
        {
            name: 'home',
            path: '/',
            component: HomeComponent
        },
        {
            path: '/play',
            component: GameComponent
        },
    ]
})
