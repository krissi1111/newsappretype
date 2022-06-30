import React, { useReducer, useState } from "react"
import { Button, ButtonGroup, Collapse, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { IUserRegister } from "../../models/user"
import { loginForm, register } from "../../redux/slices/userSlice"


export interface IAuthState {
  username: string
  firstName: string
  lastName: string
  password: string
  passwordRe: string
}

export const LoginReg = ({ logTab = true, handleShow }: 
  { logTab?: boolean, handleShow: (show: boolean) => void }) => {
  const authState: IAuthState = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordRe: ''
  }

  const [loginState, logDispatch] = useReducer(userFormReducer, authState)
  const [registerState, regDispatch] = useReducer(userFormReducer, authState)
  const [loginTab, setLoginTab] = useState(logTab)
  const globalDispatch = useDispatch()

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const form = new FormData()
    let state = loginTab? loginState: registerState 
    form.append('Username', state.username)
    form.append('Password', state.password)
    form.append('Username', state.username)
    form.append('FirstName', state.firstName)
    form.append('LastName', state.lastName)

    let userRegister: IUserRegister = state//{ username: state.userName, firstName:  }
    globalDispatch(loginTab? loginForm(state) : register(state))
    handleShow(false)
  }
  
  function handleUsername(name: string) {
    let dispatch = loginTab? logDispatch: regDispatch
    dispatch({ type: 'setUsername', payload: name })
  }

  function handleFirstName(name: string) {
    let dispatch = loginTab? logDispatch: regDispatch
    dispatch({ type: 'setFirstName', payload: name })
  }

  function handleLastName(name: string) {
    let dispatch = loginTab? logDispatch: regDispatch
    dispatch({ type: 'setLastName', payload: name })
  }

  function handlePassword(password: string) {
    let dispatch = loginTab? logDispatch: regDispatch
    dispatch({ type: 'setPassword', payload: password })
  }

  function handlePasswordRe(password: string) {
    let dispatch = loginTab? logDispatch: regDispatch
    dispatch({ type: 'setPasswordRe', payload: password })
  }

  function currentValues() {
    let state = loginTab? loginState: registerState
    return state
  }

  return (
    <>
    <ButtonGroup className='d-flex mb-3' onClick={() => setLoginTab(!loginTab)}>
      <Button variant={loginTab ?('primary') : ('outline-primary')}
      size='sm'
      className='mx-auto'
      >Login</Button>
      <Button variant={!loginTab ?('primary') : ('outline-primary')}
      size='sm'
      className='mx-auto'
      >Register</Button>
    </ButtonGroup>

    <Form onSubmit={handleSubmit}>
      <LogRegForm
        label='Username'
        placeholder='Username'
        value={currentValues().username}
        handleChange={handleUsername}
      />
      <Collapse in={!loginTab}>
        <div>
        <LogRegForm
          label='First name'
          placeholder='First name'
          value={currentValues().firstName}
          handleChange={handleFirstName}
        />
        <LogRegForm
          label='Last name'
          placeholder='Last name'
          value={currentValues().lastName}
          handleChange={handleLastName}
        />
        </div>
      </Collapse>
      <LogRegForm
        label='Password'
        placeholder='Password'
        value={currentValues().password}
        handleChange={handlePassword}
        type='password'
      />
      <Collapse in={!loginTab}>
        <div>
        <LogRegForm
          label='Re-type password'
          placeholder='Re-type your password'
          value={currentValues().passwordRe}
          handleChange={handlePasswordRe}
          type='password'
        />
        </div>
      </Collapse>
      <Button className='w-100' size='sm' type='submit'>
        {loginTab ? ('Sign in') : ('Sign up')}
      </Button>
    </Form>
    </>
  )
}

export const LogRegForm = ({ label, placeholder, value, handleChange, type='text' }: 
  { label: string, 
    placeholder: string, 
    value: string, 
    handleChange: (value: string) => void, 
    type?: string }) => {
  
  return (
    <Form.Group>
      <Form.Label>
        {label}
      </Form.Label>
      <Form.Control
        className='mb-3'
        value={value}
        type={type}
        onChange={event => handleChange(event.target.value)}
        placeholder={placeholder}
      />
    </Form.Group>
  )
} 

function userFormReducer(state: IAuthState, action: any) {
  switch (action.type) {
    case 'setUsername':
      {
        let userName = action.payload

        return { ...state, username: userName} 
      }
    case 'setFirstName':
      {
        let firstName = action.payload

        return { ...state, firstName: firstName} 
      } 
    case 'setLastName':
      {
        let lastName = action.payload

        return { ...state, lastName: lastName} 
      }
    case 'setPassword':
      {
        let password = action.payload

        return { ...state, password: password} 
      }
      case 'setPasswordRe':
        {
          let password = action.payload
  
          return { ...state, passwordRe: password} 
        }
    default:
      return state
  }
}