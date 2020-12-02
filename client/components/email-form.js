import React from 'react'
import axios from 'axios'
import {Form, Field} from 'react-final-form'
import {FORM_ERROR} from 'final-form'
import {connect} from 'react-redux'
import {addEmail} from '../store'
import Button from 'react-bootstrap/Button'
import './email-form.css'

const EmailForm = props => {
  const {emails, handleSubmit, error} = props

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        initialValues={{firstName: '', email: ''}}
        render={({handleSubmit, submitError, form}) => (
          <form
            onSubmit={async e => {
              try {
                await handleSubmit(e)
                if (submitError === 'undefined') {
                  form.reset()
                } else {
                  setTimeout(() => {
                    form.reset()
                  }, 2500)
                }
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
              <Field name="email">
                {({input, meta}) => (
                  <div>
                    <label>Email</label>
                    <input {...input} type="text" placeholder="Email" />
                    {(meta.error || meta.submitError) &&
                      meta.touched && (
                        <span>{meta.error || meta.submitError}</span>
                      )}
                  </div>
                )}
              </Field>
            </div>
            <div>
              <Button variant="success" type="submit">
                add email
              </Button>
            </div>
            <div id="errorMsg">
              {submitError && (
                <div className="error">{submitError}</div> // not showing
              )}
            </div>
          </form>
        )}
      />
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    async handleSubmit(props, e) {
      const firstNameVal = props.firstName
      const emailVal = props.email
      try {
        const result = dispatch(addEmail(firstNameVal, emailVal))
        //push this into some helper? this is allow us to test if the creation of the email will fail
        const validate = await axios.post('/api/emails', {
          firstNameVal,
          emailVal
        })
      } catch (error) {
        let errors
        errors = error.response.data.errors
        return {[FORM_ERROR]: 'email already in use!'}
      }
    }
  }
}

export const AddEmail = connect(null, mapDispatch)(EmailForm)
