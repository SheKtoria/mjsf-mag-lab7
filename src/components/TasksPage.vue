<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">

        <div class="card">
          <div class="card-body p-5">
            <AddNewTask @add-task="addTask" :model="model"/>
            <TasksNavigation @change-tab="changeTab"/>
            <TasksList @change-status="changeStatus" :tasks="tasks" :tab="tab" :edited-task="editedTask" @update-task="updateTask" @submit="updateSubmit" @remove-task="removeTask"/>
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
import {Task} from "../models/task.js";

export default {
  name: 'TaskPage',
  components: {TasksList, TasksNavigation, AddNewTask},
  inject: ['services'],
  data() {
    return {
      tasks: [],
      model: new Task(),
      tab: 'All',
      editedTask: {},
      loading: false
    }
  },
  async mounted() {
    this.loading = true;
    this.tasks = await this.services.todo.fetch();
    this.loading = false;
  },

  methods: {
    addTask() {
        this.services.todo.save(this.model).then((res)=>{
          this.tasks.push(res)
          this.model = new Task();
        })
    },

    changeStatus(id) {
      let task = this.tasks.find(el => el.id === id)
      if (task) {
        if (task.type === Task.TS_ACTIVE) {
          task.type = Task.TS_COMPLETED
        } else {
          task.type = Task.TS_ACTIVE
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

    updateTask(item) {
      this.editedTask.title = item.title;
      this.editedTask.id = item.id;
      document.getElementById('edit-task-' + item.id).classList.toggle('open')
    },

    updateSubmit(id) {
      this.services.todo.update(this.editedTask).then((res) => {
        this.tasks = res;
        this.editedTask = {};
        this.model = new Task();
        document.getElementById('edit-task-' + id).classList.remove('open')
      })
    },

    removeTask(id) {
      this.services.todo.delete(id).then(()=>{
        this.tasks = this.tasks.filter(el => el.id !== id)
        this.model = new Task();
      })
    }
  }
}

</script>
