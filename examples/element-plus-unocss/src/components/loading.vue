<template>
  <el-button v-loading.fullscreen.lock="fullscreenLoading" 
  type="primary" @click="openFullScreen1"
  font="mono light"
  p="y-2 x-4" border="2 rounded blue-200">
    Click me
  </el-button>
</template>
 ​
<script setup>
import { ref } from 'vue'
// import { ElLoading, ElButton } from 'element-plus'

const fullscreenLoading = ref(false)
const openFullScreen1 = () => {
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
  }, 2000)
}
</script>

<style lang="scss" scoped>
</style>
