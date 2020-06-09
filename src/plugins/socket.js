export default ({ app, error, $nuxt }, inject) => {
  class Socket {

    connect(){
      console.info("Connecting to server..");
      return new Promise((resolve, reject) => {
        if(process.env.DEV_PORT) {
          // Parse first to prevent invalid (string type) input
          const port = parseInt(process.env.DEV_PORT);
          const address = `localhost:${port}`;
          this.socket = io(address);
          this.socket.once('connect', (event) => {
            this.connected = true;
            console.info("Connected to server");
            resolve();
          });
          this.socket.once('connect_error', (event) => {
            reject({ message: "Cannot connect to server", data: {address, event}});
          });
          this.socket.once('connect_timeout', (event) => {
            reject({ message: "Server connection timed out", data: {address, event}});
          });
        }
        else this.socket = io();
      });
    }
  
    async getSonglist(){
      return new Promise((resolve, reject) => {
        if(!this.connected) reject({ message: "Socket not connected"});
        // Listener once for return
        this.socket.once('getSonglist', (songlist) => {
          resolve(songlist);
        });
        this.socket.emit('getSonglist');
      });
    }
  
  }

  app.socket = new Socket()
}