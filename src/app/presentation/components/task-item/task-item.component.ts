import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TaskModel} from '../../../core/models/task.model';

@Component({
  selector: 'app-task-item',
  imports: [MatSlideToggleModule, MatCard, MatCardHeader, MatCardContent,
    MatCardActions, MatIcon, MatButtonModule, MatCheckboxModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {
  @Input() task!: TaskModel;

  @Output() checked = new EventEmitter<any>();
  @Output() editor = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  checkedTask(checked: boolean, task: TaskModel) {
    console.log(checked)
    this.checked.emit({task: task, checked: checked});
  }

  editTask(task: TaskModel) {
    this.editor.emit({task: task});
  }

  deleteTask(task: TaskModel) {
    this.delete.emit({task: task});
  }
}
