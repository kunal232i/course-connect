import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Landing from "./components/Landing";
import CreateCourse from "./components/CreateCourse";
import Signup from "./components/Signup";
import ShowCourses from "./components/ShowCourses";
import Navbar from "./components/Navbar";
import UpdateCourse from "./components/UpdateCourse";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createCourse" element={<CreateCourse />} />
        <Route path="/courses" element={<ShowCourses />} />
        <Route path="/updateCourse/:courseId" element={<UpdateCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
