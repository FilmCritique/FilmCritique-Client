import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import WriteReview from "./pages/WriteReview";
import ReviewDetail from "./pages/ReviewDetail";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writeReview/" element={<WriteReview />} />
        <Route path="/writeReview/:reviewid" element={<WriteReview />} />
        <Route path="/reviewDetail/:reviewid" element={<ReviewDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
