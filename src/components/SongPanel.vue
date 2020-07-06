<template>
<div>
  <div class="songlist bs-select" v-if="song">
    <div
      v-for="(item, index) in song.verses"
      :key="index"
      :data-id="item.id"
      @dblclick="loadSong"
      @click="selectSong"
    >{{item.name}}</div>
  </div>
  <div v-else>
    <p>{{emptyText}}, {{song}}</p>
  </div>
</div>
  
</template>

<script>
export default {
  name: 'SongPanel',
  props: {
    song: Object
  },
  data: () => ({
    emptyText: "No song selected"
  }),
  methods: {
    loadSong(){

    },
    selectSong(){

    }
  }
}
</script>

<style lang="scss" scoped>

</style>