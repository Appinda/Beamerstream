class Socket {

  constructor(){
    this.socket = null;
    this.connected = false;
  }

  connect() {
    if (this.socket) return;
    console.info("Connecting to server..");
    return new Promise((resolve, reject) => {
      if (process.env.DEV_PORT) {
        // Parse first to prevent invalid (string type) input
        const port = parseInt(process.env.DEV_PORT);
        const address = window.location.host.split(":")[0] + ':' + port;
        this.socket = io(address);
        this.socket.once('connect', (event) => {
          this.connected = true;
          console.info("Connected to server");
          resolve();
        });
        this.socket.once('connect_error', (event) => {
          reject({ message: "Cannot connect to server", data: { address, event } });
        });
        this.socket.once('connect_timeout', (event) => {
          reject({ message: "Server connection timed out", data: { address, event } });
        });
      }
      else this.socket = io();
    });
  }

  async fetchSonglist() {
    return new Promise((resolve, reject) => {
      if (!this.connected) reject({ message: "Socket not connected" });
      // Listener once for return
      this.socket.once('api', (data) => {
        console.log("DATA INCOMING", data);
        resolve(data.songlist);
      });   
      this.socket.emit('api', `{songlist {id name author ccli}}`);
    });
  }

  setActiveSong(songid){
    this.socket.emit('api', `mutation{setActiveSong(id: "${songid}")}`);
  }

}

export default Socket;