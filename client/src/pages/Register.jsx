import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserCircle } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const { name, email, password, confirmPassword } = formData

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
    
        if (password !== confirmPassword) {
          toast.error('Passwords do not match')
        } else {
          const userData = {
            name,
            email,
            password,
          }
    
          dispatch(register(userData))
        }
      }
  
      if (isLoading) {
        return <Spinner />
      }
    
  return (
    <>
    <section className='heading'>
              <FaUserCircle size={ 80} /> 
      <h1> Register </h1>
      <p>Please create an account</p>
    </section>

    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={name}
            placeholder='Enter your name'
            onChange={onChange}
          />
        </div>
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
          <input
            type='password'
            className='form-control'
            id='confirmPassword'
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm password'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </div>
    </form>
              
    <p id='existing-user'>Already have an account? Sign in <a id='existing-user-signin' href='/login'>here</a></p>
    </section>
  </>
  )
}

export default Register