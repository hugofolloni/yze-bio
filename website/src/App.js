import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Card from './Card';
import Homepage from './Homepage';

function App() {
    return (
        <Router>
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Homepage />}/>
                <Route path="*" element={<Card />}/>
          </Routes> 
        </div>
      </Router>
  );
}

export default App;
