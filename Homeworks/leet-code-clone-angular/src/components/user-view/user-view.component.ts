import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserLevel } from '../../models/User';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { delay, users } from '../../utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ){
    const userId = Number(this.route.snapshot.paramMap.get("id"));
    this.model = users.find(x => x.id == userId) ?? this.model;
  }
  model: User = new User();
  levels: [string, UserLevel][] = Object.entries(UserLevel).filter(x => typeof(x[1]) === "number").map(x => [x[0], x[1] as UserLevel]);
  async save(){
    await delay();
    if (this.model.id == 0){
      this.model.id = users[users.length - 1].id + 1;
      users.push(this.model);
    }
    await this.router.navigate(["/users"]);
  }
}
