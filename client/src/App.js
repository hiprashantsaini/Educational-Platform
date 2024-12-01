import React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConnectExplore from "./pages/ConnectExplore";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import appStore from "./redux/store";

const App = () => {
  const appRoutes = createBrowserRouter([
    {
      path: '/',
      // element:<Navbar/>
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <ConnectExplore />
        },
        {
          path: '/profile',
          element: <Profile />
        }
      ]
    }
  ]);
  return (
    <div className="bg-gray-100 min-h-screen">
      <Provider store={appStore}>
        <RouterProvider router={appRoutes} />
      </Provider>
    </div>
  );
};

export default App;
