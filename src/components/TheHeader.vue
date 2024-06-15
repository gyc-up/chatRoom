<script setup lang="ts">
// 在 `<script setup>` 中，可以直接使用变量和函数，无需像传统 Options API 需要导出
// 这里使用 `useRouter` 和 `ref`、`watchEffect` 从 Vue 相关库中导入对应的功能
const router = useRouter() // 导入路由对象
const title = ref() // 创建一个响应式变量 title
watchEffect(() => {
  // 使用 watchEffect 监听 router.currentRoute 的变化
  // 当路由变化时，更新 title 的值为当前路由的 meta.title 或默认标题
  title.value = router.currentRoute.value.meta.title || '默认标题'
})
</script>

<template>
  <!-- 模板部分开始 -->
  <main text="center">
    <!-- 使用 VanNavBar 组件来显示页面标题和返回按钮 -->
    <van-nav-bar :title="title" />
    <!-- <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="router.back()" /> -->
  </main>
  <!-- 模板部分结束 -->
</template>
