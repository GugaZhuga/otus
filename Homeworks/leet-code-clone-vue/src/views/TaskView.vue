<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTaskStore } from '../stores/TaskStore';
import { onActivated, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const store = useTaskStore();
const { id, item } = storeToRefs(store);
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
            <label>Наименование</label>
            <input type="text" v-model="item.name"></input>
        </div>
        <div>
            <label>Сложность</label>
            <input type="number" v-model="item.complexity"></input>
        </div>
        <div>
            <label>Категория</label>
            <input type="number" v-model="item.categoryId"></input>
        </div>
        <div>
            <label>Популярность</label>
            <input type="number" v-model="item.popularity"></input>
        </div>
        <div>
            <label>Код</label>
            <textarea v-model="item.code"></textarea>
        </div>
        <button v-on:click="save">Сохранить</button>
    </div>
</template>
<style scoped>
.wrapper{
    display: flexbox;
}
label {
    padding: 5px;
    display: flex;
}
textarea{
    width: 100%;
    height: 100%;
}
</style>