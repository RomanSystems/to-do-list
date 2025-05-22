import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';
import {TaskService} from '../../../core/services/task.service';
import {TaskModel} from '../../../core/models/task.model';
import {TaskItemComponent} from '../task-item/task-item.component';
import {MatAnchor} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-task-detail',
  imports: [
    TaskItemComponent,
    RouterLink,
    RouterLinkActive,
    MatAnchor,
    MatIcon
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  task!: TaskModel;
  id!: number;
  taskService = inject(TaskService);
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTask(this.id);
  }
}
