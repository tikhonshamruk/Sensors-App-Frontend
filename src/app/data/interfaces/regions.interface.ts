export interface RegionsInterface{
   regions: Region[]
}

export interface Region{
    region_id: number,
    region_name: string
}

export interface SensorsInterface{
    sensors: Sensor[],
    region_id: number
}

export interface Sensor{
    sensor_id: number, 
    sensor_name: string, 
    sensor_longitude: number, 
    sensor_latitude: number
}

export interface Read{
    readings: Readings[],
    sensor_id: number, 
    temperature_min: number, 
    temperature_avg: number, 
    temperature_max: number
}

export interface Readings{
    reading_temperature: number, 
    reading_created_at: string
}