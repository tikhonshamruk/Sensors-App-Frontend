import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Region } from '../../data/interfaces/regions.interface';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-region-card',
  standalone: true,
  imports: [],
  templateUrl: './region-card.component.html',
  styleUrl: './region-card.component.scss'
})
export class RegionCardComponent {
  @Input() region?: Region

  constructor(private router: Router) {}

  onButtonClick() {
    if (this.region) {
      this.router.navigate(['/region', this.region.region_id]); // Замените на нужный вам путь
    }
  }
}
