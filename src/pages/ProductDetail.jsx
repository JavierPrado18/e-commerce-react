import React, { useEffect, useState } from "react";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { addProductThunk } from "../store/slices/cart.slice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const productDetail = products.find((product) => product.id == Number(id));
  const relatedProducts = products.filter(
    (product) => product.category.id == productDetail.category.id
  );

  const [index, setIndex] = useState(0);
  const [amount, setAmount] = useState(1);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const addProduct = () => {
    const product = {
      id: id,
      quantity: amount,
    };
    dispatch(addProductThunk(product));
  };
  useEffect(() => {
    setAmount(1);
  }, [id]);

  return (
    <Container style={{ marginTop: "100px" }}>
      <Row className="m-lg-5">
        <Col md={6}>
          <Carousel
            variant="dark"
            activeIndex={index}
            onSelect={handleSelect}
            className="p-5"
          >
            {productDetail?.productImgs.map((product) => (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={product}
                  alt="First slide"
                  style={{ height: "200px", objectFit: "contain" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col className="mx-5">
          <h4>{productDetail?.title}</h4>
          <p>{productDetail?.description}</p>
          <Row className="">
            <Col>
              <p>Price</p>
              <h6>{productDetail?.price}</h6>
            </Col>
            <Col>
              <p>Quantify</p>
              <Button className="me-3" onClick={() => setAmount(amount - 1)}>
                -
              </Button>
              {amount}
              <Button className="ms-3" onClick={() => setAmount(amount + 1)}>
                +
              </Button>
            </Col>
          </Row>
          <Button
            variant="primary"
            className="my-4 w-75 mx-auto"
            onClick={addProduct}
          >
            Add to cart <i class="fa-solid fa-cart-plus"></i>
          </Button>
        </Col>
      </Row>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4 my-5">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
};

export default ProductDetail;
