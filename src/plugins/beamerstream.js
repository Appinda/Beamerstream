// import Socket from "./socket";
import Transition from '~/modules/enums/Transition';
import gql from 'graphql-tag';

export default ({ app, store }, inject) => {
  
  let socket = null;

  function setupListeners(){
      console.log("SetupListeners");
  }

  class BeamerstreamService {

    constructor(){
      // socket = new Socket();
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
        const client = app.apolloProvider.defaultClient;    
        client.query({query: gql`{songlist {id name author ccli}}`})
        .then(({ data }) => {
          store.commit('cache/setSonglist', data.songlist);
          cached = false;
        });

        const s = client.subscribe({
          query: gql`subscription{
            activeSongSet
          }`
        })
      
        s.subscribe({
            next: ({ data }) => {
              console.log(data)
              store.commit('cache/setCurrentSong', data.activeSongSet);
            }
        });
      }
      // Return
      return { cached }
    }

    setActiveSong(songid){
      const client = app.apolloProvider.defaultClient;    
      // client.query({query: gql`{songlist {id name author ccli}}`})
      client.mutate({ mutation: gql`mutation($id: String!){setActiveSong(id: $id)}`, variables: {id: songid}})
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