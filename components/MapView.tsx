'use client';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import { LOCATION } from '@/lib/data';
import { useEffect } from 'react';

function FixIcon(){
 useEffect(()=>{(L.Icon.Default.prototype as any)._getIconUrl=undefined; L.Icon.Default.mergeOptions({iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'});},[]); return null;
}
export default function MapView(){
 return <div className="map-shell"><MapContainer center={[LOCATION.lat,LOCATION.lng]} zoom={17} scrollWheelZoom>
   <FixIcon/>
   <LayersControl position="topright">
    <LayersControl.BaseLayer checked name="Straßenkarte"><TileLayer attribution='&copy; OpenStreetMap contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/></LayersControl.BaseLayer>
    <LayersControl.BaseLayer name="Satellit"><TileLayer attribution='Tiles &copy; Esri' url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/></LayersControl.BaseLayer>
    <LayersControl.BaseLayer name="Hybrid"><><TileLayer attribution='Tiles &copy; Esri' url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/><TileLayer attribution='&copy; OpenStreetMap contributors' opacity={0.75} url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/></></LayersControl.BaseLayer>
   </LayersControl>
   <Marker position={[LOCATION.lat,LOCATION.lng]}><Popup><strong>Letzter bekannter Standort</strong><br/>{LOCATION.address}<br/>28.09.2026 · 21:37:33</Popup></Marker>
  </MapContainer><div className="map-overlay"><strong>Standortinformationen</strong><p><b>Adresse:</b><br/>{LOCATION.address}</p><p><b>Koordinaten:</b> {LOCATION.lat}, {LOCATION.lng}</p><p><b>Status:</b> Aktueller Standort nicht verfügbar · letzter bekannter Standort markiert</p></div></div>
}
