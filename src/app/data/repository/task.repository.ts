import { Injectable } from '@angular/core';
import {TaskModel} from '../../core/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskRepository{
  localKey: string = "task-list";
  localKeyYest: string = "task-list-yesterday";
  /*https://dummyjson.com/todos*/
  fer: any = {
    "todos": [
      {
        "id": 1,
        "todo": "Do something nice for someone you care about",
        "completed": false,
        "userId": 152
      }, {
        "id": 2, "todo": "Memorize a poem", "completed": true, "userId": 13
      }, {
        "id": 3,
        "todo": "Watch a classic movie",
        "completed": true,
        "userId": 68
      }, {
        "id": 4, "todo": "Watch a documentary", "completed": false, "userId": 84
      }, {
        "id": 5,
        "todo": "Invest in cryptocurrency",
        "completed": false,
        "userId": 163
      }, {
        "id": 6,
        "todo": "Contribute code or a monetary donation to an open-source software project",
        "completed": false,
        "userId": 69
      }, {"id": 7, "todo": "Solve a Rubik's cube", "completed": true, "userId": 76}, {
        "id": 8,
        "todo": "Bake pastries for yourself and neighbor",
        "completed": true,
        "userId": 198
      }, {"id": 9, "todo": "Go see a Broadway production", "completed": false, "userId": 7}, {
        "id": 10,
        "todo": "Write a thank you letter to an influential person in your life",
        "completed": true,
        "userId": 9
      }, {"id": 11, "todo": "Invite some friends over for a game night", "completed": false, "userId": 104}, {
        "id": 12,
        "todo": "Have a football scrimmage with some friends",
        "completed": false,
        "userId": 32
      }, {
        "id": 13,
        "todo": "Text a friend you haven't talked to in a long time",
        "completed": true,
        "userId": 2
      }, {"id": 14, "todo": "Organize pantry", "completed": false, "userId": 46}, {
        "id": 15,
        "todo": "Buy a new house decoration",
        "completed": true,
        "userId": 105
      }, {"id": 16, "todo": "Plan a vacation you've always wanted to take", "completed": true, "userId": 162}, {
        "id": 17,
        "todo": "Clean out car",
        "completed": false,
        "userId": 71
      }, {"id": 18, "todo": "Draw and color a Mandala", "completed": true, "userId": 6}, {
        "id": 19,
        "todo": "Create a cookbook with favorite recipes",
        "completed": true,
        "userId": 53
      }, {"id": 20, "todo": "Bake a pie with some friends", "completed": false, "userId": 162}, {
        "id": 21,
        "todo": "Create a compost pile",
        "completed": false,
        "userId": 13
      }, {"id": 22, "todo": "Take a hike at a local park", "completed": true, "userId": 37}, {
        "id": 23,
        "todo": "Take a class at local community center that interests you",
        "completed": true,
        "userId": 65
      }, {"id": 24, "todo": "Research a topic interested in", "completed": true, "userId": 130}, {
        "id": 25,
        "todo": "Plan a trip to another country",
        "completed": false,
        "userId": 140
      }, {"id": 26, "todo": "Improve touch typing", "completed": false, "userId": 178}, {
        "id": 27,
        "todo": "Learn Express.js",
        "completed": false,
        "userId": 194
      }, {"id": 28, "todo": "Learn calligraphy", "completed": false, "userId": 80}, {
        "id": 29,
        "todo": "Have a photo session with some friends",
        "completed": true,
        "userId": 91
      }, {"id": 30, "todo": "Go to the gym", "completed": true, "userId": 142}], "total": 254, "skip": 0, "limit": 30
  };
  tasksTodays: any = [
    {id: 7, todo: 'Abrir Power Point', date: new Date(), time: "02:30 PM", completed: true},
    {id: 6, todo: 'Instalar Angular', date: new Date(), time: "02:35 PM", completed: true},
    {id: 5, todo: 'Instalar Angular Material', date: new Date(), time: "03:05 PM", completed: false},
    {id: 4, todo: 'Sacar Captura de instalacion', date: new Date(), time: "04:30 PM", completed: false},
  ];

  taskYesterdays: any = [
    {id: 3, todo: 'Desayunar', date: '2025-05-01', time: "06:30 AM", completed: true},
    {id: 2, todo: 'Asearse', date: '2025-05-01', time: "06:55 AM", completed: true},
    {id: 1, todo: 'Ir al trabajo', date: '2025-05-01', time: "07:15 AM", completed: true},
  ]

  chargeInitialization(): void{
    // supongase que cambiamos de proveedr de datos de Postgres a MongoDB
    this.storeTask(this.tasksTodays);
    this.storeTaskYes(this.taskYesterdays);
  }

  getTasks(): TaskModel[] {
    const data = localStorage.getItem(this.localKey);
    return data ? JSON.parse(data) : [];
  }

  storeTask(cart: TaskModel[]) {
    localStorage.setItem(this.localKey, JSON.stringify(cart));
  }

  getTasksYes(): TaskModel[] {
    const data = localStorage.getItem(this.localKeyYest);
    return data ? JSON.parse(data) : [];
  }

  storeTaskYes(cart: TaskModel[]) {
    localStorage.setItem(this.localKeyYest, JSON.stringify(cart));
  }
}
