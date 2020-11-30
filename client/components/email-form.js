import React from 'react'
import {Form, Field} from 'react-final-form'
import {connect} from 'react-redux'
import {addEmail} from '../store'
import Button from 'react-bootstrap/Button'

const EmailForm = props => {
  const {emails, handleSubmit, error} = props

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        render={({handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>First Name</label>
              <Field
                name="firstName"
                component="input"
                placeholder="First Name"
              />
            </div>
            <div>
              <label>First Name</label>
              <Field name="email" component="input" placeholder="email" />
            </div>
            <Button variant="success" type="submit">
              add email
            </Button>
          </form>
        )}
      />
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
