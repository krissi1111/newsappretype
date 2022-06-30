import { useState } from "react"
import { Button, ButtonGroup, Navbar } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { IUser } from "../../models/user"
import { currentUser, isLoggedIn, logout } from "../../redux/slices/userSlice"
import { LoginRegModal } from "../users/LoginRegModal"


export const Header = () => {
  const loggedIn: boolean = useSelector(isLoggedIn)
  const user: IUser = useSelector(currentUser)
  const dispatch = useDispatch()

  const [showLogRegModal, setShowLogRegModal] = useState(false)
  const [loginTab, setLoginTab] = useState(true)

  function InButtons(): React.ReactElement {
    return ( 
      <>
      <span style={{ color: 'white' }}>Signed in as: </span>
      <ButtonGroup className='mx-2'>
        <Button
          className='py-0' 
          variant='outline-light'
        > 
          {user.fullName}
        </Button>
        <Button
          className='py-0'
          variant='outline-light'
          onClick={() => dispatch(logout())}
        > 
          Log out
        </Button>
      </ButtonGroup>
      </>
    )
  }

  function OutButtons(): React.ReactElement {
    
    function handleModal(loginTab: boolean) {
      setLoginTab(loginTab)
      setShowLogRegModal(true)
    }
    
    return ( 
      <ButtonGroup className='mx-2'>
        <Button
          className='py-0' 
          variant='outline-light' 
          onClick={() => handleModal(true)}
        > 
          Log in
        </Button>
        <Button
          className='py-0'
          variant='outline-light'
          onClick={() => handleModal(false)}
        > 
          Register
        </Button>
      </ButtonGroup>
    )
  }
  
  return( 
    <Navbar bg='secondary' variant='light' className='d-flex justify-content-between'>
      <Navbar.Brand style={{ color: 'white' }}>NewsApp</Navbar.Brand>
      <div>
        {!loggedIn? (
          <OutButtons/>
        ) : (
          <InButtons/>
        )}
      </div>
      <LoginRegModal 
        show={showLogRegModal} 
        loginTab={loginTab} 
        handleShow={show => setShowLogRegModal(show)}
      />
    </Navbar>
  )
}