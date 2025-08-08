
import AddNote from './pages/AddNote'
import Dashboard from './pages/Dashboard'
import Layout from './component/Layout'
import Protected from './component/Protected'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: "",
          element: (
            <Protected>
              <Dashboard />
            </Protected>
          )

        },
        {
          path: 'addNote',
          element: (
            <Protected>
              <AddNote />
            </Protected>
          )

        },
        {
          path : 'login',
          element : <Login/>
        },
        {
          path : 'signup',
          element : <Signup/>
        }
      ]
    }

  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
