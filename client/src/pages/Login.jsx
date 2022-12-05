import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    ) //useSelector takes as parameter state and the 
    // and the part of the state that we're wanting to get the destructured states from - state.auth

    useEffect(() => {
      if (isError) {
        toast.error(message)
      }

      if (isSuccess || user) {
        navigate('/')
      }

      dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])
  
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
      }
    
    const onSubmit = (e) => {
        e.preventDefault()
        
        const userData = {
          email,
          password
        }
        dispatch(login(userData))
    }
  
    if (isLoading) {
      return <Spinner />
    }
    
  return (
    <>
    <section className='heading'>
              <FaSignInAlt size={ 80} /> 
      <h1> Login </h1>
      <p>Log in to your Dashboard</p>
    </section>

    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            placeholder='Enter your email'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={password}
            placeholder='Enter password'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </div>
    </form>
              
    <p id='existing-user'>Don't have an account? Sign up <a id='existing-user-signin' href='/register'>here</a></p>
    </section>
  </>
  )
}

export default Login