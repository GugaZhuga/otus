import { Routes } from '@angular/router';
import { TaskCollectionViewComponent } from '../components/task-collection-view/task-collection-view.component';
import { UserCollectionViewComponent } from '../components/user-collection-view/user-collection-view.component';
import { TagCollectionViewComponent } from '../components/tag-collection-view/tag-collection-view.component';
import { TaskViewComponent } from '../components/task-view/task-view.component';
import { UserViewComponent } from '../components/user-view/user-view.component';
import { TagViewComponent } from '../components/tag-view/tag-view.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';

export const routes: Routes = [
    {
        path: "",
        component: TaskCollectionViewComponent,
    },
    {
        path: "tasks",
        component: TaskCollectionViewComponent,
    },
    {
        path: "users",
        component: UserCollectionViewComponent,
    },
    {
        path: "tags",
        component: TagCollectionViewComponent,
    },
    {
        path: "tasks/:id",
        component: TaskViewComponent,
    },
    {
        path: "users/:id",
        component: UserViewComponent,
    },
    {
        path: "tags/:id",
        component: TagViewComponent,
    },
    {
        path: "**",
        component: NotfoundComponent,
    },
];
