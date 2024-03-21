import './App.css';
import Navbar from './component/navbar';
import Banner from './component/banner';
import Footer from './component/footer';
import Post from './component/post';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Banner></Banner>
      <Post></Post>
      <Footer></Footer>
    </div>
  );
}

export default App;
