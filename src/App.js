import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useEffect  }  from 'react';
import PageRender from './customRouter/PageRender';
import PrivateRouter from './customRouter/PrivateRouter';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Alert from './components/alert/Alert';
import {useSelector, useDispatch} from 'react-redux'
import {refreshToken} from './redux/actions/authActions'
import Header from './components/header/Header';
import StatusModal from './components/StatusModal';
import { getPosts } from './redux/actions/postAction';
function App() {

  

  const{auth, status} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])
  

  useEffect(()=>{
   if(auth.token) dispatch(getPosts(auth.token))
  },[dispatch, auth.token])



  return (
    <Router>
         <Alert/>

    <div className="App">

      <div className="main">
        {auth.token && <Header /> }
        {status && <StatusModal />}
        {/*TODO: Fix login   */}
        <Route exact path="/" component={auth.token ? Home : Login} />
        <Route exact path="/register" component={Register} />
 
             
        <PrivateRouter exact path="/:page" component={PageRender} />
        <PrivateRouter exact path="/:page/:id" component={PageRender} />
   
      </div>
    </div>
    </Router>
  );
}

export default App;

