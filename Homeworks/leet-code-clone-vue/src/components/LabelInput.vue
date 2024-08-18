<!-- <script setup lang="ts">
// import { InputTypeHTMLAttribute } from 'vue';
import vue from 'vue';

interface LabelInputProps{
    text: string;
    type: vue.InputTypeHTMLAttribute;
    model: any;
}
const props = defineProps<LabelInputProps>();
</script>

<template>
    <div>
        <label>{{ props.text }}</label>
        <input v-bind:type="props.type" v-model="props.model"></input>
    </div>
</template>

<style scoped>
</style> -->