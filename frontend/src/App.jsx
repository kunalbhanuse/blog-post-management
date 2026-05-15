import { Routes, Route } from "react-router-dom";
import BlogList from "./pages/BlogList";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import ViewBlog from "./pages/ViewBlog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/create" element={<CreateBlog />} />
      <Route path="/edit/:id" element={<EditBlog />} />
      <Route path="/view/:id" element={<ViewBlog />} />
    </Routes>
  );
}

export default App;
