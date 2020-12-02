import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import './user-home.css'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const {invited} = props
  let greeting = <h3 id="greeting">Welcome, {email}</h3>
  let alwaysShow = (
    <div id="shownToEveryone">
      <Link to="/home/addShoutout">create a new shoutout</Link>
      <div>
        {' '}
        <Link to="/home/showShoutouts">show shoutouts list</Link>
      </div>
    </div>
  )
  if (invited) {
    return (
      <div>
        {greeting}
        <p id="ownerInfo">Add emails and send out invites today!</p>
        <div id="options">
          <div>
            {' '}
            <Link to="/home/addEmail">add new emails</Link>
          </div>
          {alwaysShow}
          <div>
            <Link to="/home/showEmails">show email list</Link>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div>
          {greeting}
          <p id="invitedInfo">Use the link below to create a new shoutout!</p>
          <div id="invitedLinks">{alwaysShow}</div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    invited: state.user.flag
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
