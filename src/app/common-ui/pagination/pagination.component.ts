import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
   @Input() currentPage?: number
    @Input() url?: string

    pagesCount:number = 30;
    pages: number[] = [];
    ngOnInit(): void {
      for (let i = 1; i <= this.pagesCount; i++) {
        this.pages.push(i);
      }
      console.log('currentPage', this.currentPage)
    }
}
