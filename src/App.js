
import './App.css';
import MintToken from './components/MintToken/MintToken';
import Navbar from './components/Navbar/Navbar';
import "./styles/globalStyles.css"

function App() {
  return (
    <div className="App">
      <Navbar />
      <MintToken />
    </div>
  );
}

export default App;
