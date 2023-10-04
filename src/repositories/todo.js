import {ITodoRepository} from './ITodoRepository';

export class TodoLocalStorageRepository extends ITodoRepository {
  __getItems() {
    // localStorage.clear()
    return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem("todos")) : [];
  }

  save(model) {
    return new Promise((resolve) => {
      let items = this.__getItems();
      items.push(model);
      localStorage.setItem("todos", JSON.stringify(items));
      resolve(model);
    })
  }

  delete(id) {
    return new Promise((resolve) => {
      let items = this.__getItems();
      const res = items.filter((item) => {
        return item.id !== id
      });
      if (res.length > 0) {
        localStorage.setItem('todos', JSON.stringify(res))
        resolve(res);
      }
    })
  }

  update(model) {
    return new Promise((resolve) => {
      let items = this.__getItems();
      items.map((item) => {
        if (item.id === model.id ) {
          item.title = model.title;
          item.description = model.description
        }
      });
      localStorage.setItem('todos', JSON.stringify(items))
      resolve(items)
    })
  }

  find(id) {
    return new Promise((resolve) => {
      let items = this.__getItems();
      const res = items.filter((item) => {
        return item.id === id
      });
      if (res.length > 0) {
        return resolve(res[0]);
      }
      return resolve(null);
    })
  }

  fetch() {
    return new Promise((resolve) => {
      resolve(this.__getItems());
    })
  }
}
