//example
// const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Root />,
//       loader: rootLoader,
//       children: [
//         {
//           path: "team",
//           element: <Team />,
//           loader: teamLoader,
//         },
//       ],
//     },

import SignupForm from "@/_auth/forms/SignupForm";
import { createBrowserRouter } from "react-router-dom";

//   ]);
export const router=createBrowserRouter([{
    path:"/",
    children:[
      {
          path:"/sign-up",
          element:<SignupForm/>
      }
    ]
}])