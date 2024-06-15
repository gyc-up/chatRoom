import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface massages {
  content: string
  fromavatar: string
  fromuser: string
  readed: number
  recordId: number
  time: TimeRanges
  toavatar: string
  touser: string
  type: string
}
