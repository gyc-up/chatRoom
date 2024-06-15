<script setup lang="ts">
import { onMounted } from 'vue'
import { getFriends } from '~/api/web'

const userlist: any = ref()

onMounted(() => {
  getFriends().then((res) => {
    userlist.value = res.data.data
  })
})
</script>

<template>
  <TheFooter />

  <van-nav-bar title="消息" />
  <template v-for="item in userlist" :key="item.userId">
    <lazy-component>
      <ChatBar :user="item">
        <template #name>
          {{ item.nickName }}
        </template>
      </ChatBar>
    </lazy-component>
  </template>
  <div class="mt-5">
    <van-divider :style="{ padding: '0 16px' }">
      没有更多消息了
    </van-divider>
  </div>
</template>
