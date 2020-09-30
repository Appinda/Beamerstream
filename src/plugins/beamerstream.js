// import Socket from "./socket";
import Transition from '~/modules/enums/Transition';
import queries from "./helpers/queries";

export default ({ app }, inject) => {

  class BeamerstreamService {

    constructor(){
      this.client = app.apolloProvider.defaultClient;
    }

    setActiveSong(songid){
      this.client.mutate({ mutation: queries.mutation.setActiveSong, variables: {id: songid}})
    }

    setTransitionDisplay(value){
      // Validate value
      if(![Transition.BLACK, Transition.THEME, Transition.TEXT].includes(value)) throw new Error("value parameter must be a valid TransitionDisplay type");
      this.client.mutate({ mutation: queries.mutation.setTransitionDisplay, variables: {display: value}});
    }
    setTransitionEase(value){
      // Validate value
      if(![Transition.CUT, Transition.FADE].includes(value)) throw new Error("value parameter must be a valid TransitionType type");
      this.client.mutate({ mutation: queries.mutation.setTransitionEase, variables: {ease: value}});
    }
  
  }

  inject('beamerstream', new BeamerstreamService());
}