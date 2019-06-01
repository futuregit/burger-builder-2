import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder2-28e8f.firebaseio.com'
});

export default instance;