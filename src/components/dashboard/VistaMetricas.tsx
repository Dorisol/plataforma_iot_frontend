import type { Dispositivo } from "../../types/DispositivoInterface";
import { es } from "date-fns/locale"
import { format } from "date-fns";
import { Clock, Thermometer, Droplets, Loader2, AlertCircle } from "lucide-react";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts";
import { useMediciones } from "../../hooks/useMediciones";

interface VistaMetricasProps {
    dispositivo: Dispositivo
}

export function VistaMetricas({ dispositivo }: VistaMetricasProps) {
    const { mediciones, loading, error } = useMediciones(dispositivo.idDispositivo, dispositivo.idTenant);

    // datos para la gráfica
    const datosGrafica = mediciones.map((m) => ({
        tiempo: format(new Date(m.recorded_at), 'HH:mm', { locale: es }),
        temperatura: m.variable === "temperatura" ? m.val : null,
        humedad: m.variable === "humedad" ? m.val : null
    }));

    if (dispositivo.isActivo === false) {
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

    if (loading) {
        return (
            <div className="bg-white border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px]">
                <Loader2 className="w-8 h-8 animate-spin text-green-600 mb-2" />
                <p className="text-gray-500">Cargando datos del servidor...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white border-red-200 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] border">
                <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                <p className="text-red-600 font-medium">{error || "Error al cargar datos"}</p>
            </div>
        );
    }

    if (mediciones.length === 0) {
        return (
            <div className="bg-white border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px]">
                <Droplets className="w-8 h-8 text-gray-300 mb-2" />
                <p className="text-gray-500">No hay datos disponibles para este dispositivo</p>
            </div>
        );
    }

    // Buscamos el último valor registrado para cada variable en el array
    const ultimaTemperatura = [...mediciones].reverse().find(m => m.variable === "temperatura")?.val;
    const ultimaHumedad = [...mediciones].reverse().find(m => m.variable === "humedad")?.val;


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
                        {ultimaTemperatura ?? '--'}°C
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
                        {ultimaHumedad ?? '--'}%
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