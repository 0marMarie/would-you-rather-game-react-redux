import { getInitialData } from '../utils/api'
import { receiveQuestions } from './questions'
import { receiveUsers } from './users'
import { setAuthedUser, unsetAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'


let User = null

export function handleInitialData() {
  return (dispatch) => {

    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(User))
        dispatch(unsetAuthedUser(null))
        dispatch(hideLoading())
      })
  }
}

