import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useNavigate } from 'react-router-dom'

import { loginUser, authError } from '../actions/auth'
interface FormData {
  username: string
  password: string
}
function Login() {
  const navigateTo = useNavigate()
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)

  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  })

  useEffect(() => {
    dispatch(authError(''))
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const confirmSuccess = () => navigateTo('/')
    dispatch(loginUser(formData, confirmSuccess))
  }

  return (
    <form className="form box" onSubmit={handleSubmit}>
      <h1 className="title is-2">Login</h1>
      <hr />
      {auth.errorMessage && (
        <span className="has-text-danger is-large">{auth.errorMessage}</span>
      )}
      <label className="label is-large has-text-centered">
        Username
        <input
          required
          className="input has-text-centered is-large is-fullwidth"
          placeholder="User Name"
          type="text"
          name="username"
          autoComplete="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <label className="label is-large has-text-centered">
        Password
        <input
          required
          className="input has-text-centered is-large is-fullwidth"
          placeholder="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <input
        className="button is-large is-fullwidth is-success"
        value="Login"
        type="submit"
      />
    </form>
  )
}

export default Login
