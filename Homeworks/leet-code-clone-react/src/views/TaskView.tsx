import { ChangeEvent, useEffect, useState } from "react";
import { Task, TaskComplexity } from "../models/Task.model";
import { complexities, delay, tasks } from "../utils/utils";
import { useNavigate, useParams, } from "react-router-dom";

export default function TaskView(){
    const [name, setName] = useState<string>("");
    const [complexity, setComplexity] = useState<TaskComplexity>(TaskComplexity.None);
    const [popularity, setPopularity] = useState<number>(Number.NaN);
    const [code, setCode] = useState<string>("");
    const navigate = useNavigate();
    const { id } = useParams();
    function findComplexity(item: TaskComplexity|number|string|null) : [string, TaskComplexity]{
        return complexities.find(y => y[0] === item || y[1] === item)!;
    }
    function changeComplexity(event: ChangeEvent<HTMLSelectElement>){
        setComplexity(findComplexity(event.target.value)[1]);
    }
    async function save() {
        await delay();
        if (id){
            const task = tasks.find(x => x.id === Number(id))!
            task.name = name;
            task.complexity = complexity;
            task.popularity = popularity;
            task.code = code;
        }
        else
            tasks.push(new Task(tasks.length + 1, name, complexity, popularity, code));
        navigate("/");
    }
    function cancel(){
        navigate("/");
    }
    useEffect(() =>{
        if (id){
            const task = tasks.find(x => x.id === Number(id))!;
            setName(task.name);
            setComplexity(task.complexity);
            setPopularity(task.popularity);
            setCode(task.code);
        }
    }, []);
    return (
        <div>
                <div>
                    <label>Название</label>
                    <input value={name} onChange={x => setName(x.target.value)}></input>
                </div>
                <div>
                    <label>Сложность</label>
                    <select value={findComplexity(complexity)?.[0]??""} onChange={changeComplexity}>{
                        complexities.map(x => <option key={x[1]}>{x[0]}</option>)
                    }</select>
                </div>
                <div>
                    <label>Популярность</label>
                    <input type="number" value={popularity.toString()} onChange={x => setPopularity(Number(x.target.value))}></input>
                </div>
                <div>
                    <label>Код</label>
                    <textarea value={code} onChange={x => setCode(x.target.value)}></textarea>
                </div>
                <div>
                    <button onClick={save}>Сохранить</button>
                    <button onClick={cancel}>Отмена</button>
                </div>
        </div>
    );
}