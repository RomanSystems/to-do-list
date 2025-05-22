import {inject, Injectable} from '@angular/core';
import {TaskRepository} from '../../data/repository/task.repository';
import {TaskModel} from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskRepository = inject(TaskRepository);

  editCheckTask(task: TaskModel): void {
    let lista = this.taskRepository.getTasks();
    let renewLista = lista.filter(function (item: TaskModel) {
      if (item.id === task.id) {
        item.completed = task.completed;
      }
      return item;
    });
    this.taskRepository.storeTask(renewLista);
  }

  addTaskToList(task: TaskModel): void {
    let lista = this.taskRepository.getTasks();
    let maz = lista.reduce((max, p) => p.id > max ? p.id : max, 0);
    task.id = maz + 1;
    let renewLista = [...lista, task];
    this.taskRepository.storeTask(renewLista);
  }

  getTask(id: number): TaskModel {
    let list = this.taskRepository.getTasks();
    console.log(list);
    console.log(id);
    var s = list.filter((item, index) => item.id === id)[0];
    console.log(s);
    return list.filter((item) => item.id === id)[0];
  }

  updateTask(id: number, todo: string): void {
    let lista = this.taskRepository.getTasks();
    let renewLista = lista.filter(function (item: TaskModel) {
      if (item.id === id) {
        item.todo = todo;
      }
      return item;
    });
    this.taskRepository.storeTask(renewLista);
  }

  removeTaskFromList(taskId: number): void {
    let lista = this.taskRepository.getTasks();
    let newLista = lista.filter((item: TaskModel) => item.id !== taskId);
    this.taskRepository.storeTask(newLista);
  }
}
