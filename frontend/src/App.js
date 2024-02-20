
import './App.scss';
import "bootstrap/dist/css/bootstrap.css";
// import Button from 'react-bootstrap/Button';
// import { useDispatch, useSelector } from 'react-redux';
// import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import { UserProvider } from "./context/UserContext.js"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContent from './components/AppContent/AppContent.js';
const App = () => {
  // const count = useSelector(state => state.counter.count);
  // const dispatch = useDispatch();
  // const [userChanged, setUserChanged] = useState(false);
  // const { user } = useContext(UserContext);
  // useEffect để theo dõi sự thay đổi của user và kích hoạt việc rerender
  // useEffect(() => {
  //   setUserChanged(true);
  // }, [user.isLoading]);
  return (

    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover// Use equals sign and provide a string value
      />
    </Router>


  );
}

export default App;
