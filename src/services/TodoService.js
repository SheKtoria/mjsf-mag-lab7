import {TodoLocalStorageRepository} from "../repositories/todo";

export class TodoService {
    repo;

    constructor() {
        this.repo = new TodoLocalStorageRepository();
    }

    __getItems() {
        return this.repo.__getItems()
    }

    save(model) {
        return this.repo.save(model)
    }

    delete(id) {
        return this.repo.delete(id)
    }

    update(model) {
        return this.repo.update(model)
    }

    find(id) {
        return this.repo.find(id)
    }

    fetch() {
        return this.repo.fetch()
    }
}