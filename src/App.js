import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useEffect  }  from 'react';
import PageRender from './PageRender';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Alert from './components/alert/Alert';
import {useSelector, useDispatch} from 'react-redux'
import {refreshToken} from './redux/actions/authActions'
import Header from './components/alert/Header';
function App() {
  const{auth} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])



  return (
    <Router>
         <Alert/>

    <div className="App">

      <div className="main">
        {auth.token && <Header /> }
        {/*TODO: Fix login   */}
        <Route exact path="/" component={auth.token ? Home : Login} />
        <Route exact path="/:page" component={PageRender} />
        <Route exact path="/:page/:id" component={PageRender} />
   
      </div>
    </div>
    </Router>
  );
}

export default App;

