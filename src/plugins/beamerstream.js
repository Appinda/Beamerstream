export default ({ app }, inject) => {
  let data = {
    songlist: [{
      id: '1',
      name: 'Everyday',
      author: 'Hillsong'
    },
    {
      id: '2',
      name: 'Everyday',
      author: 'Hillsong'
    },
    {
      id: '3',
      name: 'Everyday',
      author: 'Hillsong'
    },
    {
      id: '4',
      name: 'Everyday',
      author: 'Hillsong'
    }]
  }

  class Live {
  
    constructor(){
  
    }
  
    on(trigger, callback){
      // callback("Output " + Math.round(Math.random() * 100));
    }
  
  }
  
  class BeamerstreamService {
  
    constructor(){
      this.output = new Live();
      this.preview = new Live();
    }
  
    on(trigger, callback){
      // callback("trigger: " + trigger);
    }
  
    getSong(){
  
    }
  
    async getSonglist(){
      return await app.socket.getSonglist()
    }
  
  }

  inject('beamerstream', new BeamerstreamService());
}