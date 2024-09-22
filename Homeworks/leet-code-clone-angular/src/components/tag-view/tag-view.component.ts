import { Component } from '@angular/core';
import { Tag } from '../../models/Tag';
import { delay, tags } from '../../utils';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tag-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tag-view.component.html',
  styleUrl: './tag-view.component.css'
})
export class TagViewComponent {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ){
    const tagId = Number(route.snapshot.paramMap.get("id"));
    this.model = tags.find(x => x.id == tagId) ?? this.model;
  }
  model: Tag = new Tag();
  async save(){
    await delay();
    if (this.model.id == 0){
      this.model.id = tags[tags.length - 1].id + 1;
      tags.push(this.model);
    }
    this.router.navigate(["/tags"]);
  }
}
