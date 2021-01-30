import './bootstrap.min.css';
import './App.css';
import { GlobalProvider } from './context/GlobalState';
import Results from './components/Results';
import DropWrapper from './components/DropWrapper'

function App() {

  return (
    <div className="App">
      <GlobalProvider>
        <DropWrapper />
        <Results />
      </GlobalProvider>
    </div>
  );
}

export default App;
