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
        initialValues={{firstName: '', email: ''}}
        render={({handleSubmit, form}) => (
          <form
            onSubmit={async e => {
              try {
                await handleSubmit(e)

                form.reset()
              } catch (error) {
                console.error(error)
              }
            }}
          >
            <div>
              <label>First Name</label>
              <Field
                name="firstName"
                component="input"
                placeholder="First Name"
              />
            </div>
            <div>
              <label>Email</label>
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
    handleSubmit(props, e) {
      const firstNameVal = props.firstName
      const emailVal = props.email
      dispatch(addEmail(firstNameVal, emailVal))
    }
  }
}

export const AddEmail = connect(null, mapDispatch)(EmailForm)
