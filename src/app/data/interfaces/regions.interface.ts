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
