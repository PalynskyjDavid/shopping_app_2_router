import { useContext } from "react";
import { DetailContext } from "../Provider_and_context/DetailProvider";
import { UserContext } from "../Provider_and_context/UserProvider.tsx";
import SolvedSwitch from "./SolvedSwitch.js";
import { useNavigate, createSearchParams } from "react-router-dom";
import AddCartForm from "./AddCartForm.js";

//import MemberList from "./MemberList.js";
// import ItemList from "./ItemList.js";
// import Item from "./Item.js";

export default function CartWrapper() {
    const { data, handlerMap } = useContext(DetailContext);
    const { userList, loggedInUser, getUserNameById } = useContext(UserContext);
    const navigate = useNavigate();

    //const [ show , setShow] = useState();
    // const [showStates, setShowStates] = useState({});

    // const toggleShow = (id, value) => {
    //     setShowStates((prev) => ({
    //         ...prev,
    //         [id]: value
    //     }));
    // };
    // handlerMap.handleClose = function() {setShow(false)}
    // handlerMap.handleOpen = function() {setShow(true)}
    //handlerMap.setShow = function(id, value) {toggleShow(id, value)}
    // handlerMap.handleClose = () => setShow(false)
    // handlerMap.handleOpen = () => setShow(true)
    //handlerMap.addMember({list_id: 345, memberId: 0})


    // return (
    //     <div>
    //         {data.map((dataItem) => (
    //             <div key={dataItem.id}>
    //                 <MemberList
    //                     //show={showStates}
    //                     data={dataItem}
    //                     userList={userList}
    //                     handlerMap={handlerMap}
    //                     //handleClose={() => setShow(false)}
    //                     loggedInUser={loggedInUser}
    //                 />
    //             </div>
    //         ))}
    //     </div>
    // );

    return (
        <div>
            <SolvedSwitch handlerMap={handlerMap} />
            <AddCartForm />
            {data.map((dataItem) => (
                <div
                    key={dataItem.id}
                    //onClick={() => navigate({ pathname: "detail", search: createSearchParams({ id: toDoList.id }).toString() })}
                    onClick={() => navigate({ pathname: "detail", search: createSearchParams({ cartId: dataItem.id }).toString() })}
                    style={{ border: "1px solid black", marginTop: "1px"}}
                    >

                    <div>Košík pro: {dataItem.name}</div>
                    <div>Majitel: {getUserNameById(dataItem.owner)}</div>
                    <div>ID košiku: {dataItem.id}</div>
                    <div></div>
                </div>
            ))}
        </div>
    );
}
