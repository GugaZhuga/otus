import { useEffect, useState } from "react";
import { delay, users } from "../utils/utils";
import { User } from "../models/User.model";
import { useNavigate, useParams } from "react-router-dom";

export default function UserView(){
    const [name, setName] = useState<string>("");
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        if (id){
            const user = users.find(x => x.id === Number(id))!;
            setName(user.name);
        }
    }, []);
    async function save() : Promise<void>{
        await delay();
        users.push(new User(users.length + 1, name));
        navigate("/users");
    }
    function cancel() : void {
        navigate("/users");
    }
    return (
        <div>
            <div>
                <label>Имя</label>
                <input value={name} onChange={x => setName(x.target.value)}></input>
            </div>
            <div>
                <button onClick={save}>Сохранить</button>
                <button onClick={cancel}>Отмена</button>
            </div>
        </div>
    );
}