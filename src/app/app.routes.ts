import { Routes } from '@angular/router';
import {TaskListComponent} from './presentation/components/task-list/task-list.component';

export const routes: Routes = [
  {
    path: '', component: TaskListComponent, title: 'Lista tareas'
  },
];
