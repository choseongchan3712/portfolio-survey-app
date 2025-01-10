import { HashRouter, Route, Routes } from "react-router-dom";
import Main from "./Page/Main";
import NewPage from "./Page/NewPage";
import SavedPage from "./Page/SavedPage";
import Preview from "./Page/Preview";
import Write from "./Page/Write";
import Header from "./Components/global/Header";

const Router = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/new_page" element={<NewPage />} />
        <Route path="/saved_page" element={<SavedPage />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
