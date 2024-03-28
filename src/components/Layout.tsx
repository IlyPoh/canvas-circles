// IMPORTS
import { Outlet } from "react-router";

import { Header } from "./Header";

// COMPONENT
export const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
