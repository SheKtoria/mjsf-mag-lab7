<template>
  <div class="tab-content">
    <div class="tab-pane fade show active">
      <ul class="list-group mb-0" v-for="task in tasks">
        <li v-if="tab !== 'All' ? task.type === tab : true"
            class="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
            style="background-color: #f4f6f7;">
          <div class="d-flex flex-column">
          <div class="d-flex">
          <input class="form-check-input me-2" type="checkbox" @change="$emit('changeStatus',task.id)"
                 :checked="task.type !== 'Active'" aria-label="..."/>
          <span :style="task.type !== 'Active'? {'text-decoration': 'line-through'}: ''">{{ task.title }}</span>
          </div>
          <div :id="'edit-task-' + task.id" class="w-75 edit-task-form">
              <div class="form-group">
                <input v-model="editedTask.title" type="text" class="form-control" id="task-title"
                       aria-describedby="emailHelp">
              </div>
              <button type="submit" class="btn btn-primary" @click="$emit('submit', task.id)"
                      :disabled="!editedTask.title">Submit
              </button>
            </div>
          </div>
          <div class="d-flex">
            <button type="button" class="btn h-25 edit-btn" @click="$emit('updateTask',task)" aria-label="Edit">✎</button>
            <span type="button" class="btn h-25" @click="$emit('removeTask',task.id)" aria-label="Close">x</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tasks: Array,
  tab: String,
  editedTask: Object
});
defineEmits(['removeTask', 'updateTask', 'submit', 'changeStatus'])
</script>

<style scoped>
.edit-task-form {
  display: none;

  &.open {
    display: flex !important;
    align-items: center;
  }
}

.edit-btn {
  font-size: 20px;
}
</style>
