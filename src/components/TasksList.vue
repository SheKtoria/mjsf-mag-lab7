<template>
  <div class="tab-content">
    <div class="tab-pane fade show active">
      <ul class="list-group mb-0" v-for="task in tasks">
        <li v-if="tab !== 'All' ? task.type === tab : true"
            class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
            style="background-color: #f4f6f7;">
          <input class="form-check-input me-2" type="checkbox" @change="$emit('changeStatus',task.id)"
                 :checked="task.type !== 'Active'" aria-label="..."/>
          <div class="d-flex justify-content-between vw-100">
            <span :style="task.type !== 'Active'? {'text-decoration': 'line-through'}: ''">{{ task.title }}</span>
            <button type="button" class="btn-close" @click="$emit('removeTask',task.id)" aria-label="Close"></button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tasks: Array,
  tab: String
});
defineEmits(['removeTask', 'changeStatus'])
</script>
