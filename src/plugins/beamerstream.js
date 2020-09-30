// import Socket from "./socket";
import Transition from '~/modules/enums/Transition';
import gql from 'graphql-tag';

export default ({ app, store }, inject) => {

  function setupListeners(){
      console.log("SetupListeners");
  }

  class BeamerstreamService {

    constructor(){
      this.client = app.apolloProvider.defaultClient;    
      setupListeners();
    }

    prepare(){
      // return socket.connect()
    }
    
    async prepareSonglist(){
      // Prepare songlist to be used in page
      let songlist = store.state.cache.songlist;
      let cached = true;
      // If songlist not loaded in cache (store), fetch it from server
      if(!songlist){
        songlist = [];
        this.client.link.subscriptionClient.onConnected(() => {
          console.log("CONNECTED");
        });
        this.client.query({query: gql`{songlist {id name author ccli}}`})
        .then(({ data }) => {
          store.commit('cache/setSonglist', data.songlist);
          cached = false;
        })

        // Active song set
        this.client.subscribe({
          query: gql`subscription{activeSongSet{meta{id,name,author,ccli},lyrics{order,verses{name,text}},themeid}}`
        }).subscribe({
            next: ({ data }) => {
              store.commit('cache/setCurrentSong', data.activeSongSet);
            }
        });
        // Liturgy
        this.client.subscribe({
          query: gql`subscription{liturgy{items{id,name,author}}}`
        }).subscribe({
            next: ({ data }) => {
              store.commit('cache/setLiturgy', data.liturgy.items);
            }
        });
      }
      // Return
      return { cached }
    }

    setActiveSong(songid){
      console.log("SAS", songid);
      this.client.mutate({ mutation: gql`mutation($id: String!){setActiveSong(id: $id)}`, variables: {id: songid}})
    }

    setTransitionDisplay(value){
      // Validate value
      if(![Transition.BLACK, Transition.THEME, Transition.TEXT].includes(value)) throw new Error("value parameter must be a valid TransitionDisplay type");
      // Send to store
      store.commit('cache/setTransitionDisplay', value);
    }
    setTransitionType(value){
      // Validate value
      if(![Transition.CUT, Transition.FADE].includes(value)) throw new Error("value parameter must be a valid TransitionType type");
      // Send to store
      store.commit('cache/setTransitionType', value);
    }
  
  }

  inject('beamerstream', new BeamerstreamService());
}