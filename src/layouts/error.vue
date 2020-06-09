<template>
  <div class="root">
    <div class="error">
      <b-icon style="width: 70px; height: 70px;" icon="x-circle" class="mb-2"></b-icon>
      <h1>Error</h1>
      <p v-if="error.statusCode === 404">Page not found</p>
      <p v-else>{{error.message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  mounted(){
    console.error("ERROR", this.$props.error);
  }
}
</script>

<style lang="scss" scoped>
.b-icon {
  color: #ccc;
}
.root {
  padding: 1rem;
  background: #F7F8FB;
  color: #47494E;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: sans-serif;
  font-weight: 100 !important;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .error {
    max-width: 450px;
    h1 {
      font-size: 1.5rem;
      margin-top: 15px;
      color: #47494E;
      margin-bottom: 8px;
    }
  }
}
</style>