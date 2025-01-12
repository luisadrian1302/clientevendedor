import { LogOut, ShoppingCart, User } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { cerrarSesionAuth } from '../../actions/AuthAction';
import { useEffect, useState } from 'react';
import { URLAPI } from '../../url';

function Header({isAuth}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userData, isUpdatedProfile} = useSelector(re => re.AuthReducer);

  const [profile, setProfile] = useState("");
  const cerrarSesion = () => {
    dispatch(cerrarSesionAuth(navigate))
    

  }

  useEffect(() => {

    let token = localStorage.getItem("token");

    console.log(userData);

    let username = "";
    if (userData.email) {
        username = userData.email
    }else if (userData.username) {
        username = userData.username
      
    }

    async function obtenerData(){
      try {
        const response = await fetch(`${URLAPI}/users/image/${username}`, {
          headers: {
              Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        
        if (!response.ok) throw new Error('Image not found');                
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        setProfile(imageUrl)
        
        console.log(imageUrl);
      } catch (error) {
        
        setProfile("")

      }
            
     
    }
    obtenerData();
    
  }, [userData, isUpdatedProfile])
  
  return (
    <Navbar expand="lg" className="bg-warning">
      <Container >
        <Navbar.Brand href="" ><Link className='text-dark nav-link' to={'/'}>Marketplace</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
            
          <Nav
            className="ms-auto my-2 my-lg-0"
            // style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Form className="d-flex" >
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-5  "
                aria-label="Search"
                style={{width: '300px'}}
                />
            </Form>

            <Nav.Link  className='me-2'>
                <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    label="Modo oscuro"
                />
            </Nav.Link>

            <NavDropdown title="Categorias" id="navbarScrollingDropdown" className='d-flex'>
                <NavDropdown.Divider></NavDropdown.Divider>
              <NavDropdown.Item href="#action3">Categorias</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href=""><Link className='text-dark nav-link p-0' to={'/ofertas'}>Ofertas</Link></Nav.Link>
            {isAuth ?
            
            <>
             <Nav.Link href="#action2"> <Link className='text-dark nav-link p-0' to={'/compras'}>Mis compras</Link> </Nav.Link>


              {profile == "" ? 
               <Nav.Link href="#action2"> <Link className='text-dark nav-link p-0' to={'/profile'}><User/></Link> </Nav.Link>
              : 
              <Nav.Link href="#action2"> <Link className='text-dark nav-link p-0' to={'/profile'}><img src={profile} style={{
                maxWidth: "26px",
                borderRadius: "50%"
              }} id='profile_header'/></Link> </Nav.Link>
              
              }

             <Nav.Link href="#action2" onClick={cerrarSesion}><LogOut/> </Nav.Link>

            
            </>
            : 
             <Nav.Link href="#action2"> <Link className='text-dark nav-link p-0' to={'/login'}>Iniciar sesión</Link> </Nav.Link>
            
            }

            <Nav.Link href="#action2"> <Link className='text-dark nav-link p-0' to={'/ShoppingCart'}><ShoppingCart/></Link> </Nav.Link>
            

           
          </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
