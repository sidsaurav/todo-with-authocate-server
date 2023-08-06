import React, { useState } from 'react'
import './App.css'

const App = () => {
  const [userObj, setUserObj] = useState({})
  const [items, setItems] = useState([])
  const [inpValue, setInpValue] = useState('')
  const [info, setInfo] = useState('All good!')

  const submitHandler = (e) => {
    e.preventDefault()
    setItems([...items, inpValue])
    setInpValue('')
    setInfo('Item added!')
  }

  const delItem = (idx) => {
    const newItems = items.filter((item, index) => index !== idx)
    setItems(newItems)
    setInfo('Item deleted!')
  }

  const loginHandler = async () => {
    try {
      const email = prompt('Enter email')
      const password = prompt('Enter password')

      const data = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'content-type': 'application/json',
        },
      })
      const res = await data.json()
      setUserObj(res)
      setInfo(res.hasOwnProperty('message') ? res.message : res.error)
    } catch (err) {
      console.log(err.message)
      setInfo(err.message)
    }
  }

  const logoutHandler = async () => {
    if (!userObj.hasOwnProperty('email')) {
      setInfo('Please login first')
      return
    }
    setUserObj({})
    setInfo("You're logged out")
  }

  const signupHandler = async () => {
    try {
      const email = prompt('Enter email')
      const password = prompt('Enter password')
      const data = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ password, email }),
        headers: {
          'content-type': 'application/json',
        },
      })
      const res = await data.json()
      console.log(res)
      setUserObj(res)
      setInfo(res.hasOwnProperty('message') ? res.message : res.error)
    } catch (err) {
      console.log(err.message)
      setInfo(err.message)
    }
  }

  console.log('userObj render -> ', userObj)

  return (
    <div>
      <div className='container'>
        <div className='info'>{info}</div>
        <h1 className='heading'>Todo App</h1>
        <div className='buttons'>
          <button className='btn' onClick={loginHandler}>
            Login
          </button>
          <button className='btn' onClick={logoutHandler}>
            Logout
          </button>
          <button className='btn' onClick={signupHandler}>
            Signup
          </button>
        </div>
        <div className='welcome'>
          {userObj.hasOwnProperty('email')
            ? `Hi ${userObj?.email}!`
            : 'Please login'}
        </div>
        <div className='input-box'>
          <input
            type='text'
            id='inp'
            value={inpValue}
            onChange={(e) => {
              setInpValue(e.target.value)
            }}
          />
          <button onClick={submitHandler} className='btn'>
            Add
          </button>
        </div>
        <ul className='list-items'>
          {items.map((item, idx) => (
            <li key={idx}>
              <button className='del-btn' onClick={() => delItem(idx)}>
                X
              </button>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
