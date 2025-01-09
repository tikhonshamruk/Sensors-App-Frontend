import { Region, RegionsInterface } from './../../data/interfaces/regions.interface';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { catchError, tap } from 'rxjs';
import { RegionCardComponent } from '../../common-ui/region-card/region-card.component';


@Component({
  selector: 'app-regions',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLink,RegionCardComponent],
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.scss'
})
export class RegionsComponent implements OnInit{
    constructor(private authService: AuthService){
    }
 
    data: Region[] = []
ngOnInit(): void {
    console.log('all here be')
    this.authService.getRegions().pipe(
        tap((response: RegionsInterface)=>{
            this.data = response.regions
        })
    ).subscribe(); 
}
}
