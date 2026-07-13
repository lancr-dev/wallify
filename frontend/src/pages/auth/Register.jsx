import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import { register } from '../../services/authService';

import '../../styles/register.css';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
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

    const { email, username, password, confirmPassword } = formData;

    if (!email || !username || !password || !confirmPassword) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = {
        email,
        username,
        password,
      };

      const response = await register(userData);

      toast.success(response.message);

      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='register-page'>
      <div className='wallify-logo'>
        <span>W</span>
      </div>

      <Link to='/need-help' className='need-help-link'>
        <span>What is Wallify?</span>
      </Link>

      <section className='register-container'>
        <h1 className='register-heading'>Welcome to Wallify!</h1>

        <article className='register-card'>
          <header className='register-card-header'>
            <h2>Create Account</h2>
            <p>Please fill the needed information below.</p>
          </header>

          <form className='register-form' onSubmit={handleSubmit}>
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
              <label htmlFor='username'>Username:</label>

              <input
                type='text'
                id='username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                autoComplete='username'
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
                autoComplete='new-password'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password:</label>

              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete='new-password'
              />
            </div>

            <button
              type='submit'
              className='register-button'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className='login-text'>
            Already have an account? <Link to='/login'>Login Here</Link>
          </p>
        </article>
      </section>
    </main>
  );
}

export default Register;
