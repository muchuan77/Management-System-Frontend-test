// src/store/index.js
import { createStore } from 'vuex';

const store = createStore({
    state: {
        loggedIn: false,
        user: null, // 初始状态可以根据您的需要定义
        users: [],
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            state.loggedIn = true;
        },
        logout(state) {
            state.user = null;
            state.loggedIn = false;
        },
    },
    // 您可以添加更多的 actions、getters 等
});

export default store;

