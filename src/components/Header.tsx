// IMPORTS
import { NavLink } from "react-router-dom";

import { NAV_LINKS as links } from "@/helpers/constants";
import { twMerge } from "tailwind-merge";

// COMPONENT
export const Header: React.FC = () => {
  if (!links) return null;

  const getNavLinkClassName = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "text-pink-400 pointer-events-none"
      : "hover:text-pink-300 transition-colors duration-200";
  };

  return (
    <header
      className={twMerge(
        "fixed inset-x-0 top-0",
        "flex items-center justify-center",
        "backdrop-blur-sm opacity-50",
        "hover:opacity-100",
        "transition-opacity duration-200"
      )}
    >
      <nav className="container py-4">
        <ul
          className={twMerge(
            "flex items-center justify-center gap-8 flex-wrap",
            "text-xl"
          )}
        >
          {links.map(link => (
            <li key={link.path}>
              <NavLink to={link.path} className={getNavLinkClassName}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
