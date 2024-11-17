import { createContext, useMemo, useState, useContext } from "react";
import { UserContext } from "../Provider_and_context/UserProvider.tsx";

export const DetailContext = createContext();

function DetailProvider({ children }) {

    const { loggedInUser } = useContext(UserContext);

    const [data, setData] = useState([
        {
            id: 123,
            name: "Pecivo",
            owner: 0,
            memberList: [1, 2, 3, 4],
            resolved: false,
            itemList: [
                {
                    id: 1,
                    name: "Rohlik",
                    resolved: false,
                },
                {
                    id: 1,
                    name: "Chleba",
                    resolved: false,
                }
            ]
        },
        {
            id: 234,
            name: "Zelenina",
            owner: 0,
            memberList: [1, 2, 3, 4],
            resolved: false,
            itemList: [
                {
                    id: 1,
                    name: "Rajce",
                    resolved: false,
                },
                {
                    id: 2,
                    name: "Brambory",
                    resolved: false,
                },
                {
                    id: 3,
                    name: "Cuketa",
                    resolved: false,
                },
            ]
        },
        {
            id: 345,
            name: "Sladkosti",
            owner: 1,
            memberList: [2, 3, 4],
            resolved: true,
            itemList: [
                {
                    id: 1,
                    name: "Zmrzlina",
                    resolved: false,
                },
                {
                    id: 2,
                    name: "Sorbet",
                    resolved: false,
                },
            ]
        },
        {
            id: 456,
            name: "Zuby",
            owner: 0,
            memberList: [2, 3, 4],
            resolved: true,
            itemList: [
                {
                    id: 1,
                    name: "Colgate Big Kids´ Smiles zubní pasta 6-9 let ",
                    resolved: false,
                },
                {
                    id: 2,
                    name: "Colgate® Ultra Soft Design Edition Smile Love Repeat",
                    resolved: false,
                },
            ]
        }]);

    //využítím useMemo k přepočítání toho co má uživatel vidět, splněné či nesplněné položky
    const [showMarked, setShowMarked] = useState(0);
    //Zobrazit vyřešení nebo nevyřešené shopping listy ke kterým má uživatl přístup (vlastník / member)
    const [resolved, setResolved] = useState(false);

    const filteredData = useMemo(() => {
        return data.filter(
            (cart) => cart.resolved === resolved &&
                (cart.owner === loggedInUser || cart.memberList?.includes(loggedInUser))
        );
    }, [resolved, data, loggedInUser]);

    //Toto z nějakého důvodu nefunguje, nemění se data
    // const filteredData = useMemo(() => {
    //     if (!resolved) {
    //         return data.filter(
    //             (cart) => cart.resolved === false &&
    //                 (cart.owner === loggedInUser ||
    //                 cart.memberList?.includes(loggedInUser))
    //         )
    //     }
    //     else {
    //         return data.filter(
    //             (cart) => cart.resolved === false &&
    //                 (cart.owner === loggedInUser ||
    //                 cart.memberList?.includes(loggedInUser))
    //         )
    //     }
    // }, [resolved, data, loggedInUser])

    //Druhý filtr na marknuté itemy
    // const filteredData = useMemo(() => {
    //     return data.map((list) => {
    //         if (showMarked === 0) {
    //             return list;
    //         } else if (showMarked === 1) {
    //             return {
    //                 ...list,
    //                 itemList: list.itemList.filter(item => !item.resolved)
    //             };
    //         } else if (showMarked === 2) {
    //             return {
    //                 ...list,
    //                 itemList: list.itemList.filter(item => item.resolved)
    //             };
    //         }
    //         return list; // Default return in case showMarked is an unexpected value
    //     });
    // }, [data, showMarked]);


    const value = {
        data: filteredData,
        handlerMap: {
            // updateName: ({ name }) => {
            //     setData((current) => {
            //         current.name = name;
            //         return { ...current };
            //     });
            // },
            addItem: (list_id) => {
                setData((current) => {
                    return current.map((list) => {
                        if (list.id === list_id) {
                            return {
                                ...list,
                                itemList: [
                                    ...list.itemList,
                                    {
                                        id: Math.random().toString(36).substr(2, 9),
                                        name: "New item",
                                        resolved: false,
                                    },
                                ],
                            };
                        }
                        return list;
                    });
                });
            },
            updateItemName: ({ list_id, item_id, new_name }) => {
                setData((current) => {
                    current.map((list) => {
                        if (list.id === list_id) {
                            return {
                                ...list,
                                itemList: list.itemList.map((item) => {
                                    if (item.id === item_id) {
                                        return { ...item, name: new_name };
                                    }
                                    return item;
                                })
                            };

                        }
                        return { list };
                    })
                });
            },
            toggleResolveItem: (list_id, item_id) => {
                setData((current) => {
                    return current.map((list) => {
                        if (list.id === list_id) {
                            return {
                                ...list,
                                itemList: list.itemList.map((item) => {
                                    if (item.id === item_id) {
                                        return { ...item, resolved: !item.resolved };
                                    }
                                    return item;
                                })
                            };
                        }
                        return list;
                    });
                });
            },
            deleteItem: (list_id, item_id) => {
                setData((current) => {
                    return current.map((list) => {
                        if (list.id === list_id) {
                            return {
                                ...list,
                                itemList: list.itemList.filter((item) => item.id !== item_id)
                            };
                        }
                        return list;
                    });
                });
            },
            addMember: ({ list_id, memberId }) => {
                setData((current) => {
                    return current.map((list) => {
                        if (list.id === list_id) {
                            return {
                                ...list,
                                memberList: list.memberList.includes(memberId) ? list.memberList : [...list.memberList, memberId]
                            };
                        }
                        return list;
                    });
                });
            },
            removeMember: ({ list_id, memberId }) => {
                setData((current) => {
                    return current.map((list) => {
                        if (list.id === list_id) {
                            return {
                                ...list,
                                memberList: list.memberList.filter((member) => member !== memberId)
                            };
                        }
                        return list;
                    });
                });
            },
            handleCreate: (name) => {
                setData((current) => [
                    ...current,
                    {
                        id: Math.floor(Math.random() * 1000),
                        name: name,
                        resolved: false, // Assuming this should be `resolved`
                        owner: loggedInUser,
                        memberList: [],
                        itemList: [],
                    },
                ]);
            },
            handleDelete: (id) => {
                setData((current) => {
                    const itemIndex = current.findIndex((item) => item.id === id);
                    current.splice(itemIndex, 1);
                    return current.slice();
                });
            },
            showMarked,
            toggleshowMarked: () => setShowMarked((current) => (current + 1) % 3),
            //0 show all
            //1 show unresolved
            //2 show resolved      
            resolved,
            toggleResolved: () => { setResolved((current) => !current) }
        },
    }
    return (<DetailContext.Provider value={value} > {children}</DetailContext.Provider>)
}

export default DetailProvider;