import {useState ,useEffect} from 'react';
import './Login.css';

function Login() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [formData, setFormData] = useState({
    user: '',
    email: '',
    phone: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    user: '',
    email: '',
    phone: '',
    password: '',
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      setLoggedInUser(savedUser);
    }
  }, []);

  const handleLoginClick = () => {
    setShowLoginForm(!showLoginForm);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.user) {
      errors.user = 'Username is required.';
    }
    if (!formData.email) {
      errors.email = 'Email is required.';
    }
    if (!formData.phone) {
      errors.phone = 'Phone number is required.';
    }
    if (!formData.password) {
      errors.password = 'Password is required.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const mockResponse = await new Promise((resolve) =>
        setTimeout(() => resolve({ name: formData.user }), 1000)
      );

      setLoggedInUser(mockResponse.name);
      localStorage.setItem('loggedInUser', mockResponse.name); // Save the user's name to localStorage
      setShowLoginForm(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
     <div className='Login-page'>
        <div className='login-button'>
          <a onClick={handleLoginClick}>
            {loggedInUser ? `${loggedInUser}` : 'Login'}
          </a>
        </div>
        {showLoginForm && (
          <div className='login-form'>
          <div className='heading-of-stund'>
          <h1>Singup Form</h1>
          </div>
            <form onSubmit={handleSubmit}>
            <div className='form12-start'>
              <input
                type='text'
                name='user'
                placeholder='Username'
                onChange={handleInputChange}
              />
              <br />
              {formErrors.user && <span className='error'>{formErrors.user}</span>}
              <br></br>
              <input
                type='text'
                name='email'
                placeholder='Enter your email address'
                onChange={handleInputChange}
              />
              <br/>
              {formErrors.email && <span className='error'>{formErrors.email}</span>}
              <br/>
              <input
                type='text'
                name='phone'
                placeholder='Enter your phone number'
                onChange={handleInputChange}
              />
              <br />
              {formErrors.phone && <span className='error'>{formErrors.phone}</span>}
              <br/>
              <input
                type='password'
                name='password'
                placeholder='P@example.'
                onChange={handleInputChange}
              />
              <br />
              {formErrors.password && <span className='error'>{formErrors.password}</span>}
              <br/>
              <div className='submit-here'>
              <button type='submit'>Submit</button>
              </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default Login