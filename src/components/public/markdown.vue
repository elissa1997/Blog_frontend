<template>
  <div id="markdown">
    <mavon-editor
      v-model="renderHtml"
      :defaultOpen = "'preview'"
      :toolbarsFlag = "false"
      :editable = "false"
      :subfield = "false"
      :boxShadow = "false"
      codeStyle="vs2015"
      previewBackground	="#fffff000"
    >
    </mavon-editor>
  </div>
</template>

<script>

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

  watch: {}
}
</script>
<style lang="scss" scoped>
#markdown{}
</style>