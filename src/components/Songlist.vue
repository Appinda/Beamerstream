<template>
  <div class="songlist bs-select">
    <div
      v-for="(item, index) in songlist"
      :key="index"
      :data-id="item.id"
      :class="{active: selectedItemId==item.id}"
      @dblclick="loadSong"
      @click="selectSong(item.id)"
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
  data: () => ({
    selectedItemId: null
  }),
  methods: {
    selectSong(songid) {
      this.selectedItemId = songid;
      this.$emit('songSelect', this.selectedItemId);
    },
    loadSong(e) {
      console.log("LOADF");
      // this.$beamerstream.setActiveSong(this.selectedItemId);
      this.$emit('songLoad');
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