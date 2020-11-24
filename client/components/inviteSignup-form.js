import React from 'react'
import {connect} from 'react-redux'
import {inviteAuth, auth} from '../store'
import Button from 'react-bootstrap/Button'

const InviteForm = props => {
  const {handleSubmit, error} = props
  console.log(props)
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="codeNum">
            <small>code number</small>
          </label>
          <input name="number" type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <Button variant="primary" type="submit">
            signup
          </Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapSignup = state => {
  return {
    // name: 'signup',
    // displayName: 'Sign Up',
    // error: state.user.error,
    id: state.user,
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const id = evt.target.number.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(inviteAuth(email, password, id))
    }
  }
}

export const SignupInvite = connect(mapSignup, mapDispatch)(InviteForm)
