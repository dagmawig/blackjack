import { Provider } from 'react-redux';
import './App.css';
import Home from './components/home';
import { ConfigureStore } from './redux/configureStore';
import Home2
 from './components/home2';
const store = ConfigureStore();

function App() {
  return (
    
      <div className="App">
        <Home2 />
      </div>
    

  );
}

export default App;
