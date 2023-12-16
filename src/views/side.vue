<template>
  <el-menu
      :router="true"
      class="el-menu-vertical-demo"
      :default-active="route.path"
      text-color=""
  >

    <el-sub-menu index = "1" >
      <template #title>
        <el-icon><Refrigerator /></el-icon>
        <span >Depot Data </span>
      </template>
      <el-menu-item index="/side/ware/hardware">
        <el-icon><Connection /></el-icon>Storage Record </el-menu-item>
      <el-menu-item index="/side/ware/manifest">
        <el-icon><HomeFilled /></el-icon>Depot Waybill</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/side/home" >
      <el-icon><Cpu /></el-icon>
      <div> Employee Data </div>
    </el-menu-item>
    <el-menu-item index="/side/calendar">
      <el-icon><document /></el-icon>
      <div>Shift Watch</div>
    </el-menu-item>
    <el-menu-item index="/side/action">
      <el-icon><paperclip /></el-icon>
      <div>E-request Processing</div>
    </el-menu-item>
    <el-menu-item index="/side/result">
      <el-icon><ChatLineRound /></el-icon>
      <div>E-request Inquiry</div>
    </el-menu-item>
    <el-menu-item index="/side/self">
      <el-icon><User /></el-icon>
      <div>Personal Information</div>
    </el-menu-item>
    <el-menu-item index="/side/user-management">
      <el-icon><User /></el-icon>
      <div>User Management</div>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { useRoute } from 'vue-router';
import {
  Back, ChatLineRound,
  Connection,
  Cpu,
  Document,
  HomeFilled,
  Location,
  Paperclip, Refrigerator,
  ShoppingTrolley,
  User,
} from "@element-plus/icons-vue";
import Homepage from "./workers/homepage.vue";
import Calendar from "./workers/calendar.vue";

const route = useRoute();

</script>
<style scoped>
.el-menu-vertical-demo{
  box-shadow: 5px 0 5px -5px #000;
}
</style>