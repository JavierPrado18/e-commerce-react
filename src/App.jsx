
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import MyNavbar from "./components/MyNavbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Purchases from "./pages/Purchases";
import { setIslogin } from "./store/slices/isLogin.slice";
import { getProductsTunk } from "./store/slices/products.slice";



function App() {
  
  const isLoading=useSelector(state=>state.isLoading)
  const purchases=useSelector(state=>state.purchases)
  const dispatch=useDispatch()
  

  useEffect(()=>{
    dispatch(getProductsTunk())

    if(localStorage.getItem("token")==""){
      dispatch(setIslogin(false))
      
    }else{
      dispatch(setIslogin(true))
    }
    

  },[])
  return (
    <HashRouter>
      <MyNavbar/>
      {isLoading && <Loading/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/purchases" element={<Purchases/>}/>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
