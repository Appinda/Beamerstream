<template>
  <b-row>
    <b-col>
      <h1>Control</h1>
      <b-row>
        <b-col lg="4" md="4" sm="12">
          <div class="songs">
            <div class="select songlist" style="height: 100%"></div>
          </div>
        </b-col>
        <b-col lg="4" md="4" sm="12">
          <b-row>
            <b-col md="12" cols="6">
              <b-button block @click="hide">Hide</b-button>
            </b-col>
            <b-col md="12" cols="6">
              <b-button block @click="fade">Fade away</b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="4" md="4" sm="12">
          <div class="output">
            <div class="select outputlist" style="height: 100%">
              <div v-for="(item, index) in currentSong" @click="selectVerse" :index="index"  :key="index" :class="{ active: currentVerseIndex==index }">{{item}}</div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "ControlPage",
  layout: "control",
  data: () => ({
    currentVerseIndex: null,
    currentSong: [],
    songlist: []
  }),
  methods: {
    hide(){
      this.currentVerseIndex = null;
    },
    fade(){
      this.currentVerseIndex = null;
    },
    selectVerse(e){
      let index = parseInt(e.target.getAttribute("index"));
      if(this.currentVerseIndex == index) return false; // If already selected, return
      this.currentVerseIndex = index;
      return true;
    },
    prevVerse(){
      if(this.currentVerseIndex == null || this.currentVerseIndex === 0) return false;
      this.currentVerseIndex--;
      return true;
    },
    nextVerse(){
      if(this.currentVerseIndex == null || this.currentVerseIndex === this.currentSong.length-1) return false;
      this.currentVerseIndex++;
      return true;
    }
  },
  computed: {

  },
  mounted(){
    $(document).on('keydown', (e) => {
      // console.log(e);
      switch(e.code){
        case "ArrowUp":
          this.prevVerse();
          break;
        case "ArrowDown":
          this.nextVerse();
          break;
      }
    });
  }
};
</script>

<style scoped lang="scss">
.select {
  border: 1px solid #aaa;
  background-color: #f8f8f8;
  overflow-y: scroll;
  .emptytext {
    text-align: center;
    color: #888;
    margin-top: 40%;
  }
  > div {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 20ms;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently */
  }
  > div:not(:first-child) {
    border-top: 1px solid #ccc;
  }
  > div:hover {
    background-color: #eeeeff;
  }
  > div.active {
    background-color: #449bff;
    border-bottom-color: #2c64a5;
    border-top-color: #2c64a5;
    color: white;
  }
  > div.active small {
    color: #eee;
  }
}
.songlist {
  > div small {
    color: #888;
  }
}
</style>
