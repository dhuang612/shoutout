import React from 'react'
import axios from 'axios'
import {Form, Field} from 'react-final-form'
import {addEmail} from '../store'
import {FORM_ERROR} from 'final-form'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import './email-form.css'
import '../../secrets'

const emailExists = async values => {
  const errors = {}
  try {
    if (values.email.endsWith('.com') || values.email.endsWith('.edu')) {
      console.log('validating!', values)

      let routePath
      if (process.env.NODE_ENV === 'production') {
        routePath = process.env.PROD_API_ROUTE
      } else if (process.env.NODE_ENV === 'development') {
        routePath = process.env.LOCAL_API_ROUTE
      }
      const checkEmail = await axios.get(routePath)
      if (checkEmail.data.length > 0) {
        checkEmail.data.map(email => {
          if (email.email === values.email) {
            console.log('email found!')
            errors.email = 'email already added!'
          }
        })
      }
    }
    return errors
  } catch (error) {
    console.error(error)
  }
}

const required = value => {
  return value ? undefined : 'Required'
}

const EmailForm = props => {
  const {emails, handleSubmit, error} = props

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        validate={emailExists}
        initialValues={{email: '', firstName: ''}}
        render={({handleSubmit, submitError, form, pristine}) => (
          <form
            id="addEmail-form"
            onSubmit={async e => {
              try {
                await handleSubmit(e)
                if (submitError === 'undefined') {
                  form.restart()
                } else {
                  setTimeout(() => {
                    form.restart()
                  }, 2500)
                }
              } catch (error) {
                console.error(error)
              }
            }}
          >
            <div>
              <Field name="firstName" validate={required}>
                {({input, meta}) => (
                  <div id="firstNameValue">
                    <label>First Name</label>
                    <input {...input} type="text" placeholder="First Name" />
                    <div className="errMsg">
                      {(meta.error || meta.submitError) &&
                        meta.touched && (
                          <span>{meta.error || meta.submitError}</span>
                        )}
                    </div>
                  </div>
                )}
              </Field>
            </div>
            <div id="emailInput">
              <Field name="email" validate={required}>
                {({input, meta}) => (
                  <div id="emailValue">
                    <label>Email</label>
                    <input {...input} type="text" placeholder="Email" />
                    <div className="errMsg">
                      {(meta.error || meta.submitError) &&
                        meta.touched && (
                          <span>{meta.error || meta.submitError}</span>
                        )}
                    </div>
                  </div>
                )}
              </Field>
            </div>
            <div id="submitBtn">
              <Button variant="success" type="submit" disabled={pristine}>
                add email
              </Button>
            </div>
            <div>
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
        dispatch(addEmail(firstNameVal, emailVal))
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export const AddEmail = connect(null, mapDispatch)(EmailForm)
