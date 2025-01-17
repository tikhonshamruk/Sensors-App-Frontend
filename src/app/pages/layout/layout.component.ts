import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../../auth/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;


  
  token:string 

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {
    if (this.authService.token === null) {
      console.log('this token',this.authService.token)
      throw new Error('Token is null');
    }
    this.token = this.authService.token;
  }


  ngOnInit(): void {
      Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const ctx = this.myChart.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Не удалось получить контекст canvas');
      return;
    }
  }

  onLogout(){
    this.authService.logOut(this.token).pipe(
            tap((response)=>{
                this.router.navigate(['/login'])
            })
        ).subscribe(); 
  }
}
