<script setup lang="ts">
import { getUser, sendFile, setUser } from '../../api/web'
import { usePassword, useUser } from '~/stores/pinia.'

const passwodStore = usePassword()
const sexShow = ref(false)
const store = useUser()
const user = ref(store.user)
const avatarShow = ref([''])
const show = ref(false)
const emailShow = ref(false)
const setShow = ref(false)
const options = [{ text: '男' }, { text: '女' }]
const SuccessShow = ref(false)
onMounted(() => {
  getUser().then((res) => {
    user.value = res.data.data
    store.setUser(user)
    avatarShow.value[0] = res.data.data.avatar
    if (user.value.sex === 0)
      user.value.sex = '男'
    else if (user.value.sex === 1)
      user.value.sex = '女'
  })
})

function onFinish({ selectedOptions }: any) {
  show.value = false
  user.value.sex = selectedOptions.map((option: any) => option.text)
  setShow.value = true
}
const fileInput = ref()

function imageClick() {
  fileInput.value.click()
}
function Register() {
  user.value.password = passwodStore.password
  setUser(user).then(() => {
    SuccessShow.value = true
  })
}
function imageChange(event: any) {
  const formdata = new FormData()
  const fileInput = event.target.files[0]
  formdata.append('file', fileInput, fileInput.name)

  sendFile(formdata).then((res) => {
    avatarShow.value[0] = res.data.data
  })
  setShow.value = true
}
</script>

<template>
  <TheFooter />
  <van-toast v-model:show="SuccessShow" style="padding: 15px">
    <template #message>
      保存成功
    </template>
  </van-toast>
  <van-popup v-model:show="show" round position="bottom">
    <van-cascader
      v-model="user.sex"
      title="该账户未选择性别"
      :options="options"
      style="height: 30vh;"
      @close="show = false"
      @finish="onFinish"
    />
  </van-popup>

  <!-- 导航栏 -->
  <van-nav-bar>
    <template #right>
      <router-link to="/">
        <van-icon name="setting-o" size="18" />
      </router-link>
    </template>
    <template #left>
      我的
    </template>
  </van-nav-bar>
  <!-- 圆角弹窗（底部） -->
  <van-popup
    v-model:show="sexShow"
    round
    position="bottom"
    class="h-15vh"
  >
    <van-field v-model="user.nickName" label="昵称" placeholder="请输入昵称" class="mt-7vh h-6vh" />
  </van-popup>
  <van-popup
    v-model:show="emailShow"
    round
    position="bottom"
    class="h-15vh"
  >
    <van-field v-model="user.email" label="邮箱" placeholder="请输入邮箱" class="mt-7vh h-6vh" />
  </van-popup>
  <!-- 我的页面 -->

  <van-cell-group>
    <!-- 头像 -->
    <input ref="fileInput" type="file" style="visibility:hidden" @change="imageChange">
    <div class="center">
      <van-image
        width="8rem"
        height="8rem"
        fit="contain"
        :src="avatarShow[0]"
        :round="true"
        style="position: absolute; top: 17%; right: calc(48% - 4rem); z-index: 999;"
        @click="imageClick()"
      />
    </div>
    <!-- 表单 -->

    <div style="z-index: 99999; background: linear-gradient(to bottom, #bcecde,#86dbc0); height: 70vh;  border-radius: 2rem 2rem 0 0; ;" class="mt-20vh pt-20">
      <div class="text-left">
        <van-cell :title="`昵称  :   ${user.nickName}`" is-link class="h-14" :center="true" @click="sexShow = !sexShow;setShow = true" />
        <van-cell :title="`邮箱  :    ${user.email}`" is-link class="h-14" :center="true" @click="emailShow = !emailShow;setShow = true" />
      </div>
      <van-field
        :label="`性别: ${user.sex}`"
        style="height: 3rem;"
        @click="show = true"
      />
      <div class="center">
        <van-button v-if="setShow" type="primary" block style="margin-top: 3rem;background-color:#1bb5fe;" @click="Register()">
          保存
        </van-button>
      </div>
    </div>
  </van-cell-group>
</template>

<style scoped lang="less">
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
