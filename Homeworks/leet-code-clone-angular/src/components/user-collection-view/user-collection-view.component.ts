import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/User.model';
import { delay, users } from '../../utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-collection-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-collection-view.component.html',
  styleUrl: './user-collection-view.component.css'
})
export class UserCollectionViewComponent {
  constructor(
    private readonly router: Router
  ){
    this.selectedUser = users.at(0) ?? this.selectedUser;
  }
  users: User[] = users;
  selectedUser : User|null = null;
  selectUser(user: User|null): void{
    this.selectedUser = user;
  }
  add(): void{
    this.router.navigate(["/users", 0]);
  }
  edit(): void{
    if (this.selectedUser == null)
      return;
    this.router.navigate(["/users", this.selectedUser.id]);
  }
  remove(): void{
    if (this.selectedUser == null)
      return;
    const index = this.users.indexOf(this.selectedUser);
    this.users.splice(index);
  }
  async save(): Promise<void>{
    await delay();
  }
}
