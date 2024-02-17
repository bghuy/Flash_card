import logo from './logo.svg';
import './App.scss';
import "bootstrap/dist/css/bootstrap.css";
// import Button from 'react-bootstrap/Button';
// import { useDispatch, useSelector } from 'react-redux';
// import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import NavHeader from './components/Navigation/NavHeader';
import Container from 'react-bootstrap/esm/Container';
import { UserProvider } from "./context/UserContext.js"
const App = () => {
  // const count = useSelector(state => state.counter.count);
  // const dispatch = useDispatch();

  return (
    <Router>
      <UserProvider>
        <div className="App">
          <Container >
            <header className="App-header ">
              <NavHeader />
            </header>
            <main className='App-main'>


            </main>
            <footer className='App-footer'>

            </footer>
          </Container>

        </div>
      </UserProvider>

    </Router>

  );
}

export default App;
