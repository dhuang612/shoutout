import axios from 'axios'
//action types

const GET_EMAILS = 'GET_EMAILS'

const emails = []

const getEmails = emails => ({type: GET_EMAILS, emails})

export const addEmail = (firstName, email) => async dispatch => {
  try {
    const add = await axios.post('/api/emails', {firstName, email})
    console.log(add)
    // dispatch(getEmails(add))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = emails, action) {
  switch (action.type) {
    case GET_EMAILS:
      return action.emails
    default:
      return state
  }
}
