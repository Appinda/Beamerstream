<template>
  <div>
    <bs-header/>
    <b-container fluid>
      <nuxt/>    
    </b-container>
  </div>
</template>

<script>
import Header from "~/components/Header"
export default {
  name: 'ControlLayout',
  components: {
    "bs-header": Header
  }
}
</script>

<style lang="scss">

</style>
