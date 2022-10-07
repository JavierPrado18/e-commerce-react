import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const products = useSelector((state) => state.products);

  // categories
  const [categories, setCategories] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);

  //Search product
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories));
    
  }, []);
  useEffect(() => {
    setProductsFiltered(products);

  }, [products]);

  //filtered products
  const filterCategory = (id) => {
    const filtered = products.filter((product) => id == product.category.id);
    setProductsFiltered(filtered);
  };
  console.log(productsFiltered);

  //Filtered Search product
  const searchValue = () => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchProduct.toLowerCase())
    );
    setProductsFiltered(filtered);
  };
  return (
    <Row style={{ marginTop: "100px" }} className="mx-0">
      <Col md={3} className="">
        <Accordion className=" " defaultActiveKey="0" flush>
          <Container>
            <Accordion.Item eventKey="0" className="">
              <Accordion.Header>Category</Accordion.Header>
              <Accordion.Body>
                {categories.map((category) => (
                  <p
                    key={category.id}
                    onClick={() => filterCategory(category.id)}
                    style={{ listStyle: "none" }}
                  >
                    {category.name}
                  </p>
                ))}
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Price</Accordion.Header>
              <Accordion.Body>price</Accordion.Body>
            </Accordion.Item>
          </Container>
        </Accordion>
      </Col>
      <Col>
        <Container>
          <InputGroup className="my-4 w-75 mx-auto">
            <Form.Control
              placeholder="Search product"
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            <Button variant="outline-primary" onClick={searchValue}>
              Search
            </Button>
          </InputGroup>

          <Row xs={1} sm={2} md={3} lg={4} className="g-4 my-3">
            {productsFiltered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default Home;
