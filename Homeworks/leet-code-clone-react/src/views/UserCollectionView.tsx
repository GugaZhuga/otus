import { useEffect, useState } from "react";
import { User } from "../models/User.model";
import { delay, users } from "../utils/utils"
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function UserCollectionView(){
    const [id, setId] = useState<number>(Number.NaN);
    const [name, setName] = useState<string>("");
    const [items, setItems] = useState<User[]>(users);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<User|null>(null);
    async function search() : Promise<void>{
        setIsLoading(true);
        await delay();
        setItems([...users.filter(x => (Number.isNaN(id) || id === x.id)
            && (name === "" || name === x.name))]);
        setIsLoading(false);
    }
    async function clear() : Promise<void>{
        setId(Number.NaN);
        setName("");
        await search();
    }
    useEffect(() =>{
        search();
    }, []);
    const navigate = useNavigate();
    function add() : void{
        navigate(`/users/new`);
    }
    function editById(id: number|null|undefined) : void{
        if (id)
            navigate(`/users/${id}`);
    }
    function editSelected() : void {
        editById(selected?.id);
    }
    async function removeById(id: number|null|undefined) : Promise<void> {
        if (id)
            users.splice(users.findIndex(x => x.id === id), 1);
        await search();
    }
    async function removeSelected() : Promise<void> {
        removeById(selected?.id);
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <button onClick={add}>Добавить</button>
                            <button onClick={editSelected}>Редактировать</button>
                            <button onClick={removeSelected}>Удалить</button>
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>Код</th>
                        <th>Имя</th>
                    </tr>
                    <tr>
                        <td>
                            <input type="number" value={id.toString()} onChange={x => setId(Number(x.target.value))}></input>
                        </td>
                        <td>
                            <input type="text" value={name} onChange={x => setName(x.target.value)}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={search}>Поиск</button>
                            <button onClick={clear}>Очистить</button>
                        </td>
                    </tr>
                </thead>
                <tbody>{
                    isLoading ? <tr><td><Loader></Loader></td></tr> :
                    items.map((item, index) => <tr key={index} onClick={x => setSelected(item)} onDoubleClick={x => editById(item.id)}>
                        <td>
                            <input type="radio" checked={selected == item} onChange={x => setSelected(item)}></input>
                        </td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                            <button onClick={x => removeById(item.id)}>X</button>
                        </td>
                    </tr>)
                }</tbody>
            </table>
        </div>
    );
}