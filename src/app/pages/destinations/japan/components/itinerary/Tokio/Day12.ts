export const day12Tokio = {
    borderClass:'border-blue',
    day:{
        title: 'Día 12 - TOKYO: Barrio de Asakusa, Ueno y Akihabara',
        activities: [
        { 
            name: 'Asakusa', 
            description: 'En este segundo día en Tokio, comenzaremos en Asakusa, donde exploraremos el ambiente tradicional y visitaremos templos históricos. Luego, nos dirigiremos a Ueno, un parque que ofrece un respiro natural y varios museos. Finalmente, terminaremos el día en Akihabara, un distrito vibrante conocido por su cultura pop y tecnología, donde disfrutaremos de un ambiente moderno y entretenido.\n\nAsakusa es uno de los distritos más antiguos y tradicionales de Tokio, famoso por su mezcla de cultura antigua y moderna. Aquí podrás disfrutar de la atmósfera vibrante mientras paseas por la calle Nakamise Dori, repleta de tiendas que ofrecen souvenirs y deliciosos snacks japoneses. ',
            images: [
            '/assets/japan/Tokio/AsakusaUeno/TemploIni.JPG',],

            longitude: 139.79733, 
            latitude: 35.71016, 
            mapUrl: 'map-asakusa' 
        },
        { 
            name: 'Templo Senso-ji', 
            description: 'El templo Senso-ji es el templo budista más antiguo de Tokio, fundado en el año 645 d.C. Su impresionante puerta, conocida como la puerta Hozomon, está flanqueada por dos enormes faroles rojos, convirtiéndose en un símbolo emblemático de la ciudad. Al entrar, los visitantes pueden disfrutar de una variedad de tiendas que venden amuletos de buena suerte y recuerdos.\n \n En su interior podemos encontrar La puerta Hozomon, que significa Puerta del Tesoro, es la entrada principal al templo Senso-ji. Esta imponente estructura de dos pisos alberga una colección de tesoros budistas. Es un lugar perfecto para tomar fotografías y capturar la esencia del Japón antiguo. ',
            images: [
            '/assets/japan/Tokio/AsakusaUeno/TemploSensojijuntos.JPG',
            '/assets/japan/Tokio/AsakusaUeno/TemploSensoji.JPG',
            '/assets/japan/Tokio/AsakusaUeno/TemploSensojiCampana.JPG'], 
            longitude: 139.7967, 
            latitude: 35.7148, 
            mapUrl: 'map-sensoji' 
        },
        { 
            name: 'Parque Sumida', 
            description: 'El parque Sumida es un hermoso espacio verde que ofrece impresionantes vistas del río Sumida y del Tokyo Skytree. Es el lugar ideal para relajarse después de una mañana explorando Asakusa. El parque alberga actividades culturales, incluidos festivales de flor de cerezo en primavera, y está lleno de senderos y áreas de picnic, convirtiéndose en un espacio popular tanto para lugareños como para turistas.\nPosteriormente cruzaremos el puente Kototoi dirección al Tokyo Skytree.',
            images: [
            '/assets/japan/Tokio/AsakusaUeno/ParqueSumida.jpg',
            '/assets/japan/Tokio/AsakusaUeno/ParqueSumidaView.jpg',], 
            longitude: 139.80146, 
            latitude: 35.71406, 
            mapUrl: 'map-sumida-park' 
        },
        { 
            name: 'Tokyo Skytree', 
            description: 'El Tokyo Skytree, con 634 metros de altura, es el edificio más alto de Japón y la segunda estructura más alta del mundo. La plataforma de observación ofrece una vista panorámica impresionante de la ciudad y, en días despejados, se puede ver el monte Fuji. Además, la torre alberga un centro comercial y un acuario, lo que la convierte en un destino atractivo para los visitantes.\n\n Una recomendacón es pararse en el puente Kotoko antes de llegar a la torre y podreis disfrutar de uans fotos maravillosas :)',
            images: [
            '/assets/japan/Tokio/AsakusaUeno/TokioSkytree.JPG',
            '/assets/japan/Tokio/AsakusaUeno/TokioSkytreeJuntos.JPG',
            '/assets/japan/Tokio/AsakusaUeno/TokioSkytreeLu.JPG',
            '/assets/japan/Tokio/AsakusaUeno/TokioSkytreeBridge.JPG',
            '/assets/japan/Tokio/AsakusaUeno/TokioSkytreeLand.JPG'], 
            longitude: 139.8028, 
            latitude: 35.7106, 
            mapUrl: 'map-tokyo-skytree' 
        },
        { 
            name: 'Oficinas centrales de Asahi', 
            description: 'El edificio de las oficinas centrales de Asahi es conocido por su diseño innovador, que incluye un gran mojón dorado que se asemeja a una cerveza espumosa. Este edificio es un ícono de la arquitectura moderna en Tokio y ha sido objeto de debates sobre su diseño. Desde aquí, puedes disfrutar de una excelente vista del río y la ciudad.',
            images: [
            '/assets/japan/Tokio/AsakusaUeno/Asahi.JPG',
            '/assets/japan/asahi_offices.jpg'], 
            longitude: 139.80026, 
            latitude: 35.71007, 
            mapUrl: 'map-asahi-offices' 
        },
        { 
            name: 'Hoppy Street', 
            description: 'Hoppy Street es famosa por su ambiente vibrante y sus numerosos izakayas (bares japoneses). Este es el lugar perfecto para probar el Hoppy, una bebida popular entre los locales. \n\n Para terminar en la calle Kappabashi, Conocida como Kitchen Town, famosa por sus tiendas que venden utensilios de cocina y alimentos falsos utilizados para exhibiciones. \n\n En todo esto echaremos la mitad de la mañana. ',
            images: ['/assets/japan/hoppy_street.jpg'], 
            longitude: 139.79410, 
            latitude: 35.71414, 
            mapUrl: 'map-hoppy-street' 
        },

        { 
            name: 'Parque de Ueno', 
            description: 'El parque de Ueno es uno de los parques más grandes y populares de Tokio es un lugar ideal para relajarse y disfrutar de la naturaleza en medio del bullicio de la ciudad. Dentro de este parque podremos ver: \n\n El Templo Kaneiji, fundado en 1625, es uno de los más importantes de Tokio. Su Rinnoden alberga las cenizas de Tokugawa Ieyasu, el fundador del shogunato. Ofrece vistas panorámicas de Ueno y un ambiente de tranquilidad en medio de la ciudad. \n\n En el también se encuentra Museo Nacional de Tokio que alberga una vasta colección de arte y antigüedades, destacando espadas samuráis y cerámicas y el Santuario Ueno Toshogu.',
            images: [
            '/assets/japan/Tokio/AsakusaUeno/ParqueUenoEntry.JPG',
            '/assets/japan/Tokio/AsakusaUeno/ParqueUeno.JPG',
            '/assets/japan/Tokio/AsakusaUeno/ParqueUenoLu.JPG',
            '/assets/japan/Tokio/AsakusaUeno/ParqueUenoTemple.JPG',
            '/assets/japan/Tokio/AsakusaUeno/ParqueUenoPagoda.JPG'],
            longitude: 139.7757, 
            latitude: 35.7138, 
            mapUrl: 'map-ueno-park' 
        },
        {
            name: 'Estanque Shinobazu y Estatua de Saigo Takamori', 
            description: 'El estanque Shinobazu es una atracción central dentro del Parque de Ueno, conocido por sus hermosas vistas y por las actividades de remo. En el centro del estanque se encuentra una pequeña isla que alberga el Templo Bentendo. A lo largo del estanque se puede ver la estatua de Saigo Takamori, uno de los últimos samuráis, que es un ícono popular de la historia de Japón.',
            images: [
            '/assets/japan/Tokio/AsakusaUeno/Estanque.JPG',
            '/assets/japan/Tokio/AsakusaUeno/EstanqueJuntos.JPG'],
            longitude:  139.77110, 
            latitude: 35.71225, 
            mapUrl: 'map-shinobazu-pond'
        }
        ,
        { 
            name: 'Akihabara', 
            description: 'Akihabara es el paraíso de los amantes del anime, los videojuegos y la cultura otaku. Este barrio está lleno de tiendas de electrónica, cafés temáticos y restaurantes que ofrecen experiencias únicas. Si eres un fanático de la cultura pop japonesa, no querrás perderte este vibrante vecindario. Además, Akihabara es conocido por sus eventos especiales y exposiciones, por lo que siempre hay algo nuevo que descubrir.',
            images: [
            '/assets/japan/Tokio/AsakusaUeno/AkihabaraIni.HEIC'], 
            longitude: 139.77308438287645, 
            latitude: 35.698485436385894, 
            mapUrl: 'map-akihabara' 
        },
        { 
            name: 'Akihabara - Otaku', 
            description: 'En este punto toca sacar el lado más Otaku que llevamso dentro, de toda la selección de opciones os recomendamos dos: \n\n Mandarake Akihabara es un paraíso para los coleccionistas de anime y manga. Es un  complejo de 8 pisos, cada uno está dedicado a diferentes categorías: manga, figuras, cosplay, doujinshi, y más. Por cierto espero que no tengas vértico porque sus escaleras son las típicas escaleras de incendios situadas en la fachada del edificio. \n\n Animate Akihabara tiene 7 pisos repletos de mercancía oficial. La planta baja está dedicada a los últimos lanzamientos de manga y novelas ligeras, mientras que los pisos superiores ofrecen una amplia gama de productos, desde CD dramas y música de anime...',
            images: [
            '/assets/japan/Tokio/AsakusaUeno/AkihabaraMandarake.JPG',
            '/assets/japan/Tokio/AsakusaUeno/AkihabaraFigurasOP.HEIC',
            '/assets/japan/Tokio/AsakusaUeno/AkihabaraMandarakeLu.JPG',
            '/assets/japan/Tokio/AsakusaUeno/AkihabaraFigurasSNK.HEIC'
            ], 
            longitude: 139.770512888675, 
            latitude: 35.70039368185262,  
            mapUrl: 'map-akihabara' 
        }
    ]
  }
};