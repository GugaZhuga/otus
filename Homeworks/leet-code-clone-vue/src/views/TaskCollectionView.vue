<script setup lang="ts">
import { Task } from '@/models/Task';
import { useTaskCollectionStore } from '@/stores/TaskCollectionStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import LabelInput from "@/components/LabelInput.vue";

const store = useTaskCollectionStore();
const { items, name, complexity, categoryId, popularity } = storeToRefs(store);
const router = useRouter();
function showTask(id: number|null){
    router.push({ name: "task", params: { "id": id } });
}
onMounted(store.load);

</script>

<template>
<table>
    <caption>Задачи</caption>
    <thead>
        <div>
            <div style="display: flex;">
                <div class="search-value">
                    <label>Наименование</label>
                    <input type="text" v-model="name"></input>
                </div>
                <div class="search-value">
                    <label>Сложность</label>
                    <input type="number" v-model="complexity"></input>
                </div>
                <div class="search-value">
                    <label>Категория</label>
                    <input type="number" v-model="categoryId"></input>
                </div>
                <div class="search-value">
                    <label>Популярность</label>
                    <input type="number" v-model="popularity"></input>
                </div>
                <div class="search-value">
                    <button v-on:click="store.search">Поиск</button>
                    <button v-on:click="store.clearSearch">Очистить</button>
                </div>
            </div>
        </div>
    </thead>
    <tr>
        <th>Наименование</th>
        <th>Сложность</th>
        <th>Категория</th>
        <th>Популярность</th>
    </tr>
    <tr v-for="item in items" v-bind:key="item.id" v-on:dblclick="(event) => showTask(item.id)">
        <td>{{ item.name }}</td>
        <td>{{ item.complexity }}</td>
        <td>{{ item.categoryId }}</td>
        <td>{{ item.popularity }}</td>
    </tr>
</table>
</template>

<style scoped>
    table{
        border: 10px black;
        width: 100%;
        height: 100%;
    }
    td{
        border: 1px black;
    }
    .search-value {
        display: flexbox;
    }
</style>