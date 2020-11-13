import axios from 'axios'
//action types

const GET_EMAILS = 'GET_EMAILS'

const emails = []

const getEmails = emails => ({type: GET_EMAILS, emails})

export const addEmail = (firstName, email) => async dispatch => {
  try {
    const add = await axios.post('/api/emails', {firstName, email})
    const emailToSend = await axios.post('/api/emails/sendInvite', {
      firstName,
      email
    })
    console.log(emailToSend)
    // dispatch(getEmails(add))
  } catch (error) {
    console.error(error)
  }
}

export const showEmails = () => async dispatch => {
  try {
    const user = await axios.get('/auth/me')
    const id = user.id
    const allEmails = await axios.get('/api/emails/showAllEmails', {id})
    dispatch(getEmails(allEmails))
  } catch (error) {
    console.error(error)
  }
}

// export const sendInviteEmail = (email)=> async dispatch =>{
//   try {
//     const emailToSend = await axios.get('/api/emails/sendInvite', {email});
//     // console.log(emailToSend)
//     dispatch(emailToSend)
//   } catch (error) {
//     console.error(error)
//   }
// }

export default function(state = emails, action) {
  switch (action.type) {
    case GET_EMAILS:
      return action.emails
    default:
      return state
  }
}
