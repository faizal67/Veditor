import io from 'socket.io-client';

const socket = io('http://localhost:3000');
// const socket = io('http://192.168.20.104:5173/');

export default socket;
