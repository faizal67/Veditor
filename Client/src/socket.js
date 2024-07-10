import io from 'socket.io-client';

const apiUrl = import.meta.env.VITE_API_URL;

const socket = io(apiUrl);
// const socket = io('http://192.168.20.104:5173/');

export default socket;
