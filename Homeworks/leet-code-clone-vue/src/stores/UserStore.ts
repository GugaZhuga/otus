import { delay, getUsers } from "@/assets/data";
import { User } from "@/models/User";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user-store", () => {
    const id = ref<number|null>(null);
    const item = ref<User>(new User(0, "", "", ""));
    async function load(){
        const user = await getUsers().then(x => x.find(y => y.id === id.value));
        if (user != undefined)
            item.value = user;
    }
    async function save(){
        await delay();
    }
    return { id, item, load, save };
});