export interface Mediciones {
    idMedicion: string;
    idTenant: string;
    idDispositivo: string;
    variable: "temperatura" | "humedad";
    val: number;
    unit: string;
    metadata_medicion: {
        device: string;
    };
    recorded_at: string;
}
