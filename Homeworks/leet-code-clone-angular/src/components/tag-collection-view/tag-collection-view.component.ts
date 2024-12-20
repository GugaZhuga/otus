import { Component } from '@angular/core';
import { delay, tags } from '../../utils';
import { Tag } from '../../models/Tag.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag-collection-view',
  standalone: true,
  imports: [],
  templateUrl: './tag-collection-view.component.html',
  styleUrl: './tag-collection-view.component.css'
})
export class TagCollectionViewComponent {
  constructor(
    private readonly router: Router
  ){

  }
  tags: Tag[] = tags;
  selectedTag: Tag|null = tags.at(0) ?? null;
  selectTag(tag: Tag){
    this.selectedTag = tag;
  }
  add(): void{
    this.router.navigate(["/tags", 0]);
  }
  edit(): void{
    if (this.selectedTag == null)
      return;
    this.router.navigate(["tags", this.selectedTag.id]);
  }
  remove(): void{
    if (this.selectedTag == null)
      return;
    const index = this.tags.indexOf(this.selectedTag);
    this.tags.splice(index);
  }
  async save(): Promise<void>{
    await delay();
  }
}
