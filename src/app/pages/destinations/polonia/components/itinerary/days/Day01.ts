export const day01Polonia = {
  borderClass: 'border-red',
  day: {
    title: 'Día 01 - VUELO: Madrid → Varsovia y paseo nocturno',
    activities: [
      {
        name: 'Vuelo Madrid T4 → Varsovia (WAW)',
        description: '<strong>Salimos desde la Terminal 4 del aeropuerto de Madrid-Barajas</strong> con destino al <strong>aeropuerto de Varsovia-Chopin (WAW)</strong>. El vuelo tiene una duración aproximada de <strong>3h 30min</strong>. Una vez en tierra, el trayecto al centro de Varsovia es rápido y cómodo, ya sea en tren (SKM/KML, unos 20 minutos hasta Warszawa Centralna) o en autobús urbano.<br><br>Llegamos por la tarde-noche, dejamos las maletas en el alojamiento y nos preparamos para un primer contacto con la ciudad antes de dormir.',
        images: [],
        longitude: -3.5670382667894565,
        latitude: 40.49456065157009,
        mapUrl: '',
        arriveBy: 'plane' as const,
      },
      {
        name: 'Aeropuerto de Varsovia-Chopin (WAW)',
        description: '<strong>Horario de llegada:</strong> Tarde-noche del viernes.<br><strong>Transporte al centro:</strong> Tren SKM/KML (~4,40 PLN / ~1 €) o autobús 175/188.<br><br>El aeropuerto de Varsovia-Chopin es el principal aeropuerto de Polonia y está a solo <strong>10 km del centro</strong>. El tren es la opción más rápida: la línea SKM o KML conecta con <strong>Warszawa Centralna</strong> en unos 20 minutos. Si llegáis muy tarde, también hay taxis y servicios de Bolt/Uber a precios muy razonables (unos 30-40 PLN al centro).',
        images: [],
        longitude: 20.9679,
        latitude: 52.1657,
        mapUrl: '',
        arriveBy: 'plane' as const,
      },
      {
        name: 'Paseo nocturno por Varsovia',
        description: '<strong>Primer contacto con la ciudad iluminada.</strong> Después de dejar las cosas en el alojamiento, salimos a dar un paseo relajado por el centro de Varsovia. La Ciudad Vieja y la Plaza del Castillo tienen un encanto especial por la noche, con las fachadas iluminadas y mucha menos gente que durante el día.<br><br>Es un paseo sin pretensiones, simplemente para estirar las piernas tras el vuelo, hacernos una primera idea de la escala de la ciudad y cenar algo en algún sitio cercano. Mañana arrancamos el itinerario de verdad con el free tour.',
        images: [],
        longitude: 21.01199,
        latitude: 52.249477,
        mapUrl: '',
        arriveBy: 'metro' as const,
      },
    ]
  }
};
