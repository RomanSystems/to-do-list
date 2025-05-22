import {TaskItemComponent} from '../task-item/task-item.component';
import {Component, inject, model, OnInit, signal} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {TaskModel} from '../../../core/models/task.model';
import {TaskRepository} from '../../../data/repository/task.repository';
import {TaskService} from '../../../core/services/task.service';

import {FormsModule} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {DialogOverviewExampleDialog} from '../dialog-overview/dialog-overview-example-dialog';

@Component({
  selector: 'app-task-list',
  imports: [
    MatSlideToggleModule, MatIcon, MatButtonModule, TaskItemComponent,
    MatFormFieldModule, MatInputModule, FormsModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  /* para el modal de dialog */
  readonly todo_m = signal('');
  readonly taskId_m = signal(0);
  readonly userId_m = model(0);
  readonly dialog = inject(MatDialog);

  taskRepository = inject(TaskRepository);
  taskService = inject(TaskService);

  tasksTodayOk: TaskModel[] = new Array<TaskModel>();
  tasksTodayNo: TaskModel[] = new Array<TaskModel>();
  taskYesterdayOk: TaskModel[] = new Array<TaskModel>();
  taskYesterdayNo: TaskModel[] = new Array<TaskModel>();

  refreshData() {
    this.tasksTodayOk = this.taskRepository.getTasks()?.filter((it: TaskModel) => it.completed);
    this.tasksTodayNo = this.taskRepository.getTasks()?.filter((it: TaskModel) => !it.completed);
    this.taskYesterdayOk = this.taskRepository.getTasksYes()?.filter((it: TaskModel) => it.completed);
    this.taskYesterdayNo = this.taskRepository.getTasksYes()?.filter((it: TaskModel) => !it.completed);
  }

  ngOnInit() {
    this.taskRepository.chargeInitialization();
    this.refreshData();
  }

  onCheckedTask(colera: any) {
    let task = colera.task;
    task.completed = colera.checked;
    // enviar a modificar tarea completada de hoy en local storage
    this.taskService.editCheckTask(task);
    console.log(task);
    this.refreshData();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {taskId_m: this.taskId_m(), todo_m: this.todo_m()},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.todo_m.set(result);
        if(this.taskId_m() > 0){
          if(window.confirm("Estas seguro de editar?")) {
            this.taskService.updateTask(this.taskId_m(), this.todo_m());
          }
        }
        else{
          let nuevaTarea = {
            id: 0,
            todo: result,
            date: new Date(),
            time: new Date().getTime().toString(),
            completed: false
          }
          this.taskService.addTaskToList(nuevaTarea);
        }
        this.refreshData();
      }
      this.todo_m.set('');
      this.userId_m.set(0);
    });
  }

  onEditTaskDialog(data: any){
    let taski = this.taskService.getTask(data.task.id);
    this.todo_m.set(taski.todo);
    this.taskId_m.set(taski.id);
    this.openDialog();
  }

  onDeleteTask(data: any) {
    if(window.confirm("Estas seguro?")){
      this.taskService.removeTaskFromList(data.task.id);
      this.refreshData();
    }
  }
}


