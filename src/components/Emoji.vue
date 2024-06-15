<script lang="ts" setup>
function emojis() {
  return '😀,😁,😂,😃,😄,😅,😆,😉,😊,😋,😎,😍,😘,😗,😙,😚,😇,😐,😑,😶,😏,😣,😥,😮,😯,😪,😫,😴,😌,😛,😜,😝,😒,😓,😔,😕,😲,😷,😖,😞,😟,😤,😢,😭,😦,😧,😨,😬,😰,😱,😳,😵,😡,😠,💘,❤,💓,💔,💕,💖,💗,💙,💚,💛,💜,💝,💞,💟,❣,💪,👈,👉,☝,👆,👇,✌,✋,👌,👍,👎,✊,👊,👋,👏,👐,✍,🍇,🍈,🍉,🍊,🍋,🍌,🍍,🍎,🍏,🍐,🍑,🍒,🍓,🍅,🍆,🌽,🍄,🌰,🍞,🍖,🍗,🍔,🍟,🍕,🍳,🍲,🍱,🍘,🍙,🍚,🍛,🍜,🍝,🍠,🍢,🍣,🍤,🍥,🍡,🍦,🍧,🍨,🍩,🍪,🎂,🍰,🍫,🍬,🍭,🍮,🍯,🍼,☕,🍵,🍶,🍷,🍸,🍹,🍺,🍻,🍴,🌹,🍀,🍎,💰,📱,🌙,🍁,🍂,🍃,🌷,💎,🔪,🔫,🏀,⚽,⚡,👄,👍,🔥,🙈,🙉,🙊,🐵,🐒,🐶,🐕,🐩,🐺,🐱,😺,😸,😹,😻,😼,😽,🙀,😿,😾,🐈,🐯,🐅,🐆,🐴,🐎,🐮,🐂,🐃,🐄,🐷,🐖,🐗,🐽,🐏,🐑,🐐,🐪,🐫,🐘,🐭,🐁,🐀,🐹,🐰,🐇,🐻,🐨,🐼,🐾,🐔,🐓,🐣,🐤,🐥,🐦,🐧,🐸,🐊,🐢,🐍,🐲,🐉,🐳,🐋,🐬,🐟,🐠,🐡,🐙,🐚,🐌,🐛,🐜,🐝,🐞,🦋,😈,👿,👹,👺,💀,☠,👻,👽,👾,💣'
}
// function test(item) {
// $emit.
// }
const emojiArr: Array<string> = emojis().split(',')
</script>

<template>
  <div class="emoji">
    <ul class="emoji-default">
      <li v-for="(item, index) in emojiArr" :key="index" @click="$emit('select', item)">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
// 纵向滚动条
.scroll-bar(@width: 10px) {
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #ffffff;
  }

  &::-webkit-scrollbar {
    width: @width;
    height: 10px;
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
  }
}

.emoji {
  text-align: left;

  height: 100%;
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow:
    0 2px 4px 0 rgb(0 0 0 / 12%),
    0 0 6px 0 rgb(0 0 0 / 4%);

  .emoji-default {
    height: 100%;
    overflow-y: auto;
    .scroll-bar();

    li {
      display: inline-block;
      padding: 5px;
      font-size: 24px;
      width: 29px;
      height: 29px;
      overflow: hidden;
      cursor: pointer;
    }
  }
}
</style>
