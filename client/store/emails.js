import axios from 'axios'
import history from '../history'
//action types

const GET_EMAILS = 'GET_EMAILS'

const GET_SINGLE_EMAIL = 'GET_SINGLE_EMAIL'

const emails = []

const getEmails = emails => ({type: GET_EMAILS, emails})

const getSingleEmail = email => ({
  type: GET_SINGLE_EMAIL,
  email
})

export const addEmail = (firstName, email) => async dispatch => {
  try {
    const add = await axios.post('/api/emails', {firstName, email})
    // dispatch(getEmails(add))
    history.push('/home/showEmails')
  } catch (error) {
    console.error(error)
  }
}

export const showSingleEmail = id => async dispatch => {
  try {
    const emailToFind = await axios.get(`/api/emails/${id}`)
    console.log('this is what emailToFindHolds', emailToFind)
    if (emailToFind) {
      dispatch(getSingleEmail(emailToFind))
    }
  } catch (error) {
    console.log(error)
  }
}

export const showEmails = id => async dispatch => {
  try {
    const user = await axios.get('/auth/me')
    const id = user.id
    const allEmails = await axios.get('/api/emails/showAllEmails', {id})
    dispatch(getEmails(allEmails))
  } catch (error) {
    console.error(error)
  }
}

export const sendInviteEmail = (firstName, email) => async dispatch => {
  try {
    const emailToSend = await axios.post('/api/emails/sendInvite', {
      firstName,
      email
    })
    if (emailToSend.data) {
      history.push('/home/showEmails')
    }
    console.log(emailToSend)
    // emailToSend
  } catch (error) {
    console.error(error)
  }
}

export default function(state = emails, action) {
  switch (action.type) {
    case GET_EMAILS:
      return action.emails
    case GET_SINGLE_EMAIL:
      return action.email
    default:
      return state
  }
}
