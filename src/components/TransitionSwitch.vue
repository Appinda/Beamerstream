<template>
  <div>
    <b-button-group class='w-100 mb-1'>
      <b-button :variant="btnBlackVariant" @click="setBlackDisplay">
        <b-icon icon='square-fill'></b-icon>
      </b-button>
      <b-button :variant="btnThemeVariant" @click="setThemeDisplay">
        <b-icon icon='card-image'></b-icon>
      </b-button>
      <b-button :variant="btnTextVariant" @click="setTextDisplay">
        <b-icon icon='card-text'></b-icon>
      </b-button>
    </b-button-group>
    <b-button-group size='sm' class='w-100'>
      <b-button :variant="btnCutVariant" @click="setCutType">Cut</b-button>
      <b-button :variant="btnFadeVariant" @click="setFadeType">Fade</b-button>
    </b-button-group>
  </div>
</template>

<script>
import Transition from '~/modules/enums/Transition';
export default {
  name: 'TransitionSwitch',
  data: () => ({
    
  }),
  computed: {
    display() { return this.$store.state.cache.transition.display },
    type() { return this.$store.state.cache.transition.type },
    btnBlackVariant(){ return this.getButtonColor(this.display==Transition.BLACK)},
    btnThemeVariant(){ return this.getButtonColor(this.display==Transition.THEME)},
    btnTextVariant(){ return this.getButtonColor(this.display==Transition.TEXT)},
    btnCutVariant(){ return this.getButtonColor(this.type==Transition.CUT)},
    btnFadeVariant(){ return this.getButtonColor(this.type==Transition.FADE)}
  },
  methods: {
    getButtonColor(value){
      // Get boolean, return color based on state
      return value?'secondary':'light';
    },
    setBlackDisplay(){
      this.$beamerstream.setTransitionDisplay(Transition.BLACK);
    },
    setThemeDisplay(){
      this.$beamerstream.setTransitionDisplay(Transition.THEME);
    },
    setTextDisplay(){
      this.$beamerstream.setTransitionDisplay(Transition.TEXT);
    },
    setCutType(){
      this.$beamerstream.setTransitionType(Transition.CUT);
    },
    setFadeType(){
      this.$beamerstream.setTransitionType(Transition.FADE);
    }
  }
}
</script>

<style lang='scss' scoped>

</style>