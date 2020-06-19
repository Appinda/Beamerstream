import Socket from "./socket";

export default ({ app, store }, inject) => {

  class Live {
  
    constructor(){
       
    }
  
    on(trigger, callback){
      // callback("Output " + Math.round(Math.random() * 100));
    }
  
  }
  
  class BeamerstreamService {
  
    constructor(){
      console.log("Helo")
      this.output = new Live();
      this.preview = new Live();
      this.socket = new Socket();
    }
  
    on(trigger, callback){
      // callback("trigger: " + trigger);
    }
  
    prepare(){
      return this.socket.connect()
    }
    
    async prepareSonglist(){
      // Prepare songlist to be used in page
      let songlist = store.state.cache.songlist;
      let cached = true;
      // If songlist not loaded in cache (store), fetch it from server
      if(!songlist){
        songlist = await this.socket.fetchSonglist();
        store.commit('cache/setSonglist', songlist);
        cached = false;
      }
      // Return
      return { cached }
    }
  
  }

  inject('beamerstream', new BeamerstreamService());
}