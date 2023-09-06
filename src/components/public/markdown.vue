<template>
  <div id="markdown">
    <v-md-preview :text="renderHtml"/>
  </div>
</template>

<script>
import Vue from 'vue';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';

export default {
  name: "markdown",
  props: {
    content: String
  },
  components: {
  },
  data() {
    return {
      renderHtml: undefined
    }
  },
  methods: {

  },
  mounted() {
    this.renderHtml = this.content;
  },

  created() {
    VMdPreview.use(vuepressTheme, {
      Prism,
    });
    VMdPreview.use(createKatexPlugin());
    Vue.use(VMdPreview);
  },

  watch: {}
}
</script>
<style lang="scss" scoped>
#markdown{}
</style>