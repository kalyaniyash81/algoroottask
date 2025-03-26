import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { validateEmail } from '../../utils/auth';

function LoginForm({ switchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const validateForm = () => {
    let isValid = true;
    
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-sm" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Card.Body>
        <h2 className="text-center mb-4">Login</h2>
        {error && <Alert variant="danger" className="text-center">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              isInvalid={!!emailError}
              placeholder="Enter your email"
              className="py-2"
            />
            <Form.Control.Feedback type="invalid">
              {emailError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError('');
              }}
              isInvalid={!!passwordError}
              placeholder="Enter your password"
              className="py-2"
            />
            <Form.Control.Feedback type="invalid">
              {passwordError}
            </Form.Control.Feedback>
          </Form.Group>

          <Button 
            variant="primary"
            className="w-100 py-2 fw-bold"
            type="submit"
            disabled={isSubmitting}
            style={{ backgroundColor: '#6c63ff', border: 'none' }}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>

          <div className="text-center mt-4">
            <p className="text-muted mb-2">
              Don't have an account?{' '}
              <Button 
                variant="link" 
                onClick={switchToSignup}
                className="p-0 text-decoration-none"
                style={{ color: '#6c63ff', textDecoration: "none" }}
              >
                Sign Up
              </Button>
            </p>
            <Button 
              variant="link" 
              className="p-0 text-decoration-none"
              style={{ color: '#6c63ff' }}
            >
              Forgot password?
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default LoginForm;