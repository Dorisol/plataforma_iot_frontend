import type {Imagenes} from "../types/ImagenesInterface";

export const imagenes: Imagenes[] = [
    {
        idImagen: "img-001",
        idTenant: "tenant-001",
        idDispositivo: "raspberry-001",
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        capturedAt: new Date(Date.now() - 5 * 60 * 60000),
    },
    {
        idImagen: "img-002",
        idTenant: "tenant-001",
        idDispositivo: "raspberry-001",
        url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400',
        capturedAt: new Date(Date.now() - 5 * 60 * 60000),
    },
    {
        idImagen: "img-003",
        idTenant: "tenant-001",
        idDispositivo: "raspberry-001",
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400',
        capturedAt: new Date(Date.now() - 5 * 60 * 60000),
    },

    /*
    {
        idImagen: "img-003",
        idTenant: "tenant-001",
        idDispositivo: "nordic-001",
        url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400',
        capturedAt: new Date(Date.now() - 5 * 60 * 60000),
    },
    {
        idImagen: "img-004",
        idTenant: "tenant-001",
        idDispositivo: "nordic-001",
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400',
        capturedAt: new Date(Date.now() - 5 * 60 * 60000),
    },*/

]