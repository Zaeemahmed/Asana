import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button, Container, Navbar, NavbarBrand } from 'react-bootstrap';

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, []);

  return (
    <Navbar>
      <Container>
        <NavbarBrand>Project Management</NavbarBrand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed as :
            <a href="#login">{session ? session.user?.name : 'guest'}</a>
          </Navbar.Text>
        </Navbar.Collapse>
        {session && (
          <Link href="" passHref>
            <Button
              onClick={() => {
                signOut();
                router.push('/login');
              }}
            >
              Log out
            </Button>
          </Link>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
