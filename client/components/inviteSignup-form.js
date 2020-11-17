import React from 'react'
import {connect} from 'react-redux'
import {inviteAuth} from '../store'

const InviteForm = props => {
  const {handleSubmit} = props
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
          <button type="submit">signup</button>
        </div>
      </form>
    </div>
  )
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

export const SignupInvite = connect(null, mapDispatch)(InviteForm)
