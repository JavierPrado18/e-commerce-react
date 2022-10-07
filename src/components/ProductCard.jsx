import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({product}) => {
    const navigate=useNavigate()
    return (
        
        <Col>    
          <Card onClick={()=>navigate(`/product/${product.id}`)}>
            <Card.Img variant="top" src={product.productImgs?.[0]} className="p-1" style={{height:"100px",objectFit:"contain"}}/>
            <hr/>
            <Card.Body  className='text-center'>
                <Card.Title className='mb-4'>{product.title}</Card.Title>
                <Card.Text>
                    <Row>
                   <Col>     
                <h6>Price</h6>
                {product.price}
                </Col>
                <Col>
                    <Button variant="primary" className='' style={{borderRadius:"50%",width:"50px",height:"50px"}}> <i className="fa-solid fa-cart-shopping"></i></Button>
                </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
        
    );
};

export default ProductCard;