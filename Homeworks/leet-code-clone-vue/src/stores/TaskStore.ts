import { defineStore } from "pinia";
import { Task, TaskComplexity } from "@/models/Task";
import { ref } from "vue";
import { delay, getTasks,  } from "@/assets/data";

export const useTaskStore = defineStore("task-store", () =>{
    const id = ref<number|null>(null);
    const item = ref<Task>(new Task(0, ""));
    async function load(){
        const task = await getTasks().then(x => x.find(y => y.id == id.value));
        if (task != undefined){
            item.value = task;
        }
    }
    async function save(){
        await delay();
    }
    return { id, load, item, save };
});