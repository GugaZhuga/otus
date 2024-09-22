import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskComplexity } from '../../models/Task';
import { Tag } from '../../models/Tag';
import { delay, tags, tasks } from '../../utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-collection-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-collection-view.component.html',
  styleUrl: './task-collection-view.component.css'
})
export class TaskCollectionViewComponent {
  constructor(
    private readonly router: Router
  ){
    this.selectedTask = tasks.at(0) ?? this.selectedTask;
  }
  tasks: Task[] = tasks;
  selectedTask: Task|null = null;
  selectTask(task: Task|null){
    this.selectedTask = task;
    console.log(task);
  }
  tags: Map<number, Tag> = new Map<number, Tag>(tags.map(x => [x.id, x]));
  getTagsLine(tagIds: number[]){
    return tagIds.map(x => tags[x].name).join(", ");
  }
  getComplexityLine(complexity: TaskComplexity){
    return Object.entries(TaskComplexity).find(x => typeof(x[1]) === "number" && x[1] === complexity)?.[0];
  }
  add() {
    this.router.navigate(["/tasks", 0]);
  }
  edit(){
    if (this.selectedTask == null)
      return;
    this.router.navigate(["tasks", this.selectedTask.id])
  }
  remove(){
    if (this.selectedTask == null)
      return;
    const index = this.tasks.indexOf(this.selectedTask);
    this.tasks.splice(index);
  }
  async save(){
    await delay();
  }
}
