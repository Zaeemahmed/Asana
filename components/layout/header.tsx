import Link from 'next/link';
import { Button, Container, Navbar, NavbarBrand } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar>
      <Container>
        <NavbarBrand>Project Management</NavbarBrand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed as : <a href="#login">User</a>
          </Navbar.Text>
        </Navbar.Collapse>
        <Link href="" passHref>
          <Button>Log out</Button>
        </Link>
      </Container>
    </Navbar>
  );
};

export default Header;
