<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">

        <div class="card">
          <div class="card-body p-5">
            <AddNewTask @add-task="addTask" :tasks="tasks"/>
            <TasksNavigation @change-tab="changeTab"/>
            <TasksList @change-status="changeStatus" :tasks="tasks" :tab="tab" @remove-task="removeTask"/>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import AddNewTask from "./AddNewTask.vue";
import TasksNavigation from "./TasksNavigation.vue";
import TasksList from "./TasksList.vue";

export default {
  name: 'TaskPage',
  components: {TasksList, TasksNavigation, AddNewTask},
  data() {
    return {
      tasks: [],
      tab: 'All'
    }
  },
  methods: {
    addTask(task) {
      const id = this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 0;
      const existTask = this.tasks.find(el => el.title === task);
      if (!existTask) {
        this.tasks.push({'type': 'Active', 'title': task, 'id': id})
      }
    },

    changeStatus(id) {
      let task = this.tasks.find(el => el.id === id)
      if (task) {
        if (task.type === 'Active') {
          task.type = 'Completed'
        } else {
          task.type = 'Active'
        }
      }
    },

    changeTab(title) {
      const tabs = document.querySelectorAll('.task-nav-link');
      tabs.forEach(clickedTab =>{
        clickedTab.addEventListener('click', (e) => {
          tabs.forEach( tab => {
            tab.classList.remove('active');
          });
          e.target.classList.add('active');
        });
      });

      this.tab = title;
    },

    removeTask(id) {
      this.tasks = this.tasks.filter(el => el.id !== id)
    }
  }
}

</script>
