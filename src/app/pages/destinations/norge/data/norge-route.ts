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
  arriveBy?: 'driving' | 'boat' | 'bus' | 'train' | 'lodging';
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
        '<p>Dejamos la capital y cruzamos Hallingdal rumbo al oeste: ríos anchos, iglesias de madera y la sensación creciente de entrar en otra Noruega. El objetivo no es llegar rápido, sino ir cambiando de paisaje hasta oler el fiordo.</p>' +
        '<p class="day-lead-xl">Las estrellas de la jornada son las cataratas de <strong>Hønefoss</strong>, el valle de <strong>Hallingdal</strong> y <strong>Hemsedal</strong>, la milenaria <strong>iglesia de madera de Borgund</strong>, el pueblo fluvial de <strong>Lærdal</strong> y el <strong>cruce en ferry del Sognefjord</strong> hasta <strong>Sogndal</strong>.</p>' +
        '<p class="day-highlight"><strong>Cierre del día:</strong> de Lærdal a Sogndal el coche no solo rueda por asfalto — <strong>también se embarca</strong> para cruzar un brazo del Sognefjord — y terminamos en el Bed &amp; Breakfast a orillas del fiordo.</p>',
      images: ['/assets/norge/Dia01/Dia01_portada.jpg'],
      activities: [
        {
          id: 'dia01-start-oslo',
          name: 'Salida · Citybox Oslo',
          description:
            '<p>El viaje comienza en el corazón de Oslo, en el <strong>Citybox</strong> (15–16 jul 2022, ~82 €) donde pasamos la noche previa. Con el coche cargado y la ciudad aún dormida, la ruta apunta al oeste: kilómetros de valle, montaña y, al final del día, agua.</p>' +
            '<p>Es el momento de cambiar el ritmo. Dejamos atrás avenidas y tranvías para entrar en la Noruega de carreteras estrechas, peajes AutoPASS y paisajes que se abren sin aviso.</p>' +
            '<p>Desde aquí el mapa dibuja una línea continua hasta Sogndal: cada etapa tiene su propio carácter, y ninguna es “de relleno”.</p>',
          images: ['/assets/norge/Dia01/Dia01_portada.jpg'],
          longitude: 10.74724,
          latitude: 59.91035,
        },
        {
          id: 'dia01-act01-honefoss',
          name: 'Hønefoss',
          description:
            '<p><strong>Hønefoss</strong> funciona como umbral. Apenas una hora fuera de Oslo, el paisaje ya habla otro idioma: el río Begna, puentes y un valle que invita a bajar la velocidad.</p>' +
            '<p>Paramos para estirar las piernas y mirar el agua. No es un destino de postal forzada; es la primera prueba de que el road trip ha empezado de verdad.</p>' +
            '<p>Consejo de ruta: aprovecha estos minutos. Más adelante los tramos se alargan y las paradas se vuelven más escénicas… y más imprescindibles.</p>',
          images: [
            '/assets/norge/Dia01/01_honefoss/Dia01_01_honefoss_01.jpg',
            '/assets/norge/Dia01/01_honefoss/Dia01_01_honefoss_02.jpg',
            '/assets/norge/Dia01/01_honefoss/Dia01_01_honefoss_03.jpg',
            '/assets/norge/Dia01/01_honefoss/Dia01_01_honefoss_04.jpg',
            '/assets/norge/Dia01/01_honefoss/Dia01_01_honefoss_05.jpg',
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
            '/assets/norge/Dia01/02_honefoss/Dia01_02_honefoss_01.jpg',
            '/assets/norge/Dia01/02_honefoss/Dia01_02_honefoss_02.jpg',
            '/assets/norge/Dia01/02_honefoss/Dia01_02_honefoss_03.jpg',
            '/assets/norge/Dia01/02_honefoss/Dia01_02_honefoss_04.jpg',
            '/assets/norge/Dia01/02_honefoss/Dia01_02_honefoss_05.jpg',
          ],
          longitude: 10.10274,
          latitude: 60.37676,
          arriveBy: 'driving',
        },
        {
          id: 'dia01-act03-gol',
          name: 'Gol · Hallingdal',
          description:
            '<p><strong>Gol</strong> es el clásico alto de Hallingdal en cualquier ruta hacia el oeste: valle ancho, madera, horizontes abiertos y ambiente de pueblo de paso con personalidad.</p>' +
            '<p>Aquí el paisaje gana escala. Todavía no estamos en el fiordo, pero sí en otra dimensión: menos densididad urbana, más aire y esa sensación de “ya estamos dentro” del viaje.</p>' +
            '<p>Una parada útil para café, fotos y reorganizar el asiento. Hallingdal merece mirarse sin tratarla solo como kilómetro intermedio.</p>',
          images: [
            '/assets/norge/Dia01/03_gol/Dia01_03_gol_01.jpg',
            '/assets/norge/Dia01/03_gol/Dia01_03_gol_02.jpg',
            '/assets/norge/Dia01/03_gol/Dia01_03_gol_03.jpg',
            '/assets/norge/Dia01/04_gol/Dia01_04_gol_01.jpg',
            '/assets/norge/Dia01/04_gol/Dia01_04_gol_02.jpg',
          ],
          longitude: 9.26264,
          latitude: 60.97042,
          arriveBy: 'driving',
        },
        {
          id: 'dia01-act05-hemsedal',
          name: 'Hemsedal',
          description:
            '<p><strong>Hemsedal</strong> es famosa por el esquí, pero en julio se transforma: picos limpios, pastos altos y un aire de estación de montaña sin la agitación invernal.</p>' +
            '<p>El valle se estrecha y se vuelve más vertical. Es un buen lugar para mirar hacia arriba, bajar la ventanilla y sentir el cambio de altitud en el cuerpo.</p>' +
            '<p>Las fotos aquí suelen captar bien la luz del norte. Si el tiempo acompaña, unos minutos bastan para guardar una de las mejores secuencias del día.</p>',
          images: [
            '/assets/norge/Dia01/05_hemsedal/Dia01_05_hemsedal_01.jpg',
            '/assets/norge/Dia01/05_hemsedal/Dia01_05_hemsedal_02.jpg',
            '/assets/norge/Dia01/05_hemsedal/Dia01_05_hemsedal_03.jpg',
          ],
          longitude: 8.86528,
          latitude: 61.10496,
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
            '/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_01.jpg',
            '/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_02.jpg',
            '/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_03.jpg',
            '/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_04.jpg',
            '/assets/norge/Dia01/07_laerdal/Dia01_07_laerdal_05.jpg',
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
            '<p>Tras el ferry, ducha, cena sencilla y la satisfacción de haber atravesado Noruega de este a oeste en una sola jornada. Mañana: Briksdal, Nordfjord y Stegastein antes de Flåm.</p>',
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
      summary:
        '<p>Día de hielo y verticalidad. Salimos de Sogndal hacia el <strong>Briksdalsbreen</strong> —una de las lenguas más fotogénicas del Jostedalsbreen— y cerramos con el mirador de <strong>Stegastein</strong> sobre el Aurlandsfjord.</p>' +
        '<p class="day-highlight"><strong>Hilo del día:</strong> glaciar por la mañana, fiordo por la tarde, noche en Flåm. El contraste entre el blanco del hielo y el azul oscuro del agua es el alma de esta etapa.</p>',
      images: ['/assets/norge/Dia02/Dia02_portada.jpg'],
      activities: [
        {
          id: 'dia02-start-sogndal',
          name: 'Salida · Sogndal B&B',
          description:
            '<p>Arrancamos desde <strong>Sogndal Bed & Breakfast</strong>, exactamente donde cerró el Día 01. Sin saltos en el mapa: el trayecto es continuo.</p>' +
            '<p>El plan es ambicioso y claro —hielo, cascadas y un mirador de película— así que conviene salir con margen y gasolina mental para las curvas.</p>' +
            '<p>Hoy el coche es herramienta; el paisaje, el protagonista.</p>',
          images: ['/assets/norge/Dia02/Dia02_portada.jpg'],
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
            '<p>El <strong>Briksdalsbreen</strong> es una lengua del <strong>Jostedalsbreen</strong>, el glaciar continental más grande de Europa continental: hielo que baja desde la meseta hasta el valle de Briksdal, con cascadas y roca pulida por milenios.</p>' +
            '<p>Los glaciares de esta zona son restos de la última glaciación; hoy retroceden con el clima más cálido, así que lo que ves no es “paisaje eterno”, sino un frente vivo que cambia de año en año. Por eso la caminata hasta cerca del hielo impresiona tanto: escala, sonido del agua y ese azul turbio típico del hielo comprimido.</p>' +
            '<p>No hace falta ser montañero, pero sí buen calzado, capa impermeable y tiempo. Respeta las balizas: el frente puede soltar bloques. Guarda batería —aquí las fotos se disparan solas.</p>',
          images: [
            '/assets/norge/Dia02/02_briksdalsbreen/Dia02_02_briksdalsbreen_01.jpg',
            '/assets/norge/Dia02/02_briksdalsbreen/Dia02_02_briksdalsbreen_02.jpg',
            '/assets/norge/Dia02/02_briksdalsbreen/Dia02_02_briksdalsbreen_03.jpg',
            '/assets/norge/Dia02/02_briksdalsbreen/Dia02_02_briksdalsbreen_04.jpg',
            '/assets/norge/Dia02/02_briksdalsbreen/Dia02_02_briksdalsbreen_05.jpg',
          ],
          longitude: 7.20976,
          latitude: 61.67789,
          arriveBy: 'driving',
        },
        {
          id: 'dia02-act03-stegastein',
          name: 'Stegastein',
          description:
            '<p>El mirador de <strong>Stegastein</strong> se asoma al Aurlandsfjord con una pasarela de madera que parece flotar sobre el vacío. Es arquitectura y paisaje a la vez.</p>' +
            '<p>Desde aquí se lee la profundidad del fiordo: agua oscura, paredes verticales y granjas minúsculas pegadas a la ladera. Un cierre visual casi cinematográfico.</p>' +
            '<p>Bajamos hacia Flåm con la cabeza llena de azul y verde. Mañana toca agua otra vez… pero esta vez en barco por el Nærøyfjord.</p>',
          images: [
            '/assets/norge/Dia02/03_stegastein/Dia02_03_stegastein_01.jpg',
            '/assets/norge/Dia02/03_stegastein/Dia02_03_stegastein_02.jpg',
            '/assets/norge/Dia02/03_stegastein/Dia02_03_stegastein_03.jpg',
            '/assets/norge/Dia02/03_stegastein/Dia02_03_stegastein_04.jpg',
            '/assets/norge/Dia02/03_stegastein/Dia02_03_stegastein_05.jpg',
          ],
          longitude: 7.2119,
          latitude: 60.90864,
          arriveBy: 'driving',
        },
        {
          id: 'dia02-hotel-flam',
          name: 'Brekke Gard Hostel',
          description:
            '<p>Noche en <strong>Brekke Gard Hostel</strong> (Flåm, 17–18 jul 2022, ~100 €), a un paso del puerto y de la estación de la Flåmsbana.</p>' +
            '<p>Después de Stegastein, el fiordo queda literalmente a los pies. Cena ligera, ducha y a cargar el cuerpo: el Día 03 es el de la gran navegación.</p>' +
            '<p>Dormir en Flåm es despertar ya dentro del escenario Unesco.</p>',
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
        '<p>El día más “de catálogo” del viaje… y también el más real: <strong>crucero Flåm → Gudvangen</strong> por Aurlandsfjord y Nærøyfjord, bus de regreso, <strong>Flåmsbana</strong> y tarde de coche hasta Bergen.</p>' +
        '<p class="day-highlight"><strong>Cómo se lee en el mapa:</strong> agua (barco), valle (bus), cremallera (tren) y carretera hasta el <strong>Citybox Bergen</strong>. Un solo día, cuatro lenguajes de movimiento.</p>',
      images: ['/assets/norge/Dia03/Dia03_portada.jpg'],
      activities: [
        {
          id: 'dia03-start-flam',
          name: 'Salida · Brekke Gard Hostel',
          description:
            '<p>Salimos de <strong>Brekke Gard Hostel</strong>, donde cerró el Día 02. El circuito de Flåm empieza en la puerta del alojamiento.</p>' +
            '<p>Hoy no se trata de “hacer kilómetros” a lo loco, sino de encadenar experiencias: embarque, fiordo Unesco, bus, tren y carretera a Bergen.</p>' +
            '<p>Conviene tener tickets a mano y algo de snack: entre tramos hay poco margen para improvisar.</p>',
          images: ['/assets/norge/Dia03/Dia03_portada.jpg'],
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
            '/assets/norge/Dia03/01_flam/Dia03_01_flam_03.jpg',
            '/assets/norge/Dia03/01_flam/Dia03_01_flam_04.jpg',
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
            '<p>En Gudvangen desembarcamos y cerramos el circuito clásico: <strong>bus de vuelta a Flåm</strong> incluido en la actividad.</p>' +
            '<p>Sales por agua y regresas por el valle. Dos formas de leer el mismo paisaje en el mismo día.</p>' +
            '<p>El bus es práctico y rápido: sirve para recuperar el coche y pasar al siguiente capítulo —la Flåmsbana.</p>',
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
            '<p>La <strong>Flåmsbana</strong> es uno de los trenes turísticos más famosos de Europa: cremallera, desnivel brutal y cascadas como <strong>Kjosfossen</strong> en el camino.</p>' +
            '<p>Subimos y bajamos el mismo día: el tren te deja otra vez en <strong>Flåm</strong> (donde está el 3.5). No es un tren “para llegar”: es el tren como experiencia.</p>' +
            '<p>Al bajar recuperamos el coche y, desde aquí, carretera hasta Bergen.</p>',
          images: [
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_01.jpg',
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_02.jpg',
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_03.jpg',
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_04.jpg',
            '/assets/norge/Dia03/05_flam-railway/Dia03_05_flam-railway_05.jpg',
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
            '<p>Tras el tren, el coche toma el relevo: ruta hacia <strong>Bergen</strong> y primera noche en <strong>Citybox Danmarksplass</strong> (18–20 jul 2022, ~200 € — dos noches).</p>' +
            '<p>Es el cierre perfecto de un día largo: del fiordo Unesco a la ciudad hanseática en pocas horas.</p>' +
            '<p>Mañana no hay que hacer maletas. El Día 04 es 100 % Bergen, con el mismo hotel como base.</p>',
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
      summary:
        '<p>Día de ciudad: Bergen entre montañas y mar, con <strong>Bryggen</strong> como icono Unesco y el puerto como hilo conductor.</p>' +
        '<p class="day-highlight"><strong>Alojamiento:</strong> seguimos en <strong>Citybox Danmarksplass</strong> (segunda noche). Sin cambio de hotel: más tiempo para pasear y menos logística.</p>',
      images: ['/assets/norge/Dia04/Dia04_portada.jpg'],
      activities: [
        {
          id: 'dia04-start-bergen',
          name: 'Salida · Citybox Bergen',
          description:
            '<p>El día urbano arranca en el mismo <strong>Citybox Danmarksplass</strong> donde dormimos al llegar. Continuidad total con el Día 03.</p>' +
            '<p>Bergen pide calma: calles húmedas, cafés y un centro que se explora mejor a pie (o con trayectos cortos en coche entre focos).</p>' +
            '<p>Hoy el mapa es compacto. El lujo es no correr.</p>',
          images: ['/assets/norge/Dia04/Dia04_portada.jpg'],
          longitude: 5.33776,
          latitude: 60.37584,
        },
        {
          id: 'dia04-act01-bergen-centro',
          name: 'Bergen centro',
          description:
            '<p><strong>Bergen</strong> se despliega entre montañas y fiordo: empedrado, ambiente portuario y esa luz húmeda tan típica de la costa oeste.</p>' +
            '<p>El centro invita a perderse sin guion rígido —plazas, escaparates, olor a mar— y a dejar que la ciudad marque el ritmo.</p>' +
            '<p>Es el contraste perfecto tras días de carretera: aquí el “paisaje” son personas, madera pintada y cielo cambiante.</p>',
          images: [
            '/assets/norge/Dia04/01_bergen-centro/Dia04_01_bergen-centro_01.jpg',
            '/assets/norge/Dia04/01_bergen-centro/Dia04_01_bergen-centro_02.jpg',
            '/assets/norge/Dia04/01_bergen-centro/Dia04_01_bergen-centro_03.jpg',
            '/assets/norge/Dia04/01_bergen-centro/Dia04_01_bergen-centro_04.jpg',
            '/assets/norge/Dia04/01_bergen-centro/Dia04_01_bergen-centro_05.jpg',
          ],
          longitude: 5.32885,
          latitude: 60.38991,
          arriveBy: 'driving',
        },
        {
          id: 'dia04-act02-bergen-bryggen',
          name: 'Bergen Bryggen',
          description:
            '<p><strong>Bryggen</strong>, el muelle hanseático, es el icono de Bergen: casas de madera de colores, callejones estrechos y siglos de comercio escritos en cada tablero.</p>' +
            '<p>Es Patrimonio de la Unesco y, aún hoy, el corazón emocional de la ciudad. Conviene entrar en los pasajes interiores, no quedarse solo en la fachada del puerto.</p>' +
            '<p>Si llueve —y en Bergen llueve— Bryggen gana atmósfera. Paraguas listo, cámara también.</p>',
          images: [
            '/assets/norge/Dia04/02_bergen-bryggen/Dia04_02_bergen-bryggen_01.jpg',
            '/assets/norge/Dia04/02_bergen-bryggen/Dia04_02_bergen-bryggen_02.jpg',
            '/assets/norge/Dia04/02_bergen-bryggen/Dia04_02_bergen-bryggen_03.jpg',
            '/assets/norge/Dia04/02_bergen-bryggen/Dia04_02_bergen-bryggen_04.jpg',
            '/assets/norge/Dia04/02_bergen-bryggen/Dia04_02_bergen-bryggen_05.jpg',
          ],
          longitude: 5.32363,
          latitude: 60.39707,
          arriveBy: 'driving',
        },
        {
          id: 'dia04-act03-bergen-bryggen',
          name: 'Bryggen · segunda vuelta',
          description:
            '<p>Volvemos sobre <strong>Bryggen</strong> con otra luz y otro ángulo. La segunda pasada no es repetición: es detalle —texturas, callejones, reflejos en el agua.</p>' +
            '<p>Bergen se entiende mejor cuando dejas que el mismo lugar te cuente dos historias en el mismo día.</p>' +
            '<p>Cierre suave del día urbano antes de recuperar el hotel y preparar la salida hacia Hardanger.</p>',
          images: [
            '/assets/norge/Dia04/03_bergen-bryggen/Dia04_03_bergen-bryggen_01.jpg',
            '/assets/norge/Dia04/03_bergen-bryggen/Dia04_03_bergen-bryggen_02.jpg',
            '/assets/norge/Dia04/03_bergen-bryggen/Dia04_03_bergen-bryggen_03.jpg',
            '/assets/norge/Dia04/03_bergen-bryggen/Dia04_03_bergen-bryggen_04.jpg',
            '/assets/norge/Dia04/03_bergen-bryggen/Dia04_03_bergen-bryggen_05.jpg',
          ],
          longitude: 5.33192,
          latitude: 60.39666,
          arriveBy: 'driving',
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
        '<p>Dejamos Bergen hacia un fiordo distinto: el <strong>Hardangerfjord</strong>, más amplio y agrícola, y la potencia de <strong>Vøringsfossen</strong> en el borde del cañón.</p>' +
        '<p class="day-highlight"><strong>Cierre:</strong> noche en cabaña en <strong>Øen Turistsenter</strong> (Geilo), ya en modo “vuelta hacia el este”.</p>',
      images: ['/assets/norge/Dia05/Dia05_portada.jpg'],
      activities: [
        {
          id: 'dia05-start-bergen',
          name: 'Salida · Citybox Bergen',
          description:
            '<p>Check-out de <strong>Citybox Danmarksplass</strong> tras dos noches. Bergen queda atrás; el coche apunta al Hardanger.</p>' +
            '<p>Es un día de transición elegante: de ciudad portuaria a fiordo frutal y, más tarde, a la meseta hacia Geilo.</p>' +
            '<p>Buena idea salir temprano: Vøringsfossen se disfruta mejor con luz y menos gente.</p>',
          images: ['/assets/norge/Dia05/Dia05_portada.jpg'],
          longitude: 5.33776,
          latitude: 60.37584,
        },
        {
          id: 'dia05-act01-hardangerfjord',
          name: 'Hardangerfjord',
          description:
            '<p>El <strong>Hardangerfjord</strong> es más abierto y agrícola que otros fiordos: frutales, orillas suaves y montañas al fondo. En julio el verde puede ser casi eléctrico.</p>' +
            '<p>Aquí el ritmo baja. El paisaje invita a parar en miradores improvisados y a notar el contraste con el Nærøyfjord del Día 03.</p>' +
            '<p>Es Noruega en versión “ancha”: menos claustrofobia vertical, más horizonte.</p>',
          images: [
            '/assets/norge/Dia05/01_hardangerfjord/Dia05_01_hardangerfjord_01.jpg',
            '/assets/norge/Dia05/01_hardangerfjord/Dia05_01_hardangerfjord_02.jpg',
            '/assets/norge/Dia05/01_hardangerfjord/Dia05_01_hardangerfjord_03.jpg',
            '/assets/norge/Dia05/01_hardangerfjord/Dia05_01_hardangerfjord_04.jpg',
            '/assets/norge/Dia05/01_hardangerfjord/Dia05_01_hardangerfjord_05.jpg',
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
          id: 'dia05-act04-hemsedal',
          name: 'Hacia Geilo / Hemsedal',
          description:
            '<p>El tramo final del día recupera el lenguaje de la montaña: pastos, picos y la sensación de estar ya en la meseta del este.</p>' +
            '<p>Es el puente visual entre Hardanger y la noche en Geilo. Menos fiordo, más altitud.</p>' +
            '<p>Últimas fotos con luz de tarde antes de llegar a la cabaña.</p>',
          images: [
            '/assets/norge/Dia05/04_hemsedal/Dia05_04_hemsedal_01.jpg',
            '/assets/norge/Dia05/04_hemsedal/Dia05_04_hemsedal_02.jpg',
            '/assets/norge/Dia05/04_hemsedal/Dia05_04_hemsedal_03.jpg',
            '/assets/norge/Dia05/04_hemsedal/Dia05_04_hemsedal_04.jpg',
            '/assets/norge/Dia05/04_hemsedal/Dia05_04_hemsedal_05.jpg',
          ],
          longitude: 8.23775,
          latitude: 60.54424,
          arriveBy: 'driving',
        },
        {
          id: 'dia05-hotel-geilo',
          name: 'Øen Turistsenter Cottages',
          description:
            '<p>Noche en <strong>Øen Turistsenter Cottages</strong> (Geilo, 20–21 jul 2022, ~59 €): cabaña de montaña, ambiente sencillo y perfecto para desconectar.</p>' +
            '<p>Tras Hardanger y Vøringsfossen, el cuerpo pide silencio y una cena sin prisas.</p>' +
            '<p>Mañana: regreso a Oslo y cierre urbano del viaje.</p>',
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
      summary:
        '<p>Cierre del círculo: de Geilo a Oslo para un día urbano con <strong>Vigeland</strong>, la <strong>Ópera</strong> y la fortaleza de <strong>Akershus</strong>.</p>' +
        '<p class="day-highlight"><strong>Última noche:</strong> <strong>Anker Hotel</strong> (21–22 jul). El road trip termina donde empezó —en la capital—, pero con la cabeza llena de fiordos.</p>',
      images: ['/assets/norge/Dia06/Dia06_portada.jpg'],
      activities: [
        {
          id: 'dia06-start-geilo',
          name: 'Salida · Øen Turistsenter',
          description:
            '<p>Salimos de las cabañas de <strong>Øen Turistsenter</strong> en Geilo. El trayecto apunta a Oslo sin saltos en el mapa.</p>' +
            '<p>Es un día de regreso, pero no de despedida triste: todavía quedan las mejores escenas urbanas de la capital.</p>' +
            '<p>Halllingdal otra vez, y luego el skyline de Oslo al fondo.</p>',
          images: ['/assets/norge/Dia06/Dia06_portada.jpg'],
          longitude: 8.23814,
          latitude: 60.54489,
        },
        {
          id: 'dia06-act01-gol',
          name: 'Gol · paso por Hallingdal',
          description:
            '<p>Pasamos de nuevo por <strong>Gol</strong> y Hallingdal, ahora en sentido inverso: el mismo valle, otra mirada.</p>' +
            '<p>Es el puente entre la montaña y la capital. Ideal para un café rápido y estirar piernas antes del tramo final.</p>' +
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
            '<p>El parque de <strong>Vigeland</strong> en Frogner es una lección de escultura al aire libre: cientos de figuras de bronce y granito sobre lo humano.</p>' +
            '<p>Funciona con sol o con cielo gris. Es uno de los espacios más visitados de Oslo… y con razón: se puede pasear horas sin repetir ángulo.</p>' +
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
            '<p>Cuando el parque se queda pequeño, el puerto y la Ópera esperan.</p>',
          images: [
            '/assets/norge/Dia06/03_vigeland-frogner/Dia06_03_vigeland-frogner_01.jpg',
            '/assets/norge/Dia06/03_vigeland-frogner/Dia06_03_vigeland-frogner_02.jpg',
            '/assets/norge/Dia06/03_vigeland-frogner/Dia06_03_vigeland-frogner_03.jpg',
            '/assets/norge/Dia06/03_vigeland-frogner/Dia06_03_vigeland-frogner_04.jpg',
            '/assets/norge/Dia06/03_vigeland-frogner/Dia06_03_vigeland-frogner_05.jpg',
          ],
          longitude: 10.71193,
          latitude: 59.9255,
          arriveBy: 'driving',
        },
        {
          id: 'dia06-act04-operahuset-oslo',
          name: 'Operahuset Oslo',
          description:
            '<p>La <strong>Ópera de Oslo</strong>, con su mármol blanco caminable, redefine el puerto: arquitectura contemporánea, vistas al fiordo y una terraza-tejado que invita a subir despacio.</p>' +
            '<p>Es la postal moderna de la capital. Subir al tejado es casi un ritual —y una de las mejores vistas urbanas del viaje.</p>' +
            '<p>Contraste perfecto con los fiordos salvajes de días atrás: aquí el agua es ciudad.</p>',
          images: [
            '/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_01.jpg',
            '/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_02.jpg',
            '/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_03.jpg',
            '/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_04.jpg',
            '/assets/norge/Dia06/04_operahuset-oslo/Dia06_04_operahuset-oslo_05.jpg',
          ],
          longitude: 10.74553,
          latitude: 59.9107,
          arriveBy: 'driving',
        },
        {
          id: 'dia06-act05-akershus',
          name: 'Akershus',
          description:
            '<p>La fortaleza de <strong>Akershus</strong> vigila el puerto desde hace siglos: murallas, cañones y perspectivas sobre el waterfront.</p>' +
            '<p>Es el contrapunto histórico a la Ópera. Entre ambas, Oslo se entiende como ciudad de capas —medieval y contemporánea a la vez.</p>' +
            '<p>Un cierre elegante al circuito urbano antes del hotel.</p>',
          images: [
            '/assets/norge/Dia06/05_akershus/Dia06_05_akershus_01.jpg',
            '/assets/norge/Dia06/05_akershus/Dia06_05_akershus_02.jpg',
            '/assets/norge/Dia06/05_akershus/Dia06_05_akershus_03.jpg',
            '/assets/norge/Dia06/05_akershus/Dia06_05_akershus_04.jpg',
            '/assets/norge/Dia06/05_akershus/Dia06_05_akershus_05.jpg',
          ],
          longitude: 10.72916,
          latitude: 59.90882,
          arriveBy: 'driving',
        },
        {
          id: 'dia06-hotel-anker',
          name: 'Anker Hotel',
          description:
            '<p>Última noche en el <strong>Anker Hotel</strong> (Oslo, 21–22 jul 2022, ~106 €). El trayecto del día termina en el alojamiento.</p>' +
            '<p>El road trip se cierra en la capital, con la cabeza llena de fiordos, ferries, hielo y madera de Bryggen.</p>' +
            '<p>Gardermoen y el vuelo quedan para el día siguiente. Esta noche, solo Oslo.</p>',
          images: ['/assets/norge/Dia06/Dia06_portada.jpg'],
          longitude: 10.75804,
          latitude: 59.91759,
          arriveBy: 'lodging',
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
    { id: 'stay-sogndal', category: 'Alojamiento', label: 'Sogndal B&B (16–17)', amountHint: '€ 81' },
    { id: 'stay-flam', category: 'Alojamiento', label: 'Brekke Gard Flåm (17–18)', amountHint: '€ 100' },
    { id: 'stay-bergen', category: 'Alojamiento', label: 'Citybox Bergen (18–20, 2 noches)', amountHint: '€ 200' },
    { id: 'stay-geilo', category: 'Alojamiento', label: 'Øen Turistsenter Geilo (20–21)', amountHint: '€ 59' },
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
