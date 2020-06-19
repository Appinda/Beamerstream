import CacheStorage from "./cache";
import Socket from "./socket";

export default ({ app }, inject) => {

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
      this.cache = new CacheStorage();
      this.socket = new Socket();
    }
  
    on(trigger, callback){
      // callback("trigger: " + trigger);
    }
  
    getSong(){
  
    }
  
    connect(){
      return this.socket.connect()
    }
    async getSonglist(){
      let cached = this.cache.getSonglist();
      if(cached) return cached;
      let fetched = await this.socket.getSonglist();
      this.cache.setSonglist(fetched);
      return fetched;
    }
  
  }

  inject('beamerstream', new BeamerstreamService());
}