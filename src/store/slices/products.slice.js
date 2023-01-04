import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts:(state,action)=>{
            return action.payload
        }
    }
})

export const { setProducts } = productsSlice.actions;
export const getProductsTunk=()=>dispatch=>{
    dispatch(setIsLoading(true))
    axios.get("https://e-commerce-api.academlo.tech/products")
        .then(res=>dispatch(setProducts(res.data.data.products)))
        .finally(()=>dispatch(setIsLoading(false))
        )
}
export default productsSlice.reducer;
