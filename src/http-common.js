import axios from 'axios';

// const baseURL = 'http://localhost:8000/';
const baseURL = 'https://mitramas-test.herokuapp.com/';
// const token = process.env.REACT_APP_TOKEN;

export default axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

// console.log(process.env.REACT_APP_TOKEN);
