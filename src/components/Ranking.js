// Get the users data and Sort the Whole Leaderboard
const Ranking = (props)=> { 
  const leaderboardUsers = Object.values(props.users)
  console.log(leaderboardUsers)
  return (
    leaderboardUsers.map(res => {
    const answers = (Object.keys(res.answers)).length
    const questions = res.questions.length
    const score = answers + questions
    const name = res.name
    const avatar = res.avatarURL
    let leaderboard = {
      name,
      avatar,
      questions,
      answers,
      score
    }
    return leaderboard
  }).sort((a, b) => b.score - a.score) )
}

export default Ranking