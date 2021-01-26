import './bootstrap.min.css';
import './App.css';
import DropWrapper from './components/DropWrapper';
import { GlobalProvider } from './context/GlobalState';
import Results from './components/Results';

function App() {
  return (
    <div className="App" style={{ width: "95%", margin: "auto"}}>
      <GlobalProvider>
        <DropWrapper />
        {/* <FileInput /> */}
        <Results />
      </GlobalProvider>
    </div>
  );
}

export default App;
