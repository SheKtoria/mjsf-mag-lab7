<template>
  <ul class="nav nav-tabs mb-4 pb-2" id="ex1" role="tablist">
    <li class="nav-item">
      <a class="nav-link task-nav-link active" @click="$emit('changeTab', 'All')">All</a>
    </li>
    <li class="nav-item">
      <a class="nav-link task-nav-link" @click="$emit('changeTab', 'Active')">Active</a>
    </li>
    <li class="nav-item">
      <a class="nav-link task-nav-link" @click="$emit('changeTab', 'Completed')">Completed</a>
    </li>
  </ul>
</template>

<script setup>
defineEmits(['changeTab'])
</script>

<style scoped>
.task-nav-link {
  cursor: pointer;
}
</style>
