<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <a-button type="primary">
      Primary
    </a-button>
    <icon-park type="AddText" theme="filled"/>

    <div class="globleTest">全局样式测试</div>
  </div>
</template>

<script>
import { IconPark } from '@icon-park/vue/es/all';
import { Button } from 'ant-design-vue'

export default {
  name: 'Home',
  components: {
    IconPark,
    [Button.name]: Button,
  }
}
</script>
