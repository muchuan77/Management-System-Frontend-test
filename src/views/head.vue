<template>
  <div>
    <el-main style="   ">
      <el-page-header :icon="null">
        <template  #content >
          <div class="flex items-bottom">
            <el-avatar
                :size="32"
                class="mr-3"
                :src="testImage"
            />
            <span class="text-large font-600 mr-3">  </span>
            <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
              {{ $store.state.user.username }}
            </span>
            <el-tag>{{ $store.state.user.usertype}}</el-tag>
          </div>
        </template>
        <template #extra>
          <div class="flex items-center">
            <el-button @click="switchAccount">Switch Account</el-button>
            <el-button type="primary" class="ml-2" @click="onLogout">Logout</el-button>
          </div>
        </template>
      </el-page-header>
    </el-main>
  </div>
</template>

<script setup>
import testImage from '../assets/testImage.jpg'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import router from '../router'

const store = useStore()

const onLogout = () => {
  // Perform logout logic and then call the 'logout' mutation in Vuex
  store.commit('logout')
  // You can add other logout logic here, such as clearing local storage, etc.
  ElMessage.success("Logged out successfully!")
  // Redirect to the login page
  router.push({ name: 'login' })
};


const switchAccount = () => {
  onLogout()
}
</script>

<style scoped>
</style>
