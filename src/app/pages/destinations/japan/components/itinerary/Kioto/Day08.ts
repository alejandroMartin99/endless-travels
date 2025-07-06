export const day08Kyoto = {
    borderClass:'border-dark-green',
    day:{
        title: 'Día 08 - HIROSIMA : Jardín Shukkeien, Castillo de Hiroshima, Parque memorial de la paz...',
        activities: [
        
        {
            name: 'Hotel -> ST  Hiroshima',
            description: '<strong>Resumen del día:</strong> Hoy exploraremos la ciudad de Hiroshima, conocida tanto por su historia como por su resiliencia. Descubriremos jardines tradicionales, imponentes castillos, el conmovedor Parque Memorial de la Paz y terminaremos probando la deliciosa gastronomía local. <br><br> <strong>Horario:</strong> 07:00 - 09:00 h.<br> <strong>Precio:</strong> Incluido en el Japan Rail Pass.<br><br> El trayecto desde Kyoto a Hiroshima será a bordo del <strong>Sanyo Shinkansen</strong>, uno de los trenes bala más modernos de Japón. Este tren recorre la distancia en aproximadamente 2 horas, ofreciendo un viaje rápido, cómodo y lleno de paisajes. <br><br> <strong>Curiosidades:</strong> Si te sientas en el lado derecho del tren, podrás disfrutar de vistas al Monte Shikoku en un día despejado. Además, esta línea es conocida por su puntualidad y precisión, características icónicas del sistema ferroviario japonés.',
            images: [
            '/assets/japan/Kyoto/Dia08/intro.webp',
            ],
            longitude: 132.47530717632492,
            latitude: 34.39861614876757, 
            mapUrl: 'map-shinjuku'
        },
        {
            name: 'Jardín Shukkeien',
            description: '<strong>Horario:</strong> 09:00 - 17:00 h.<br><strong>Precio:</strong> 260 yenes (aprox. 2 €).<br><br>El <strong>Jardín Shukkeien</strong>, cuyo nombre significa jardín de paisajes encogidos, es un espacio diseñado en 1620 bajo la dirección del señor feudal Asano Nagaakira. Este jardín está inspirado en el famoso Lago del Oeste en Hangzhou, China, y sigue los principios de la estética zen, creando paisajes en miniatura que representan montañas, valles y ríos.<br><br>Tras la devastación de Hiroshima en 1945, el jardín fue uno de los primeros lugares en ser restaurado, convirtiéndose en un símbolo de esperanza y recuperación. A lo largo del año, el jardín cambia radicalmente con las estaciones: cerezos en primavera, un verde vibrante en verano, hojas rojas en otoño y una tranquila belleza en invierno.<br><br><strong>Consejo:</strong> Dedica al menos una hora para recorrer sus senderos, cruzar los puentes de piedra y observar los carpas koi nadando en el lago central. No olvides tu cámara: cada rincón es digno de fotografiar.',
            images:
            [
                '/assets/japan/Kyoto/Dia08/Shukkeien_lago.webp',
                '/assets/japan/Kyoto/Dia08/Shukkeien_entrada.webp',
                '/assets/japan/Kyoto/Dia08/Shukkeien_alexVistas.webp',
                '/assets/japan/Kyoto/Dia08/Shukkeien_koiLu.webp',
                '/assets/japan/Kyoto/Dia08/Shukkeien_tramos.webp',
                '/assets/japan/Kyoto/Dia08/Shukkeien_lu.webp',
                '/assets/japan/Kyoto/Dia08/Shukkeien_juntos.webp',
                '/assets/japan/Kyoto/Dia08/Shukkeien_contraste.webp',
                '/assets/japan/Kyoto/Dia08/Shukkeien_puente.webp',
                '/assets/japan/Kyoto/Dia08/Shukkeien_orilla.webp',
                '/assets/japan/Kyoto/Dia08/Shukkeien_rojo.webp',
                
            ],
            longitude: 132.46711963058019,
            latitude: 34.399590052336066, 
            mapUrl: 'map-shinjuku'
        },
        {
            name: 'Castillo de Hiroshima',
            description: '<strong>Horario:</strong> 09:00 - 18:00 h.<br><strong>Precio:</strong> 370 yenes (aprox. 3 €).<br><br>Conocido como el <strong>Castillo de la Carpa</strong> (<i>Rijo</i> en japonés), el Castillo de Hiroshima fue construido originalmente en 1589 por Mori Terumoto, uno de los principales daimyos del Japón feudal. Este imponente castillo, que fue completamente destruido por la bomba atómica en 1945, fue reconstruido más tarde como un museo dedicado a la historia de Hiroshima antes de la Segunda Guerra Mundial.<br><br>Dentro del museo, encontrarás exhibiciones fascinantes sobre la vida samurái, el papel estratégico de Hiroshima como centro militar y la arquitectura tradicional japonesa. La vista desde la cima del castillo es espectacular, con una panorámica que abarca tanto la ciudad moderna como los paisajes circundantes.<br><br><strong>Curiosidades:</strong> El castillo fue un importante centro militar durante la guerra, lo que lo convirtió en un objetivo clave en 1945. Hoy en día, su restauración simboliza el deseo de Hiroshima de preservar su historia mientras avanza hacia el futuro.',
            images: [
            '/assets/japan/Kyoto/Dia08/castillo_lejos.webp',
            '/assets/japan/Kyoto/Dia08/castillo_fondo.webp',
            '/assets/japan/Kyoto/Dia08/castillo_juntos.webp',
            '/assets/japan/Kyoto/Dia08/castillo_entradalu.webp',
            '/assets/japan/Kyoto/Dia08/castillo_lu.webp',
            '/assets/japan/Kyoto/Dia08/castillo_lago.webp',
            '/assets/japan/Kyoto/Dia08/castillo_alex.webp',
            '/assets/japan/Kyoto/Dia08/castillo_abajo.webp',
            ],
            longitude: 132.45953169865308,
            latitude: 34.40173913244345, 
            mapUrl: 'map-shinjuku'
        },
        {
            name: 'Parque memorial de la paz',
            description: `
            <strong>Horario:</strong> 24 horas.<br><strong>Precio:</strong> Gratis.<br><br>El <strong>Parque Memorial de la Paz</strong> es el corazón emocional de Hiroshima y un recordatorio eterno de los horrores de la guerra. Este parque fue construido en la zona cero de la explosión atómica del 6 de agosto de 1945 y alberga varios monumentos dedicados a las víctimas, incluyendo el emblemático <strong>Domo de la Bomba Atómica</strong>.<br><br><strong>Historia del Domo de la Bomba Atómica:</strong> Este edificio, originalmente conocido como la <strong>Sala de Promoción Industrial de la Prefectura de Hiroshima</strong>, fue diseñado por el arquitecto checo Jan Letzel en 1915. En el momento de la explosión, el epicentro de la bomba estaba a tan solo 160 metros de distancia y a 600 metros de altura. Sorprendentemente, la estructura central del edificio resistió el impacto, convirtiéndose en un símbolo de esperanza y resiliencia. Hoy en día, el Domo de la Bomba Atómica es un <strong>Patrimonio de la Humanidad</strong> reconocido por la UNESCO.<br><br>También encontrarás el <strong>Cenotafio de las víctimas</strong>, el <strong>Monumento a la Paz Infantil</strong> inspirado en Sadako Sasaki, y el <strong>Museo de la Paz</strong>, que documenta los devastadores efectos de la bomba y la importancia de la paz mundial.<br><br><strong>Consejo:</strong> Si puedes, visita el parque al atardecer o por la noche. La iluminación añade una atmósfera especial que invita a la reflexión.`,
            images: [
            '/assets/japan/Kyoto/Dia08/Paz_edificioLejos.webp',
            '/assets/japan/Kyoto/Dia08/Paz_edificio1.webp',
            '/assets/japan/Kyoto/Dia08/Paz_edificio2.webp',
            '/assets/japan/Kyoto/Dia08/Paz_edificio3.webp',
            '/assets/japan/Kyoto/Dia08/Paz_cartel.webp',
            '/assets/japan/Kyoto/Dia08/Paz_monumento.webp',
            '/assets/japan/Kyoto/Dia08/Paz_plaza.webp',
            '/assets/japan/Kyoto/Dia08/Paz_museo.webp',
            '/assets/japan/Kyoto/Dia08/Paz_arco.webp',
            ],
            longitude: 132.45220421294133,
            latitude: 34.392816156822875, 
            mapUrl: 'map-shinjuku'
        },
        {
            name: 'Okonomi Village',
            description: `
            <strong>Horario:</strong> 11:00 - 22:00 h.<br><strong>Precio:</strong> Varía según el plato.<br><br>Si amas la comida japonesa, el <strong>Okonomi Village</strong> es una parada imprescindible en Hiroshima. Este peculiar edificio de tres pisos está lleno de pequeños restaurantes especializados en <strong>okonomiyaki</strong>, una deliciosa tortilla japonesa preparada al momento con ingredientes como repollo, fideos, mariscos o carne.<br><br>Cada restaurante tiene su propia receta, pero lo que distingue al okonomiyaki de Hiroshima es que los ingredientes se cocinan en capas, en lugar de mezclarse, creando un sabor único y una experiencia interactiva mientras ves a los chefs en acción.`,
            images: [
            '/assets/japan/Kyoto/Dia08/Okonomi_uno.webp',
            '/assets/japan/Kyoto/Dia08/Okonomi_juntos.webp',
            '/assets/japan/Kyoto/Dia08/Okonomi_palillos.webp',
            '/assets/japan/Kyoto/Dia08/Okonomi_lualex.webp',
            ],
            longitude: 132.46182352287187,
            latitude: 34.39172914022231, 
            mapUrl: 'map-shinjuku'
        },
        {
            name: 'Parque Hijiyama',
            description: '<strong>Horario:</strong> 24 horas.<br><strong>Precio:</strong> Gratis.<br><br>El <strong>Parque Hijiyama</strong> combina naturaleza, arte y cultura en un espacio tranquilo que ofrece vistas panorámicas de la ciudad de Hiroshima. Este parque alberga el <strong>Museo de Arte Contemporáneo de Hiroshima</strong>, conocido por su innovadora arquitectura y su colección de arte moderno japonés e internacional.<br><br>Durante la primavera, el parque se llena de cerezos en flor, convirtiéndolo en un lugar ideal para pasear. También encontrarás esculturas al aire libre, senderos arbolados y áreas perfectas para descansar tras un día de exploración urbana.<br><br><strong>Curiosidad:</strong> El parque fue utilizado como refugio tras el bombardeo de Hiroshima, y aún quedan restos de los búnkeres construidos durante la guerra.',
            images: [
            '/assets/japan/Kyoto/Dia08/Hijiyama_alex.webp',
            '/assets/japan/Kyoto/Dia08/Hijiyama_puente.webp',
            '/assets/japan/Kyoto/Dia08/Hijiyama_lu.webp',
            '/assets/japan/Kyoto/Dia08/Hijiyama_tunel.webp',
            '/assets/japan/Kyoto/Dia08/Hijiyama_cuesta.webp',
            ],
            longitude: 132.47357253517438,
            latitude: 34.385366093414085, 
            mapUrl: 'map-shinjuku'
        }
    ]
  }
};