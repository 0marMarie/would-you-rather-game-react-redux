export const RECEIVE_USERS = 'RECEIVE_USERS'
export const COMMIT_QUESTION = 'COMMIT_QUESTION'
export const COMMIT_ANSWER = 'COMMIT_ANSWER'

// Get all  the users action creator
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

// Add a Question to a user
export function commitQuestion(question) {
  return {
    type: COMMIT_QUESTION,
    question
  }
}

// Save User's answer to a question 
export function commitAnswer(authedUser, qid, answer) {
  return {
    type: COMMIT_ANSWER,
    qid,
    authedUser,
    answer
  }
}
