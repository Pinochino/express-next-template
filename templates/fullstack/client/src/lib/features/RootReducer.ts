import { combineReducers } from "@reduxjs/toolkit";
import { counterReducer } from "./counter/CounterSlice";

const rootReducer = combineReducers({
    counter: counterReducer,
    
});

export default rootReducer;