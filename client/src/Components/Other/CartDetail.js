import { useContext, useMemo } from "react";
import { DetailContext } from "../Provider_and_context/DetailProvider";
import { useNavigate } from "react-router-dom";
import MemberList from "./MemberList";
import { UserContext } from "../Provider_and_context/UserProvider.tsx";

function CartDetail() {

    const { data, handlerMap } = useContext(DetailContext);
    const queryParameters = new URLSearchParams(window.location.search)
    const cartId = queryParameters.get("cartId")
    const navigate = useNavigate();
    const { userList, loggedInUser } = useContext(UserContext);


    const cartDetails = useMemo(() => {
        return data.find(cart => cart.id.toString() === cartId);
    }, [data, cartId]);

    if (!cartDetails) {
        return (
            <>
                <div>Košík nenalezen</div>
                <button onClick={() => navigate("/")}>ZPĚT</button>
            </>
        );
    }


    return (
        <div>
            <h2>Detail košíku s ID: {cartDetails.id}</h2>
            <button onClick={() => navigate("/")}>ZPĚT</button>
            {(cartDetails.owner === loggedInUser) ?
                <button onClick={() => handlerMap.handleDelete(cartDetails.id)}>Odebrat košík</button>
                :
                null
            }

            <div style={{ border: "1px solid black", marginTop: "1px" }}>
                <p>Jméno košíku: {cartDetails.name}</p>
                <p>Vlastník: {cartDetails.owner}</p>
                <p>Resolved: {cartDetails.resolved ? "Yes" : "No"}</p>
                <h3>Položky v košíku:</h3>
                <ul>
                    {cartDetails.itemList.map(item => (
                        <li key={item.id}>
                            {item.name} - {item.resolved ? "Resolved" : "Unresolved"}
                        </li>
                    ))}
                </ul>
            </div>

            <>
                <MemberList
                    //show={showStates}
                    data={cartDetails}
                    userList={userList}
                    handlerMap={handlerMap}
                    //handleClose={() => setShow(false)}
                    loggedInUser={loggedInUser}
                />
            </>
        </div>
    );

    // return (
    //     <div>Cart detail with id: {cartId}</div>
    //     // <div>
    //     //   <input
    //     //     type="text"cl
    //     //     value={value}
    //     //     onChange={(e) => setValue(e.target.value)}
    //     //     onBlur={() => handlerMap.updateItemName({ id: data.id, name: value })}
    //     //   />{" "}
    //     //   <button onClick={() => handlerMap.toggleResolveItem({ id: data.id })}>
    //     //     {data.resolved ? "unresolve" : "resolve"}
    //     //   </button>
    //     //   <button onClick={() => handlerMap.deleteItem({ id: data.id })}>
    //     //     delete
    //     //   </button>
    //     // </div>
    // );
}

export default CartDetail;