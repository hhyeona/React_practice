import './App.css';
import Banner from './components/Banner';
import Nav from './components/Nav';
import Row from './components/Row';
import requests from './api/requests';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Banner></Banner>
      <Row title="NETFLIX ORIGINALS"
        id="NO"
        fetchUrl={requests.fectchNetflixOriginals}
        isLarghRow>
      </Row>
      <Row title="Trending Now"
        id="TN"
        fetchUrl={requests.fetchTrending}
        >
      </Row>
      <Row title="Top Rated"
        id="TR"
        fetchUrl={requests.fetchTopRated}
        >
      </Row>
      <Row title="Action Movies"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
        >
      </Row>
      <Row title="Comedy Movies"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
        >
      </Row>
    </div>
  );
}

export default App;
