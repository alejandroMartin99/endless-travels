/**
 * Copy editorial del road trip Noruega (julio 2022).
 * Generado para tono guía turística profesional.
 */
import { flamToGudvangenBoatPath } from './norge-boat-paths';
import { flamsbanaRoundTripPath } from './norge-train-paths';

export interface NorgeActivity {
  id: string;
  name: string;
  description: string;
  images: string[];
  longitude?: number;
  latitude?: number;
  arriveBy?: 'driving' | 'boat' | 'bus' | 'train' | 'lodging' | 'ruta';
  pathCoordinates?: Array<[number, number]>;
  /** Fuerza la distancia/tiempo del tramo (p. ej. rutas a pie medidas por sendero). */
  distanceKmOverride?: number;
  durationMinOverride?: number;
  /** Si true, tras la ruta a pie se vuelve al punto de partida (ida y vuelta). */
  roundTrip?: boolean;
}

export interface NorgeStop {
  id: string;
  name: string;
  dayLabel: string;
  longitude: number;
  latitude: number;
  summary: string;
  images: string[];
  activities: NorgeActivity[];
}

export interface NorgeTip {
  id: string;
  title: string;
  body: string;
}

export interface NorgeCost {
  id: string;
  category: string;
  label: string;
  amountHint: string;
  url?: string;
}

export interface NorgeStopLegView {
  fromStopId: string;
  toStopId: string;
  fromName: string;
  toName: string;
  distanceKm: number;
  durationMin: number;
  durationLabel: string;
}

export const norgeRoute = {
  title: 'Noruega: road trip por los fiordos',
  subtitle: 'Itinerario real · julio 2022 · de Oslo a los fiordos y vuelta',
  stops: [
    {
      id: 'Dia01',
      name: 'Hacia los fiordos',
      dayLabel: 'Día 01',
      longitude: 7.10293,
      latitude: 61.23122,
      summary:
        '<p>Dejamos la capital y cruzamos Hallingdal rumbo al oeste: ríos anchos, iglesias de madera y la sensación creciente de entrar en otra Noruega. La ruta es:</p>' +
        '<ul>' +
        '<li>Salida desde el Citybox de Oslo (~82 €)</li>' +
        '<li>El spot junto al lago en Vik</li>' +
        '<li>El valle de Hallingdal y Hemsedal</li>' +
        '<li>La milenaria iglesia de madera de Borgund</li>' +
        '<li>El pueblo fluvial de Lærdal</li>' +
        '<li>El cruce en ferry del Sognefjord hasta Sogndal</li>' +
        '<li>Terminamos en el Bed &amp; Breakfast a orillas del fiordo para dormir alli.</li>' +
        '</ul>' ,
      images: [
        '/assets/norge/Dia01/Dia01_portada.jpg',
        '/assets/norge/Dia01/01_vik/Dia01_01_vik_02.jpg',
      ],
      activities: [
        {
          id: 'dia01-start-oslo',
          name: 'Salida · Citybox Oslo',
          description: '',
          images: [],
          longitude: 10.74724,
          latitude: 59.91035,
        },
        {
          id: 'dia01-act01-honefoss',
          name: 'Vik',
          description:
            '<p>Paramos en <strong>Vik</strong> para comprar el desayuno en una gasolinera y, casi por casualidad, descubrimos un spot maravilloso junto al lago: una especie de pequeño puerto rodeado de paisajes completamente verdes.Fue una de esas paradas improvisadas que acaban valiendo la pena. La calma del agua, el verde intenso y el silencio hacían el sitio perfecto para desconectar unos minutos. Os recomendamos parar aquí y contemplarlo con calma antes de seguir ruta.</p>',
          images: [
            '/assets/norge/Dia01/01_vik/Dia01_01_vik_02.jpg',
            '/assets/norge/Dia01/01_vik/Dia01_01_vik_03.jpg',
            '/assets/norge/Dia01/01_vik/Dia01_01_vik_04.jpg',
            '/assets/norge/Dia01/01_vik/Dia01_01_vik_05.jpg',
            '/assets/norge/Dia01/01_vik/Dia01_01_vik_06.jpg',
            '/assets/norge/Dia01/01_vik/Dia01_01_vik_07.jpg',
            '/assets/norge/Dia01/01_vik/Dia01_01_vik_01.jpg',
          ],
          longitude: 10.28785,
          latitude: 60.08349,
          arriveBy: 'driving',
        },
        {
          id: 'dia01-act02-honefoss',
          name: 'Valle hacia Hallingdal',
          description:
            '<p>Seguimos el corredor hacia <strong>Hallingdal</strong>. La ciudad se disuelve del todo: granjas, bosques y esa luz limpia del interior noruego que hace que las fotos salgan casi solas.</p>' +
            '<p>Es un tramo de transición, pero no de aburrimiento. El coche marca el tempo; la carretera, el paisaje. Perfecto para ir entrando en el viaje sin prisa.</p>' +
            '<p>Si el día está claro, el contraste entre verde intenso y cielo pálido ya anticipa lo que vendrá al acercarnos a los fiordos.</p>',
          images: [
            '/assets/norge/Dia01/02_hallingdal/Dia01_02_hallingdal_01.jpg',
            '/assets/norge/Dia01/02_hallingdal/Dia01_02_hallingdal_02.jpg',
            '/assets/norge/Dia01/02_hallingdal/Dia01_02_hallingdal_03.jpg',
            '/assets/norge/Dia01/02_hallingdal/Dia01_02_hallingdal_04.jpg',
            '/assets/norge/Dia01/02_hallingdal/Dia01_02_hallingdal_05.jpg',
          ],
          longitude: 10.10274,
          latitude: 60.37676,
          arriveBy: 'driving',
        },
        {
          id: 'dia01-act03-gol',
          name: 'Fagernes',
          description:
            '<p>Paramos a comer en <strong>Fagernes</strong> y resultó ser un pueblo encantador, con muchísima vida. Además de recorrerlo, visitamos el lago/río que lo rodea, con puentes que conectan pequeñas islas que parecen mini archipiélagos dentro del agua.</p>' +
            '<p>Nos hizo un tiempo espectacular: había mucha gente tomando el sol en los jardines junto al lago, familias enteras disfrutando de la tarde. Un ambiente alegre y muy noruego.</p>' +
            '<p>Una parada perfecta para comer con calma, pasear junto al agua y empaparse del ritmo tranquilo de Valdres antes de seguir hacia los fiordos.</p>',
          images: [
            '/assets/norge/Dia01/03_fagernes/Dia01_03_fagernes_01.jpg',
            '/assets/norge/Dia01/03_fagernes/Dia01_03_fagernes_02.jpg',
            '/assets/norge/Dia01/03_fagernes/Dia01_03_fagernes_03.jpg',
            '/assets/norge/Dia01/03_fagernes/Dia01_03_fagernes_04.jpg',
            '/assets/norge/Dia01/03_fagernes/Dia01_03_fagernes_05.jpg',
            '/assets/norge/Dia01/03_fagernes/Dia01_03_fagernes_06.jpg',
            '/assets/norge/Dia01/03_fagernes/Dia01_03_fagernes_07.jpg',
            '/assets/norge/Dia01/03_fagernes/Dia01_03_fagernes_08.jpg',
            '/assets/norge/Dia01/03_fagernes/Dia01_03_fagernes_09.jpg',
            '/assets/norge/Dia01/03_fagernes/Dia01_03_fagernes_10.jpg',
            '/assets/norge/Dia01/03_fagernes/Dia01_03_fagernes_11.jpg',
            '/assets/norge/Dia01/03_fagernes/Dia01_03_fagernes_12.jpg',
            '/assets/norge/Dia01/04_fagernes/Dia01_04_fagernes_01.jpg',
            '/assets/norge/Dia01/04_fagernes/Dia01_04_fagernes_02.jpg',
            '/assets/norge/Dia01/04_fagernes/Dia01_04_fagernes_03.jpg',
            '/assets/norge/Dia01/04_fagernes/Dia01_04_fagernes_04.jpg',
            '/assets/norge/Dia01/04_fagernes/Dia01_04_fagernes_05.jpg',
          ],
          longitude: 9.2386,
          latitude: 60.9817,
          arriveBy: 'driving',
        },
        {
          id: 'dia01-act06-borgund-stavkirke',
          name: 'Borgund stavkirke',
          description:
            '<p>La <strong>stavkirke de Borgund</strong> (hacia 1180) es una de las iglesias de madera medievales mejor conservadas de Noruega y el prototipo que todo el mundo imagina: tejados a capas, cabezas de dragón y una silueta casi de cuento.</p>' +
            '<p>Se construyó como iglesia parroquial en el valle de Lærdal, en la época en que el cristianismo ya estaba asentado pero la tradición constructiva nórdica —madera, ensambles sin clavos modernos, ornamentación animal— seguía viva. Los dragones de los aleros no son “decoración turística”: evocan el arte vikingo tardío y la idea de proteger el edificio, como en las proas de los barcos.</p>' +
            '<p>Hoy funciona sobre todo como museo (hay una iglesia nueva al lado para el culto). Merece rodearla despacio: el silencio del bosque, el olor a madera y el contraste con la carretera moderna dan contexto al viaje de fiordos.</p>',
          images: [
            '/assets/norge/Dia01/06_borgund-stavkirke/Dia01_06_borgund-stavkirke_01.jpg',
            '/assets/norge/Dia01/06_borgund-stavkirke/Dia01_06_borgund-stavkirke_02.jpg',
            '/assets/norge/Dia01/06_borgund-stavkirke/Dia01_06_borgund-stavkirke_03.jpg',
            '/assets/norge/Dia01/06_borgund-stavkirke/Dia01_06_borgund-stavkirke_04.jpg',
            '/assets/norge/Dia01/06_borgund-stavkirke/Dia01_06_borgund-stavkirke_05.jpg',
          ],
          longitude: 7.81329,
          latitude: 61.04845,
          arriveBy: 'driving',
        },
        {
          id: 'dia01-act07-laerdal',
          name: 'Lærdal',
          description:
            '<p><strong>Lærdal</strong> es el corredor natural hacia los fiordos del Sogne: río, túneles legendarios y un valle que se estrecha hasta rozar la roca.</p>' +
            '<p>Aquí el día ya “huele” a agua. El paisaje deja de ser solo montaña y anticipa el encuentro con el fiordo.</p>' +
            '<p>Desde aquí el último empujón es hasta el alojamiento en Sogndal: mismo coche… y un cruce de fiordo con el vehículo a bordo.</p>',
          images: [
            '/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_02.jpg',
            '/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_03.jpg',
            '/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_04.jpg',
            '/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_05.jpg',
            '/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_06.jpg',
            '/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_07.jpg',
            '/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_08.jpg',
          ],
          longitude: 7.44094,
          latitude: 61.11834,
          arriveBy: 'driving',
        },
        {
          id: 'dia01-hotel-sogndal',
          name: 'Sogndal Bed & Breakfast',
          description:
            '<p>Llegada al <strong>Sogndal Bed & Breakfast</strong> (16–17 jul 2022, ~81 €), ya en la orilla del mundo de los fiordos.</p>' +
            '<p>El tramo desde Lærdal es todo en coche: en el camino <strong>cruzamos un brazo del Sognefjord</strong> —el coche se sube al ferry (Mannheller–Fodnes), avanza unos minutos sobre el agua y vuelve a rodar al desembarcar. No es un crucero aparte; es la carretera noruega hecha también de barcos.</p>' +
            '<p>La habitación es muy sencilla —una especie de residencia estudiantil—, pero para descansar es perfecta. Tras el ferry, ducha, cena sencilla y la satisfacción de haber atravesado Noruega de este a oeste en una sola jornada.</p>' +
            '<p><a href="https://www.booking.com/hotel/no/sogndal-vandrerhjem.es.html" target="_blank" rel="noopener">Ver alojamiento en Booking →</a></p>',
          images: [
            '/assets/norge/Dia01/08_sogndal/Dia01_08_sogndal_01.jpg',
            '/assets/norge/Dia01/08_sogndal/Dia01_08_sogndal_02.jpg',
          ],
          longitude: 7.10293,
          latitude: 61.23122,
          arriveBy: 'lodging',
        },
      ],
    },
    {
      id: 'Dia02',
      name: 'Briksdal y Nordfjord',
      dayLabel: 'Día 02',
      longitude: 7.10523,
      latitude: 60.85709,
      summary:
        '<p>Día de hielo y verticalidad: glaciar por la mañana, fiordo por la tarde y noche en Flåm. El contraste entre el blanco del hielo y el azul oscuro del agua es el alma de esta etapa. La ruta es:</p>' +
        '<ul>' +
        '<li>Salida desde Sogndal Bed &amp; Breakfast, justo donde cerró el Día 01: sin saltos en el mapa</li>' +
        '<li>El glaciar <strong>Briksdalsbreen</strong>, una de las lenguas más fotogénicas del Jostedalsbreen</li>' +
        '<li>La travesía a pie hasta el frente del hielo, entre cascadas y roca pulida</li>' +
        '<li>El mirador de <strong>Stegastein</strong>, asomado al Aurlandsfjord</li>' +
        '<li>Noche en Flåm, en el corazón de los fiordos</li>' +
        '</ul>',
      images: [
        '/assets/norge/Dia02/03_ruta_briksdalsbreen/Dia02_03_ruta_briksdalsbreen_01.jpg',
        '/assets/norge/Dia02/04_stegastein/Dia02_04_stegastein_01.jpg',
      ],
      activities: [
        {
          id: 'dia02-start-sogndal',
          name: 'Salida · Sogndal B&B',
          description: '',
          images: [],
          longitude: 7.10293,
          latitude: 61.23122,
        },
        {
          id: 'dia02-act01-laerdal',
          name: 'Lærdal',
          description:
            '<p>Volvemos a cruzar el corredor de <strong>Lærdal</strong>: río, túneles y el acceso hacia el norte de los fiordos. Es un tramo de enlace, pero el paisaje no se apaga.</p>' +
            '<p>La carretera anticipa el Nordfjord. Cada curva acerca un poco más la idea del glaciar: más verde, más pared, más sensación de valle profundo.</p>' +
            '<p>Buena zona para ajustar ritmo y disfrutar del asfalto noruego en su versión más espectacular.</p>',
          images: [
            '/assets/norge/Dia02/01_laerdal/Dia02_01_laerdal_01.jpg',
            '/assets/norge/Dia02/01_laerdal/Dia02_01_laerdal_02.jpg',
            '/assets/norge/Dia02/01_laerdal/Dia02_01_laerdal_03.jpg',
            '/assets/norge/Dia02/01_laerdal/Dia02_01_laerdal_04.jpg',
            '/assets/norge/Dia02/01_laerdal/Dia02_01_laerdal_05.jpg',
          ],
          longitude: 7.15319,
          latitude: 61.26505,
          arriveBy: 'driving',
        },
        {
          id: 'dia02-act02-briksdalsbreen',
          name: 'Briksdalsbreen',
          description:
            '<p>Llegamos al valle de <strong>Briksdal</strong> tras subir por el idílico Oldedalen. Aquí <strong>dejamos el coche en la plataforma de aparcamiento</strong>: desde este punto ya no se sigue en vehículo.</p>',
          images: [
            '/assets/norge/Dia02/02_briksdalsbreen/Dia02_02_briksdalsbreen_01.png',
            '/assets/norge/Dia02/02_briksdalsbreen/Dia02_02_briksdalsbreen_02.png',
          ],
          longitude: 7.235306547336803,
          latitude: 61.67197734554156,
          arriveBy: 'driving',
        },
        {
          id: 'dia02-ruta-briksdalsbreen',
          name: 'Ruta al Briksdalsbreen',
          description:
            '<p>El <strong>Briksdalsbreen</strong> es una lengua del <strong>Jostedalsbreen</strong>, el glaciar continental más grande de Europa continental: hielo que baja desde la meseta hasta el valle de Briksdal, con cascadas y roca pulida por milenios.</p>' +
            '<p>Los glaciares de esta zona son restos de la última glaciación; hoy retroceden con el clima más cálido, así que lo que ves no es “paisaje eterno”, sino un frente vivo que cambia de año en año.</p>' +
            '<p><strong>Ruta a pie de ~6 h</strong> (ida y vuelta) desde el aparcamiento hasta el frente del glaciar. No hace falta ser montañero, pero sí ir con tiempo y buen calzado.</p>' +
            '<p>Un tramo se puede hacer en <strong>barca</strong> por la laguna, pero los tramos finales son siempre andando. Nosotros hicimos <strong>toda la ida a pie</strong> y, para la vuelta, <strong>tomamos la barca en la parte final</strong>.</p>' +
            '<p>Recomendación: <strong>ropa ligera pero que abrigue</strong> —cerca del hielo refresca y suele haber humedad de las cascadas. Respeta las balizas: el frente puede soltar bloques.</p>',
          images: [
            '/assets/norge/Dia02/03_ruta_briksdalsbreen/Dia02_03_ruta_briksdalsbreen_01.jpg',
            '/assets/norge/Dia02/03_ruta_briksdalsbreen/Dia02_03_ruta_briksdalsbreen_02.jpg',
            '/assets/norge/Dia02/03_ruta_briksdalsbreen/Dia02_03_ruta_briksdalsbreen_03.jpg',
            '/assets/norge/Dia02/03_ruta_briksdalsbreen/Dia02_03_ruta_briksdalsbreen_04.jpg',
            '/assets/norge/Dia02/03_ruta_briksdalsbreen/Dia02_03_ruta_briksdalsbreen_05.jpg',
            '/assets/norge/Dia02/03_ruta_briksdalsbreen/Dia02_03_ruta_briksdalsbreen_06.jpg',
            '/assets/norge/Dia02/03_ruta_briksdalsbreen/Dia02_03_ruta_briksdalsbreen_07.jpg',
            '/assets/norge/Dia02/03_ruta_briksdalsbreen/Dia02_03_ruta_briksdalsbreen_08.jpg',
            '/assets/norge/Dia02/03_ruta_briksdalsbreen/Dia02_03_ruta_briksdalsbreen_09.jpg',
            '/assets/norge/Dia02/03_ruta_briksdalsbreen/Dia02_03_ruta_briksdalsbreen_10.jpg',
            '/assets/norge/Dia02/03_ruta_briksdalsbreen/Dia02_03_ruta_briksdalsbreen_11.jpg',
          ],
          longitude: 7.1526,
          latitude: 61.701,
          arriveBy: 'ruta',
          roundTrip: true,
          distanceKmOverride: 10,
          durationMinOverride: 360,
        },
        {
          id: 'dia02-act03-stegastein',
          name: 'Stegastein',
          description:
            '<p>De camino al mirador cruzamos el <strong>túnel de Lærdal</strong> (Lærdalstunnelen): con unos <strong>24,5 km</strong> es el <strong>túnel de carretera más largo del mundo</strong>. Tres “cavernas” iluminadas rompen la monotonía y ayudan a mantener la concentración bajo tierra.</p>' +
            '<p>El mirador de <strong>Stegastein</strong> se asoma al Aurlandsfjord con una pasarela de madera que parece flotar sobre el vacío. Es arquitectura y paisaje a la vez.</p>' +
            '<p>Desde aquí se lee la profundidad del fiordo: agua oscura, paredes verticales y granjas minúsculas pegadas a la ladera. Un cierre visual casi cinematográfico.</p>' +
            '<p>Bajamos hacia Flåm con la cabeza llena de azul y verde. Mañana toca agua otra vez… pero esta vez en barco por el Nærøyfjord.</p>',
          images: [
            '/assets/norge/Dia02/04_stegastein/Dia02_04_stegastein_01.jpg',
            '/assets/norge/Dia02/04_stegastein/Dia02_04_stegastein_02.jpg',
            '/assets/norge/Dia02/04_stegastein/Dia02_04_stegastein_03.jpg',
            '/assets/norge/Dia02/04_stegastein/Dia02_04_stegastein_04.jpg',
            '/assets/norge/Dia02/04_stegastein/Dia02_04_stegastein_05.jpg',
          ],
          longitude: 7.2119,
          latitude: 60.90864,
          arriveBy: 'driving',
        },
        {
          id: 'dia02-hotel-flam',
          name: 'Brekke Apartments',
          description:
            '<p>Noche en <strong>Brekke Apartments</strong> (<a href="https://www.booking.com/hotel/no/brekke-apartments.es.html" target="_blank" rel="noopener">Booking</a>, Flåm, 17–18 jul 2022, ~100 €): apartamento sencillo y práctico, a un paso del puerto y de la estación de la Flåmsbana.</p>' +
            '<p>Después de Stegastein, el fiordo queda literalmente a los pies. Ideal para cenar algo ligero, ducharse y cargar el cuerpo: el Día 03 es el de la gran navegación.</p>' +
            '<p>Dormir en Flåm es despertar ya dentro del escenario Unesco.</p>',
          images: [
            '/assets/norge/Dia02/05_flam/Dia02_05_flam_01.jpg',
            '/assets/norge/Dia02/05_flam/Dia02_05_flam_02.jpg',
            '/assets/norge/Dia02/05_flam/Dia02_05_flam_03.jpg',
          ],
          longitude: 7.10523,
          latitude: 60.85709,
          arriveBy: 'lodging',
        },
      ],
    },
    {
      id: 'Dia03',
      name: 'Flam → Bergen',
      dayLabel: 'Día 03',
      longitude: 5.33776,
      latitude: 60.37584,
      summary:
        '<p>El día más “de catálogo” del viaje… y también el más real: barco, bus, tren y coche en una sola jornada. Cuatro lenguajes de movimiento. La ruta es:</p>' +
        '<ul>' +
        '<li>Salida desde Brekke Apartments en Flåm, justo donde cerró el Día 02</li>' +
        '<li>Embarque en Flåm y <strong>crucero Flåm → Gudvangen</strong> por Aurlandsfjord y Nærøyfjord (Unesco)</li>' +
        '<li>Bus de regreso al valle hasta Flåm</li>' +
        '<li>Ida y vuelta en la <strong>Flåmsbana</strong>, el tren cremallera</li>' +
        '<li>Tarde de coche hasta Bergen y noche en el <strong>Citybox Danmarksplass</strong></li>' +
        '</ul>',
      images: [
        '/assets/norge/Dia03/02_crucero/Dia03_02_crucero_01.jpg',
        '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_01.jpg',
      ],
      activities: [
        {
          id: 'dia03-start-flam',
          name: 'Salida · Brekke Apartments',
          description: '',
          images: [],
          longitude: 7.10523,
          latitude: 60.85709,
        },
        {
          id: 'dia03-flam-embarque',
          name: 'Flåm — embarque',
          description:
            '<p>El puerto de <strong>Flåm</strong> es pequeño, turístico y perfectamente funcional: valle glaciar, agua tranquila y la Flåmsbana a un paso.</p>' +
            '<p>Aquí la regla es clara: el fiordo no se conduce. Se navega. Embarcamos con la excursión reservada y dejamos el coche esperando el regreso.</p>' +
            '<p>Es el umbral emocional del día. A partir de aquí, el paisaje se mide en paredes verticales y cascadas.</p>',
          images: [
            '/assets/norge/Dia03/01_flam/Dia03_01_flam_01.jpg',
            '/assets/norge/Dia03/01_flam/Dia03_01_flam_02.jpg',
          ],
          longitude: 7.11974,
          latitude: 60.8643,
          arriveBy: 'driving',
        },
        {
          id: 'dia03-crucero-naeroyfjord',
          name: 'Crucero Flåm → Gudvangen',
          description:
            '<p>Un único trayecto en barco: norte por el <strong>Aurlandsfjord</strong>, canal principal (Undredal queda al norte del eje) y entrada al <strong>Nærøyfjord</strong>, Patrimonio de la Unesco, hasta <strong>Gudvangen</strong>.</p>' +
            '<p>El fiordo se estrecha, las cascadas aparecen y la escala se vuelve absurda de lo grande. Es el tipo de tramo que justifica el viaje entero.</p>' +
            '<p>En el mapa la línea discontinua sigue el agua —no una recta, no una carretera—. Si hay viento o lluvia, la escena gana dramatismo; si hay sol, brilla.</p>',
          images: [
            '/assets/norge/Dia03/02_crucero/Dia03_02_crucero_01.jpg',
            '/assets/norge/Dia03/02_crucero/Dia03_02_crucero_02.jpg',
            '/assets/norge/Dia03/02_crucero/Dia03_02_crucero_03.jpg',
            '/assets/norge/Dia03/02_crucero/Dia03_02_crucero_04.jpg',
            '/assets/norge/Dia03/02_crucero/Dia03_02_crucero_05.jpg',
            '/assets/norge/Dia03/02_crucero/Dia03_02_crucero_06.jpg',
            '/assets/norge/Dia03/02_crucero/Dia03_02_crucero_07.jpg',
            '/assets/norge/Dia03/02_crucero/Dia03_02_crucero_08.jpg',
            '/assets/norge/Dia03/02_crucero/Dia03_02_crucero_09.jpg',
            '/assets/norge/Dia03/02_crucero/Dia03_02_crucero_10.jpg',
            '/assets/norge/Dia03/02_crucero/Dia03_02_crucero_11.jpg',
          ],
          longitude: 6.84144,
          latitude: 60.88145,
          arriveBy: 'boat',
          pathCoordinates: flamToGudvangenBoatPath,
        },
        {
          id: 'dia03-bus-vuelta-flam',
          name: 'Bus de vuelta a Flåm',
          description:
            '<p>En Gudvangen desembarcamos y cerramos el circuito clásico: <strong>bus de vuelta a Flåm</strong> incluido en la actividad.</p>' +
            '<p>Sales por agua y regresas por el valle. Dos formas de leer el mismo paisaje en el mismo día.</p>' +
            '<p>El bus es práctico y rápido: sirve para recuperar el coche y pasar al siguiente capítulo —la Flåmsbana.</p>',
          images: [
            '/assets/norge/Dia03/03_bus_flam/Dia03_03_bus_flam_01.jpg',
            '/assets/norge/Dia03/03_bus_flam/Dia03_03_bus_flam_02.jpg',
          ],
          longitude: 7.11372,
          latitude: 60.8637,
          arriveBy: 'bus',
        },
        {
          id: 'dia03-flamsbana',
          name: 'Flåmsbana',
          description:
            '<p>La <strong>Flåmsbana</strong> es uno de los trenes turísticos más famosos de Europa: cremallera, desnivel brutal y cascadas como <strong>Kjosfossen</strong> en el camino.</p>' +
            '<p>Subimos y bajamos el mismo día: el tren te deja otra vez en <strong>Flåm</strong> (donde está el 3.5). No es un tren “para llegar”: es el tren como experiencia.</p>' +
            '<p>Al bajar recuperamos el coche y, desde aquí, carretera hasta Bergen.</p>',
          images: [
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_01.jpg',
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_02.jpg',
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_03.jpg',
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_04.jpg',
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_05.jpg',
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_06.jpg',
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_07.jpg',
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_08.jpg',
          ],
          longitude: 7.11318,
          latitude: 60.86295,
          arriveBy: 'train',
          pathCoordinates: flamsbanaRoundTripPath,
        },
        {
          id: 'dia03-hotel-bergen',
          name: 'Citybox Bergen Danmarksplass',
          description:
            '<p>Tras el tren, el coche toma el relevo: ruta hacia <strong>Bergen</strong> y primera noche en <strong>Citybox Danmarksplass</strong> (<a href="https://www.booking.com/hotel/no/citybox-danmarksplass.es.html" target="_blank" rel="noopener">Booking</a>, 18–20 jul 2022, ~200 € — dos noches).</p>' +
            '<p>En general, los <strong>Citybox</strong> nos parecieron geniales: hoteles baratos pero con buena calidad, perfectos para el tipo de viaje y el presupuesto que buscábamos. Funcionales, limpios y sin florituras innecesarias.</p>' +
            '<p>Es el cierre perfecto de un día largo: del fiordo Unesco a la ciudad hanseática en pocas horas. Mañana no hay que hacer maletas —el Día 04 es 100 % Bergen, con el mismo hotel como base.</p>',
          images: [
            '/assets/norge/Dia03/06_bergen/Dia03_06_bergen_01.jpg',
            '/assets/norge/Dia03/06_bergen/Dia03_06_bergen_02.jpg',
            '/assets/norge/Dia03/06_bergen/Dia03_06_bergen_03.jpg',
            '/assets/norge/Dia03/06_bergen/Dia03_06_bergen_04.jpg',
          ],
          longitude: 5.33776,
          latitude: 60.37584,
          arriveBy: 'lodging',
        },
      ],
    },
    {
      id: 'Dia04',
      name: 'Bergen',
      dayLabel: 'Día 04',
      longitude: 5.3242,
      latitude: 60.3913,
      summary:
        '<p>Día 100 % a pie por Bergen: la típica ruta turística del centro al mirador. Sin coche. La ruta es:</p>' +
        '<ul>' +
        '<li>Salida desde el <strong>Citybox Danmarksplass</strong></li>' +
        '<li><strong>Byparken</strong>: parque, fuente grande y grafitis por el centro histórico</li>' +
        '<li><strong>Johanneskirken</strong>, la iglesia roja del centro</li>' +
        '<li>Puerto de Bergen (Vågen): casitas, ambiente y algo de comer</li>' +
        '<li><strong>Bryggen</strong>, el barrio de madera Unesco</li>' +
        '<li><strong>Rosenkrantztårnet</strong> y fortaleza de Bergenhus</li>' +
        '<li>Mirador de la ciudad (Fløyen) para la vista de postal</li>' +
        '</ul>',
      images: [
        '/assets/norge/Dia04/06_mirador/Dia04_06_mirador_01.jpg',
        '/assets/norge/Dia04/04_bryggen/Dia04_04_bryggen_01.jpg',
      ],
      activities: [
        {
          id: 'dia04-start-bergen',
          name: 'Salida · Citybox Bergen',
          description: '',
          images: [],
          longitude: 5.33776,
          latitude: 60.37584,
        },
        {
          id: 'dia04-ruta-byparken',
          name: 'Byparken y grafitis',
          description:
            '<p>Arrancamos en <strong>Byparken</strong>, el parque del centro: césped, ambiente local y la <strong>fuente grande</strong> que marca el corazón verde de Bergen.</p>' +
            '<p>Por el centro histórico salen los <strong>murales y grafitis</strong> típicos —fachadas con arte urbano que contrastan con el empedrado y la madera antigua. Ideales para fotos.</p>' +
            '<p>Todo a pie: hoy el coche se queda en el hotel.</p>',
          images: [
            '/assets/norge/Dia04/01_byparken_murales/Dia04_01_byparken_murales_01.jpg',
            '/assets/norge/Dia04/01_byparken_murales/Dia04_01_byparken_murales_02.jpg',
            '/assets/norge/Dia04/01_byparken_murales/Dia04_01_byparken_murales_03.jpg',
            '/assets/norge/Dia04/01_byparken_murales/Dia04_01_byparken_murales_04.jpg',
            '/assets/norge/Dia04/01_byparken_murales/Dia04_01_byparken_murales_05.jpg',
            '/assets/norge/Dia04/01_byparken_murales/Dia04_01_byparken_murales_06.jpg',
            '/assets/norge/Dia04/01_byparken_murales/Dia04_01_byparken_murales_07.jpg',
            '/assets/norge/Dia04/01_byparken_murales/Dia04_01_byparken_murales_08.jpg',
            '/assets/norge/Dia04/01_byparken_murales/Dia04_01_byparken_murales_09.jpg',
          ],
          longitude: 5.3247,
          latitude: 60.3906,
          arriveBy: 'ruta',
        },
        {
          id: 'dia04-ruta-johanneskirken',
          name: 'Johanneskirken',
          description:
            '<p>Seguimos hasta <strong>Johanneskirken</strong>, la gran iglesia de ladrillo rojo que domina el skyline del centro.</p>' +
            '<p>Es una de las postales clásicas de Bergen: torre alta, plazas alrededor y ese contraste con el verde de Byparken a dos pasos.</p>',
          images: [
            '/assets/norge/Dia04/02_johanneskirken/Dia04_02_johanneskirken_01.jpg',
            '/assets/norge/Dia04/02_johanneskirken/Dia04_02_johanneskirken_02.jpg',
            '/assets/norge/Dia04/02_johanneskirken/Dia04_02_johanneskirken_03.jpg',
            '/assets/norge/Dia04/02_johanneskirken/Dia04_02_johanneskirken_04.jpg',
          ],
          longitude: 5.3194,
          latitude: 60.3889,
          arriveBy: 'ruta',
        },
        {
          id: 'dia04-ruta-puerto',
          name: 'Puerto de Bergen',
          description:
            '<p>Bajamos al <strong>puerto (Vågen)</strong>: agua, barcas y las casitas típicas asomadas al muelle.</p>' +
            '<p>Aquí paramos a <strong>comer algo</strong> —ambiente turístico pero con la ciudad latiendo de fondo. Buen momento para recargar antes del tramo Unesco.</p>',
          images: [
            '/assets/norge/Dia04/03_puerto/Dia04_03_puerto_01.jpg',
            '/assets/norge/Dia04/03_puerto/Dia04_03_puerto_02.jpg',
            '/assets/norge/Dia04/03_puerto/Dia04_03_puerto_03.jpg',
            '/assets/norge/Dia04/03_puerto/Dia04_03_puerto_04.jpg',
            '/assets/norge/Dia04/03_puerto/Dia04_03_puerto_05.jpg',
            '/assets/norge/Dia04/03_puerto/Dia04_03_puerto_06.jpg',
            '/assets/norge/Dia04/03_puerto/Dia04_03_puerto_07.jpg',
            '/assets/norge/Dia04/03_puerto/Dia04_03_puerto_08.jpg',
          ],
          longitude: 5.3245,
          latitude: 60.3947,
          arriveBy: 'ruta',
        },
        {
          id: 'dia04-ruta-bryggen',
          name: 'Bryggen',
          description:
            '<p><strong>Bryggen</strong> es la “ciudad de madera”: el muelle hanseático Patrimonio de la Unesco, muy turístico y con razón.</p>' +
            '<p>Casas de colores, callejones estrechos y siglos de comercio en cada tablero. Conviene entrar en los pasajes interiores, no quedarse solo en la fachada frente al agua.</p>',
          images: [
            '/assets/norge/Dia04/04_bryggen/Dia04_04_bryggen_01.jpg',
            '/assets/norge/Dia04/04_bryggen/Dia04_04_bryggen_02.jpg',
            '/assets/norge/Dia04/04_bryggen/Dia04_04_bryggen_03.jpg',
            '/assets/norge/Dia04/04_bryggen/Dia04_04_bryggen_04.jpg',
            '/assets/norge/Dia04/04_bryggen/Dia04_04_bryggen_05.jpg',
          ],
          longitude: 5.32363,
          latitude: 60.39707,
          arriveBy: 'ruta',
        },
        {
          id: 'dia04-ruta-bergenhus',
          name: 'Rosenkrantz / Bergenhus',
          description:
            '<p>Seguimos a la fortaleza de <strong>Bergenhus</strong> y la <strong>Rosenkrantztårnet</strong> (Rosenkrantz Tower): castillo, murallas y vistas al puerto.</p>' +
            '<p>Es el contrapunto histórico a Bryggen —piedra frente a madera— y cierra bien el arco medieval de la ciudad.</p>',
          images: [
            '/assets/norge/Dia04/05_bergenhus/Dia04_05_bergenhus_01.jpg',
            '/assets/norge/Dia04/05_bergenhus/Dia04_05_bergenhus_02.jpg',
          ],
          longitude: 5.3178,
          latitude: 60.3995,
          arriveBy: 'ruta',
        },
        {
          id: 'dia04-ruta-mirador',
          name: 'Mirador Fløyen',
          description:
            '<p>Por último <strong>subimos al mirador</strong> de la ciudad en <strong>Fløyen</strong>: la vista de postal con tejados, Bryggen y el fiordo a los pies.</p>' +
            '<p>Cierre perfecto de la ruta a pie. Bajamos hacia el Citybox; mañana el coche vuelve a escena rumbo a Hardanger.</p>',
          images: [
            '/assets/norge/Dia04/06_mirador/Dia04_06_mirador_01.jpg',
            '/assets/norge/Dia04/06_mirador/Dia04_06_mirador_02.jpg',
            '/assets/norge/Dia04/06_mirador/Dia04_06_mirador_03.jpg',
            '/assets/norge/Dia04/06_mirador/Dia04_06_mirador_04.jpg',
            '/assets/norge/Dia04/06_mirador/Dia04_06_mirador_05.jpg',
            '/assets/norge/Dia04/06_mirador/Dia04_06_mirador_06.jpg',
            '/assets/norge/Dia04/06_mirador/Dia04_06_mirador_07.jpg',
            '/assets/norge/Dia04/06_mirador/Dia04_06_mirador_08.jpg',
          ],
          longitude: 5.3428,
          latitude: 60.3945,
          arriveBy: 'ruta',
        },
      ],
    },
    {
      id: 'Dia05',
      name: 'Hardangerfjord',
      dayLabel: 'Día 05',
      longitude: 8.23814,
      latitude: 60.54489,
      summary:
        '<p>Dejamos Bergen hacia un fiordo distinto: más abierto y agrícola, con la potencia de una cascada de película y noche de cabaña. La ruta es:</p>' +
        '<ul>' +
        '<li>Check-out del <strong>Citybox Danmarksplass</strong> tras dos noches en Bergen</li>' +
        '<li>El <strong>Hardangerfjord</strong> y el puente <strong>Hardangerbrua</strong></li>' +
        '<li><strong>Vøringsfossen</strong>, el salto en el borde del cañón de Måbødalen</li>' +
        '<li>Otros ángulos del cañón y la cascada antes de girar al este</li>' +
        '<li>Cierre en <strong>Øen Turistsenter Cottages</strong> (Geilo; <a href="https://www.booking.com/hotel/no/aen-turistsenter.es.html" target="_blank" rel="noopener">Booking</a>, ~59 €)</li>' +
        '</ul>',
      images: [
        '/assets/norge/Dia05/01_hardangerfjord/Dia05_01_hardangerfjord_01.jpg',
        '/assets/norge/Dia05/02_voringsfossen/Dia05_02_voringsfossen_06.jpg',
      ],
      activities: [
        {
          id: 'dia05-start-bergen',
          name: 'Salida · Citybox Bergen',
          description: '',
          images: [],
          longitude: 5.33776,
          latitude: 60.37584,
        },
        {
          id: 'dia05-act01-hardangerfjord',
          name: 'Hardangerfjord · Hardangerbrua',
          description:
            '<p>El <strong>Hardangerfjord</strong> es más abierto y agrícola que otros fiordos: frutales, orillas suaves y montañas al fondo. En julio el verde puede ser casi eléctrico.</p>' +
            '<p>El momento estrella del tramo es cruzar la <strong>Hardangerbrua</strong>: ese puente colgante con la silueta tan característica, cables blancos y el túnel al otro lado. Una de las fotos “de película” del viaje.</p>' +
            '<p>Aquí el ritmo baja. Contraste total con el Nærøyfjord del Día 03: menos claustrofobia vertical, más horizonte.</p>',
          images: [
            '/assets/norge/Dia05/01_hardangerfjord/Dia05_01_hardangerfjord_01.jpg',
            '/assets/norge/Dia05/01_hardangerfjord/Dia05_01_hardangerfjord_02.jpg',
          ],
          longitude: 6.83461,
          latitude: 60.47488,
          arriveBy: 'driving',
        },
        {
          id: 'dia05-act02-voringsfossen',
          name: 'Vøringsfossen',
          description:
            '<p><strong>Vøringsfossen</strong> es una de las cascadas más famosas del país: un salto brutal en el borde del cañón de Måbødalen.</p>' +
            '<p>Los miradores permiten sentir el vacío y el ruido del agua. Ve con calma, buen calzado y respeto por las barreras: la belleza aquí viene con vértigo.</p>' +
            '<p>Es el golpe de efecto del día. Después, la ruta gira poco a poco hacia el este.</p>',
          images: [
            '/assets/norge/Dia05/02_voringsfossen/Dia05_02_voringsfossen_01.jpg',
            '/assets/norge/Dia05/02_voringsfossen/Dia05_02_voringsfossen_02.jpg',
            '/assets/norge/Dia05/02_voringsfossen/Dia05_02_voringsfossen_03.jpg',
            '/assets/norge/Dia05/02_voringsfossen/Dia05_02_voringsfossen_04.jpg',
            '/assets/norge/Dia05/02_voringsfossen/Dia05_02_voringsfossen_05.jpg',
            '/assets/norge/Dia05/02_voringsfossen/Dia05_02_voringsfossen_06.jpg',
            '/assets/norge/Dia05/02_voringsfossen/Dia05_02_voringsfossen_07.jpg',
            '/assets/norge/Dia05/02_voringsfossen/Dia05_02_voringsfossen_08.jpg',
          ],
          longitude: 7.2524,
          latitude: 60.42754,
          arriveBy: 'driving',
        },
        {
          id: 'dia05-act03-voringsfossen',
          name: 'Vøringsfossen · otros ángulos',
          description:
            '<p>Segunda secuencia en el entorno de <strong>Vøringsfossen</strong>: otros puntos de vista, más detalle del cañón y del salto.</p>' +
            '<p>A veces la mejor foto no es la primera. Dar una vuelta extra cambia la luz y la composición.</p>' +
            '<p>Cuando el ruido del agua se queda en la cabeza, es momento de continuar hacia Geilo.</p>',
          images: [
            '/assets/norge/Dia05/03_voringsfossen/Dia05_03_voringsfossen_01.jpg',
            '/assets/norge/Dia05/03_voringsfossen/Dia05_03_voringsfossen_02.jpg',
            '/assets/norge/Dia05/03_voringsfossen/Dia05_03_voringsfossen_03.jpg',
            '/assets/norge/Dia05/03_voringsfossen/Dia05_03_voringsfossen_04.jpg',
          ],
          longitude: 7.68224,
          latitude: 60.41333,
          arriveBy: 'driving',
        },
        {
          id: 'dia05-hotel-geilo',
          name: 'Øen Turistsenter Cottages · Geilo',
          description:
            '<p>El tramo final del día es montaña hacia el este —menos fiordo, más altitud— hasta cerrar en <strong>Øen Turistsenter Cottages</strong> (<a href="https://www.booking.com/hotel/no/aen-turistsenter.es.html" target="_blank" rel="noopener">Booking</a>, Geilo, 20–21 jul 2022, ~59 €).</p>' +
            '<p>Eran cabañas muy simples —hytter básicas, cocina para improvisar la cena, aparcar delante— pero nos permitían hacer la escala tras mucho tiempo de conducción: el punto intermedio perfecto entre Bergen y Oslo.</p>' +
            '<p>Zona tranquila, entrada fácil y justo lo que hacía falta para dormir y seguir. Mañana: coche a Oslo y primera tanda urbana.</p>',
          images: [
            '/assets/norge/Dia05/05_oen-turistsenter/Dia05_05_oen-turistsenter_01.jpg',
            '/assets/norge/Dia05/05_oen-turistsenter/Dia05_05_oen-turistsenter_02.jpg',
            '/assets/norge/Dia05/05_oen-turistsenter/Dia05_05_oen-turistsenter_03.jpg',
            '/assets/norge/Dia05/05_oen-turistsenter/Dia05_05_oen-turistsenter_04.jpg',
            '/assets/norge/Dia05/05_oen-turistsenter/Dia05_05_oen-turistsenter_05.jpg',
          ],
          longitude: 8.23814,
          latitude: 60.54489,
          arriveBy: 'lodging',
        },
      ],
    },
    {
      id: 'Dia06',
      name: 'Geilo → Oslo',
      dayLabel: 'Día 06',
      longitude: 10.75804,
      latitude: 59.91759,
      summary:
        '<p>Mañana de coche desde Geilo y, ya en Oslo, una tarde intensa conociendo la ciudad. La ruta es:</p>' +
        '<ul>' +
        '<li>Salida desde las cabañas de <strong>Øen Turistsenter</strong> en Geilo</li>' +
        '<li>Paso por <strong>Gol</strong> y Hallingdal</li>' +
        '<li>Parque de <strong>Vigeland</strong> en Frogner (estatuas y más detalle)</li>' +
        '<li><strong>Akershus</strong> y miradores sobre el puerto</li>' +
        '<li>Noche en el <strong>Anker Hotel</strong> (~106 €)</li>' +
        '</ul>',
      images: [
        '/assets/norge/Dia06/02_vigeland-frogner/Dia06_02_vigeland-frogner_01.jpg',
        '/assets/norge/Dia06/01_gol/Dia06_01_gol_01.jpg',
      ],
      activities: [
        {
          id: 'dia06-start-geilo',
          name: 'Salida · Øen Turistsenter',
          description: '',
          images: [],
          longitude: 8.23814,
          latitude: 60.54489,
        },
        {
          id: 'dia06-act01-gol',
          name: 'Gol · paso por Hallingdal',
          description:
            '<p>Por la mañana cerramos el tramo en coche: otra vez <strong>Gol</strong> y Hallingdal, ahora en sentido inverso.</p>' +
            '<p>Es el puente entre la montaña y la capital. Café rápido, estirar piernas y seguir hacia Oslo.</p>' +
            '<p>El paisaje ya no sorprende igual… y por eso se disfruta distinto.</p>',
          images: [
            '/assets/norge/Dia06/01_gol/Dia06_01_gol_01.jpg',
            '/assets/norge/Dia06/01_gol/Dia06_01_gol_02.jpg',
            '/assets/norge/Dia06/01_gol/Dia06_01_gol_03.jpg',
          ],
          longitude: 9.04464,
          latitude: 60.59856,
          arriveBy: 'driving',
        },
        {
          id: 'dia06-act02-vigeland-frogner',
          name: 'Vigeland / Frogner',
          description:
            '<p>Ya en Oslo, el parque de <strong>Vigeland</strong> en Frogner: cientos de figuras de bronce y granito sobre lo humano.</p>' +
            '<p>Uno de los espacios más visitados de la capital. Tras horas de carretera, pasear entre esculturas cambia el ritmo del viaje.</p>' +
            '<p>Después de días de naturaleza salvaje, aquí el “paisaje” son cuerpos, gestos y geometría.</p>',
          images: [
            '/assets/norge/Dia06/02_vigeland-frogner/Dia06_02_vigeland-frogner_01.jpg',
            '/assets/norge/Dia06/02_vigeland-frogner/Dia06_02_vigeland-frogner_02.jpg',
            '/assets/norge/Dia06/02_vigeland-frogner/Dia06_02_vigeland-frogner_03.jpg',
            '/assets/norge/Dia06/02_vigeland-frogner/Dia06_02_vigeland-frogner_04.jpg',
            '/assets/norge/Dia06/02_vigeland-frogner/Dia06_02_vigeland-frogner_05.jpg',
          ],
          longitude: 10.70865,
          latitude: 59.92356,
          arriveBy: 'driving',
        },
        {
          id: 'dia06-act03-vigeland-frogner',
          name: 'Vigeland · más detalle',
          description:
            '<p>Segunda pasada por el parque: más cerca de las figuras, más atención al detalle y a la composición.</p>' +
            '<p>Vigeland se merece tiempo. No es un “check” rápido; es un museo sin techo.</p>' +
            '<p>Cuando el parque se queda pequeño, los miradores del puerto y Akershus esperan.</p>',
          images: [
            '/assets/norge/Dia06/03_vigeland-frogner/Dia06_03_vigeland-frogner_01.jpg',
            '/assets/norge/Dia06/03_vigeland-frogner/Dia06_03_vigeland-frogner_02.jpg',
            '/assets/norge/Dia06/03_vigeland-frogner/Dia06_03_vigeland-frogner_03.jpg',
            '/assets/norge/Dia06/03_vigeland-frogner/Dia06_03_vigeland-frogner_04.jpg',
            '/assets/norge/Dia06/03_vigeland-frogner/Dia06_03_vigeland-frogner_05.jpg',
          ],
          longitude: 10.71193,
          latitude: 59.9255,
          arriveBy: 'ruta',
        },
        {
          id: 'dia06-act04-akershus',
          name: 'Akershus y miradores',
          description:
            '<p>La fortaleza de <strong>Akershus</strong> vigila el puerto: murallas, cañones y perspectivas sobre el waterfront.</p>' +
            '<p>Es el contrapunto histórico a la ciudad moderna —y el cierre del “conocer Oslo” de esta tarde.</p>' +
            '<p>Mañana queda más libre: Ópera, centro y compras.</p>',
          images: [
            '/assets/norge/Dia06/05_akershus/Dia06_05_akershus_01.jpg',
            '/assets/norge/Dia06/01_gol/Dia06_01_gol_02.jpg',
            '/assets/norge/Dia06/05_akershus/Dia06_05_akershus_03.jpg',
            '/assets/norge/Dia06/05_akershus/Dia06_05_akershus_04.jpg',
            '/assets/norge/Dia06/05_akershus/Dia06_05_akershus_05.jpg',
          ],
          longitude: 10.72916,
          latitude: 59.90882,
          arriveBy: 'ruta',
        },
        {
          id: 'dia06-hotel-anker',
          name: 'Anker Hotel',
          description:
            '<p>Noche en el <strong>Anker Hotel</strong> (Oslo, 21–22 jul 2022, ~106 €) tras el trayecto y la primera tanda urbana.</p>' +
            '<p>El road trip ya ha vuelto a la capital. Mañana: Ópera, calles del centro y el paseo del puerto.</p>',
          images: ['/assets/norge/Dia06/Dia06_portada.jpg'],
          longitude: 10.75804,
          latitude: 59.91759,
          arriveBy: 'lodging',
        },
      ],
    },
    {
      id: 'Dia07',
      name: 'Oslo',
      dayLabel: 'Día 07',
      longitude: 10.7522,
      latitude: 59.9139,
      summary:
        '<p>Último día en Oslo, más libre: la Ópera como eje y tiempo por el centro y el puerto. La ruta es:</p>' +
        '<ul>' +
        '<li>Salida desde el <strong>Anker Hotel</strong></li>' +
        '<li>La <strong>Ópera de Oslo</strong> (tejado caminable) — protagonista del día</li>' +
        '<li>Libertad por el <strong>centro</strong>: calles, escaparates y un poco de compras</li>' +
        '<li><strong>Oslo centrum</strong> / paseo marítimo: puerto y zona de la universidad</li>' +
        '</ul>',
      images: [
        '/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_01.jpg',
        '/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_02.jpg',
      ],
      activities: [
        {
          id: 'dia07-start-anker',
          name: 'Salida · Anker Hotel',
          description: '',
          images: [],
          longitude: 10.75804,
          latitude: 59.91759,
        },
        {
          id: 'dia07-act01-operahuset-oslo',
          name: 'Operahuset Oslo',
          description:
            '<p>Este día es casi entero de la <strong>Ópera de Oslo</strong>: mármol blanco caminable, vistas al fiordo y el ritual de subir al tejado sin prisas.</p>' +
            '<p>Es la postal moderna de la capital y el contrapunto perfecto a los fiordos de días atrás.</p>' +
            '<p>Aquí el agua es ciudad —y el cierre fotográfico del viaje.</p>',
          images: [
            '/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_01.jpg',
            '/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_02.jpg',
            '/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_03.jpg',
            '/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_04.jpg',
            '/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_05.jpg',
          ],
          longitude: 10.74553,
          latitude: 59.9107,
          arriveBy: 'ruta',
        },
        {
          id: 'dia07-act02-centro',
          name: 'Centro · calles y compras',
          description:
            '<p>Tiempo libre por el <strong>centro de Oslo</strong>: calles, escaparates y un poco de compras sin itinerario rígido.</p>' +
            '<p>Tras el ritmo del road trip, este tramo es permiso para deambular —Karl Johan y alrededores, cafés, vitrinas.</p>' +
            '<p>Menos “checklist”, más ciudad a pie.</p>',
          images: [],
          longitude: 10.7461,
          latitude: 59.9133,
          arriveBy: 'ruta',
        },
        {
          id: 'dia07-act03-puerto-centrum',
          name: 'Puerto · Oslo centrum',
          description:
            '<p>Bajamos al <strong>paseo del puerto</strong> en Oslo centrum: waterfront, ambiente universitario y vueltas sin prisa por la zona.</p>' +
            '<p>Es el cierre suave del viaje —el mismo puerto que ya se intuía desde Akershus, ahora a ras de muelle.</p>' +
            '<p>Después, Gardermoen y el vuelo: el círculo del road trip se cierra en la capital.</p>',
          images: [],
          longitude: 10.737,
          latitude: 59.9085,
          arriveBy: 'ruta',
        },
      ],
    },
  ] as NorgeStop[],
  tips: [
    {
      id: 'car',
      title: 'Coche y peajes',
      body: 'Coche de alquiler con peajes AutoPASS. En Noruega el asfalto es parte del atractivo: túneles, curvas y vistas constantes.',
    },
    {
      id: 'ferry',
      title: 'Ferries con coche',
      body: 'Algunos tramos (como Mannheller–Fodnes) se cruzan embarcando el coche. No improvises en temporada alta: mira horarios.',
    },
    {
      id: 'weather',
      title: 'Clima de julio',
      body: 'Días larguísimos y tiempo cambiante. Capas, impermeable y calzado decente valen más que cualquier filtro de cámara.',
    },
    {
      id: 'driving',
      title: 'Conducción',
      body: 'Carreteras estrechas, fauna y cobertura irregular. El GPS ayuda; el sentido común, más.',
    },
    {
      id: 'hotels',
      title: 'Alojamientos',
      body: 'Cada día cierra en hotel (excepto el segundo día en Bergen, misma reserva). Noche previa en Citybox Oslo (15–16 jul).',
    },
  ] as NorgeTip[],
  costs: [
    { id: 'flights', category: 'Transporte', label: 'Vuelos (2 personas)', amountHint: '€ 478,70' },
    { id: 'rental', category: 'Transporte', label: 'Alquiler coche + seguro', amountHint: '€ 310,17' },
    { id: 'flam-pack', category: 'Transporte', label: 'Bus + crucero + Flåmsbana', amountHint: '€ 275' },
    {
      id: 'deposit',
      category: 'Transporte',
      label: 'Fianza coche + tasa conductor joven',
      amountHint: '€ 379,64 (reembolsada)',
    },
    { id: 'fuel-sogndal', category: 'Transporte', label: 'Circle K Sogndal (17 jul)', amountHint: '€ 57,52' },
    { id: 'flytoget', category: 'Transporte', label: 'Flytoget aeropuerto (22 jul)', amountHint: '€ 21,36' },
    { id: 'stay-oslo1', category: 'Alojamiento', label: 'Citybox Oslo (15–16)', amountHint: '€ 82' },
    { id: 'stay-sogndal', category: 'Alojamiento', label: 'Sogndal B&B (16–17)', amountHint: '€ 81', url: 'https://www.booking.com/hotel/no/sogndal-vandrerhjem.es.html' },
    { id: 'stay-flam', category: 'Alojamiento', label: 'Brekke Apartments Flåm (17–18)', amountHint: '€ 100', url: 'https://www.booking.com/hotel/no/brekke-apartments.es.html' },
    { id: 'stay-bergen', category: 'Alojamiento', label: 'Citybox Bergen (18–20, 2 noches)', amountHint: '€ 200', url: 'https://www.booking.com/hotel/no/citybox-danmarksplass.es.html' },
    { id: 'stay-geilo', category: 'Alojamiento', label: 'Øen Turistsenter Geilo (20–21)', amountHint: '€ 59', url: 'https://www.booking.com/hotel/no/aen-turistsenter.es.html' },
    { id: 'stay-anker', category: 'Alojamiento', label: 'Anker Hotel Oslo (21–22)', amountHint: '€ 106' },
    { id: 'food-super', category: 'Comida', label: 'Supermercado (comida viaje)', amountHint: '€ 50' },
    { id: 'circlek-16', category: 'Comida', label: 'Circle K (16 jul)', amountHint: '€ 9' },
    { id: 'jostedal-17', category: 'Comida', label: 'Cafetería zona Jostedal/Briksdal (17 jul)', amountHint: '€ 8,15' },
    { id: 'flam-18', category: 'Comida', label: 'Flåm (18 jul)', amountHint: '€ 5' },
    { id: 'bergen-19a', category: 'Comida', label: 'Ostrand Heglén · Bergen (19 jul)', amountHint: '€ 26,67' },
    { id: 'bergen-19b', category: 'Comida', label: 'Mazkisti AS · Bergen (19 jul)', amountHint: '€ 10,18' },
    { id: 'sesam-21', category: 'Comida', label: 'Sesam Sesam · Oslo (21 jul)', amountHint: '€ 41' },
    { id: 'kiwi-21', category: 'Comida', label: 'Kiwi · Oslo (21 jul)', amountHint: '€ 17,30' },
    { id: 'rema-21', category: 'Comida', label: 'Rema 1000 · Oslo (21 jul)', amountHint: '€ 1,30' },
    { id: 'fredensborg-21', category: 'Comida', label: 'Fredensborg · Oslo (21 jul)', amountHint: '€ 22,50' },
    { id: 'waynes-22', category: 'Comida', label: "Wayne's Coffee · Oslo (22 jul)", amountHint: '€ 20,30' },
    { id: 'illegal-22', category: 'Comida', label: 'Illegal Burger · Oslo (22 jul)', amountHint: '€ 22,74' },
    { id: 'bk-22', category: 'Comida', label: 'Burger King · Oslo llegada (22 jul)', amountHint: '€ 27,14' },
    { id: 'locker-22', category: 'Varios', label: 'European Locker (22 jul)', amountHint: '€ 9,24' },
    { id: 'ali-22', category: 'Varios', label: 'Ali Leaders AS (22 jul)', amountHint: '€ 43,12' },
    { id: 'misc-22', category: 'Varios', label: 'Gasto (22 jul)', amountHint: '€ 28,59' },
    { id: 'gifts', category: 'Varios', label: 'Regalos varios', amountHint: '€ 9,50' },
    { id: 'small', category: 'Varios', label: 'Compras pequeñas', amountHint: '€ 15' },
  ] as NorgeCost[],
};
