
import './App.css';
import DeployToken from './components/DeployToken/DeployToken';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Newsletter from './components/Newsletter/Newsletter';
import Product from './components/Products/Product';
import "./styles/globalStyles.css"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home/>
      <Product/>
      <Features/>
      <Newsletter/>
      <Footer/>
      {/* <DeployToken /> */}
    </div>
  );
}

export default App;
