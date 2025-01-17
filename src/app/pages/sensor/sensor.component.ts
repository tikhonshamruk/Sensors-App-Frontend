import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { tap } from 'rxjs';
import { Read, Readings } from '../../data/interfaces/regions.interface';
import { Chart, registerables } from 'chart.js';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-sensor',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './sensor.component.html',
//   styleUrl: './sensor.component.scss',
// })
// export class SensorComponent implements OnInit {
//   param: string = '';
//   data?: Readings[];
//   temperature_avg?: number;
//   temperature_min?: number;
//   temperature_max?: number;

//   route = inject(ActivatedRoute);
//   authServer = inject(AuthService);

//   router: Router = inject(Router)


//   myForm: FormGroup
//   constructor(private authService: AuthService){
//       this.myForm = new FormGroup({
//         start: new FormControl(null, Validators.required),
//         end: new FormControl(null, Validators.required)
//       })
//     }

//   ngOnInit(): void {
//     this.route.params.subscribe((params) => {
//       this.param = params['id'];
//     });

//     this.authServer
//       .getSensor(this.param)
//       .pipe(
//         tap((response: Read) => {
//           this.data = response.readings;
//           this.temperature_avg = response.temperature_avg;
//           this.temperature_max = response.temperature_max;
//           this.temperature_min = response.temperature_min;

//           // Создаем график после получения данных
//           this.createChart();
//         })
//       )
//       .subscribe();
//   }

//   onSubmit(){
//     if(this.myForm.valid){
//       console.log(this.myForm.value)
//       this.authService.getChangeSensor(this.param,this.myForm.value.start, this.myForm.value.end).pipe(
//         tap((response: Read) => {
//           this.data = response.readings;
//           this.temperature_avg = response.temperature_avg;
//           this.temperature_max = response.temperature_max;
//           this.temperature_min = response.temperature_min;

//           // Создаем график после получения данных
//           this.createChart();
//         })
//       )
//       .subscribe();
//     }
//   }

//   createChart() {
//     if (!this.data) return;

//     // Подготавливаем данные для графика
//     const labels = this.data.map((reading) =>
//       new Date(reading.reading_created_at).toLocaleDateString()
//     );
//     const temperatures = this.data.map((reading) => reading.reading_temperature);

//     // Создаем график
//     const ctx = document.getElementById('temperatureChart') as HTMLCanvasElement;
//     new Chart(ctx, {
//       type: 'line', // Тип графика (линейный)
//       data: {
//         labels: labels, // Ось X: даты
//         datasets: [
//           {
//             label: 'Temperature (°C)', // Подпись для данных
//             data: temperatures, // Ось Y: температура
//             borderColor: 'rgba(75, 192, 192, 1)', // Цвет линии
//             borderWidth: 2,
//             fill: false, // Не заполнять область под линией
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         scales: {
//           x: {
//             title: {
//               display: true,
//               text: 'Date', // Подпись оси X
//             },
//           },
//           y: {
//             title: {
//               display: true,
//               text: 'Temperature (°C)', // Подпись оси Y
//             },
//           },
//         },
//       },
//     });
//   }
// }

// @Component({
//   selector: 'app-sensor',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './sensor.component.html',
//   styleUrl: './sensor.component.scss',
// })
// export class SensorComponent implements OnInit {
//   param: string = '';
//   data?: Readings[];
//   temperature_avg?: number;
//   temperature_min?: number;
//   temperature_max?: number;

//   route = inject(ActivatedRoute);
//   authServer = inject(AuthService);
//   router: Router = inject(Router);

//   myForm: FormGroup;
//   private temperatureChart?: Chart; // Ссылка на текущий график

//   constructor(private authService: AuthService) {
//     this.myForm = new FormGroup({
//       start: new FormControl(null, Validators.required),
//       end: new FormControl(null, Validators.required),
//     });
//   }

//   ngOnInit(): void {
//     this.route.params.subscribe((params) => {
//       this.param = params['id'];
//     });

//     this.fetchData();
//   }
  

//   fetchData() {
//     this.authServer
//       .getSensor(this.param)
//       .pipe(
//         tap((response: Read) => {
//           this.data = response.readings;
//           this.temperature_avg = response.temperature_avg;
//           this.temperature_max = response.temperature_max;
//           this.temperature_min = response.temperature_min;

//           // Создаем график после получения данных
//           this.createChart();
//         })
//       )
//       .subscribe();
//   }

//   onSubmit() {
//     if (this.myForm.valid) {
//       console.log(this.myForm.value);
//       this.authService
//         .getChangeSensor(this.param, this.myForm.value.start, this.myForm.value.end)
//         .pipe(
//           tap((response: Read) => {
//             this.data = response.readings;
//             this.temperature_avg = response.temperature_avg;
//             this.temperature_max = response.temperature_max;
//             this.temperature_min = response.temperature_min;

//             // Уничтожаем старый график, если он существует
//             if (this.temperatureChart) {
//               this.temperatureChart.destroy();
//             }

//             // Создаем новый график
//             this.createChart();
//           })
//         )
//         .subscribe();
//     }
//   }

//   createChart() {
//     if (!this.data) return;

//     // Подготавливаем данные для графика
//     const labels = this.data.map((reading) =>
//       new Date(reading.reading_created_at).toLocaleDateString()
//     );
//     const temperatures = this.data.map((reading) => reading.reading_temperature);

//     // Создаем график
//     const ctx = document.getElementById('temperatureChart') as HTMLCanvasElement;
//     this.temperatureChart = new Chart(ctx, {
//       type: 'line', // Тип графика (линейный)
//       data: {
//         labels: labels, // Ось X: даты
//         datasets: [
//           {
//             label: 'Temperature (°C)', // Подпись для данных
//             data: temperatures, // Ось Y: температура
//             borderColor: 'rgba(75, 192, 192, 1)', // Цвет линии
//             borderWidth: 2,
//             fill: false, // Не заполнять область под линией
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         scales: {
//           x: {
//             title: {
//               display: true,
//               text: 'Date', // Подпись оси X
//             },
//           },
//           y: {
//             title: {
//               display: true,
//               text: 'Temperature (°C)', // Подпись оси Y
//             },
//           },
//         },
//       },
//     });
//   }
// }

@Component({
  selector: 'app-sensor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  router: Router = inject(Router);

  myForm: FormGroup;
  private temperatureChart?: Chart; // Ссылка на текущий график

  constructor(private authService: AuthService) {
    this.myForm = new FormGroup({
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.param = params['id'];
    });

    this.fetchData();
  }

  // Метод для обновления данных
  refreshData() {
    this.fetchData();
  }

  fetchData() {
    this.authServer
      .getSensor(this.param)
      .pipe(
        tap((response: Read) => {
          this.data = response.readings;
          this.temperature_avg = response.temperature_avg;
          this.temperature_max = response.temperature_max;
          this.temperature_min = response.temperature_min;

          // Уничтожаем старый график, если он существует
          if (this.temperatureChart) {
            this.temperatureChart.destroy();
          }

          // Создаем новый график
          this.createChart();
        })
      )
      .subscribe();
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      this.authService
        .getChangeSensor(this.param, this.myForm.value.start, this.myForm.value.end)
        .pipe(
          tap((response: Read) => {
            this.data = response.readings;
            this.temperature_avg = response.temperature_avg;
            this.temperature_max = response.temperature_max;
            this.temperature_min = response.temperature_min;

            // Уничтожаем старый график, если он существует
            if (this.temperatureChart) {
              this.temperatureChart.destroy();
            }

            // Создаем новый график
            this.createChart();
          })
        )
        .subscribe();
    }
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
    this.temperatureChart = new Chart(ctx, {
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