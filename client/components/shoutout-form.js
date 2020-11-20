import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {addShoutout, showEmails} from '../store'

const ShoutoutForm = props => {
  const {handleSubmit, showAvailableEmails, emails} = props

  let displayEmails

  useEffect(() => {
    displayEmails = showAvailableEmails()

    //having a second param of [] makes it only run once.
  }, [])
  if (emails.data) {
    return (
      <div>
        <p>People who you can send shoutouts to:</p>
        {emails.data.length !== 0 ? (
          emails.data.map(email => (
            <div key={email.id}>
              <div>{email.firstName}</div>
              {email.email}
            </div>
          ))
        ) : (
          <div>There aren't people to send shoutouts to yet..</div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              <small>name</small>
            </label>
            <input name="name" type="text" />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="message">
              <small>message</small>
            </label>
            <input name="message" type="text" />
          </div>
          <div>
            <label htmlFor="from">
              <small>from</small>
            </label>
            <input name="from" type="text" />
          </div>
          <button type="submit">create shoutout!</button>
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
    emails: state.emails
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
