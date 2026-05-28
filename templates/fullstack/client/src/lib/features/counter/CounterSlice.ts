import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterInterface {
    value: number;
}

const initialState: CounterInterface = {
    value: 0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increase: (state) => {
            state.value += 1;
        },
        decrease: (state) => {
            state.value -= 1;
        },
        increaseByValue: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    }
})

export const {increase, decrease, increaseByValue} = counterSlice.actions;
export const counterReducer = counterSlice.reducer;