import { Link } from 'react-router-dom';

import '../../styles/register.css';

function Register() {
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

          <form className='register-form'>
            <div className='form-group'>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                id='email'
                name='email'
                autoComplete='email'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='username'>Username:</label>
              <input
                type='text'
                id='username'
                name='username'
                autoComplete='username'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password:</label>
              <input
                type='password'
                id='password'
                name='password'
                autoComplete='new-password'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password:</label>

              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                autoComplete='new-password'
              />
            </div>

            <button type='submit' className='register-button'>
              Register
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
