export class TaskModel{
    id: number;
    todo: string;
    date: Date;
    time: string;
    completed: boolean;

    constructor(id: number, todo: string, date: Date, time: string, completed: boolean){
        this.id = id;
        this.todo = todo;
        this.date = date;
        this.time = time;
        this.completed = completed;
    }
}
