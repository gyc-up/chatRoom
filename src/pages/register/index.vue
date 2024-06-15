<script setup lang="ts">
import { register } from '../../api/web'

const show = ref(false)
const ErrorShow = ref(false)
const password1 = ref('')
const password2 = ref('')
const sexShow = ref(undefined)
const options = [{ text: '男' }, { text: '女' }]
const router = useRouter()

interface userType {
  nickName: string
  email: string
  password: string
  avatar: string
  sex: number
}
const user = ref({
  nickName: '',
  email: undefined,
  password: undefined,
  avatar: undefined,
  sex: 0,
})

function Register(user: userType) {
  if (password1.value === password2.value) {
    user.password = password1.value
    register(user).then(() => {
      router.push('/')
    })
  }
  else {
    password2.value = ''
    ErrorShow.value = true
  }
}

function onFinish({ selectedOptions }: any) {
  show.value = false
  sexShow.value = selectedOptions.map((option: any) => option.text)
  if (sexShow.value === '男')
    user.value.sex = 0
  else
    user.value.sex = 1
}
const onClickLeft = () => history.back()
</script>

<template>
  <van-toast v-model:show="ErrorShow" style="padding: 15px">
    <template #message>
      两次密码输入不一致
    </template>
  </van-toast>
  <!-- 标题 -->
  <van-nav-bar
    title="Get Started"
    left-arrow
    @click-left="onClickLeft"
  />
  <!-- 主表单 -->
  <div class="center">
    <van-cell-group inset class="text-left">
      <p class="mt-2 text-5 font-900">
        NickName
      </p>
      <van-field v-model="user.nickName" :center="true" class="label" />
      <p class="mt-2 text-5 font-900">
        Email
      </p>
      <van-field v-model="user.email" :center="true" type="email" class="label" />
      <p class="mt-2 text-5 font-900">
        Password
      </p>
      <van-field v-model="password1" :center="true" type="password" class="label" />

      <p class="mt-2 text-5 font-900">
        confirm password
      </p>
      <van-field v-model="password2" :center="true" type="password" class="label" />
      <p class="mt-2 text-5 font-900">
        Sex
      </p>
      <van-field
        v-model="sexShow"
        is-link
        readonly
        :center="true"
        class="label" @click="show = true"
      />
      <div class="w-85vw" />
      <div class="center">
        <van-button type="primary" color="#536dff" text="white" block style="margin-top: 2rem; height: 4rem; width: 17rem;border-radius: 3rem; " @click="Register(user)">
          Sign Up
        </van-button>
      </div>
      <div class="center mt-5">
        <p style="display: inline;" class="text-gray">
          Already have an accent?
        </p>
        <a style="display: inline;" class="text-#536dff">
          <router-link to="/">
            Sign in
          </router-link>
        </a>
      </div>
      <van-popup v-model:show="show" round position="bottom">
        <van-cascader
          v-model="user.sex"
          title="请选择性别"
          :options="options"
          @close="show = false"
          @finish="onFinish"
        />
      </van-popup>
    </van-cell-group>
  </div>
</template>

<style scoped lang="less">
.label {
  background-color: #e7e7e7;
  height: 4rem;
  border-radius: 1rem;
  margin-top: 0.8rem;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
