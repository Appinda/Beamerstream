<template>
  <b-row>
    <b-col>
      <b-row class="mt-4">
        <b-col md="3" sm="12">
          <b-card>
            <template v-slot:header>
              <h6 class="mb-0">Songlist</h6>
            </template>
            <div class="songlist bs-select">
              <div v-show="songlist" v-for="(item, index) in songlist" :key="index" :data-id="item.id" @dblclick="loadSong" @click="selectSong">{{item.name}}<span class="author">{{item.author}}</span></div>
              <div v-if="!songlist" class="error">Could not load songlist</div>
            </div>
            <template v-slot:footer>
              <em>Footer Slot</em>
            </template>
          </b-card>
        </b-col>
        <b-col md="6" sm="12">
          <b-card>
            <template v-slot:header>
              <h6 class="mb-0">Panel</h6>
            </template>
            <b-card-text>Header and footers using slots.</b-card-text>
            <b-button href="#" variant="primary">Go somewhere</b-button>
            <template v-slot:footer>
              <em>Footer Slot</em>
            </template>
          </b-card>
        </b-col>
        <b-col md="3" sm="12">
          <b-card>
            <template v-slot:header>
              <h6 class="mb-0">Controls</h6>
            </template>
            <b-button-group class="w-100 mb-1">
              <b-button variant="light">
                <b-icon icon="square-fill"></b-icon>
              </b-button>
              <b-button variant="secondary">
                <b-icon icon="card-image"></b-icon>
              </b-button>
              <b-button variant="light">
                <b-icon icon="card-text"></b-icon>
              </b-button>
            </b-button-group>
            <b-button-group size="sm" class="w-100">
              <b-button variant="light">Cut</b-button>
              <b-button variant="light">Fade</b-button>
            </b-button-group>
          </b-card>
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
    currentSong: []
  }),
  methods: {
    hide() {
      this.currentVerseIndex = null;
    },
    fade() {
      this.currentVerseIndex = null;
    },
    selectVerse(e) {
      let index = parseInt(e.target.getAttribute("index"));
      if (this.currentVerseIndex == index) return false; // If already selected, return
      this.currentVerseIndex = index;
      return true;
    },
    prevVerse() {
      if (this.currentVerseIndex == null || this.currentVerseIndex === 0)
        return false;
      this.currentVerseIndex--;
      return true;
    },
    nextVerse() {
      if (
        this.currentVerseIndex == null ||
        this.currentVerseIndex === this.currentSong.length - 1
      )
        return false;
      this.currentVerseIndex++;
      return true;
    },
    selectSong(e){
      e.preventDefault();
      console.log("SS", e.target.getAttribute('data-id'));
    },
    loadSong(e){
      e.preventDefault();
      console.log("LS", e.target.getAttribute('data-id'));
    }
  },
  computed: {},
  mounted() {
    $(document).on("keydown", e => {
      // console.log(e);
      switch (e.code) {
        case "ArrowUp":
          this.prevVerse();
          break;
        case "ArrowDown":
          this.nextVerse();
          break;
      }
    });

    this.$beamerstream.on('setSonglist', (songlist) => {
      this.songlist = songlist;
    });
  },
  async asyncData({app, error}){
    await app.$beamerstream.connect();
    let songlist = await app.$beamerstream.getSonglist();
    // error("Could not connect to server");
    return { songlist };
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
  .error {
    color: red;
  }
}

.card .bs-select {
  margin: -20px;
}
.bs-select {
  @include noselect;
  > div:not(.error) {
    padding: 2px 10px;
    &:not(:last-child){
      border-bottom: 1px solid #ddd;
    }
    cursor: pointer;
    span.author {
      margin-left: 10px;
      color: #999;
      &::before{
        margin-right: 3px;
        content: '-';
      }
    }
    &:hover {
      background-color: #007bff;
      color: white;
      span.author {
        color: white;
      }  
    }
  }
}
</style>
