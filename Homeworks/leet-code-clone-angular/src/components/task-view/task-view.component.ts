import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskComplexity } from '../../models/Task';
import { delay, tags, tasks } from '../../utils';
import { CommonModule, JsonPipe } from '@angular/common';
import { Tag } from '../../models/Tag';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ){
    const taskId = Number(this.route.snapshot.paramMap.get("id"));
    this.model = tasks.find(x => x.id == taskId) ?? this.model;
  }
  model: Task = new Task(0, "", TaskComplexity.Middle);
  complexities: [string, TaskComplexity][] = Object.entries(TaskComplexity).filter(x => typeof(x[1]) === "number").map(x => [x[0], x[1] as TaskComplexity]);
  tags: Tag[] = tags;
  async save(){
    await delay();
    if (this.model.id == 0){
      this.model.id = tasks[tasks.length - 1].id + 1;
      tasks.push(this.model);
    }
    await this.router.navigate(["/tasks"]);
  }
}
