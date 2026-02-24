import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/pages/Login"
import { ProtectedRoute } from "./components/ProtectedRoute"
import Dashboard from "./components/pages/Dashboard"
import Register from "./components/pages/Register"
import Chat from "./components/pages/Chat"

function App() {

  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login />}/>
      <Route path="/" element={<Register />}/>
     <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
  </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
