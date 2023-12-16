import './assets/main.css'
import { createApp } from 'vue'
import router from "./router/index";
import App from "./App.vue";
import axios, {Axios} from "axios";
import store from "./store";
// 配置后端端口的访问地址
axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')