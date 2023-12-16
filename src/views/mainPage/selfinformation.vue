<template>
  <el-descriptions title="Personal Information" :column="3" border>
    <el-descriptions-item
        label="User"
        label-align="right"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        width="150px"
    >John Doe</el-descriptions-item>
    <el-descriptions-item label="Contact" label-align="right" align="center"
    >18100000000</el-descriptions-item>
    <el-descriptions-item label="Workplace" label-align="right" align="center"
    >Tokyo</el-descriptions-item>
    <el-descriptions-item label="Department Tags" label-align="right" align="center">
      <el-tag size="small">Office</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Email" label-align="right" align="center"
    >john.doe@example.com</el-descriptions-item>
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
