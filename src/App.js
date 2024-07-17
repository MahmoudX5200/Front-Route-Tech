import {  RouterProvider, createHashRouter } from "react-router-dom";
import Task from "./Task/Task";
import Layout from "./Layout";
import Notfound from "./Notfound/Notfound";
export default function App() {
  
  let Routes = createHashRouter([
    {
      path: "", element: <Layout/>, children: 
      [
        {index:true, element: <Task/> },
        { path: "Task", element: <Task/> },
        { path: "*", element: <Notfound/> },
      ],
    },
  ]);

  return <RouterProvider router={Routes} />;
}
