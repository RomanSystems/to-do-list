import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaskListComponentComponent} from './task-list-component/task-list-component.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskListComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'to-do-list';
}
