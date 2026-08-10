export const day04Polonia = {
  borderClass: 'border-purple',
  day: {
    title: 'Día 04 - Tren a Cracovia y Minas de Sal de Wieliczka',
    activities: [
      {
        name: 'Resumen del día',
        description: '<strong>Día de transición entre Varsovia y Cracovia con una parada imprescindible bajo tierra.</strong> Tren hasta la zona de Wieliczka, visita a las minas de sal (UNESCO) y primera noche en Cracovia. \n\n 📌 <strong>Plan del día:</strong> tren Varsovia → Wieliczka, ruta guiada por las minas (galerías, lago, Capilla de Santa Kinga) y primer contacto con el Rynek y la Basílica de Santa María.',
        images: [
          '/assets/polonia/Cracovia/Dia03/Boleslawa_Chrobrego_01.JPEG'
        ],
        longitude: 21.0033,
        latitude: 52.2285,
        mapUrl: 'map-day04-resumen',
        arriveBy: 'train' as const,
      },
      {
        name: 'Tren Varsovia → Wieliczka / Cracovia',
        description: '<strong>Transporte:</strong> Tren desde Varsovia hacia la zona de Cracovia / Wieliczka.<br><strong>Duración:</strong> unas 2h 30–3h según tren y trasbordo (consultar horario del día).<br><br>Salimos de Varsovia en tren con billete ya reservado. El trayecto es cómodo y permite llegar a las puertas de Cracovia sin coche. Desde la estación conviene calcular el enlace hasta la entrada de las <strong>Minas de Sal de Wieliczka</strong> (bus, taxi o combo local): en Google Maps el tramo final desde Cracovia hasta la mina suele rondar 20–40 minutos según tráfico y modo de transporte. Reservad entrada a la mina con antelación; el horario de la ruta turística marca el ritmo del día.',
        images: [
          '/assets/polonia/Cracovia/Dia03/Cracovia_actividad_1_01.png'
        ],
        longitude: 21.003,
        latitude: 52.229,
        mapUrl: 'map-day04-tren',
        arriveBy: 'train' as const,
      },
      {
        name: 'Minas de Wieliczka — primeras galerías y sal',
        description: '<strong>Horario:</strong> Ruta Turística aprox. 7:30 - 19:30 (verano) / 8:00 - 17:00 (invierno), solo con guía.<br><strong>Precio:</strong> aprox. 96-129 PLN (~22-30 €).<br><br>Bajamos más de cien metros por escaleras de madera hacia las primeras galerías. Aquí se entiende de golpe la escala de la mina: pasillos excavados en sal, madera estructural y formaciones de sal aglomerada en las paredes. La temperatura se mantiene ~14 °C; chaqueta ligera recomendada.',
        images: [
          '/assets/polonia/Cracovia/Dia03/Cracovia_actividad_1_02.JPEG',
          '/assets/polonia/Cracovia/Dia03/Cracovia_actividad_1_03.JPEG',
          '/assets/polonia/Cracovia/Dia03/Cracovia_actividad_1_04.JPEG',
          '/assets/polonia/Cracovia/Dia03/Cracovia_actividad_1_05.JPEG',
          '/assets/polonia/Cracovia/Dia03/Cracovia_actividad_2_01.JPEG',
          '/assets/polonia/Cracovia/Dia03/Cracovia_actividad_2_02.JPEG',
          '/assets/polonia/Cracovia/Dia03/Cracovia_actividad_2_03.JPEG'
        ],
        longitude: 20.0558,
        latitude: 49.9833,
        mapUrl: 'map-day04-minas-galerias',
        arriveBy: 'train' as const,
      },
      {
        name: 'Minas de Wieliczka — lago, maquinaria y pasadizos',
        description: '<strong>Incluido</strong> en la Ruta Turística.<br><br>Seguimos por cámaras con el <strong>lago subterráneo</strong> de aguas verdosas y zonas de antigua maquinaria (sistemas para elevar agua/sal). Los pasadizos reforzados con madera encajada son de los tramos más fotogénicos del recorrido: túneles estrechos, estructura histórica y ambiente muy distinto al de las salas grandes.',
        images: [
          '/assets/polonia/Cracovia/Dia03/Boleslawa_Chrobrego_01.JPEG',
          '/assets/polonia/Cracovia/Dia03/Cracovia_actividad_3_01.JPEG',
          '/assets/polonia/Cracovia/Dia03/Cracovia_actividad_3_02.JPEG',
          '/assets/polonia/Cracovia/Dia03/Cracovia_actividad_3_03.JPEG',
          '/assets/polonia/Cracovia/Dia03/Cracovia_actividad_3_04.JPEG',
          '/assets/polonia/Cracovia/Dia03/Cracovia_actividad_3_05.JPEG'
        ],
        longitude: 20.0558,
        latitude: 49.9833,
        mapUrl: 'map-day04-minas-lago',
        arriveBy: 'driving' as const,
      },
      {
        name: 'Minas de Wieliczka — Capilla de Santa Kinga y salas monumentales',
        description: '<strong>Incluido</strong> en la Ruta Turística.<br><br>El broche es la <strong>Capilla de Santa Kinga</strong> y las salas de gran altura talladas en sal: madera clara, lámparas, altares y un volumen que parece una catedral bajo tierra. Es el tramo más espectacular de la visita (bodas y conciertos siguen celebrándose aquí). Al terminar, ascensor a superficie y camino hacia Cracovia / Podgórze.',
        images: [
          '/assets/polonia/Cracovia/Dia03/Capilla_Santa_Kinga_Wieliczka.jpg',
          '/assets/polonia/Cracovia/Dia03/Boleslawa_Chrobrego_03.JPEG',
          '/assets/polonia/Cracovia/Dia03/Boleslawa_Chrobrego_04.JPEG',
          '/assets/polonia/Cracovia/Dia03/Boleslawa_Chrobrego_05.JPEG',
          '/assets/polonia/Cracovia/Dia03/Boleslawa_Chrobrego_2_01.JPEG',
          '/assets/polonia/Cracovia/Dia03/Boleslawa_Chrobrego_2_02.JPEG',
          '/assets/polonia/Cracovia/Dia03/Boleslawa_Chrobrego_2_03.JPEG',
          '/assets/polonia/Cracovia/Dia03/Boleslawa_Chrobrego_2_05.JPEG'
        ],
        longitude: 20.0558,
        latitude: 49.9833,
        mapUrl: 'map-day04-minas-capilla'
      },
      {
        name: 'Primera noche en Cracovia',
        description: '<strong>Primera toma de contacto con Cracovia.</strong> Tras la mina llegamos a la ciudad y dimos un paseo corto por el <strong>Rynek Główny</strong>, la plaza principal —enorme, animada y perfecta para orientarse sin prisa—. Frente a ella destaca la <strong>Basílica de Santa María</strong>, con sus dos torres asimétricas, uno de los símbolos más reconocibles del casco antiguo. \n\n Cenamos por la zona y cerramos el día con esa primera sensación de Cracovia: mucho ambiente, casco histórico a pie y ganas de volver al día siguiente a explorarlo con calma.',
        images: [
          '/assets/polonia/Cracovia/Dia03/Podgorze_01.JPEG',
          '/assets/polonia/Cracovia/Dia03/Podgorze_02.JPEG',
          '/assets/polonia/Cracovia/Dia03/Podgorze_03.JPEG',
          '/assets/polonia/Cracovia/Dia03/Podgorze_04.JPEG',
          '/assets/polonia/Cracovia/Dia03/Podgorze_05.JPEG'
        ],
        longitude: 19.937,
        latitude: 50.0617,
        mapUrl: 'map-day04-primera-noche',
        arriveBy: 'train' as const,
      },
    ]
  }
};
