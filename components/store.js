import {createStore} from 'redux';
import userUIDReducer from './reducers/userUIDReducer';

export default function store(){
    return createStore(userUIDReducer)
}