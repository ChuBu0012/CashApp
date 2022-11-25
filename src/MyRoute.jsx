import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import FormAddList from "./FormAddList/FormAddList";
const MyRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/AddList" element={<FormAddList />} />
      </Routes>
    </Router>
  );
};
export default MyRoute;
