import { Home } from "../presentation/pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PdfViewer from "../presentation/pages/PdfViewer";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/lib' element={<PdfViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;