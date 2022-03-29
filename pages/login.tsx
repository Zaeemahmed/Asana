import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/board');
    }
  }, [session]);

  return (
    <div>
      <Card>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form>
            <Button variant="primary" type="submit" onClick={() => signIn()}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
 
export default Login;
