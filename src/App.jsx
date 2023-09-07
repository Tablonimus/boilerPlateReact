import React, { useEffect, useState } from "react";

import {
  BrowserRouter,
  Link,
  Route,
  Routes,

} from "react-router-dom";
import "./App.css";

import { useDispatch } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import Admin from "./screens/Admin/Admin";
import Landing from "./screens/Landing/Landing";
import Analytics from "./screens/Analytics/Analytics";

function App() {

  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const login = async () => {
    setUser({
      id: 1,
      name: "Analista",
      permissions: ["analizador"],
      roles: ["analizador"],
    });
    // localStorage.setItem("user", JSON.stringify(user));
  };
  const loginAdmin = async () => {
    setUser({
      id: 1,
      name: "Admin",
      permissions: ["admin"],
      roles: ["admin"],
    });
    // localStorage.setItem("user", JSON.stringify(user));
  };
  const logout = () => {
    setUser(null);
    // localStorage.removeItem("user")
  };

  return (
    <BrowserRouter>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <button onClick={login}>Login</button>
          <button onClick={loginAdmin}>Login Admin</button>
        </>
      )}
      <Navigation />
      <Routes /* location={location} key={location.pathname} */>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          element={<ProtectedRoute isAllowed={!!user} redirectTo={"/login"} />}
        >
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/landing" element={<Landing user={user} />} />
        </Route>

        <Route
          path="/analista"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.permissions.includes("analizador")}
              redirectTo={"/login"}
            >
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.permissions.includes("admin")}
              redirectTo={"/login"}
            >
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );

  function Navigation() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/landing">Landing</Link>
          </li>
          <li>
            <Link to="/analista">Analista</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default App;
