import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from "../../utils/getConfig"
export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases:(state,action)=>{
            return action.payload
        }
    }
})

export const { setPurchases } = purchasesSlice.actions;

export const getPurchasesTunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://e-commerce-api.academlo.tech/purchases",getConfig())
        .then((res) => dispatch(setPurchases(res.data.data.purchases)))
        .finally(() => dispatch(setIsLoading(false)));
}

export default purchasesSlice.reducer;
