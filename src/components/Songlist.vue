<template>
  <div class="songlist bs-select">
    <div
      v-for="(item, index) in songlist"
      :key="index"
      :data-id="item.id"
      @dblclick="loadSong"
      @click="selectSong"
    >
      {{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Songlist",
  props: {
    songlist: Array
  },
  methods: {
    selectSong(e) {
      e.preventDefault();
      console.log("SS", e.target.getAttribute("data-id"));
    },
    loadSong(e) {
      e.preventDefault();
      console.log("LS", e.target.getAttribute("data-id"));
    }
  }
};
</script>

<style lang="scss" scoped>
.songlist {
  > div small {
    color: #888;
  }
  .error {
    color: red;
  }
}
</style>