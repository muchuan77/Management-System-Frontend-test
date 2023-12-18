<template>
  <el-descriptions title="Personal Information" :column="3" border>
    <el-descriptions-item
        label="User"
        label-align="right"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        width="150px"
    >{{$store.state.user.username}}</el-descriptions-item>
    <el-descriptions-item label="Contact" label-align="right" align="center"
    >{{$store.state.user.contact}}</el-descriptions-item>
    <el-descriptions-item label="Workplace" label-align="right" align="center"
    >{{$store.state.user.workplace}}</el-descriptions-item>
    <el-descriptions-item label="Usertype" label-align="right" align="center">
      <el-tag size="small">{{$store.state.user.usertype}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Email" label-align="right" align="center"
    >{{$store.state.user.mailbox}}</el-descriptions-item>
  </el-descriptions>
</template>
<style scoped>

:deep(.my-label) {
  background: var(--el-color-success-light-9) !important;
}
:deep(.my-content) {
  background: var(--el-color-danger-light-9);
}
</style>
<script setup>
</script>
