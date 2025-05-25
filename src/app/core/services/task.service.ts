import {inject, Injectable} from '@angular/core';
import {TaskRepository} from '../../data/repository/task.repository';
import {TaskModel} from '../models/task.model';
import {TaskApiRepository} from '../../data/repository/tak.api.repository';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskRepository = inject(TaskRepository);
  taskApiRepository = inject(TaskApiRepository);

  /*chargeInitialization(){
    let datos = this.getTasks();
    this.taskRepository.chargeInitialization();
  }*/

  // get all
  getTasks(): Observable<any> {
    return this.taskApiRepository.getItems();
    /*return this.taskRepository.getTasks();*/
  }

  getTasksYes(): TaskModel[] {
    return this.taskRepository.getTasksYes();
  }

  // get task by id
  getTask(id: number): TaskModel {
    let list = this.taskRepository.getTasks();
    console.log(list);
    console.log(id);
    var s = list.filter((item, index) => item.id === id)[0];
    console.log(s);
    return list.filter((item) => item.id === id)[0];
  }

  // store data
  addTaskToList(task: TaskModel): void {
    let lista = this.taskRepository.getTasks();
    let maz = lista.reduce((max, p) => p.id > max ? p.id : max, 0);
    task.id = maz + 1;
    let renewLista = [...lista, task];
    this.taskRepository.storeTask(renewLista);
  }

  // update with path
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

  // update
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

  // delete
  removeTaskFromList(taskId: number): void {
    let lista = this.taskRepository.getTasks();
    let newLista = lista.filter((item: TaskModel) => item.id !== taskId);
    this.taskRepository.storeTask(newLista);
  }
}
