import React from 'react'
import { auth } from '../../components/Audifikatsiya'
import { signOut } from 'firebase/auth'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const logout = () => {
    signOut(auth)
    window.location.reload()
    localStorage.removeItem('token')
  }
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!

      <Button variant="contained" color="primary" onClick={logout}>
        chiqish
      </Button>
    </h1>
  )
}

export default Home