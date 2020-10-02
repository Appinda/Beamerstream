<template>
  <div class="outputPage">
    <div ref="FTB" :style="FTBStyle" id="FTB"></div>
    <p id="lyrics1" :style="lyricsStyle" v-html="lyrics"></p>
    <div id="background" :style="backgroundStyle"></div>
    <bs-livealert :show="alert.show" :color="alert.color" :bkgcolor="alert.bkgcolor" :message="alert.message" :icon="alert.icon"/>
  </div>
</template>

<script>
import queries from "@/plugins/helpers/queries";
export default {
  name: "OutputPage",
  data: () => ({
    styleLyrics: {
      
    },
    alert: {
      color: "",
      bkgcolor: "",
      icon: "",
      message: "",
      show: false
    },
    transitionType: {
      ease: '',
      display: ''
    },
    activeSong: null
  }),
  computed: {
    transition(){
      return this.transitionType.ease=='fade'?'opacity 300ms linear':'0'
    },
    FTBStyle(){
      return {
        opacity: ['black'].includes(this.transitionType.display)?1:0, 
        transition: this.transition,
      }
    },
    lyricsStyle(){
      return {
        opacity: ['text'].includes(this.transitionType.display)?1:0,
        fontSize: "80px",
        transition: this.transition,
      }
    },
    backgroundStyle(){
      return {
        transition: this.transition,
      }
    },
    lyrics() {
      if(!this.activeSong) return "";
      return this.activeSong.lyrics.verses[0].text.replace(/%n/g, '<br/>');
    }
  },
  methods: {
    showErrorAlert(message){
      if(this.alert.show) return false; // Allow only once alert at the time
      this.alert = {
        color: "white",
        bkgcolor: "red",
        icon: "exclamation-circle-fill",
        message: message,
        show: true,
        timeout: 3000
      } 
      setTimeout(() => {
        this.closeAlert();
      }, this.alert.timeout);
    },
    showSuccessAlert(message){
      if(this.alert.show) return false; // Allow only once alert at the time
      this.alert = {
        color: "white",
        bkgcolor: "green",
        icon: "check-circle-fill",
        message: message,
        show: true,
        timeout: 3000
      } 
      setTimeout(() => {
        this.closeAlert();
      }, this.alert.timeout);
    },
    closeAlert(){
      this.alert.show = false;
    }
  },
  apollo: {
    transitionType: {
      query: queries.query.transitionType,
      subscribeToMore: {
        document: queries.subscription.transitionType,
        updateQuery: (previousResult, { subscriptionData }) => {
          console.log("New", subscriptionData)
          previousResult.transitionType.display = subscriptionData.data.transitionType.display;
          previousResult.transitionType.ease = subscriptionData.data.transitionType.ease;
        },
      }
    },
    activeSong: {
      query: queries.query.activeSong,
      subscribeToMore: {
        document: queries.subscription.activeSong,
        updateQuery: (previousResult, { subscriptionData }) => {
          return { activeSong: Object.assign(previousResult.activeSong, subscriptionData.data.activeSong) }
        },
      }
    },
  },
}
</script>

<style scoped lang="scss">
@mixin screen {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
@mixin textShadow($size) {
  text-shadow: 
  rgb(0, 0, 0) 3px 0px 0px, 
  rgb(0, 0, 0) 2.83487px 0.981584px 0px, 
  rgb(0, 0, 0) 2.35766px 1.85511px 0px, 
  rgb(0, 0, 0) 1.62091px 2.52441px 0px, 
  rgb(0, 0, 0) 0.705713px 2.91581px 0px, 
  rgb(0, 0, 0) -0.287171px 2.98622px 0px, 
  rgb(0, 0, 0) -1.24844px 2.72789px 0px, 
  rgb(0, 0, 0) -2.07227px 2.16926px 0px, 
  rgb(0, 0, 0) -2.66798px 1.37182px 0px, 
  rgb(0, 0, 0) -2.96998px 0.42336px 0px, 
  rgb(0, 0, 0) -2.94502px -0.571704px 0px, 
  rgb(0, 0, 0) -2.59586px -1.50383px 0px, 
  rgb(0, 0, 0) -1.96093px -2.27041px 0px, 
  rgb(0, 0, 0) -1.11013px -2.78704px 0px, 
  rgb(0, 0, 0) -0.137119px -2.99686px 0px, 
  rgb(0, 0, 0) 0.850987px -2.87677px 0px, 
  rgb(0, 0, 0) 1.74541px -2.43999px 0px, 
  rgb(0, 0, 0) 2.44769px -1.73459px 0px, 
  rgb(0, 0, 0) 2.88051px -0.838247px 0px;
}
.outputPage {
  #FTB {
    @include screen();
    background-color: black;
    z-index: 100;
  }
  #lyrics1 {
    @include textShadow(1);
    color: white;
    margin: 1rem 2rem;
  }
  #background {
    @include screen();
    background: rgb(9,9,121);
    z-index: -1;
  }
}
.livealert {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
