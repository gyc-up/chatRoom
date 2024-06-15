<script setup lang="ts">

</script>

<template>
  <router-view />

  <van-tabbar route class="fixed">
    <van-tabbar-item replace to="/message" icon="chat-o">
      消息
    </van-tabbar-item>

    <van-tabbar-item replace to="/search" icon="search">
      搜索
    </van-tabbar-item>
    <van-tabbar-item replace to="/my" icon="contact-o">
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>
