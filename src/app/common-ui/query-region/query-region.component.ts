import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { tap } from 'rxjs';
import { Sensor, SensorsInterface } from '../../data/interfaces/regions.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-query-region',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './query-region.component.html',
  styleUrl: './query-region.component.scss'
})
export class QueryRegionComponent implements OnInit {

  param: string = ''

  data: Sensor[] = []
  route = inject(ActivatedRoute)
   constructor(private authService: AuthService){
      }
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.param = params['id']
    })

    this.authService.getRegionById(this.param).pipe(
            tap((response: SensorsInterface)=>{
                this.data = response.sensors
            })
        ).subscribe(); 
  }
}
