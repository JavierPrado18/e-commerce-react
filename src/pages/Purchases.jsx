import React, { useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIslogin } from "../store/slices/isLogin.slice";

import { getPurchasesTunk } from "../store/slices/Purchases.slice";

const Purchases = () => {
  const purchases = useSelector((state) => state.purchases);
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  useEffect(() => {
    
      
    dispatch(getPurchasesTunk());
  }, []);
  return (
    <Container style={{ marginTop: "100px" }} className="w-75">
      <h2>My purchases </h2>
      <div  className="d-flex flex-column-reverse">

      
      {purchases.map((purchase) => {
        const event = new Date(purchase.createdAt);
        return (
          <Card key={purchase.id} border="secondary" style={{ width: "" }} className="m-4">
            <Card.Header>
              {event.toLocaleDateString("en-US", options)}
            </Card.Header>
            <Card.Body>
              {purchase.cart.products.map((product) => (
                <Card.Text key={product.id} onClick={()=>navigate(`/product/${product.id}`)}>{product.title}</Card.Text>
              ))}
            </Card.Body>
          </Card>
        );
      })}
      </div>
    </Container>
  );
};

export default Purchases;
