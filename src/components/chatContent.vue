<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import { getMessage, getUser } from '~/api/web'
import { messageStore } from '~/stores/pinia.'
// 定义组件的 props
const props = defineProps<{
  from: string
  to: string
  list: any
  toavatar: string
  fromavatar: string
}>()
const from = props.from
const to = props.to
const message = messageStore()
// const toavatar = props.toavatar
// const fromavatar=props.fromavatar
watchEffect(async () => {
  const tmp = {
    fromUser: from,
    toUser: to,
  }
  getMessage(tmp).then((res) => {
    list.value = res.data.data
  })
})

watchEffect(async () => {
  try {
    const res = await getMessage({ fromUser: from, toUser: to })
    list.value = res.data.data
  }
  catch (error) {
    console.error('Failed to fetch messages:', error)
  }
})
</script>

<template>
  <!-- 加载条判断 -->
  <div>
    <!-- 加载条 -->
    <div class="h-12">
      <van-divider
        v-if="1"
        :style="{ color: 'black', borderColor: 'black', padding: '0 16px' }"
      >
        没有更多消息了
      </van-divider>
      <van-loading
        v-else
        type="spinner"
        size="24px"
        color="white"
        class="mt-8"
      />
    </div>

    <!-- 要把message写成响应式 -->
    <!-- 头像要能点击打开 -->
    <div v-for="item in message.messages" :key="item.recordId" class="w-100vw">
      <!-- 左边联系人 -->
      <div v-if="item.fromuser === to" class="mb-3 ml-4% mr-4%">
        <div class="flex">
          <van-image
            :src="item.fromavatar"
            round
            fit="cover"
            width="3rem"
            height="3rem"
          />
          <span class="ml-3 text-lg">{{ item.fromuser }}</span>
          <span class="ml-3 text-lg">{{ item.time }}</span>
        </div>
        <div class="w-80% flex">
          <span
            id="l-text"
            class="float-left ml-16 break-all rounded-2xl bg-light-50 p-2 text-left text-xl"
          >{{ item.content }}</span>
        </div>
      </div>
      <!-- 右边本人 -->
      <div v-else class="mb-3 ml-4% mr-4%">
        <div id="r-top">
          <span class="mr-3 text-lg">{{ item.time }}</span>
          <span class="mr-3 text-lg">{{ item.fromuser }}</span>
          <van-image
            :src="item.toavatar"
            round
            fit="cover"
            width="3rem"
            height="3rem"
            class="float-right"
          />
        </div>
        <div id="r-bottom">
          <span
            id="r-text"
            class="float-left mr-16 h-auto max-w-50vw w-auto rounded-2xl bg-light-50 p-2 text-left text-xl"
            style="word-wrap: break-word; overflow-wrap: break-word;"
          >{{ item.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
#r-top {
  display: flex;
  justify-content: flex-end;
}
#r-bottom {
  display: flex;
  justify-content: flex-end;
}
</style>
