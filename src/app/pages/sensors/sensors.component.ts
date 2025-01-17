import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { tap } from 'rxjs';
import { Sensor } from '../../data/sensor.interface';
import { PaginationComponent } from '../../common-ui/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sensors',
  standalone: true,
  imports: [PaginationComponent, CommonModule, RouterModule],
  templateUrl: './sensors.component.html',
  styleUrl: './sensors.component.scss'
})
export class SensorsComponent implements OnInit {

  baseUrl : string = ''
  currentPage!: number

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute){
      }
      data: Sensor[] = []
  ngOnInit(): void {


        this.baseUrl= this.router.url.split("?")[0]

        this.route.queryParams.subscribe((params:Params)=>{
          this.currentPage = Number(params['page'] || '1')
          
          this.authService.getSensors(this.currentPage).pipe(
            tap((response: Sensor[])=>{
              this.data = response
            })
        ).subscribe(); 
        })
  }
}
