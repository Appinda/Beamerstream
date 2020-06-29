import cors from 'cors';
export default cors({ 
  origin: [`http://localhost:${this.port}`, `http://localhost:3000`] ,
  credentials: true
});