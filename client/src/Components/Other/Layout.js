import Header from "./Header.js";
import Toolbar from "./Toolbar.js";
// import MemberList from "./MemberList.js";
//import ItemList from "./ItemList.js";
import CartWrapper from "./CartWrapper.js";

export default function Layout() {
    return (
        <div>
            <Header />
            {/* <Toolbar /> */}
            <CartWrapper>

            </CartWrapper>
            {/* <MemberList />
                <ItemList /> */}
        </div>
    )
}