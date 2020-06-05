<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <h1>Beamerstream is running!</h1>
        <nuxt-link to="/control">Control</nuxt-link>
        <nuxt-link to="/preview">Preview</nuxt-link>
        <nuxt-link to="/output">Output</nuxt-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "IndexPage"
}
</script>

<style scoped lang="scss">

</style>
