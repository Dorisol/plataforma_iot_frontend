import { useState } from "react";
import type { Dispositivo } from "../../types/DispositivoInterface";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import {
    Clock,
    Thermometer,
    Droplets,
    Zap,
    Loader2,
    AlertCircle,
} from "lucide-react";
import {
    ResponsiveContainer,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Area,
} from "recharts";
import { useMediciones } from "../../hooks/useMediciones";

interface VistaMetricasProps {
    dispositivo: Dispositivo;
}

export function VistaMetricas({ dispositivo }: VistaMetricasProps) {
    // Estados independientes para cada gráfica
    const [rangoTemp, setRangoTemp] = useState<"24h" | "7d">("7d");
    const [rangoHum, setRangoHum] = useState<"24h" | "7d">("7d");
    const [rangoVolt, setRangoVolt] = useState<"24h" | "7d">("7d");
    const [rangoAmp, setRangoAmp] = useState<"24h" | "7d">("7d");


    // Consultas independientes al servidor
    const { mediciones: medicionesTemp, loading: loadingTemp, error: errorTemp } = useMediciones(
        dispositivo.idDispositivo,
        dispositivo.idTenant,
        rangoTemp,
    );

    const { mediciones: medicionesHum, loading: loadingHum, error: errorHum } = useMediciones(
        dispositivo.idDispositivo,
        dispositivo.idTenant,
        rangoHum,
    );

    const { mediciones: medicionesVoltaje, loading: loadingVoltaje, error: errorVoltaje} = useMediciones(
        dispositivo.idDispositivo,
        dispositivo.idTenant,
        rangoVolt,
    );

    const { mediciones: medicionesCorriente, loading: loadingCorriente, error: errorCorriente} = useMediciones(
        dispositivo.idDispositivo,
        dispositivo.idTenant,
        rangoAmp,
    );

    // Procesamiento de datos por separado
    const datosTemp = medicionesTemp
    .filter((m) => m.variable === "temperatura")
    .map((m) => {
        const fecha = new Date(m.recorded_at);
        return {
            tiempo: format(fecha, rangoTemp === "24h" ? "HH:mm" : "dd/MM HH:mm", {
                locale: es,
            }),
            temperatura: m.val
        };
    });

    const datosHum = medicionesHum
    .filter((m) => m.variable === "humedad")
    .map((m) => {
        const fecha = new Date(m.recorded_at);
        return {
            tiempo: format(fecha, rangoHum === "24h" ? "HH:mm" : "dd/MM HH:mm", {
                locale: es,
            }),
            humedad: m.val
            
        };
    });

    const datosVoltaje = medicionesVoltaje
    .filter((m) => m.variable === "voltaje_dc")
    .map((m) => {
        const fecha = new Date(m.recorded_at);
        return {
            tiempo: format(fecha, rangoVolt === "24h" ? "HH:mm" : "dd/MM HH:mm", {
                locale: es,
            }),
            voltaje: m.val
            
        };
    });

    const datosCorriente = medicionesCorriente
    .filter((m) => m.variable === "corriente_dc")
    .map((m) => {
        const fecha = new Date(m.recorded_at);
        return {
            tiempo: format(fecha, rangoVolt === "24h" ? "HH:mm" : "dd/MM HH:mm", {
                locale: es,
            }),
            corriente: m.val
            
        };
    });

    //saber el total de variables que vamos a tener
    const cantVariables = [
        true, 
        true,
        datosVoltaje.length>0 ? true : false,
        datosCorriente.length>0 ? true : false
    ].filter(Boolean).length;

    //total columnas 
    const columnasGrid = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4"
    }[cantVariables] || "grid-cols-2";




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
                    <p className="text-sm">Este dispositivo no está enviando datos</p>
                </div>
            </div>
        );
    }

    if (loadingTemp || loadingHum) {
        return (
            <div className="bg-white border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px]">
                <Loader2 className="w-8 h-8 animate-spin text-green-600 mb-2" />
                <p className="text-gray-500">Cargando datos del servidor...</p>
            </div>
        );
    }

    if (errorTemp || errorHum) {
        return (
            <div className="bg-white border-red-200 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] border">
                <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                <p className="text-red-600 font-medium">
                    {errorTemp || errorHum || "Error al cargar datos"}
                </p>
            </div>
        );
    }

    if (medicionesTemp.length === 0 && medicionesHum.length === 0) {
        return (
            <div className="bg-white border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px]">
                <Droplets className="w-8 h-8 text-gray-300 mb-2" />
                <p className="text-gray-500">
                    No hay datos disponibles para este dispositivo
                </p>
            </div>
        );
    }

    // Buscar el ultimo valor registrado para cada variable en el array
    const ultimaTemperatura = datosTemp.length>0 ? datosTemp[datosTemp.length-1].temperatura : "--";
    const ultimaHumedad = datosHum.length>0 ? datosHum[datosHum.length-1].humedad : "--";
    const ultimoVoltaje= datosVoltaje.length>0 ? datosVoltaje[datosVoltaje.length-1].voltaje : "--";
    const ultimaCorriente= datosCorriente.length>0 ? datosCorriente[datosCorriente.length-1].corriente : "--";

    // contenido principal
    return (
        <div className="space-y-6">
            {/* datos actuales */}
            <div className={`grid gap-4 justify-between ${columnasGrid}`}>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-orange-500 p-3 rounded-lg">
                            <Thermometer className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-orange-900 font-medium">
                                Temperatura actual
                            </p>
                        </div>
                    </div>
                    <div className="text-5xl font-bold text-orange-900">
                        {ultimaTemperatura ?? "--"}°C
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-500 p-3 rounded-lg">
                            <Droplets className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-900 font-medium">
                                Humedad actual
                            </p>
                        </div>
                    </div>
                    <div className="text-5xl font-bold text-blue-900">
                        {ultimaHumedad ?? "--"}%
                    </div>
                </div>

                {datosVoltaje.length>0 && (
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-500 p-3 rounded-lg">
                            <Droplets className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-900 font-medium">
                                Voltaje actual
                            </p>
                        </div>
                    </div>
                    <div className="text-5xl font-bold text-blue-900">
                        {ultimoVoltaje ?? "--"}V
                    </div>
                </div>
                )
                }

                {datosCorriente.length>0 && (
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-500 p-3 rounded-lg">
                            <Droplets className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-900 font-medium">
                                Voltaje actual
                            </p>
                        </div>
                    </div>
                    <div className="text-5xl font-bold text-blue-900">
                        {ultimaCorriente ?? "--"}?
                    </div>
                </div>
                )
                }

            </div>

            {/* grafica temperatura */}
            <div className="bg-white border-gray-200 rounded-2xl p-8">
                <div className="col justify-between flex items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Temperatura - {" "}
                        {rangoTemp === "24h" ? "Últimas 24 horas" : "Última semana"}
                     </h3>

                    <div className="flex justify-end">
                        <div className="inline-flex bg-gray-200 p-1 rounded-xl shadow-inner">
                            <button
                                onClick={() => setRangoTemp('24h')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                                    rangoTemp === '24h' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                24 Horas
                            </button>
                            <button
                                onClick={() => setRangoTemp('7d')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                                    rangoTemp === '7d' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                1 Semana
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={datosTemp}>
                            <defs>
                                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray={"3 3"} stroke="#e5e7eb" />
                            <XAxis
                                dataKey={"tiempo"}
                                stroke="#6b7280"
                                tick={{ fontSize: 12 }}
                                tickLine={{ stroke: "#6b7280" }}
                            />

                            <YAxis
                                stroke="#6b7280"
                                tick={{ fontSize: 12 }}
                                tickLine={{ stroke: "#6b7280" }}
                                domain={["dataMin-2", "dataMax+2"]}
                                unit="°C"
                            />

                            <Tooltip
                                contentStyle={{
                                    background: "white",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "8px",
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
            </div>

            {/* grafica Humedad */}
            <div className="bg-white border-gray-200 rounded-2xl p-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Humedad -{" "}
                        {rangoHum === "24h" ? "Últimas 24 horas" : "Última semana"}
                    </h3>

                    <div className="flex justify-end">
                        <div className="inline-flex bg-gray-200 p-1 rounded-xl shadow-inner">
                            <button
                                onClick={() => setRangoHum('24h')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                                    rangoHum === '24h' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                24 Horas
                            </button>
                            <button
                                onClick={() => setRangoHum('7d')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                                    rangoHum === '7d' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                1 Semana
                            </button>
                        </div>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={datosHum}>
                        <defs>
                            <linearGradient id="colorHumedad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray={"3 3"} stroke="#e5e7eb" />
                        <XAxis
                            dataKey={"tiempo"}
                            stroke="#6b7280"
                            tick={{ fontSize: 12 }}
                            tickLine={{ stroke: "#6b7280" }}
                        />

                        <YAxis
                            stroke="#6b7280"
                            tick={{ fontSize: 12 }}
                            tickLine={{ stroke: "#6b7280" }}
                            domain={["dataMin-5", "dataMax+5"]}
                            unit="%"
                        />

                        <Tooltip
                            contentStyle={{
                                background: "white",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
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

            {datosVoltaje.length>0 ? (
                <h1>Hola</h1>
            ):(
                <h1>No hay datos disponibles de voltaje</h1>
            )
            }




        </div>
    );
}
