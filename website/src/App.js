import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Card from './Card';
import Homepage from './Homepage';
import Register from "./Register";
import Login from "./Login";
import Manage from "./Manage";
import Create from "./Create";

function App() {
    return (
        <Router>
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/manage" element={<Manage />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/create" element={<Create />} />
                <Route path="*" element={<Card />} />
          </Routes> 
        </div>
      </Router>
  );
}

export default App;
