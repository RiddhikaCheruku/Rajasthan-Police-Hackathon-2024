import { Routes, Route } from "react-router-dom"
import IndexPage from "./pages/indexPage"
import { Login } from "./pages/Login"
import { Layout } from './Layout'
import { Register } from "./pages/Register"
import axios from "axios"
import { UserContextProvider } from "./UserContext"
import { Account } from "./pages/Account"
import { Hash } from "./pages/Hash"
import CsvTable from "./pages/Sankey"

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/:subPage?" element={<Account />} />
          <Route path="/hash" element={<Hash />} />
          <Route path="/sankey" element={<CsvTable />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
