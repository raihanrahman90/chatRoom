import {configureStore} from '@reduxjs/toolkit';
import CounterReducer from './Function/CounterSlicer';
import UsernameReducer from './Function/UsernameSlicer';
export default configureStore({
    reducer: {
        counter: CounterReducer,
        username: UsernameReducer
    }
})