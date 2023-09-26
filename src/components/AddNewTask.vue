<template>
  <div class="d-flex mb-4">
    <div class="form-outline flex-fill">
      <input v-model="taskName" type="text" id="add-task-form" class="form-control" placeholder="New task..."/>
    </div>
    <button type="submit" @click="taskName.length > 0 ? $emit('addTask', taskName) : ''" class="btn btn-info ms-2">Add
    </button>
  </div>
</template>

<script setup>
defineProps({
  tasks: Array,
});
defineEmits(['addTask'])
const taskName = '';
</script>

<style scoped>
.btn-info {
  color: white;
}
</style>