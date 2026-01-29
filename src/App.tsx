import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { Projects } from "./pages/Projects/Projects";
import { Project } from "./pages/Project/Project";
import { Resume } from "./pages/Resume/Resume";

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<Project />} />
            <Route path="resume" element={<Resume />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
