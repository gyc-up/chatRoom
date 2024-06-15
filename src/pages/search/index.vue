<script setup lang="ts">
import { computed, ref } from 'vue'
import { addFriends, findUsers } from '~/api/web'

const SuccessShow = ref(false)
const ErrorShow = ref(false)
const addshow = ref(false)
const searchName = ref('')
const noneShow = ref(false)
const initshow = ref(true)
// 使用 computed 创建一个响应式的计算属性
const new_value = computed(() => ({
  nickName: searchName.value,
}))
const addname = ref('')
const userlist = ref<userlistType[]>([])
interface userlistType {
  userId: number
  nickName: string
  email: string
  sex: number
  password: string
}
function find() {
  findUsers(new_value.value).then((res) => {
    userlist.value = res.data.data
    if (userlist.value === '无')
      userlist.value = []
    initshow.value = false
    if (userlist.value[0] !== undefined)
      noneShow.value = false
    else
      noneShow.value = true
  })
}

function add(nick: any) {
  const tmp = {
    nickName: nick,
  }
  addFriends(tmp).then((res) => {
    if (res.data.code === 1)
      SuccessShow.value = true
    else
      ErrorShow.value = true
  })
}
</script>

<template>
  <!-- 添加成功 -->
  <van-toast v-model:show="SuccessShow" style="padding: 15px">
    <template #message>
      添加成功
    </template>
  </van-toast>
  <!-- 不能重复添加 -->
  <van-toast v-model:show="ErrorShow" style="padding: 15px">
    <template #message>
      不能重复添加好友
    </template>
  </van-toast>
  <!-- 确认添加 -->
  <van-dialog v-model:show="addshow" title="确认" show-cancel-button @confirm="add(addname)">
    你确定想要添加{{ addname }}为好友吗
  </van-dialog>
  <van-search v-model="searchName" placeholder="请输入搜索昵称" shape="round" @search="find()" />
  <div v-if="noneShow" class="text-gray">
    <p>
      没有搜索结果~ 要不换个试试？
    </p>
  </div>
  <div v-if="initshow" class="text-gray">
    <p>
      有一片宝藏等着你发现 !
    </p>
  </div>
  <template v-for="item in userlist" :key="item.userId">
    <HeadBar class="mt--1.5" @click="addshow = true;addname = item.nickName">
      <template #name>
        {{ item.nickName }}
      </template>
      <template #email>
        {{ item.email }}
      </template>
    </HeadBar>
  </template>

  <TheFooter />
</template>

<style scoped lang="less">
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 80vh;
}
</style>
