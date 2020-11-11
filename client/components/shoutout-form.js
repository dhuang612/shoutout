import React from 'react'
import {connect} from 'react-redux'
import {addShoutout} from '../store'

const ShoutoutForm = props => {
  const {handleSubmit} = props

  return (
    <div>
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
    }
  }
}

export const AddShoutout = connect(null, mapDispatch)(ShoutoutForm)
