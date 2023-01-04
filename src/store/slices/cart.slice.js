import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState:[],
    reducers: {
        setCart:(state,action)=>{
            return action.payload
        }
    }
})

export const {setCart  } = cartSlice.actions;
export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://e-commerce-api.academlo.tech/cart",getConfig())
        .then((res) => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}
export const addProductThunk = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://e-commerce-api.academlo.tech/cart",product,getConfig())
        .then(() => dispatch(getCartThunk()))
        .catch((error) => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
}

export const purchaseCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://e-commerce-api.academlo.tech/purchases",{},getConfig())
        .then(() => dispatch(setCart([])))
        .finally(() => dispatch(setIsLoading(false)));
}
export const deleteProductThunk = (productId) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://e-commerce-api.academlo.tech/cart/${productId}`,getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export default cartSlice.reducer;
