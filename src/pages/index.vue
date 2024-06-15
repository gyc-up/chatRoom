<script setup lang="ts">
import { useRouter } from 'vue-router'
import { login } from '../api/web'
import { useNickname, usePassword } from '~/stores/pinia.'

const ErrorShow = ref(false)
const router = useRouter()
const store = useNickname()
const blockShow = ref(false)
const passwodStore = usePassword()
const user = ref({
  nickName: '',
  password: '',
})
interface userType {
  nickName: string
  password: string
}
function LOGIN(user: userType) {
  login(user).then((res) => {
    const message = res.data.msg
    if (message === 'success') {
      router.push('./message')
      store.setName(user.nickName)
      passwodStore.setPassword(user.password)
    }
    else {
      if (user.password === '' || user.nickName === '')
        blockShow.value = true
      else
        ErrorShow.value = true
      user.password = ''
    }
  })
}
</script>

<template>
  <!-- 账户密码不匹配 -->
  <van-toast v-model:show="ErrorShow" style="padding: 15px">
    <template #message>
      账户或密码错误
    </template>
  </van-toast>
  <!-- 账户密码为空 -->
  <van-toast v-model:show="blockShow" style="padding: 15px">
    <template #message>
      账户或者密码不能为空
    </template>
  </van-toast>
  <!-- 主页面 -->
  <div class="center">
    <div class="center h-50vh w-100vw">
      <h1 class="text-8 font-800">
        Sign In
      </h1>
      <van-field v-model="user.nickName" label="user" style="background-color: #eeeeee; width: 240px;" />

      <van-field v-model="user.password" type="password" label="password" style="background-color: #eeeeee;width: 240px;" class="mt-5" />
      <div class="w-95vw flex" style="justify-content: space-between;" />
      <van-button type="primary" block style="width: 40vw; background-color: #29eac4; border:none;border-radius: 50px; margin-top: 2rem;" @click="LOGIN(user)">
        登陆
      </van-button>
    </div>
    <div class="h-50vh w-100vw p-10 text-white" style=" background: linear-gradient(to bottom, #87CEEB, #1E90FF);">
      <h1 class="mb-5 mt-15 text-8 font-900">
        Hello,Friend!
      </h1>
      <p class="mb-5 text-5">
        Enter your personal detaiils and start journey with us
      </p>
      <van-button type="success" style="background: none;padding: 0 60px;" color="white" :round="true" @click="router.push('/register')">
        Sign up
      </van-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
