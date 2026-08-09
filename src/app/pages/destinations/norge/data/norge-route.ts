import { flamToGudvangenBoatPath } from './norge-boat-paths';
import { flamsbanaRoundTripPath } from './norge-train-paths';

export interface NorgeActivity {
  id: string;
  name: string;
  description: string;
  images: string[];
  /** Si hay coords, se puede calcular trayecto entre actividades del día. */
  longitude?: number;
  latitude?: number;
  /** Cómo se llega a esta actividad desde la anterior (barco/bus/coche/tren/alojamiento). */
  arriveBy?: 'driving' | 'boat' | 'bus' | 'train' | 'lodging';
  /** Polilínea real del trayecto (p. ej. barco por el centro del fiordo). */
  pathCoordinates?: Array<[number, number]>;
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

/** Generado desde EXIF (GPS + fecha) del viaje julio 2022. Max. 5 fotos/actividad. */
export const norgeRoute = {
  title: 'Noruega: road trip por los fiordos',
  subtitle: 'Ruta real julio 2022 — paradas y actividades desde metadatos de las fotos.',
  stops: [
    {
      id: 'Dia01',
      name: 'Hacia los fiordos',
      dayLabel: 'Día 01',
      longitude: 7.10293,
      latitude: 61.23122,
      summary: 'Salida hacia el oeste: Hønefoss, Gol y carreteras de montaña camino de los fiordos. A lo largo del día (Día 01) las etapas principales fueron: Honefoss → Honefoss (2) → Gol → Gol (4) → Hemsedal → Borgund stavkirke → Laerdal. Es un resumen del hacia los fiordos: conducción real por carreteras noruegas, paradas para miradores y pueblos, y mucho paisaje entre fiordo, valle y montaña.',
      images: ['/assets/norge/Dia01/Dia01_portada.jpg'],
      activities: [
        {
          id: 'dia01-start-oslo',
          name: 'Salida · Citybox Oslo',
          description:
            'Inicio del road trip desde <strong>Citybox Oslo</strong> (noche del 15–16 jul). El Resumen del día apunta aquí: desde este punto sale la línea del trayecto sin saltos.',
          images: ['/assets/norge/Dia01/Dia01_portada.jpg'],
          longitude: 10.74724,
          latitude: 59.91035,
        },
        {
          id: 'dia01-act01-honefoss',
          name: 'Honefoss',
          description: 'Hønefoss marca el arranque del road trip hacia el oeste. Aquí el paisaje empieza a cambiar: ríos, puentes y la sensación de dejar atrás el área metropolitana de Oslo para entrar en la Noruega de carreteras de montaña. Merece la pena fijarse en el contraste entre el valle fluvial y las primeras crestas boscosas.<br><br>En este tramo del día nos detuvimos en <strong>Honefoss</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia01/01_honefoss/Dia01_01_honefoss_01.jpg', '/assets/norge/Dia01/01_honefoss/Dia01_01_honefoss_02.jpg', '/assets/norge/Dia01/01_honefoss/Dia01_01_honefoss_03.jpg', '/assets/norge/Dia01/01_honefoss/Dia01_01_honefoss_04.jpg', '/assets/norge/Dia01/01_honefoss/Dia01_01_honefoss_05.jpg'],
          longitude: 10.28785,
          latitude: 60.08349,
          arriveBy: 'driving',
        },
        {
          id: 'dia01-act02-honefoss',
          name: 'Honefoss (2)',
          description: 'Hønefoss marca el arranque del road trip hacia el oeste. Aquí el paisaje empieza a cambiar: ríos, puentes y la sensación de dejar atrás el área metropolitana de Oslo para entrar en la Noruega de carreteras de montaña. Merece la pena fijarse en el contraste entre el valle fluvial y las primeras crestas boscosas.<br><br>En este tramo del día nos detuvimos en <strong>Honefoss</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia01/02_honefoss/Dia01_02_honefoss_01.jpg', '/assets/norge/Dia01/02_honefoss/Dia01_02_honefoss_02.jpg', '/assets/norge/Dia01/02_honefoss/Dia01_02_honefoss_03.jpg', '/assets/norge/Dia01/02_honefoss/Dia01_02_honefoss_04.jpg', '/assets/norge/Dia01/02_honefoss/Dia01_02_honefoss_05.jpg'],
          longitude: 10.10274,
          latitude: 60.37676,
        },
        {
          id: 'dia01-act03-gol',
          name: 'Gol',
          description: 'Gol y su entorno en Hallingdal son un clásico de paso en la E16/RV7: valles anchos, casas de madera y horizontes que se abren hacia el interior. Es una zona de transición perfecta para entender cómo Noruega cambia de escala cuando te alejas de la costa y te adentras en el macizo.<br><br>En este tramo del día nos detuvimos en <strong>Gol</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia01/03_gol/Dia01_03_gol_01.jpg', '/assets/norge/Dia01/03_gol/Dia01_03_gol_02.jpg', '/assets/norge/Dia01/03_gol/Dia01_03_gol_03.jpg', '/assets/norge/Dia01/03_gol/Dia01_03_gol_04.jpg', '/assets/norge/Dia01/03_gol/Dia01_03_gol_05.jpg'],
          longitude: 9.28769,
          latitude: 60.95666,
        },
        {
          id: 'dia01-act04-gol',
          name: 'Gol (4)',
          description: 'Gol y su entorno en Hallingdal son un clásico de paso en la E16/RV7: valles anchos, casas de madera y horizontes que se abren hacia el interior. Es una zona de transición perfecta para entender cómo Noruega cambia de escala cuando te alejas de la costa y te adentras en el macizo.<br><br>En este tramo del día nos detuvimos en <strong>Gol</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia01/04_gol/Dia01_04_gol_01.jpg', '/assets/norge/Dia01/04_gol/Dia01_04_gol_02.jpg', '/assets/norge/Dia01/04_gol/Dia01_04_gol_03.jpg', '/assets/norge/Dia01/04_gol/Dia01_04_gol_04.jpg', '/assets/norge/Dia01/04_gol/Dia01_04_gol_05.jpg'],
          longitude: 9.23759,
          latitude: 60.98419,
        },
        {
          id: 'dia01-act05-hemsedal',
          name: 'Hemsedal',
          description: 'Hemsedal es famosa por el esquí, pero en verano se lee de otra forma: picos limpios, pastos y un aire de estación de montaña. Las fotos aquí suelen captar la luz alta del norte y la verticalidad del valle.<br><br>En este tramo del día nos detuvimos en <strong>Hemsedal</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia01/05_hemsedal/Dia01_05_hemsedal_01.jpg', '/assets/norge/Dia01/05_hemsedal/Dia01_05_hemsedal_02.jpg', '/assets/norge/Dia01/05_hemsedal/Dia01_05_hemsedal_03.jpg'],
          longitude: 8.86528,
          latitude: 61.10496,
        },
        {
          id: 'dia01-act06-borgund-stavkirke',
          name: 'Borgund stavkirke',
          description: 'La iglesia de madera de Borgund es una de las stavkirke mejor conservadas de Noruega: dragones tallados, tejados superpuestos y una atmósfera casi cinematográfica. Aunque el viaje sea de fiordos, esta parada conecta con la Noruega medieval.<br><br>En este tramo del día nos detuvimos en <strong>Borgund stavkirke</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia01/06_borgund-stavkirke/Dia01_06_borgund-stavkirke_01.jpg', '/assets/norge/Dia01/06_borgund-stavkirke/Dia01_06_borgund-stavkirke_02.jpg', '/assets/norge/Dia01/06_borgund-stavkirke/Dia01_06_borgund-stavkirke_03.jpg', '/assets/norge/Dia01/06_borgund-stavkirke/Dia01_06_borgund-stavkirke_04.jpg', '/assets/norge/Dia01/06_borgund-stavkirke/Dia01_06_borgund-stavkirke_05.jpg'],
          longitude: 7.81329,
          latitude: 61.04845,
        },
        {
          id: 'dia01-act07-laerdal',
          name: 'Laerdal',
          description: 'Lærdal combina río, túneles legendarios y acceso a los fiordos del Sogne. El valle es estrecho y espectacular: un corredor natural hacia Aurland y Flåm, con paredes de roca y agua siempre cerca.<br><br>En este tramo del día nos detuvimos en <strong>Laerdal</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_01.jpg', '/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_02.jpg', '/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_03.jpg', '/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_04.jpg', '/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_05.jpg'],
          longitude: 7.44094,
          latitude: 61.11834,
        },
        {
          id: 'dia01-hotel-sogndal',
          name: 'Sogndal Bed & Breakfast',
          description:
            'Cierre del día en <strong>Sogndal Bed & Breakfast</strong> (16–17 jul 2022, ~81 €). Tras Lærdal, el trayecto del día acaba en el alojamiento en Sogndal.',
          images: ['/assets/norge/Dia01/Dia01_portada.jpg'],
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
      summary: 'Glaciar Briksdalsbreen y entorno del Nordfjord (Loen/Olden/Stryn). A lo largo del día (Día 02) las etapas principales fueron: Laerdal → Briksdalsbreen → Stegastein. Es un resumen del briksdal y nordfjord: conducción real por carreteras noruegas, paradas para miradores y pueblos, y mucho paisaje entre fiordo, valle y montaña.',
      images: ['/assets/norge/Dia02/Dia02_portada.jpg'],
      activities: [
        {
          id: 'dia02-start-sogndal',
          name: 'Salida · Sogndal B&B',
          description:
            'Salimos de <strong>Sogndal Bed & Breakfast</strong>, donde acabó el Día 01. Sin salto: el trayecto de hoy empieza exactamente ahí.',
          images: ['/assets/norge/Dia02/Dia02_portada.jpg'],
          longitude: 7.10293,
          latitude: 61.23122,
        },
        {
          id: 'dia02-act01-laerdal',
          name: 'Laerdal',
          description: 'Lærdal combina río, túneles legendarios y acceso a los fiordos del Sogne. El valle es estrecho y espectacular: un corredor natural hacia Aurland y Flåm, con paredes de roca y agua siempre cerca.<br><br>En este tramo del día nos detuvimos en <strong>Laerdal</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia02/01_laerdal/Dia02_01_laerdal_01.jpg', '/assets/norge/Dia02/01_laerdal/Dia02_01_laerdal_02.jpg', '/assets/norge/Dia02/01_laerdal/Dia02_01_laerdal_03.jpg', '/assets/norge/Dia02/01_laerdal/Dia02_01_laerdal_04.jpg', '/assets/norge/Dia02/01_laerdal/Dia02_01_laerdal_05.jpg'],
          longitude: 7.15319,
          latitude: 61.26505,
          arriveBy: 'driving',
        },
        {
          id: 'dia02-act02-briksdalsbreen',
          name: 'Briksdalsbreen',
          description: 'El glaciar Briksdalsbreen, brazo del Jostedalsbreen, es una de las postales más intensas del Nordfjord: lengua de hielo, cascadas y un valle esculpido por el hielo. La caminata corta hasta el frente glaciar suele ser el momento fuerte del día.<br><br>En este tramo del día nos detuvimos en <strong>Briksdalsbreen</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia02/02_briksdalsbreen/Dia02_02_briksdalsbreen_01.jpg', '/assets/norge/Dia02/02_briksdalsbreen/Dia02_02_briksdalsbreen_02.jpg', '/assets/norge/Dia02/02_briksdalsbreen/Dia02_02_briksdalsbreen_03.jpg', '/assets/norge/Dia02/02_briksdalsbreen/Dia02_02_briksdalsbreen_04.jpg', '/assets/norge/Dia02/02_briksdalsbreen/Dia02_02_briksdalsbreen_05.jpg'],
          longitude: 7.20976,
          latitude: 61.67789,
        },
        {
          id: 'dia02-act03-stegastein',
          name: 'Stegastein',
          description: 'El mirador de Stegastein se asoma sobre el Aurlandsfjord con una pasarela de madera que parece flotar. Desde aquí se entiende la profundidad del fiordo: agua oscura, paredes verticales y granjas minúsculas en las laderas.<br><br>En este tramo del día nos detuvimos en <strong>Stegastein</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia02/03_stegastein/Dia02_03_stegastein_01.jpg', '/assets/norge/Dia02/03_stegastein/Dia02_03_stegastein_02.jpg', '/assets/norge/Dia02/03_stegastein/Dia02_03_stegastein_03.jpg', '/assets/norge/Dia02/03_stegastein/Dia02_03_stegastein_04.jpg', '/assets/norge/Dia02/03_stegastein/Dia02_03_stegastein_05.jpg'],
          longitude: 7.2119,
          latitude: 60.90864,
        },
        {
          id: 'dia02-hotel-flam',
          name: 'Brekke Gard Hostel',
          description:
            'Noche en <strong>Brekke Gard Hostel</strong>, Flåm (17–18 jul 2022, ~100 €). Tras Stegastein, el día termina en el alojamiento junto al fiordo.',
          images: ['/assets/norge/Dia02/Dia02_portada.jpg'],
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
        'Circuito clásico en Flåm: crucero, bus, Flåmsbana y por la tarde coche hasta <strong>Citybox Bergen</strong> (primera de dos noches).',
      images: ['/assets/norge/Dia03/Dia03_portada.jpg'],
      activities: [
        {
          id: 'dia03-start-flam',
          name: 'Salida · Brekke Gard Hostel',
          description:
            'Salimos de <strong>Brekke Gard Hostel</strong> (Fin del Día 02). El circuito Flåm / Nærøyfjord empieza aquí, sin salto en el mapa.',
          images: ['/assets/norge/Dia03/Dia03_portada.jpg'],
          longitude: 7.10523,
          latitude: 60.85709,
        },
        {
          id: 'dia03-flam-embarque',
          name: 'Flåm — embarque',
          description:
            'Empezamos en <strong>Flåm</strong>: puerto del crucero, valle glaciar y Flåmsbana al lado. Desde aquí el día no es “conducir el fiordo”, sino salir en barco con la excursión reservada.',
          images: [
            '/assets/norge/Dia03/01_flam/Dia03_01_flam_01.jpg',
            '/assets/norge/Dia03/01_flam/Dia03_01_flam_02.jpg',
            '/assets/norge/Dia03/01_flam/Dia03_01_flam_03.jpg',
            '/assets/norge/Dia03/01_flam/Dia03_01_flam_04.jpg',
          ],
          longitude: 7.11974,
          latitude: 60.8643,
          arriveBy: 'driving',
        },
        {
          id: 'dia03-crucero-naeroyfjord',
          name: 'Crucero Flåm → Gudvangen (Nærøyfjord)',
          description:
            'Un único trayecto en barco: salimos al norte por el <strong>Aurlandsfjord</strong>, seguimos el canal (pasando la zona de Undredal sin bajar a tierra) y entramos al <strong>Nærøyfjord</strong> (Unesco) hasta desembarcar en <strong>Gudvangen</strong>. En el mapa la línea discontinua va por el agua, bordeando el fiordo — no es una línea recta ni carretera.',
          images: [
            '/assets/norge/Dia03/02_undredal/Dia03_02_undredal_01.jpg',
            '/assets/norge/Dia03/02_undredal/Dia03_02_undredal_02.jpg',
            '/assets/norge/Dia03/02_undredal/Dia03_02_undredal_03.jpg',
            '/assets/norge/Dia03/03_gudvangen/Dia03_03_gudvangen_01.jpg',
            '/assets/norge/Dia03/03_gudvangen/Dia03_03_gudvangen_02.jpg',
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
            'Desde Gudvangen <strong>volvemos a Flåm</strong> en el bus de la actividad. Cierre del circuito barco + bus: sales por agua y regresas por el valle.',
          images: [
            '/assets/norge/Dia03/04_flam/Dia03_04_flam_01.jpg',
            '/assets/norge/Dia03/04_flam/Dia03_04_flam_02.jpg',
            '/assets/norge/Dia03/04_flam/Dia03_04_flam_03.jpg',
            '/assets/norge/Dia03/04_flam/Dia03_04_flam_04.jpg',
            '/assets/norge/Dia03/04_flam/Dia03_04_flam_05.jpg',
          ],
          longitude: 7.11372,
          latitude: 60.8637,
          arriveBy: 'bus',
        },
        {
          id: 'dia03-flamsbana',
          name: 'Flåmsbana',
          description:
            'Ya en Flåm, subimos con la <strong>Flåmsbana</strong> (ida y vuelta). Cascadas como <strong>Kjosfossen</strong> y el desnivel entre fiordo y meseta; trayecto en tren, no coche ni barco. Al bajar, recuperamos el coche en Flåm.',
          images: [
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_01.jpg',
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_02.jpg',
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_03.jpg',
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_04.jpg',
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_05.jpg',
          ],
          // Estación Flåm (ida y vuelta): el coche se coge aquí al terminar
          longitude: 7.11318,
          latitude: 60.86295,
          arriveBy: 'train',
          pathCoordinates: flamsbanaRoundTripPath,
        },
        {
          id: 'dia03-hotel-bergen',
          name: 'Citybox Bergen Danmarksplass',
          description:
            'Tras el tren, <strong>coche hasta Bergen</strong> y noche en <strong>Citybox Bergen Danmarksplass</strong> (18–20 jul 2022, ~200 € — dos noches). Primera noche en la ciudad; el Día 04 seguimos en el mismo hotel.',
          images: [
            '/assets/norge/Dia04/01_bergen-centro/Dia04_01_bergen-centro_01.jpg',
            '/assets/norge/Dia04/01_bergen-centro/Dia04_01_bergen-centro_02.jpg',
            '/assets/norge/Dia04/01_bergen-centro/Dia04_01_bergen-centro_03.jpg',
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
      summary: 'Día completo en Bergen (Bryggen, puerto, centro). Seguimos en <strong>Citybox Danmarksplass</strong> — segunda noche del mismo hotel, sin cambio de alojamiento.',
      images: ['/assets/norge/Dia04/Dia04_portada.jpg'],
      activities: [
        {
          id: 'dia04-start-bergen',
          name: 'Salida · Citybox Bergen',
          description:
            'Seguimos en <strong>Citybox Bergen Danmarksplass</strong> (segunda noche). El día urbano arranca en el mismo hotel donde acabó el Día 03 — sin salto.',
          images: ['/assets/norge/Dia04/Dia04_portada.jpg'],
          longitude: 5.33776,
          latitude: 60.37584,
        },
        {
          id: 'dia04-act01-bergen-centro',
          name: 'Bergen centro',
          description: 'Bergen se despliega entre montañas y mar: calles empedradas, ambiente portuario y esa luz húmeda tan típica de la costa oeste. El centro invita a perderse sin prisa entre plazas, cafés y vistas al puerto.<br><br>En este tramo del día nos detuvimos en <strong>Bergen centro</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia04/01_bergen-centro/Dia04_01_bergen-centro_01.jpg', '/assets/norge/Dia04/01_bergen-centro/Dia04_01_bergen-centro_02.jpg', '/assets/norge/Dia04/01_bergen-centro/Dia04_01_bergen-centro_03.jpg', '/assets/norge/Dia04/01_bergen-centro/Dia04_01_bergen-centro_04.jpg', '/assets/norge/Dia04/01_bergen-centro/Dia04_01_bergen-centro_05.jpg'],
          longitude: 5.32885,
          latitude: 60.38991,
          arriveBy: 'driving',
        },
        {
          id: 'dia04-act02-bergen-bryggen',
          name: 'Bergen Bryggen',
          description: 'Bryggen, el muelle hanseático, es el icono de Bergen: hileras de casas de madera de colores, callejones estrechos y una historia de comercio que se respira en cada tablero. Es Unesco y, aún hoy, el corazón emocional de la ciudad.<br><br>En este tramo del día nos detuvimos en <strong>Bergen Bryggen</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia04/02_bergen-bryggen/Dia04_02_bergen-bryggen_01.jpg', '/assets/norge/Dia04/02_bergen-bryggen/Dia04_02_bergen-bryggen_02.jpg', '/assets/norge/Dia04/02_bergen-bryggen/Dia04_02_bergen-bryggen_03.jpg', '/assets/norge/Dia04/02_bergen-bryggen/Dia04_02_bergen-bryggen_04.jpg', '/assets/norge/Dia04/02_bergen-bryggen/Dia04_02_bergen-bryggen_05.jpg'],
          longitude: 5.32363,
          latitude: 60.39707,
        },
        {
          id: 'dia04-act03-bergen-bryggen',
          name: 'Bergen Bryggen (3)',
          description: 'Bryggen, el muelle hanseático, es el icono de Bergen: hileras de casas de madera de colores, callejones estrechos y una historia de comercio que se respira en cada tablero. Es Unesco y, aún hoy, el corazón emocional de la ciudad.<br><br>En este tramo del día nos detuvimos en <strong>Bergen Bryggen</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia04/03_bergen-bryggen/Dia04_03_bergen-bryggen_01.jpg', '/assets/norge/Dia04/03_bergen-bryggen/Dia04_03_bergen-bryggen_02.jpg', '/assets/norge/Dia04/03_bergen-bryggen/Dia04_03_bergen-bryggen_03.jpg', '/assets/norge/Dia04/03_bergen-bryggen/Dia04_03_bergen-bryggen_04.jpg', '/assets/norge/Dia04/03_bergen-bryggen/Dia04_03_bergen-bryggen_05.jpg'],
          longitude: 5.33192,
          latitude: 60.39666,
        },
      ],
    },
    {
      id: 'Dia05',
      name: 'Hardangerfjord',
      dayLabel: 'Día 05',
      longitude: 8.23814,
      latitude: 60.54489,
      summary: 'Recorrido por el Hardangerfjord: cascadas, orillas y pueblos del fiordo. A lo largo del día (Día 05) las etapas principales fueron: Hardangerfjord → Voringsfossen → Voringsfossen (3) → Hemsedal. Es un resumen del hardangerfjord: conducción real por carreteras noruegas, paradas para miradores y pueblos, y mucho paisaje entre fiordo, valle y montaña.',
      images: ['/assets/norge/Dia05/Dia05_portada.jpg'],
      activities: [
        {
          id: 'dia05-start-bergen',
          name: 'Salida · Citybox Bergen',
          description:
            'Dejamos Bergen desde <strong>Citybox Danmarksplass</strong> (fin de la estancia de dos noches). El Día 05 empieza donde acabó el 03/04.',
          images: ['/assets/norge/Dia05/Dia05_portada.jpg'],
          longitude: 5.33776,
          latitude: 60.37584,
        },
        {
          id: 'dia05-act01-hardangerfjord',
          name: 'Hardangerfjord',
          description: 'El Hardangerfjord es más amplio y agrícola que otros fiordos: frutales, orillas suaves y montañas al fondo. En julio, si hay suerte, el contraste entre verde intenso y agua gris-azul es especialmente bonito.<br><br>En este tramo del día nos detuvimos en <strong>Hardangerfjord</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia05/01_hardangerfjord/Dia05_01_hardangerfjord_01.jpg', '/assets/norge/Dia05/01_hardangerfjord/Dia05_01_hardangerfjord_02.jpg', '/assets/norge/Dia05/01_hardangerfjord/Dia05_01_hardangerfjord_03.jpg', '/assets/norge/Dia05/01_hardangerfjord/Dia05_01_hardangerfjord_04.jpg', '/assets/norge/Dia05/01_hardangerfjord/Dia05_01_hardangerfjord_05.jpg'],
          longitude: 6.83461,
          latitude: 60.47488,
          arriveBy: 'driving',
        },
        {
          id: 'dia05-act02-voringsfossen',
          name: 'Voringsfossen',
          description: 'Vøringsfossen es una de las cascadas más famosas de Noruega: un salto brutal en el borde del cañón de Måbødalen. Los miradores permiten sentir el vacío y el ruido del agua; conviene ir con calma y buen calzado.<br><br>En este tramo del día nos detuvimos en <strong>Voringsfossen</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia05/02_voringsfossen/Dia05_02_voringsfossen_01.jpg', '/assets/norge/Dia05/02_voringsfossen/Dia05_02_voringsfossen_02.jpg', '/assets/norge/Dia05/02_voringsfossen/Dia05_02_voringsfossen_03.jpg', '/assets/norge/Dia05/02_voringsfossen/Dia05_02_voringsfossen_04.jpg', '/assets/norge/Dia05/02_voringsfossen/Dia05_02_voringsfossen_05.jpg'],
          longitude: 7.2524,
          latitude: 60.42754,
        },
        {
          id: 'dia05-act03-voringsfossen',
          name: 'Voringsfossen (3)',
          description: 'Vøringsfossen es una de las cascadas más famosas de Noruega: un salto brutal en el borde del cañón de Måbødalen. Los miradores permiten sentir el vacío y el ruido del agua; conviene ir con calma y buen calzado.<br><br>En este tramo del día nos detuvimos en <strong>Voringsfossen</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia05/03_voringsfossen/Dia05_03_voringsfossen_01.jpg', '/assets/norge/Dia05/03_voringsfossen/Dia05_03_voringsfossen_02.jpg', '/assets/norge/Dia05/03_voringsfossen/Dia05_03_voringsfossen_03.jpg', '/assets/norge/Dia05/03_voringsfossen/Dia05_03_voringsfossen_04.jpg'],
          longitude: 7.68224,
          latitude: 60.41333,
        },
        {
          id: 'dia05-act04-hemsedal',
          name: 'Hemsedal',
          description: 'Hemsedal es famosa por el esquí, pero en verano se lee de otra forma: picos limpios, pastos y un aire de estación de montaña. Las fotos aquí suelen captar la luz alta del norte y la verticalidad del valle.<br><br>En este tramo del día nos detuvimos en <strong>Hemsedal</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia05/04_hemsedal/Dia05_04_hemsedal_01.jpg', '/assets/norge/Dia05/04_hemsedal/Dia05_04_hemsedal_02.jpg', '/assets/norge/Dia05/04_hemsedal/Dia05_04_hemsedal_03.jpg', '/assets/norge/Dia05/04_hemsedal/Dia05_04_hemsedal_04.jpg', '/assets/norge/Dia05/04_hemsedal/Dia05_04_hemsedal_05.jpg'],
          longitude: 8.23775,
          latitude: 60.54424,
        },
        {
          id: 'dia05-hotel-geilo',
          name: 'Øen Turistsenter Cottages',
          description:
            'Noche en <strong>Øen Turistsenter Cottages</strong>, Geilo (20–21 jul 2022, ~59 €). Tras Hardanger y Vøringsfossen, el día cierra en la cabaña de montaña.',
          images: ['/assets/norge/Dia05/Dia05_portada.jpg'],
          longitude: 8.23814,
          latitude: 60.54489,
          arriveBy: 'lodging',
        },
      ],
    },
    {
      id: 'Dia06',
      name: 'Oslo',
      dayLabel: 'Día 06',
      longitude: 10.75804,
      latitude: 59.91759,
      summary: 'Cierre en Oslo: Gol, Vigeland, Ópera, Akershus y noche en <strong>Anker Hotel</strong> (21–22 jul).',
      images: ['/assets/norge/Dia06/Dia06_portada.jpg'],
      activities: [
        {
          id: 'dia06-act01-gol',
          name: 'Gol',
          description: 'Gol y su entorno en Hallingdal son un clásico de paso en la E16/RV7: valles anchos, casas de madera y horizontes que se abren hacia el interior. Es una zona de transición perfecta para entender cómo Noruega cambia de escala cuando te alejas de la costa y te adentras en el macizo.<br><br>En este tramo del día nos detuvimos en <strong>Gol</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia06/01_gol/Dia06_01_gol_01.jpg', '/assets/norge/Dia06/01_gol/Dia06_01_gol_02.jpg', '/assets/norge/Dia06/01_gol/Dia06_01_gol_03.jpg'],
          longitude: 9.04464,
          latitude: 60.59856,
        },
        {
          id: 'dia06-act02-vigeland-frogner',
          name: 'Vigeland / Frogner',
          description: 'El parque de Vigeland en Frogner es una lección de escultura al aire libre: cientos de figuras de bronce y granito sobre temas humanos. Es uno de los espacios más visitados de Oslo y funciona igual de bien con sol o con cielo gris.<br><br>En este tramo del día nos detuvimos en <strong>Vigeland / Frogner</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia06/02_vigeland-frogner/Dia06_02_vigeland-frogner_01.jpg', '/assets/norge/Dia06/02_vigeland-frogner/Dia06_02_vigeland-frogner_02.jpg', '/assets/norge/Dia06/02_vigeland-frogner/Dia06_02_vigeland-frogner_03.jpg', '/assets/norge/Dia06/02_vigeland-frogner/Dia06_02_vigeland-frogner_04.jpg', '/assets/norge/Dia06/02_vigeland-frogner/Dia06_02_vigeland-frogner_05.jpg'],
          longitude: 10.70865,
          latitude: 59.92356,
        },
        {
          id: 'dia06-act03-vigeland-frogner',
          name: 'Vigeland / Frogner (3)',
          description: 'El parque de Vigeland en Frogner es una lección de escultura al aire libre: cientos de figuras de bronce y granito sobre temas humanos. Es uno de los espacios más visitados de Oslo y funciona igual de bien con sol o con cielo gris.<br><br>En este tramo del día nos detuvimos en <strong>Vigeland / Frogner</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia06/03_vigeland-frogner/Dia06_03_vigeland-frogner_01.jpg', '/assets/norge/Dia06/03_vigeland-frogner/Dia06_03_vigeland-frogner_02.jpg', '/assets/norge/Dia06/03_vigeland-frogner/Dia06_03_vigeland-frogner_03.jpg', '/assets/norge/Dia06/03_vigeland-frogner/Dia06_03_vigeland-frogner_04.jpg', '/assets/norge/Dia06/03_vigeland-frogner/Dia06_03_vigeland-frogner_05.jpg'],
          longitude: 10.71193,
          latitude: 59.9255,
        },
        {
          id: 'dia06-act04-operahuset-oslo',
          name: 'Operahuset Oslo',
          description: 'La Ópera de Oslo, con su mármol blanco que se puede caminar, redefine el puerto: arquitectura contemporánea, vistas al fiordo y una terraza-tejado que invita a subir despacio. Es la postal moderna de la capital.<br><br>En este tramo del día nos detuvimos en <strong>Operahuset Oslo</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_01.jpg', '/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_02.jpg', '/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_03.jpg', '/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_04.jpg', '/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_05.jpg'],
          longitude: 10.74553,
          latitude: 59.9107,
        },
        {
          id: 'dia06-act05-akershus',
          name: 'Akershus',
          description: 'La fortaleza de Akershus vigila el puerto desde hace siglos. Murallas, cañones y perspectivas sobre el waterfront: un contraste perfecto con la Ópera y Aker Brygge, y un cierre histórico al circuito urbano.<br><br>En este tramo del día nos detuvimos en <strong>Akershus</strong> para recorrer el entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta.',
          images: ['/assets/norge/Dia06/05_akershus/Dia06_05_akershus_01.jpg', '/assets/norge/Dia06/05_akershus/Dia06_05_akershus_02.jpg', '/assets/norge/Dia06/05_akershus/Dia06_05_akershus_03.jpg', '/assets/norge/Dia06/05_akershus/Dia06_05_akershus_04.jpg', '/assets/norge/Dia06/05_akershus/Dia06_05_akershus_05.jpg'],
          longitude: 10.72916,
          latitude: 59.90882,
        },
        {
          id: 'dia06-hotel-anker',
          name: 'Anker Hotel',
          description:
            'Última noche en <strong>Anker Hotel</strong>, Oslo (21