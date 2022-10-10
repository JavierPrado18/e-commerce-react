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

import ProductCard from "../components/ProductCard";

const Home = () => {
  const products = useSelector((state) => state.products);

  // categories
  const [categories, setCategories] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  //filter price
  const [priceStart,setPriceStart]=useState("")
  const[priceEnd,setPriceEnd]=useState("")

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
  const filterPrice=(star,end)=>{
    const filtered = productsFiltered.filter((product) => Number(star)<=product.price && product.price<=Number(end));
    setProductsFiltered(filtered);
  }

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
                    className="product-purchase"
                    key={category.id}
                    onClick={() => filterCategory(category.id)}
                   
                  >
                    {category.name}
                  </p>
                ))}
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Price</Accordion.Header>
              <Accordion.Body >
                <div>
                  <label className="w-25" htmlFor="from">From:</label>
                    <input 
                      type="number" 
                      id="from" 
                      className="w-50"
                      value={priceStart}
                      onChange={(e)=>setPriceStart(e.target.value)}
                      />
                  </div>
                  <div className="my-3">
                    <label className="w-25" htmlFor="to">To:</label>
                    <input 
                      type="number" 
                      id="to" 
                      className="w-50"
                      value={priceEnd}
                      onChange={(e)=>setPriceEnd(e.target.value)}
                      />
                  </div>
                  <div className="text-end">
                  <Button onClick={()=>filterPrice(priceStart,priceEnd)}  >Filter price</Button>
                  </div>
              </Accordion.Body>
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
