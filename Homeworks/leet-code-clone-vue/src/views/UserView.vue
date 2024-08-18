<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const store = useUserStore();
const { id, item } = storeToRefs(store);
const route = useRoute();
const router = useRouter();
id.value = parseInt((String)(route.params.id));
async function save(){
    await store.save();
    router.push({name: "tasks"});
}
onMounted(store.load);
</script>
<template>
    <div class="wrapper">
        <div>
            <label>Имя пользователя</label>
            <input type="text" v-model="item.name"></input>
        </div>
        <div>
            <label>Логин</label>
            <input type="text" v-model="item.login"></input>
        </div>
        <div>
            <label>Пароль</label>
            <input type="password" v-model="item.password"></input>
        </div>
        <button v-on:click="save">Сохранить</button>
    </div>
</template>
<style scoped>
.wrapper{
    display: grid;
    label {
            margin: 5px;
        }
}
</style>