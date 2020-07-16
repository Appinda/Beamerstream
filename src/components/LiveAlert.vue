<template>
  <div class="livealert" :class="{show}" :style="{backgroundColor: bkgcolor, color}">
    <p><b-icon :icon="icon"></b-icon> {{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'LiveAlert',
  props: {
    icon: String,
    message: String,
    bkgcolor: String,
    color: String,
    show: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.livealert {
  width: 100%;
  padding: 0.5rem 1rem;
  opacity: 0;
  transition: opacity 100ms;
  * {
    display: inline-block;
    margin: 0;
  }
  svg {
    margin-right: 10px;
  }
  p {
    font-size: 1.5em;
  }
  &.show {
    opacity: 1;
  }
}
</style>