import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA.js'

export function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions()
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveQuestion(save) {
  return _saveQuestion(save);
}

export function saveQuestionAnswer(answer) {
  return _saveQuestionAnswer(answer);
}