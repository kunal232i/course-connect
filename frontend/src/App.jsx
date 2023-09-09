import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Landing from "./components/Landing";
import CreateCourse from "./components/CreateCourse";
import Signup from "./components/Signup";
import ShowCourses from "./components/ShowCourses";
import Navbar from "./components/Navbar";
import Course from "./components/Course";
import { userState } from "./store/atoms/user.js";
import {
    RecoilRoot,
    useSetRecoilState
} from 'recoil';
import axios from "axios";
import {useEffect} from "react";
import {BASE_URL} from "./config";

function App() {
  return (
    <RecoilRoot>
            <div style={{width: "100vw",
                height: "100vh",
                backgroundColor: "#eeeeee"}}
            >
    <Router>
      <Navbar />
      <InitUser />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createCourse" element={<CreateCourse />} />
        <Route path="/courses" element={<ShowCourses />} />
        <Route path="/course/:courseId" element={<Course />} />
      </Routes>
    </Router>
    </div>
    </RecoilRoot>
  );
}

function InitUser() {
    console.log(BASE_URL);
    const setUser = useSetRecoilState(userState);
    const init = async() => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/me`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            if (response.data.username) {
                setUser({
                    isLoading: false,
                    userEmail: response.data.username
                })
            } else {
                setUser({
                    isLoading: false,
                    userEmail: null
                })
            }
        } catch (e) {

            setUser({
                isLoading: false,
                userEmail: null
            })
        }
    };

    useEffect(() => {
        init();
    }, []);

    return <></>
}

export default App;
