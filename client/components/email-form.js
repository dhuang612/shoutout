import React from 'react'
import axios from 'axios'
import {Form, Field} from 'react-final-form'
import {addEmail} from '../store'
import {FORM_ERROR} from 'final-form'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import './email-form.css'

const emailExists = async values => {
  const errors = {}
  try {
    if (values.email.endsWith('.com')) {
      console.log('validating!')
      console.log('this is what we are passing back', values.email)
      const checkEmail = await axios.get(
        '/api/emails/showAllEmails',
        values.email
      )
      if (checkEmail.data.length > 0) {
        checkEmail.data.map(email => {
          if (email.email === values.email) {
            console.log('email found!')
            errors.email = 'email exists!'
          }
        })
      }
      return errors
    }
  } catch (error) {
    console.error(error)
  }
}

const EmailForm = props => {
  const {emails, handleSubmit, error} = props

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        validate={emailExists}
        initialValues={{email: '', firstName: ''}}
        render={({handleSubmit, submitError, form}) => (
          <form
            onSubmit={async e => {
              try {
                await handleSubmit(e)
                // if (submitError === 'undefined') {
                //   form.reset()
                // } else {
                //   setTimeout(() => {
                //     form.reset()
                //   }, 2500)
                // }
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
        dispatch(addEmail(firstNameVal, emailVal))
        // if(values === "complete(errors)"){
        //   console.log('something went wrong...')
        // }
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export const AddEmail = connect(null, mapDispatch)(EmailForm)
