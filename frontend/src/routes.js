import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import AccountView from './views/account/AccountView';
import AdminsListView from './views/users/UserListView';
import DashboardView from './views/reports/DashboardView';
import LoginView from './views/auth/LoginView';
import NotFoundView from './views/errors/NotFoundView';
import ArticleListView from './views/articles/ArticleListView';
import RegisterView from './views/auth/RegisterView';
import SettingsView from './views/settings/SettingsView';
import AddArticle from './views/articles/AddArticle'
const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'users', element: <AdminsListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'articles', element: <ArticleListView />, },
      { path: 'add-article', element: <AddArticle />, },
      { path: 'settings', element: <SettingsView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
