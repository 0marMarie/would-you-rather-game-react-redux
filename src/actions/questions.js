import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { commitQuestion, commitAnswer } from './users'
import { showLoading, hideLoading } from "react-redux-loading"

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

// Get the questions action creator
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

// Handle adding a question action creator
function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { login } = getState()
    dispatch(showLoading())
    return saveQuestion(optionOneText, optionTwoText, login)
      .then((question => {
        dispatch(addQuestion(question))
        dispatch(commitQuestion(question))
        dispatch(hideLoading())
      }))
  }
}

// Handle saving a question answer action creator
export function saveAnswerQuestion(authedUser, qid, answer) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export function handleSaveAnswerQuestion({ authedUser, qid, answer }) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {
        dispatch(saveAnswerQuestion(authedUser, qid, answer))
        dispatch(commitAnswer(authedUser, qid, answer))
        dispatch(hideLoading())
      })
  }
}