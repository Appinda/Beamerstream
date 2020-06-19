<template>
  <b-row>
    <b-col>
      <b-row class="mt-4">
        <b-col md="3" sm="12">
          <b-card>
            <template v-slot:header>
              <h6 class="mb-0">Songlist</h6>
            </template>
            <bs-songlist :songlist="songlist"/>
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
import { mapMutations } from 'vuex'

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
    }
  },
  computed: {
    songlist() {
      return this.$store.state.cache.songlist
    }
  },
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
    await app.$beamerstream.prepare();
    await app.$beamerstream.prepareSonglist();
    return {}
  }
};
</script>

<style scoped lang="scss">

</style>
