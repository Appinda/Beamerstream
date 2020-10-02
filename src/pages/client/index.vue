<template>
  <b-row class="h-100">
    <b-col class="h-100">
      <b-row class="py-4 h-100">
        <b-col md="3" sm="12" class="h-100">
          <b-card class="h-100">
            <template v-slot:header>
              <h6 class="mb-0">Songlist</h6>
            </template>
            <bs-songlist :songlist="songlist" @songLoad="loadSong" />
            <template v-slot:footer></template>
          </b-card>
        </b-col>
        <b-col md="6" sm="12"  class="h-100">
          <b-card class="h-100">
            <template v-slot:header>
              <h6 class="mb-0">{{activeSong?activeSong.meta.name:"No song selected"}}</h6>
            </template>
            <bs-songpanel :song="activeSong" v-if="activeSong"/>
            <template v-slot:footer></template>
          </b-card>
        </b-col>
        <b-col md="3" sm="12">
          <b-row :style="{height: '80%'}">
            <b-col class="h-100 pb-4">
              <b-card class="h-100">
                <template v-slot:header>
                  <h6 class="mb-0">Liturgy</h6>
                </template>
                <p v-for="(v,k) in liturgy.items" :key="k">{{v.name}}</p>
                <template v-slot:footer></template>
              </b-card>
            </b-col>  
          </b-row>
          <b-row :style="{height: '20%'}">
            <b-col class="h-100">
              <b-card class="h-100">
                <template v-slot:header>
                  <h6 class="mb-0">Controls</h6>
                </template>
                <bs-transitionswitch :transitionType="transitionType"/>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import queries from "@/plugins/helpers/queries";

export default {
  name: "ControlPage",
  layout: "control",
  loading: false,
  data: () => ({
    currentVerseIndex: null,
    liturgy: {
      items: []
    },
    songlist: [],
    activeSong: null,
    transitionType: {
      display: "",
      ease: ""
    }
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
    selectSong(data){
      
    },
    loadSong(data){
      this.$beamerstream.setActiveSong(data);
    }
  },
  apollo: {
    songlist: queries.query.songlist,
    activeSong: {
      query: queries.query.activeSong,
      subscribeToMore: {
        document: queries.subscription.activeSong,
        updateQuery: (previousResult, { subscriptionData }) => {
          return { activeSong: Object.assign(previousResult.activeSong, subscriptionData.data.activeSong) }
        },
      }
    },
    liturgy: queries.query.liturgy,
    transitionType: {
      query: queries.query.transitionType,
      subscribeToMore: {
        document: queries.subscription.transitionType,
        updateQuery: (previousResult, { subscriptionData }) => {
          return { transitionType: Object.assign(previousResult.transitionType, subscriptionData.data.transitionType) }
        },
      }
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
  }
};
</script>

<style scoped lang="scss">
</style>
