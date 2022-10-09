import React, { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setIslogin } from "../store/slices/isLogin.slice";
import Cart from "./Cart";

const MyNavbar = () => {
  const [navShow,setNavShow]=useState(false)
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);
  
  const logout = () => {
    localStorage.setItem("token", "");
    dispatch(setIslogin(false));
    setNavShow(false)

  };


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar
        bg="primary"
        variant="dark"
        expand="sm"
        className=" p-3"
        fixed="top"
      >
        <Container fluid>
          <Navbar.Toggle onClick={()=>setNavShow(true)} />
          <Navbar.Brand to="/" as={Link}>
            <i className="fa-solid fa-shop"> e-commerce</i>
          </Navbar.Brand>

          <Navbar.Offcanvas
            show={navShow} 
            placement="start"
            className=""
            style={{ color: "#E95420" }}
          >
            <Offcanvas.Header closeButton onClick={()=>setNavShow(false)}>
              <Offcanvas.Title>
                <i className="fa-solid fa-shop"> E-commerce </i>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
             {navShow && (
              <>
                <h2 className="text-center"><i className="fa-solid fa-user-tie"></i></h2>
                <h4 className="text-center"> {localStorage.getItem("user")} {localStorage.getItem("lastName")}</h4>
                <hr />
              </>
             )} 
              <Nav className=" justify-content-end flex-grow-1 pe-3">
                {isLogin ? (
                  <Nav.Link to="/login" as={Link} className="" onClick={logout}>
                    <i className="fa-solid fa-arrow-right-from-bracket">
                      {" "}
                      log out 
                    </i>
                  </Nav.Link>
                ) : (
                  <Nav.Link to="/login" as={Link} onClick={()=>setNavShow(false)}>
                    <i className="fa-solid fa-user"> log in</i>
                  </Nav.Link>
                )}
                <Nav.Link to="/purchases" as={Link} onClick={()=>setNavShow(false)} >
                  <i className="fa-solid fa-money-check-dollar "> Purchases</i>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Nav>
            <Nav.Link className="" onClick={handleShow}>
              <i className="fa-solid fa-cart-shopping"></i>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Cart show={show} handleClose={handleClose} />
    </>
  );
};

export default MyNavbar;
