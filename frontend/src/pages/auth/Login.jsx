import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import useAuth from '../../hooks/useAuth';

import { login } from '../../services/authService';

import '../../styles/login.css';

function Login() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await login(formData);

      setUser(response.data);

      toast.success(response.message);

      navigate('/wallify-feed', { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='login-page'>
      <div className='wallify-logo'>
        <span>W</span>
      </div>

      <Link to='/need-help' className='need-help-link'>
        <span>What is Wallify?</span>
      </Link>

      <section className='login-container'>
        <h1 className='login-heading'>Welcome to Wallify!</h1>

        <article className='login-card'>
          <header className='login-card-header'>
            <h2>Login Account</h2>
            <p>Please fill the needed information below.</p>
          </header>

          <form className='login-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='email'>Email:</label>

              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                autoComplete='email'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password:</label>

              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                autoComplete='current-password'
              />
            </div>

            <button
              type='submit'
              className='login-button'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className='register-text'>
            Don't have an account? <Link to='/register'>Register Here</Link>
          </p>
        </article>
      </section>
    </main>
  );
}

export default Login;
