import { Route, Routes } from "react-router";

import { Layout } from "@/components/Layout";

import { Home } from "@/pages/Home";
import { CanvasNoGravity } from "@/pages/CanvasNoGravity";
import { CircularMotion } from "./pages/CircularMotion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="canvas-no-gravity" element={<CanvasNoGravity />} />
        <Route
          path="collision-detection"
          element={<div>Collision Detection</div>}
        />
        <Route path="circular-motion" element={<CircularMotion />} />
      </Route>
    </Routes>
  );
}

export default App;
