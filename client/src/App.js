import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import UserProvider from "./Components/Provider_and_context/UserProvider.tsx";
import DetailProvider from "./Components/Provider_and_context/DetailProvider.js";
//import Layout from "./Components/Other/Layout.js";
import Header from "./Components/Other/Header.js";
import CartWrapper from "./Components/Other/CartWrapper.js";
import CartDetail from "./Components/Other/CartDetail.js";

// <Route index element={<Layout />} />
//               <Route path="detail" element={<CartWrapper />} />

function App() {
  return (
    <BrowserRouter>

      <UserProvider>
        <DetailProvider>
          <Routes>
            <Route path="/" element={<Header />}>
            <Route index element={<CartWrapper />} />
            <Route path="detail" element={<CartDetail />}/>
            </Route>
          </Routes>
        </DetailProvider>
      </UserProvider>

    </BrowserRouter>
    // <BrowserRouter>
    //   <Routes>
    //     <UserProvider>
    //       <DetailProvider>
    //         <Route path="/" element={<Layout />}>
    //           <Route index element={<Vsdf />} />
    //           <Route />
    //         </Route>
    //       </DetailProvider>
    //     </UserProvider>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
