<template>
  <div class="outputPage">
    <div id="FTB"></div>
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
    }
  }),
  mounted(){
    this.$beamerstream.output.on('text', (text) => {
      this.lyrics = text;
    })
    $("#FTB").fadeOut(1000);
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
.outputPage {
  #FTB {
    @include screen();
    background-color: black;
    z-index: 100;
  }
  #lyrics1 {
    color: white;
  }
  #background {
    @include screen();
    background: rgb(9,9,121);
    z-index: -1;
  }
}
</style>
