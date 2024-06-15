<script setup lang="ts">
import { deleteFriends } from '~/api/web'

const props = defineProps(['user'])
// 联系人组件，需要实现跳转功能
// 判断新消息
// const newMess()
const buttonshow = ref(false)
const router = useRouter()

const user = props.user

const press = ref()
function touchstart() {
  press.value = setTimeout(() => {
    buttonshow.value = true
  }, 500)
}
function cancel() {
  clearTimeout(press)
  buttonshow.value = false
}
const getavator = function () {
  if (!user.avator)
    user.avator = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  return user.avator
}

function toJump(linkId: string) {
  router.push({
    path: '/chat',
    query: {
      linkId,
      toavatar: getavator(),
    },
  })
}
function delect(nick) {
  const tmp = {
    nickName: nick,
  }
  deleteFriends(tmp).then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <div class="flex" @touchstart="touchstart()" @touchcancel="cancel">
    <div class="w-100vw">
      <div
        class="relative mt-1 bg-light-300 p-2% shadow"
        style="overflow: auto"
        @click="toJump(user.nickName)"
      >
        <van-image
          round
          fit="cover"
          width="5rem"
          height="5rem"
          class="float-left"
          :src="getavator()"
        />
        <div class="ml-5rem">
          <p class="float-left ml-2rem text-left text-lg">
            <slot name="name" />
          </p>
          <!-- 今天昨天前天——时间，本周星期几，更远报日历 -->
          <p class="text-right text-base">
            2024.4.5
          </p>
          <div class="relative ml-2rem mt-7">
            <p class="w-14rem truncate text-left text-gray font-light">
              在吗在吗在吗在吗在吗在吗在吗在吗
            </p>
            <!-- <span
              v-if="true"
              id="bot"
              class="absolute bottom-0.3rem right-0 bg-red-500"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="buttonshow" class="center trans absolute h-10 w-20 rounded-xl bg-blue" style="z-index: 10000; left: 80vw;" @click="delect(user.nickName)">
    删除好友
  </div>
</template>

<style scoped>
#bot {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
