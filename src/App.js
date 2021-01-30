import './bootstrap.min.css';
import './App.css';
import { GlobalProvider } from './context/GlobalState';
import Results from './components/Results';
import DropWrapper from './components/DropWrapper'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Router>
        <GlobalProvider>
          <Navbar />
          <div id="main">
            <DropWrapper />
            <Switch>
              <Route path="/streams">
                <h1>streams</h1>
              </Route>
              <Route path="/">
                <Results />
              </Route>
            </Switch>
          </div>
        </GlobalProvider>
      </Router>
    </div>
  );
}

export default App;
