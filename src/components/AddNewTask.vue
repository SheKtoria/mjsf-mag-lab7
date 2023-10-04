<template>
  <div class="d-flex mb-4">
    <div class="form-outline flex-fill">
      <input v-model="model.title" type="text" id="add-task-form" class="form-control" placeholder="New task..."/>
    </div>
    <button type="submit" @click="model.title ? $emit('addTask') : ''" class="btn btn-info ms-2">Add
    </button>
  </div>
</template>

<script setup>
import {Task} from "../models/task.js";

defineProps({
  model: Task,
});
defineEmits(['addTask'])
</script>

<style scoped>
.btn-info {
  color: white;
}
</style>