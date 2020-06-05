class Live {
  
  constructor(){

  }

  on(name, callback){
    setInterval(() => {
      callback("Output " + Math.round(Math.random() * 100));
    }, 3000);
  }

}

class BeamerstreamService {

  constructor(){
    this.output = new Live();
    this.preview = new Live();
  }

}

export default ({ app }, inject) => {
  inject('beamerstream', new BeamerstreamService());
}