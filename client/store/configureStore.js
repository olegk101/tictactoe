import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
import Grid from '../store/grid';

const socket = io();
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const newGrid = new Grid(19).createGrid();
const roomId = Math.floor(Math.random() * (1000000 - 100000)) + 1;

const initialState = {
	players: {
		allPlayers: ['Player 1', 'Player 2'],
		currentPlayer: 'player1',
		player1Score: 0,
		player2Score: 0,
		secondPlayerDiconnected: false,
	},
	grid: newGrid,
	room: roomId,
};

const configureStore = () => {
  const store = createStore(rootReducer, initialState, applyMiddleware(socketIoMiddleware));
  return store;
};

export default configureStore;
