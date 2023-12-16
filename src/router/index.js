import { createRouter, createWebHistory } from 'vue-router';
import homepage from '../views/workers/homepage.vue';
import calendar from "../views/workers/calendar.vue";
import login from '../views/login.vue'
import stock from '../views/mainPage/stock.vue'
import self from '../views/mainPage/selfinformation.vue'
import action from '../views/mainPage/actionLoad.vue'
import ware from '../views/warehouse/warehouseBig.vue'
import userManagement from '../views/mainPage/UserManagement.vue'
import store from "../store";


const routes = [
    { name : 'allin',
        path: '/allin',
        component: () => import('../views/allinAdmin.vue'),
        meta: {requiresAuth: true},
        children : [
            {name : "home" ,path: '/side/home',component : homepage, meta: { allowedUserTypes: ['master','admin']}},
            {name : "calendar" , path :'/side/calendar' , component : calendar, meta: {allowedUserTypes: ['master','employee','admin']}},
            {name : "stock" , path: '/side/stock' , component: stock,},
            {name : "self" , path : '/side/self' , component: self,},
            {name : "action" , path : '/side/action' , component: action ,meta: { allowedUserTypes: ['master','employee']}},
            {name : "result",path :'/side/result',component :import('../views/mainPage/actionResult.vue'), meta: { allowedUserTypes: ['master','employee','entrepot']}},
            {name: "user-management", path: '/side/user-management', component: userManagement ,meta: { allowedUserTypes: ['master']}},
            {name : "ware"  , path: '/side/ware', component: ware ,meta: { allowedUserTypes: ['master','entrepot']},
                children : [
                    {name : "hardware",path : '/side/ware/hardware',component : import('../views/warehouse/hardWare.vue')},
                    {name : "manifest",path: '/side/ware/manifest',component: import('../views/warehouse/manifest.vue')}
                ]
            }
        ],
    },
    { path: '/side',component : () => import("../views/side.vue"),},
    { name : 'login', path : '/login' , component : login},
    {name : 'test' , path: '/test',component : () => import("../views/loginTest.vue")}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 导航守卫检查身份验证状态和用户类型
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.state.loggedIn;
    const user = store.state.user;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else if (to.name === 'login' && isAuthenticated) {
        next('/allin');
    } else if (to.meta.requiresAuth) {
        // 如果路由需要身份验证
        if (!user) {
            next('/login');
        } else {
            // 如果用户类型不在允许的用户类型列表中，阻止访问
            if (to.meta.allowedUserTypes && !to.meta.allowedUserTypes.includes(user.usertype)) {
                next('/allin'); // 你可以重定向到其他页面，或者阻止访问
            } else {
                next();
            }
        }
    } else {
        next();
    }
});



export default router;
