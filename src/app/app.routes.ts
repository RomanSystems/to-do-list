import { Routes } from '@angular/router';
import {TaskListComponent} from './presentation/components/task-list/task-list.component';
import {TaskDetailComponent} from './presentation/components/task-detail/task-detail.component';

export const routes: Routes = [
  {
    path: '', component: TaskListComponent, title: 'Lista tareas'
  },
  {
    path: 'detail/:id', component: TaskDetailComponent, title: 'Detalle Tarea'
  }
];
