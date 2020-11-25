import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {addShoutout, showEmails} from '../store'
import './shoutout-form.css'
import Button from 'react-bootstrap/Button'

const ShoutoutForm = props => {
  const {handleSubmit, showAvailableEmails, emails, error} = props

  let displayEmails

  useEffect(() => {
    displayEmails = showAvailableEmails()

    //having a second param of [] makes it only run once.
  }, [])
  if (emails.data) {
    let errorMsg = ''
    if (error) {
      errorMsg = error.response &&
        error.response && <div id="errMsg">{error.response.data}</div>
    }
    return (
      <div id="bodyForm">
        <h5>People who you can send shoutouts to:</h5>
        <div id="emailInfo">
          {emails.data.length !== 0 ? (
            emails.data.map(email => (
              <div key={email.id}>
                <div id="emailName">
                  {email.firstName}
                  <div> {email.email}</div>
                </div>
              </div>
            ))
          ) : (
            <div id="noEmails">
              There aren't people to send shoutouts to yet..
            </div>
          )}
        </div>
        <form id="formSO" onSubmit={handleSubmit}>
          <div className="shoutout-input">
            <label htmlFor="name">
              <small>name</small>
            </label>
            <input name="name" type="text" />
          </div>
          <div className="shoutout-input">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
            {errorMsg}
          </div>
          <div className="shoutout-input">
            <label htmlFor="from">
              <small>from</small>
            </label>
            <input name="from" type="text" />
          </div>
          <div id="message">
            <label htmlFor="message">
              <small>message</small>
            </label>
            <textarea id="textarea" name="message" type="text" />
          </div>
          <div id="submit">
            <Button
              variant="success"
              type="submit"
              disabled={emails.data.length === 0}
            >
              create shoutout!
            </Button>
          </div>
        </form>
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

const mapState = state => {
  return {
    id: state.user,
    emails: state.emails,
    error: state.shoutouts.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const name = evt.target.name.value
      const message = evt.target.message.value
      const email = evt.target.email.value
      const from = evt.target.from.value
      dispatch(addShoutout(name, message, email, from))
    },
    showAvailableEmails: () => dispatch(showEmails())
  }
}

export const AddShoutout = connect(mapState, mapDispatch)(ShoutoutForm)
