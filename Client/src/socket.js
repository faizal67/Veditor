import io from 'socket.io-client';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const socket = io(apiUrl);
export default socket;
