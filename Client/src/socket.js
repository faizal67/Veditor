import io from 'socket.io-client';
const apiUrl = process.env.REACT_APP_API_URL
// const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const socket = io(apiUrl);
// const socket = io('http://192.168.20.104:5173/');

export default socket;
