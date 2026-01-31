import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import i18n from './js/i18n.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'primereact/resources/themes/lara-light-blue/theme.css'; // Tema
import 'primereact/resources/primereact.min.css';              // Core CSS
import 'primeicons/primeicons.css'; 

/**Public Pages */
import ProjectDetail from './components/ProjectDetail.jsx'

/**Shared Pages */
import LoginPage from './pages/shared/LoginPage.jsx'

/**Admin Pages */
import AdminHome from './pages/admin/AdminHome.jsx'
import RoutePrivate from './components/RoutePrivate.jsx'
import AdminProjects from './pages/admin/AdminProjects.jsx'
import AdminEducation from './pages/admin/AdminEducation.jsx'
import AdminEdit from './pages/admin/AdminEdit.jsx'
import RoatLayout from './components/RoatLayout.jsx'
import ForgotPassword from './pages/shared/ForgotPasswordPage.jsx'
import RecoveryPasswordPage from './pages/shared/RecoveryPasswordPage.jsx'
import AdminCreate from './pages/admin/AdminCreate.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RoatLayout toasterPosition="mt-[50px] md:mt-[85px]"><App /></RoatLayout>
  },
  {
    path: '/project/:id',
    element: <ProjectDetail />
  },
  {
    path: '/admin/login',
    element: <RoatLayout toasterPosition="mt-[20px]"><LoginPage /></RoatLayout>
  },
  {
    path: '/admin/forgotpassword',
    element: <RoatLayout><ForgotPassword /></RoatLayout>
  },
  {
    path: '/admin/forgotPassword/:token',
    element: <RoatLayout><RecoveryPasswordPage /></RoatLayout>
  },
  {
    path: '/admin',
    element: <RoatLayout><RoutePrivate><AdminHome /></RoutePrivate></RoatLayout>,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: 'projects',
        element: <AdminProjects />
      },
      {
        path: 'projects/archived',
        element: <AdminProjects />
      },
      {
        path: 'education',
        element: <AdminEducation />
      },
      {
        path: 'education/archived',
        element: <AdminEducation />
      },
      {
        path: ':collection/create',
        element: <AdminCreate />
      },
      {
        path: ':collection/:id/edit',
        element: <AdminEdit />
      }

    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)

/*
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)*/
