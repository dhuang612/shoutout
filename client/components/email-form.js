import React from 'react'
import {connect} from 'react-redux'
import {addEmail} from '../store'
import Button from 'react-bootstrap/Button'

const EmailForm = props => {
  const {emails, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">
            <small>first name</small>
          </label>
          <input name="firstName" type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <Button variant="success" type="submit">
          add email
        </Button>
      </form>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const firstName = evt.target.firstName.value
      const email = evt.target.email.value
      dispatch(addEmail(firstName, email))
    }
  }
}

export const AddEmail = connect(null, mapDispatch)(EmailForm)
