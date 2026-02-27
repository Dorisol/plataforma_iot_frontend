import type { Dispositivo } from "../../types/DispositivoInterface";
import { generarDatosSensores } from "../../helpers/helpers";
import { es } from "date-fns/locale"
import { useMemo } from "react";
import { format } from "date-fns";
import { Clock, Thermometer, Droplets } from "lucide-react";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts";

interface VistaMetricasProps {
    dispositivo: Dispositivo
}

export function VistaMetricas({ dispositivo }: VistaMetricasProps) {
    //generar datos de sensores.
    const sensorDatos = useMemo(() => generarDatosSensores(dispositivo.idDispositivo), [dispositivo.idDispositivo]);

    //obtener el ultimo dato (sensor)
    const ultimoDato = sensorDatos[sensorDatos.length - 1]

    //datos para la gráfica
    const datosGrafica = sensorDatos.map((dato) => ({
        tiempo: format(dato.timestamp, 'HH:mm', { locale: es }),
        temperatura: dato.temperatura,
        humedad: dato.humedad
    }));

    //si dispositivo está desactivado, mostrar mensaje
    if (dispositivo.status === "OFF") {
        return (
            <div className="bg-white border-gray-200 rounded-2xl p-8">
                <div className="text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-medium text-gray-900 mb-2">
                        Dispositivo fuera de línea
                    </h3>
                    <p className="text-sm">
                        Este dispositivo no está enviando datos
                    </p>
                </div>
            </div>
        );
    }

    // contenido principal
    return (
        <div className="space-y-6">
            {/* datos actuales */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-orange-500 p-3 rounded-lg">
                            <Thermometer className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-orange-900 font-medium">Temperatura actual</p>
                        </div>
                    </div>
                    <div className="text-5xl font-bold text-orange-900">
                        {ultimoDato.temperatura}°C
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-500 p-3 rounded-lg">
                            <Droplets className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-900 font-medium">Humedad actual</p>
                        </div>
                    </div>
                    <div className="text-5xl font-bold text-blue-900">
                        {ultimoDato.humedad}%
                    </div>
                </div>
            </div>

            {/* grafica temperatura */}
            <div className="bg-white border-gray-200 rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Temperatura - Últimas 24 horas
                </h3>

                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={datosGrafica}>
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                            </linearGradient>    
                        </defs>
                        <CartesianGrid strokeDasharray={"3 3"} stroke="#e5e7eb"/>
                            <XAxis
                            dataKey={"tiempo"}
                            stroke="#6b7280"
                            tick={{fontSize:12}}
                            tickLine={{stroke:"#6b7280"}}
                            />

                            <YAxis
                            stroke="#6b7280"
                            tick={{fontSize:12}}
                            tickLine={{stroke:"#6b7280"}}
                            domain={['dataMin-2', 'dataMax+2']}
                            unit="°C"
                            />

                            <Tooltip 
                            contentStyle={{
                                background: 'white',
                                border:'1px solid #e5e7eb',
                                borderRadius: '8px'
                            }}
                            />

                            <Area
                            type="monotone"
                            dataKey="temperatura"
                            stroke="#f97316"
                            strokeWidth={2}
                            fill="url(#colorTemp)"
                            />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* grafica Humedad */}
            <div className="bg-white border-gray-200 rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Humedad - Últimas 24 horas
                </h3>

                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={datosGrafica}>
                        <defs>
                            <linearGradient id="colorHumedad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>    
                        </defs>
                        <CartesianGrid strokeDasharray={"3 3"} stroke="#e5e7eb"/>
                            <XAxis
                            dataKey={"tiempo"}
                            stroke="#6b7280"
                            tick={{fontSize:12}}
                            tickLine={{stroke:"#6b7280"}}
                            />

                            <YAxis
                            stroke="#6b7280"
                            tick={{fontSize:12}}
                            tickLine={{stroke:"#6b7280"}}
                            domain={['dataMin-5', 'dataMax+5']}
                            unit="%"
                            />

                            <Tooltip 
                            contentStyle={{
                                background: 'white',
                                border:'1px solid #e5e7eb',
                                borderRadius: '8px'
                            }}
                            />

                            <Area
                            type="monotone"
                            dataKey="humedad"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fill="url(#colorHumedad)"
                            />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )

}