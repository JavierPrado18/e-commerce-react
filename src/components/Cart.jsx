import React, { useEffect } from "react";
import { Button, Card, Col, Offcanvas, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk, purchaseCartThunk, setCart } from "../store/slices/cart.slice";

const Cart = ({ show, handleClose }) => {
  const cart=useSelector(state=>state.cart)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getCartThunk())
  },[])
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" className="  ">
      <Offcanvas.Header closeButton className="text-primary">
        <Offcanvas.Title><b> Shopping cart</b></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      {cart.map(product=>{
        return(
        
       
          <Card border="primary" style={{ width: '18rem' }} key={product.id} className="my-3 mx-auto p-3 ">
        
        <Card.Body>
          <Card.Title>
            <p>{product.brand}</p>
            <p>{product.title}</p>
          </Card.Title>
          <Card.Text>
            <Row className="d-flex justify-content-between">
              <Col>
                <Card className="text-center p-1 w-50">
                  {product.productsInCart.quantity}
                </Card>
              </Col>
                
              <Col className="text-end">
              <Button onClick={()=>{
                }
              } ><i className="fa-solid fa-trash"></i></Button>
              </Col>
            </Row>
            <p className="text-end mt-3 fw-bold"><span className="text-secondary me-3 " >total:</span>$ {product.price*product.productsInCart.quantity}</p>
           
          </Card.Text>
        </Card.Body>
        
      </Card>
        
      )})}
      
      </Offcanvas.Body> 
      <Offcanvas.Body className="h-25 d-flex justify-content-center align-items-center">
          <Button className="w-75" onClick={()=>dispatch(purchaseCartThunk())}>Checkout</Button>
        </Offcanvas.Body> 
      
    </Offcanvas>
  );
};

export default Cart;
