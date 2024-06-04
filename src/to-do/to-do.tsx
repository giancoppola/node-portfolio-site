import React, {useState, useEffect, StrictMode} from 'react';
import { createRoot } from 'react-dom/client'

const Title = () => {
    return (
        <h1 className='page-title'>To Do List</h1>
    )
}

const List = (props: any) => {
    const [list, setList] = useState(["Try adding your own"]);
    const add = () => {
        let newList = [...list, ""];
        setList(newList);
    }
    const remove = (index: number) => {
        console.log("now removing", index);
        let newList = [...list];
        newList.splice(index, 1);
        console.log(newList);
        setList(newList);
    }
    const update = (index: number, text: string) => {
        console.log("update called");
        let newList = [...list];
        newList[index] = text;
        setList(newList);
        console.log(newList);
    }
    useEffect(() => {
        
    }, [list])
    return (
        <div className="to-do-container">
            <ul className="list">
                {
                    list.map((item, index) => (
                        <ListItem index={index} key={index} text={item} remove={remove}
                        update={update}/>
                    ))
                }
            </ul>
            <AddNew add={add}/>
        </div>
    )
}

const ListItem = (props: any) => {
    let index = props.index;
    const [inputVal, setInputVal] = useState("");
    useEffect(() => {
        console.log(props);
        props.text != null ? setInputVal(props.text) : setInputVal("");
    }, [])
    const inputUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.target.value);
        props.update(index, e.target.value);
    }
    return (
        <li className='list-item' data-index={props.index} key={props.key}>
            <button className='list-item__check'>/</button>
            <input className='list-item__text' value={inputVal}
            onChange={e => inputUpdate(e)}/>
            <button onClick={() => props.remove(index)} className='list-item__delete'>X</button>
        </li>
    )
}

const AddNew = (props: any) => {
    return (
        <div className="add-new">
            <button onClick={() => props.add()} className='btn'>Add +</button>
        </div>
    )
}

const AppWrapper = (props: any) => {
    return (
        <StrictMode>
            <Title/>
            <List/>
        </StrictMode>
    )
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<AppWrapper/>);