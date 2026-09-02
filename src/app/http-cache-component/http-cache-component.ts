import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonPlaceholderService } from '../features/services/external-api-services/json-placeholder/json-placeholder.service';
import { Post } from '../features/services/external-api-services/models/json-placeholder.model';
import { App } from '../app';
import { features } from 'process';

@Component({
  selector: 'app-http-cache-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './http-cache-component.html',
  styleUrl: './http-cache-component.scss',
})
export class HttpCacheComponent implements OnInit {
  private jsonPlaceholderService = inject(JsonPlaceholderService);

  posts: Post[] = []; 

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.jsonPlaceholderService.getAllPosts().subscribe({
      next: (data: Post[]) => {
        this.posts = data;
      },
      error: (err: any) => {
        console.error('MNC Telemetry Error Log [HttpCacheComponent]:', err);
      }
    });
  }

  getPostById(id: number): void {
    this.jsonPlaceholderService.getPostById(id).subscribe({
      next: (data: Post) => {
        this.posts = [data];
      },
      error: (err: any) => {
        console.error('MNC Telemetry Error Log [HttpCacheComponent]:', err);
      }
    });
  }
}



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

