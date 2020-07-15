<template>
  <div>
    <bs-header ref="header"/>
    <b-container fluid :style="{height: containerHeight}">
      <nuxt keep-alive/>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'ControlLayout',
  data: () => ({
    headerHeight: 0
  }),
  computed: {
    containerHeight(){
      return `calc(100vh - ${this.headerHeight}px)`;
    }
  },
  mounted(){
    this.headerHeight = this.$refs.header.$el.clientHeight;
  }
}
</script>

<style lang="scss">
</style>
