class Socket {

  constructor(){
    this.socket = io();
  }

  getSonglist(){
    return new Promise((resolve, reject) => {
      this.socket.once('getSonglist', (songlist) => {
        resolve(songlist);
      });
      this.socket.emit('getSonglist');
      setTimeout(() => {
        reject("Could not get songlist");
      }, 2000);
    });
  }

}

export default ({ app }, inject) => {
  app.socket = new Socket()
}