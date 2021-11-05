import { RECEIVE_USERS, COMMIT_QUESTION, COMMIT_ANSWER } from '../actions/users'

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      const { users } = action
      return {
        ...state,
        ...users,
      }
    case COMMIT_QUESTION:
      const { question } = action
      return {
        ...state,
        [question.author]: {
          ...state[question.author],
          questions: state[question.author].questions.concat([question.id]),
        }
      }
    case COMMIT_ANSWER:
      const { authedUser, qid, answer } = action
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          }
        }
      }
    default:
      return state
  }
}