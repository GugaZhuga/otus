import { ChangeEvent, useEffect, useState } from "react";
import { Task, TaskComplexity } from "../models/Task.model"
import { tasks, complexities, delay }from "../utils/utils"
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function TaskCollectionView()
{
    const [id, setId] = useState<number>(Number.NaN);
    const [name, setName] = useState<string>("");
    const [complexity, setComplexity] = useState<TaskComplexity|null>(null);
    const [popularity, setPopularity] = useState<number>(Number.NaN);
    const [items, setItems] = useState<Task[]>(tasks);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<Task|null>(null);
    const navigate = useNavigate();
    async function search(){
        setIsLoading(true);
        await delay();
        setItems(tasks.filter(x => (Number.isNaN(id) || id === x.id)
            && (name === "" || name === x.name)
            && (complexity === null || complexity === x.complexity)
            && (Number.isNaN(popularity) || popularity === x.popularity)));
        setIsLoading(false);
    }
    async function clear(){
        setId(Number.NaN);
        setName("");
        setComplexity(null);
        setPopularity(Number.NaN);
        await search();
    }
    function findComplexity(item: TaskComplexity|number|string|null){
        return complexities.find(y => y[0] === item || y[1] === item) ?? null;
    }
    function changeComplexity(event: ChangeEvent<HTMLSelectElement>){
        setComplexity(findComplexity(event.target.value)?.[1] ?? null);
    }
    useEffect(() =>{
        search();
    }, []);
    function add() : void{
        navigate("tasks/new");
    }
    function editById(id: number|null|undefined) : void {
        if (id)
            navigate(`/tasks/${id}`);
    }
    function editSelected() : void {
        editById(selected?.id);
    }
    async function removeById(id: number|null|undefined) : Promise<void> {
        if (id)
            tasks.splice(tasks.findIndex(x => x.id === id));
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
                        <td>
                            <button onClick={add}>Добавить</button>
                            <button onClick={editSelected}>Редактирвоать</button>
                            <button onClick={removeSelected}>Удалить</button>
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <th>Код</th>
                        <th>Имя</th>
                        <th>Сложность</th>
                        <th>Популярность</th>
                    </tr>
                    <tr>
                        <td>
                            <input type="number" value={id.toString()} onChange={x => setId(Number(x.target.value))}></input>
                        </td>
                        <td>
                            <input type="text" value={name} onChange={x => setName(x.target.value)}></input>
                        </td>
                        <td>
                            <select value={findComplexity(complexity)?.[0]??""} onChange={changeComplexity}>
                                <option key={null}>Любой</option>
                                {complexities.map(x => <option key={x[1]}>{x[0]}</option>)}
                            </select>
                        </td>
                        <td>
                            <input type="number" value={popularity.toString()} onChange={x => setPopularity(Number(x.target.value))}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                <button onClick={search}>Поиск</button>
                                <button onClick={clear}>Очистить</button>
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody>{
                    isLoading ? <tr><td><Loader></Loader></td></tr> :
                    items.map((task, index )=> <tr key={index} onClick={x => setSelected(task)} onDoubleClick={x => editById(task.id)}>
                        <td>
                            <input type="radio" checked={selected === task} onChange={x => setSelected(Boolean(x.target.value) ? task : null)}></input>
                        </td>
                        <td>{task.id}</td>
                        <td>{task.name}</td>
                        <td>{task.complexity}</td>
                        <td>{task.popularity}</td>
                        <td>
                            <button onClick={x => removeById(task.id)}>X</button>
                        </td>
                    </tr>)
                }</tbody>
            </table>
        </div>
    );
}