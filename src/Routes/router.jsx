import { createBrowserRouter} from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import Homepage from "../Pages/Homepage";
import AddProduct from "../Pages/AddProduct";
import UpdateProduct from "../Pages/UpdateProduct";
import Products from "../Pages/Products";
import Contact from "../Pages/Contact";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayout/>,
      children:[{ index:true, element:<Homepage/> },
        {path:'/products', element:<Products/>},
        {path:'/contact', element:<Contact/> },
        {path:'/addproduct', element:<AddProduct/>},
        {path:'/products/updateproduct/:id', element:<UpdateProduct/>}

      ]
    },
    
  ]);