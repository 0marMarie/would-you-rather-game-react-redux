import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'


// Import Components
import Navbar from './Navbar'
import DashBoard from './DashBoard'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Signin from './Signin'
import Question from './Question'
import Error from './Error'

const App = (props) => {

  const { loading, handleInitialData } = props
  console.log('loading status is', loading)
  
  // Get the users and questions promise 
  useEffect(() => {
    handleInitialData()
  })
  
  return (
    <Router>
      <LoadingBar />
      <div className='container'>
        <Navbar />
        {loading
          ? null
          : <div>
            <Switch>
              <Route exact path='/' component={DashBoard} />
              <Route path='/add' component={NewQuestion} />
              <Route path='/leaderboard' component={LeaderBoard} />
              <Route path='/login' component={Signin} />
              <Route path='/questions/:questions_id' component={Question} />
              <Route path='/error' component={Error} />
            </Switch>
          </div>
        }
      </div>
    </Router>
  )
}

const mapStateToProps = ({ users }) => (
  {
    loading: users === null
  }
)

export default connect(mapStateToProps, { handleInitialData })(App);
