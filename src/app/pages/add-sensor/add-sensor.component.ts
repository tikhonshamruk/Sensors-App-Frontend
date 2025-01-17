import { Sensor } from './../../data/sensor.interface';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-add-sensor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-sensor.component.html',
  styleUrl: './add-sensor.component.scss'
})
export class AddSensorComponent implements OnInit {
  data: Sensor[] = []; 
  selectedSensor: Sensor | null = null; // Выбранный сенсор
  inputValue: string = ''; 
  id?: number;
  sensorReadings: { sensor: number; readings: { reading_created_at: string; reading_temperature: number }[] }[] = [];
  myForm: FormGroup;

  constructor(private authService: AuthService) {
    this.myForm = new FormGroup({
      sensors: new FormControl(null, Validators.required),
      temp: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.authService.addSensors()
      .pipe(
        tap((response: Sensor[]) => {
          this.data = response;
        })
      )
      .subscribe();
  }

  onSensorSelect() {
    if (this.selectedSensor) {
      // Записываем имя выбранного сенсора в inputValue
      this.inputValue = `${this.selectedSensor.sensor_name} (${this.selectedSensor.sensor_id})`;
    } else {
      this.inputValue = '';
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      const formValue = this.myForm.value;

      // Извлекаем ID сенсора из строки
      const sensorIdMatch = formValue.sensors.match(/\((\d+)\)/);
      const sensorId = sensorIdMatch ? +sensorIdMatch[1] : null;

      if (sensorId) {
        // Создаем объект для добавления
        const newReading = {
          sensor: sensorId,
          readings: [
            {
              reading_created_at: formValue.date,
              reading_temperature: +formValue.temp,
            },
          ],
        };

        // Добавляем данные в массив
        this.sensorReadings.push(newReading);

        // Очищаем форму
        this.myForm.reset();
        this.inputValue = '';
        this.selectedSensor = null;
      }
    }
  }
}