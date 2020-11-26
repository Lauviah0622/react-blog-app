import { combineReducers } from 'redux';
import fetchReducer from '../features/fetch/fetchSlice'

console.log(fetchReducer);

export default combineReducers({
    fetchState: fetchReducer,
})
