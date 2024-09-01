import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Task, TaskComplexity } from "@/models/Task";
import { getTasks, users } from "@/assets/data";
export const useTaskCollectionStore = defineStore("task-collection-store", () => {
    const items = ref<Task[]>([]);
    async function load() {
        items.value = await getTasks().then(x => x.filter(y => (!hasName.value || y.name === name.value)
            && (!hasComplexity.value || y.complexity === complexity.value)
            && (!hasCategoryId.value || y.categoryId === categoryId.value)
            && (!hasPopularity.value || y.popularity === popularity.value)));
    };
    const name = ref<string|null>(null);
    const complexity = ref<TaskComplexity|null>(null);
    const categoryId = ref<number|null>(null);
    const popularity = ref<number|null>(null);
    const hasName = computed(() => name.value != null && name.value != "");
    const hasComplexity = computed(() => complexity.value != null);
    const hasCategoryId = computed(() => categoryId.value != null && categoryId.value > 0);
    const hasPopularity = computed(() => popularity.value != null && popularity.value > 0);
    async function search() {
        await load();
    };
    async function clearSearch(){
        name.value = null;
        complexity.value = null;
        categoryId.value = null;
        popularity.value = null;
        await search();
    }
    return { items, load, search, clearSearch, name, complexity, categoryId, popularity };
});