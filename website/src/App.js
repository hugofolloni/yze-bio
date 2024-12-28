import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Card from './Card';
import Homepage from './Homepage';
import Register from "./Register";
import Login from "./Login";
import Manage from "./Manage";
import Customize from "./Customize"

function App() {
    return (
        <Router>
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/manage" element={<Manage />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/create" element={<Customize edit={false}/>} />
                <Route exact path="/edit/:id" element={<Customize edit={true}/>} />
                <Route path="*" element={<Card />} />
          </Routes> 
        </div>
      </Router>
  );
}

export default App;
