import { defineStore } from 'pinia'

export const useNickname = defineStore('nickName', {
  state: () => {
    return { nickName: '' }
  },

  actions: {
    setName(name: any) {
      this.nickName = name
    },
  },
})

export const usePassword = defineStore('password', {
  state: () => {
    return { password: '' }
  },

  actions: {
    setPassword(password: any) {
      this.password = password
    },
  },
})
export const useUser = defineStore('user', {
  state: () => {
    return {
      user: {
        avatar: '',
        email: '',
        nickName: '',
        sex: 3,
        password: '',
      },
    }
  },

  actions: {
    setUser(user: any) {
      this.user = user
    },
  },
})

export const messageStore = defineStore({
  id: 'message',
  state: () => ({
    messages: [
      {
        content: '',
        recordId: '',
        fromavatar: '',
        readed: 0,
        time: '',
        toavatar: '',
        touser: '',
        fromuser: '',
        type: 1,
      },
    ],
  }),
  actions: {
    push(data: any) {
      this.messages.push(data)
    },
    init(messages: any) {
      this.messages = messages
    },
  },
})
