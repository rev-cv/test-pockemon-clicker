import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const accountSlice = createSlice({
    name: 'account',
    initialState: 100000000 as number,
    reducers: {
        payAccountMoney: (state, action: PayloadAction<number>) => ( state - action.payload ),
        earnAccountMoney: (state, action: PayloadAction<number>) => ( state + action.payload ),
        setData: (_, action) => action.payload,
    }
});

export const { 
    payAccountMoney,
    earnAccountMoney,
    setData
} = accountSlice.actions;
export default accountSlice.reducer;