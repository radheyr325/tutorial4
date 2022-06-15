import './App.css';
import SignIn from "./SignIn";
import Users from "./Users";
import Profile from "./Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={< SignIn/>}></Route>
            {/*<Route path="/users" element={< Users/>}></Route>*/}
              <Route path ="users">
                  <Route path={":id"} element={<Profile />}  />
                  <Route index element = {<Users></Users>}></Route>
              </Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;