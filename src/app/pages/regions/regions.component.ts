import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-regions',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLink],
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.scss'
})
export class RegionsComponent implements OnInit{
    // data: RegionsInterface[] =[]

    constructor(private authService: AuthService){

    }
   items = [{
    region_id: "1",
    region_name: "western europe"
},
{
    region_id: "2",
    region_name: "eastern europe"
},
{
    region_id: "3",
    region_name: "northern europe"
},
{
    region_id: "4",
    region_name: "southern europe"
}]
ngOnInit(): void {
    console.log('all here be')
    this.authService.regions()
}
}
