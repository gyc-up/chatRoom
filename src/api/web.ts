import request from './request'

export function login(data: any) {
  return request({
    url: 'login',
    method: 'post',
    data,
  })
}

export function register(data: any) {
  return request({
    url: 'register',
    method: 'post',
    data,
  })
}

export function getFriends() {
  return request({
    url: `user/friends`,
    method: 'get',
  })
}

export function getUser() {
  return request({
    url: `user/show`,
    method: 'get',
  })
}
export function setUser(data) {
  return request({
    url: 'user/show',
    method: 'post',
    data,
  })
}
export function addFriends(data: any) {
  return request({
    url: 'user/friends/add',
    method: 'post',
    data,
  })
}
export function deleteFriends(data: any) {
  return request({
    url: 'user/friends/delete',
    method: 'post',
    data,
  })
}
export function findFriends(data: any) {
  return request({
    url: 'user/friends/find',
    method: 'post',
    data,
  })
}

export function findUsers(data: any) {
  return request({
    url: 'user/find',
    method: 'post',
    data,
  })
}
export function getMessage(params: { fromUser: string, toUser: string }) {
  return request({
    url: 'imsingle',
    method: 'get',
    params,
  })
}

export function sendFile(data: any) {
  return request({
    url: 'files/upload',
    method: 'post',
    data,
  })
}
