<template>
<div class="songpanel">
  <ul class="bs-select">
    <li
      v-for="(item, index) in orderedLyrics"
      :key="index"
    >
      <div class="divider">{{item.name}}</div>
      <div :data-id="item.id" @click="selectVerse" class="interactive" v-html="item.text"></div>
    </li>
  </ul>
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
    selectVerse(){
      
    }
  },
  computed: {
    order(){
      return this.song.lyrics.order.split(" ");
    },
    orderedLyrics(){
      return this.order.map((o, i) => {
        let verse = this.song.lyrics.verses.find(s => s.name == o);
        if(!verse) return "";
        verse.text = verse.text
        .replace(/%n/g, '<br/>')
        .replace(/{tr}/g, `<span class="translation">`).replace(/{\/tr}/g, `</span>`)
        return verse;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.songpanel {
  height: 100%;
  position: relative;
  span.translation {
    font-size: .9em;
    color: #a300d8;
    line-height: 0;
  }
}
</style>