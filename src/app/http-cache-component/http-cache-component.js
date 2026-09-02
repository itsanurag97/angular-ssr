import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonPlaceholderService } from '../features/services/external-api-services/json-placeholder/json-placeholder.service';
let HttpCacheComponent = class HttpCacheComponent {
    jsonPlaceholderService = inject(JsonPlaceholderService);
    posts = [];
    ngOnInit() {
        this.getAllPosts();
    }
    getAllPosts() {
        this.jsonPlaceholderService.getAllPosts().subscribe({
            next: (data) => {
                this.posts = data;
            },
            error: (err) => {
                console.error('MNC Telemetry Error Log [HttpCacheComponent]:', err);
            }
        });
    }
    getPostById(id) {
        this.jsonPlaceholderService.getPostById(id).subscribe({
            next: (data) => {
                this.posts = [data];
            },
            error: (err) => {
                console.error('MNC Telemetry Error Log [HttpCacheComponent]:', err);
            }
        });
    }
};
HttpCacheComponent = __decorate([
    Component({
        selector: 'app-http-cache-component',
        standalone: true,
        imports: [CommonModule],
        templateUrl: './http-cache-component.html',
        styleUrl: './http-cache-component.scss',
    })
], HttpCacheComponent);
export { HttpCacheComponent };
// import { Component, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Post } from '../interface-component/common-model/post.model';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// @Component({
//   selector: 'app-http-cache-component',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './http-cache-component.html',
//   styleUrl: './http-cache-component.scss',
// })
// export class HttpCacheComponent {
//   posts$: Observable<Post[]> | null = null;
//   private http = inject(HttpClient);
//   // ngOnInit() {
//   //   this.getPosts();
//   //   this.loadUsers();
//   // }
//   getPosts() {
//     this.posts$ = this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
//   }
//   loadUsers() {
//     this.http.get('https://jsonplaceholder.typicode.com/users')
//       .subscribe(res => {
//         console.log('Response:', res);
//       }
//     );
//   }
// }
