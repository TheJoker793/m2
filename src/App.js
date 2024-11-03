import {Routes,Route,BrowserRouter } from "react-router-dom"
import TaskList from "./Pages/TaskList/TaskList"
import Task from "./Pages/Task/Task";
import HomePage from "./Pages/HomePage";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route  path="/taskList" element={<TaskList/>}/>
      <Route path="/tasks" element={<Task/>}/>   
    </Routes>
    </BrowserRouter>
  );
}

export default App;
