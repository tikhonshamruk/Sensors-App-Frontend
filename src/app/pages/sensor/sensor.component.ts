// import { CommonModule } from '@angular/common';
// import { Component, inject, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { AuthService } from '../../auth/auth.service';
// import { tap } from 'rxjs';
// import { Read, Readings } from '../../data/interfaces/regions.interface';
// import { Chart, registerables } from 'chart.js';

// @Component({
//   selector: 'app-sensor',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './sensor.component.html',
//   styleUrl: './sensor.component.scss'
// })
// export class SensorComponent implements OnInit{

//   param: string = ''
//   data ?: Readings[]
//   temperature_avg ?:number
//   temperature_min ?:number 
//   temperature_max ?:number 

//   route = inject(ActivatedRoute)
//   authServer = inject(AuthService)

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.param = params['id']
//     })

//     this.authServer.getSensor(this.param).pipe(
//                 tap((response: Read)=>{
//                   this.data = response.readings
//                   this.temperature_avg = response.temperature_avg
//                   this.temperature_max = response.temperature_max
//                   this.temperature_min = response.temperature_min
//                 })
//             ).subscribe(); 
//   }
// }
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { tap } from 'rxjs';
import { Read, Readings } from '../../data/interfaces/regions.interface';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-sensor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sensor.component.html',
  styleUrl: './sensor.component.scss',
})
export class SensorComponent implements OnInit {
  param: string = '';
  data?: Readings[];
  temperature_avg?: number;
  temperature_min?: number;
  temperature_max?: number;

  route = inject(ActivatedRoute);
  authServer = inject(AuthService);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.param = params['id'];
    });

    this.authServer
      .getSensor(this.param)
      .pipe(
        tap((response: Read) => {
          this.data = response.readings;
          this.temperature_avg = response.temperature_avg;
          this.temperature_max = response.temperature_max;
          this.temperature_min = response.temperature_min;

          // Создаем график после получения данных
          this.createChart();
        })
      )
      .subscribe();
  }

  createChart() {
    if (!this.data) return;

    // Подготавливаем данные для графика
    const labels = this.data.map((reading) =>
      new Date(reading.reading_created_at).toLocaleDateString()
    );
    const temperatures = this.data.map((reading) => reading.reading_temperature);

    // Создаем график
    const ctx = document.getElementById('temperatureChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', // Тип графика (линейный)
      data: {
        labels: labels, // Ось X: даты
        datasets: [
          {
            label: 'Temperature (°C)', // Подпись для данных
            data: temperatures, // Ось Y: температура
            borderColor: 'rgba(75, 192, 192, 1)', // Цвет линии
            borderWidth: 2,
            fill: false, // Не заполнять область под линией
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date', // Подпись оси X
            },
          },
          y: {
            title: {
              display: true,
              text: 'Temperature (°C)', // Подпись оси Y
            },
          },
        },
      },
    });
  }
}