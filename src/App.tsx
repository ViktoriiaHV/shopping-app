import { Button } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// import { IntlProvider, FormattedMessage } from 'react-intl';
import "./App.css";
import { Cart } from "./components/Cart/Cart";
import { Products } from "./components/Products/Products";
import { Header } from "./components/UI/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="main-section">
        <div className="main-header">
          <Header />
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="products" />} />
            <Route path="products" element={<Products />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;





 


//     <div style={cartItemsStyle}>
//       <Card>
//         <div style={cartContentStyle}>
//           Vendor: 
//           {pixel.vendor}
//         </div>
//         <div style={cartContentStyle}>Load Type: {pixel.trigger}</div>
//         <div style={cartContentStyle}>Configuration: {pixel.config}</div>
//         <div style={cartContentStyle}>
//           <div>Loading Rules: </div>
//           <div>
//             {Object.entries(pixel.rules).map(([key, value]) => (
//               <div>
//                 {
//                     `${key}: ${value}`
//                 }
//               </div>
//             ))}
//           </div>
//         </div>
//         <div style={cartButtonsStyle}>
//           <Button
//             variant="contained"
//             size="small"
//             color="secondary"
//             style={{ margin: "3px", padding: "2px" }}
//           >
//             Edit
//           </Button>
//           <Button
//             variant="contained"
//             size="small"
//             color="inherit"
//             style={{ margin: "3px", padding: "2px" }}
//           >
//             Remove
//           </Button>
//         </div>
//       </Card>
//     </div>