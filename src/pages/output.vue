<template>
  <div class="outputPage">
    <div ref="FTB" :style="styleFTB" id="FTB"></div>
    <p id="lyrics1" :style="lyricsStyle">{{lyrics}}</p>
    <div id="background"></div>
  </div>
</template>

<script>
export default {
  name: "OutputPage",
  data: () => ({
    lyrics: "hoi",
    lyricsStyle: {
      "fontSize": "52px"
    },
    styleFTB: {
      transition: "all 2s linear",
      opacity: 0
    },
    styleLyrics: {
      
    }
  }),
  mounted(){

  }
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
  }
  #background {
    @include screen();
    background: rgb(9,9,121);
    z-index: -1;
  }
}
</style>
