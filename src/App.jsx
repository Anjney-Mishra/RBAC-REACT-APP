import { Route, Routes } from "react-router-dom"
import Admin from "./pages/Admin"
import Editor from "./pages/Editor"
import Viewer from "./pages/Viewer"
import Login from "./pages/Login"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./utils/ProtectedRoute"
import Navbar from "./components/Navbar"
import { intialiseAllUsersToLS } from "./utils/intialiseAllUsersToLS"
import { useEffect } from "react"
import { initialiseAllRolesToLS } from "./utils/intialiseAllRolesToLS"
import RoleManagement from "./components/RoleManagement"
import UserManagement from "./components/UserManagement"
import Home from "./pages/Home"
import { initialiseProductsToLS } from "./utils/initialiseProductsToLS"

function App() {

  useEffect(()=>{
    intialiseAllUsersToLS();
    initialiseAllRolesToLS();
    initialiseProductsToLS();
  },[])

  return (
    <AuthProvider>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route 
      path="/admin" 
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <Admin />
        </ProtectedRoute>
      }
      />
      <Route 
      path="/admin/rolemanagement" 
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <RoleManagement />
        </ProtectedRoute>
      }
      />
      <Route 
      path="/admin/usermanagement" 
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <UserManagement />
        </ProtectedRoute>
      }
      />
      <Route 
      path="/editor" 
      element={
        <ProtectedRoute allowedRoles={["admin","editor"]}>
          <Editor />
        </ProtectedRoute>
      }
      />
      <Route 
      path="/viewer" 
      element={
        <ProtectedRoute allowedRoles={["admin","editor","viewer"]}>
          <Viewer />
        </ProtectedRoute>
      }
      />
      <Route path="/not-authorized" element={<div>Not Authorized</div>}/>
      <Route path="/*" element={<div>404 Page Not Found</div>}/>
    </Routes>
    </AuthProvider>
  )
}

export default App
