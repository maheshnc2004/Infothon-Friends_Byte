import { useEffect, useState } from 'react';
import { Button, NavItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CustomContext } from '../../context/AuthContext';
import Login from '../authentication/Login';
import { BiLogIn } from 'react-icons/bi';
import Location from './utilities/Location';
import UserProfileDropdown from './utilities/UserProfileDropdown';

export default function Header() {

  const { pathname } = useLocation();
  const context = CustomContext();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  function handleFarmerLogin() {
    const role = context?.user?.roles?.filter(role => role.id !== 601);
    if (role[0]?.role !== "ROLE_FARMER") {
      navigate("/register", { state: { addRole: "farmer", userId: context?.user?.id } });
    } else {
      navigate("/add-produce");
    }
  }

  return (
    <Navbar expand="md" style={{ backgroundColor: '#263238 ' }} className="shadow-lg" fixed={pathname === "/" && "top"}>
      <Container fluid>
        <div className='d-flex me-3'>
          <Navbar.Brand href="/">Farm Connect</Navbar.Brand>
          <div className='d-flex align-items-center'>
            <Location />
          </div>
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0 d-flex gap-3 text-light justify-content-between w-100"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <div className='d-flex gap-3 text-light flex-column flex-md-row flex-sm-row align-items-start align-items-md-center align-items-sm-start'>
              <NavItem>
                <Link to={"/"}>Home</Link>
              </NavItem>
              <NavItem>
                <a href="#about">About Us</a>
              </NavItem>
              <NavItem>
                <a href="#contact">Contact</a>
              </NavItem>
            </div>
            <div className='d-flex gap-3 flex-column flex-md-row'>
              {context?.isAuthenticated ? (
                <div className='authenticated d-flex align-items-center gap-2'>
                  <NavItem>
                    <Button className="btn-p text-dark border-0" onClick={handleFarmerLogin}>
                      <span style={{ fontSize: '0.9rem' }}>SELL PRODUCT</span>
                    </Button>
                  </NavItem>
                  <NavItem className='d-flex align-items-center text-s' style={{ cursor: 'pointer' }}>
                    <UserProfileDropdown />
                  </NavItem>
                </div>
              ) : (
                <div className='not-authenticated d-flex align-items-center gap-3'>
                  {/* Sell Produce */}
                  <NavItem>
                    {!show &&
                      <Button className="btn-p text-dark border-0" onClick={toggle}>
                        <span style={{ fontSize: '0.9rem' }}>SELL PRODUCT</span>
                      </Button>
                    }
                  </NavItem>

                  {/* Customer Login */}
                  <NavItem>
                    {!show &&
                      <Button className="btn-s border-0 d-flex align-items-center gap-1" onClick={toggle}>
                        <span style={{ fontSize: '0.9rem' }}>LOGIN</span>
                        <BiLogIn />
                      </Button>
                    }
                  </NavItem>

                  {/* Either any of them clicked will open login modal */}
                  <Login toggle={toggle} show={show} />
                </div>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}