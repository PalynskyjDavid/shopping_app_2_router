
export default function SolvedSwitch({ handlerMap }) {

    return (
        <button onClick={() => handlerMap.toggleResolved()}>
            {handlerMap.resolved ? "Zobrazit nevyřešené" : "Zobrazit vyřešené"}
        </button>
    )
}

//https://tigerabrodi.blog/is-it-ok-to-pass-setstate-as-a-prop-in-react