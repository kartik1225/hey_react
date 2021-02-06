import React, {useReducer, useEffect, useRef, useContext} from "react";
import "./App.css";
import AboutUs from "./AboutUs";


const reducer = (state, action) => {
    if (action.type === "INIT") {
        const _data = localStorage.getItem("mData")
        if (_data) {
            state = {...state, data: JSON.parse(_data)}
        }
    }

    if (action.type === "ADD_ITEM") {
        if (state.name !== "") {
            const newItem = {name: state.name, id: new Date().getTime().toString()};
            state = {...state, name: "", data: [newItem, ...state.data]}
        }
    }

    if (action.type === "REMOVE_ITEM") {
        state = {...state, data: state.data.filter(d => d.id !== action.payload)}
    }

    if (action.type === "CHANGE_NAME") {
        state = {...state, name: action.payload}
    }

    if (action.type === "CLEAR_ALL") {
        state = {...state, data: [], name: ''}
    }

    localStorage.setItem("mData", JSON.stringify(state.data));

    return state;
}

const defaultState = {
    data: [],
    name: '',
    loading: false
}

const AppContext = React.createContext();

function App() {
    const [state, dispatch] = useReducer(reducer, defaultState)
    const inputRef = useRef();

    useEffect(() => {
        dispatch({type: "INIT"});
        inputRef.current.focus();
    }, []);


    return (
        <AppContext.Provider value={{state, dispatch}}>
            <div className="App">
                <div className="card">
                    <h3>New person?</h3>
                    <div>
                        <input
                            ref={inputRef}
                            placeholder="Add name"
                            value={state.name}
                            onKeyDown={e => e.key === 'Enter' && dispatch({type: "ADD_ITEM"})}
                            onChange={(e) => {
                                dispatch({type: "CHANGE_NAME", payload: e.target.value})
                            }}
                        />
                        <button onClick={() => dispatch({type: "ADD_ITEM"})}>Add</button>
                    </div>
                </div>
                {state.data.length > 1 &&
                <button onClick={() => dispatch({type: "CLEAR_ALL"})} style={{background: "bisque"}}>clear all</button>}
                {state.data &&  <List/>}
            </div>

        </AppContext.Provider>

    );
}

const List = () => {
    const {state,dispatch} = useContext(AppContext)
    return state.data.map((d) => {
        return <>
            <div key={d.id} className="tile">
                <div style={{display: "inline", padding: "6px"}}>
                    <span style={{padding: "12px"}}>{d.name}</span>
                    <button onClick={() => dispatch({type: "REMOVE_ITEM", payload: d.id})}>remove</button>
                </div>
            </div>
        </>
    })
}

export default App;
