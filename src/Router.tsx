import { HashRouter, Route, Routes } from "react-router-dom";
import Main from "./Page/Main";
import NewPage from "./Page/NewPage";
import SavedPage from "./Page/SavedPage";
import Preview from "./Page/Preview";
import Write from "./Page/Write";
import Answer from "./Page/Answer";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/new_page/:id" element={<NewPage />} />
        <Route path="/saved_page" element={<SavedPage />} />
        <Route path="/preview/:id" element={<Preview />} />
        <Route path="/write" element={<Write />} />
        <Route path="/answer" element={<Answer />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
