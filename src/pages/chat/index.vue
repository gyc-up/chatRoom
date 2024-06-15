<script setup lang="ts">
// 发出的消息

import { messageStore, useNickname } from '~/stores/pinia.'
import { getMessage, getUser } from '~/api/web'
import Emoji from '~/components/Emoji.vue'

const Emojishow = ref(false)
const store = useNickname()
const message = messageStore()
const router = useRouter()
// 实现滑动的基础
const linkId = ref()
linkId.value = new URLSearchParams(window.location.search).get('linkId')
const chatContainer = ref<HTMLElement | null>(null)
const toavatar = ref()
toavatar.value = new URLSearchParams(window.location.search).get('toavatar')
// 回到底部按钮的显示
const backVisiable = ref()
// 最新消息按钮的显示
const fromavatar = ref()
const newVisiable = ref()
const inputMess = ref('')
const list = ref([])
const socket = new WebSocket(`ws://localhost:8080/imserverSingle/${store.nickName}`)
socket.onopen = function () {
  console.log('WebSocket 连接已建立')
}

socket.onmessage = function (event) {
  const reserve = JSON.parse(event.data) // 注意这里需要解析JSON
  message.push({
    content: reserve.content,
    recordId: reserve.recordId,
    fromavatar: reserve.fromavatar,
    readed: 1,
    time: reserve.time,
    toavatar: reserve.toavatar,
    touser: store.nickName,
    fromuser: linkId.value,
    type: 1,
  })
}

socket.onclose = function (event) {
  console.log('WebSocket 连接已关闭:', event)
}

function handleEnterKey() {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      content: inputMess.value,
      fromuser: store.nickName,
      fromavatar: fromavatar.value,
      type: '1',
      touser: linkId.value,
      toavatar: toavatar.value,
    }))

    backBott()
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = (`0${currentDate.getMonth() + 1}`).slice(-2) // 月份从0开始，所以要加1
    const day = (`0${currentDate.getDate()}`).slice(-2)
    const hours = (`0${currentDate.getHours()}`).slice(-2)
    const minutes = (`0${currentDate.getMinutes()}`).slice(-2)
    const seconds = (`0${currentDate.getSeconds()}`).slice(-2)

    // 根据所需的格式构建时间字符串
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    message.push({
      content: inputMess.value,
      recordId: list.value[list.value.length - 1].recordId + 1,
      fromavatar: fromavatar.value,
      readed: 0,
      time: formattedTime,
      toavatar: toavatar.value,
      touser: linkId,
      fromuser: store.nickName,
      type: 1,
    })
    inputMess.value = ''
  }
  else { console.error('WebSocket 连接已关闭，无法发送数据') }
}
// 监听滚动
// 或许可以尝试实现上滑一定高度后下滑显示，上滑再消失
function changeVisi() {
  if (chatContainer.value) {
    const vTop: number = chatContainer.value.scrollTop
    const vHeight: number = chatContainer.value.scrollHeight
    const vOffHeight: number = chatContainer.value.offsetHeight
    if (vTop < vHeight - 2 * vOffHeight)
      backVisiable.value = true
    else
      backVisiable.value = false
  }
}
function addemoji(item: any) {
  inputMess.value = inputMess.value + item
}
// 回到底部
function backBott() {
  if (chatContainer.value)
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  backVisiable.value = false
}

onUpdated(() => {
})

onMounted(() => {
  // 初始滚动
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    backVisiable.value = false
  }
  // 是否有新消息的判断
  if (1)
    newVisiable.value = true

  const tmp = {
    fromUser: store.nickName,
    toUser: linkId.value,
  }
  getUser().then((res) => {
    if (res.data.data.avatar === '')
      fromavatar.value = 'https://tse4-mm.cn.bing.net/th/id/OIP-C.QDl_Z7HdQWX_XbVYgBLJLQAAAA?rs=1&pid=ImgDetMain'
    else
      fromavatar.value = 'https://tse4-mm.cn.bing.net/th/id/OIP-C.QDl_Z7HdQWX_XbVYgBLJLQAAAA?rs=1&pid=ImgDetMain'
    console.log(fromavatar)
  })
  getMessage(tmp).then((res) => {
    list.value = res.data.data
    console.log(list)
    message.init(res.data.data)
  })
})
</script>

<template>
  <main>
    <div class="header van-safe-area-top">
      <van-icon
        name="arrow-left"
        class="icon"
        size="2rem"
        @click="router.back()"
      />
      <span>{{ linkId }}</span>
    </div>

    <!-- 去往最新消息 -->
    <!-- <transition name="van-slide-right">
      <div v-if="newVisiable" class="comeNew" @click="newBott()">
        <van-icon
          name="comment-o"
          class="iconTop"
          color="rgb(0, 216, 236)"
          size="1.7rem"
        />
        <span>14条新消息</span>
      </div>
    </transition> -->

    <!-- 可视的聊天主体 -->
    <div ref="chatContainer" class="messView" @scroll="changeVisi()">
      <chat-content :to="linkId" :from="store.nickName" :list="list" :toavatar="toavatar" :fromavatar="fromavatar" />
    </div>

    <!-- 消息发送 -->
    <div class="footer van-safe-area-bottom" style="height:auto ;">
      <div class="van-haptics-feedback">
        <van-icon name="smile-o" color="gray" size="2.3rem" @click="Emojishow = !Emojishow" />
        <Emoji v-show="Emojishow" style="width: 100px; height: 300px; width:200px;position: absolute; bottom:4.05rem;left:-1px" @select="addemoji" />
      </div>
      <van-field
        v-model="inputMess"
        class="messBox my-3"
        rows="1"
        clickable
        type="textarea"
        autosize
        placeholder="请输入"
        style="height: auto;"
        @keyup.enter="handleEnterKey()"
      />
      <van-button class="sentBut" text="发送" @click="handleEnterKey()" />
    </div>

    <!-- 返回底部 -->
    <transition name="van-slide-up">
      <div v-if="backVisiable" class="backBottom" @click="backBott">
        <van-icon name="down" class="backIcon" size="2rem" color="white" />
      </div>
    </transition>
  </main>
</template>

<route lang="yaml">
meta:
    layout: default
    title: 'chat'
</route>

<style scoped lang="less">
.header {
  width: 100vw;
  position: fixed;
  top: 0;

  height: 3rem;
  background-color: rgb(224, 241, 237);
  .icon {
    position: fixed;
    left: 1rem;
    top: 0.5rem;
    color: rgb(82, 82, 67);
  }
  .icon:hover {
    color: azure;
  }
  span {
    position: relative;
    top: 0.5rem;
    font-size: 1.3rem;
    color: rgb(57, 57, 57);
  }
}
.comeNew {
  position: fixed;
  display: flex;
  right: 0;
  top: 7rem;
  z-index: 1;
  width: 10rem;
  height: 2.4rem;
  opacity: 0.9;
  border-top-left-radius: 1.2rem 1.2rem;
  border-bottom-left-radius: 1.2rem 1.2rem;
  background-color: rgb(255, 255, 255);
  .iconTop {
    margin-top: 0.5rem;
    margin-left: 0.8rem;
  }
  span {
    color: rgb(0, 216, 236);
    font-size: 1.2rem;
    margin-left: 0.8rem;
    margin-top: 0.4rem;
  }
}
.messView {
  width: 100vw;
  background-image: linear-gradient(
    135deg,
    rgb(150, 235, 205),
    rgb(155, 193, 50)
  );
  position: fixed;
  top: 3rem;
  bottom: 4rem;
  overflow: auto;
}
.backBottom {
  background-color: rgb(0, 216, 236);
  box-shadow: 0 0.2rem 0.2rem rgb(199, 179, 0);
  opacity: 0.8;
  border-radius: 50%;
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  height: 3rem;
  width: 3rem;
  .backIcon {
    margin-top: 0.5rem;
  }
}
.footer {
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  background-image: linear-gradient(
    to right,
    rgb(227, 235, 15),
    rgb(214, 161, 99)
  );
  width: 100%;
  height: 4rem;
  .messBox {
    height: 2.5rem;
    width: 65%;
    padding: 0.5rem;
  }
  .sentBut {
    width: 4.5rem;
    color: rgb(255, 255, 255);
    background-image: linear-gradient(
      to right,
      rgb(34, 243, 222),
      rgb(2, 164, 251)
    );
  }
}
</style>
