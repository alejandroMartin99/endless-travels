import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
interface DetailedCity {
  name: string;
  essence: string;
  description: string;
  highlights: string[];
}

interface DetailedExperience {
  title: string;
  category: string;
  description: string;
  details: string[];
  icon: string;
  image: string;
  impact: number;
}

@Component({
  selector: 'init-japan-component',
  templateUrl: './init-japan.component.html',
  styleUrls: ['./init-japan.component.css'],
})
export class InitJapanComponent implements OnInit, AfterViewInit {
  @ViewChildren('durationBox, datesBox, citiesBox, essenceTitle') 
  observedElements!: QueryList<ElementRef>;

  panelOpenState = true;
  
  isVisible = {
    duration: false,
    dates: false,
    cities: false,
    essence: false
  };

  viaje = {
    duracionDias: 15,
    fechasRecomendadas: 'Finales de octubre a principios de noviembre',
    ciudades: ['Kyoto', 'Osaka', 'Nara', 'Hiroshima', 'Tokyo', 'Nikko', 'Kamakura'],
    esencia: [
      'Tradición milenaria en Kyoto',
      'Gastronomía única en Tokio',
      'Riqueza espiritual en Nara',
      'Historia conmovedora en Hiroshima',
      'Modernidad vibrante en Tokyo',
    ],
  };

  detailedCities: DetailedCity[] = [
    {
      name: 'Kyoto',
      essence: 'El Alma Tradicional',
      description: 'Antigua capital imperial donde cada piedra cuenta una historia milenaria. Hogar de más de 2.000 templos y santuarios, Kyoto es donde el Japón ancestral permanece intacto.',
      highlights: ['Templo Dorado', 'Barrio Gion', 'Ceremonia del Té', 'Bosque de Bambú']
    },
    {
      name: 'Tokyo',
      essence: 'El Futuro Presente',
      description: 'La metrópolis más fascinante del mundo, donde robots sirven café y monjes bendicen rascacielos. Aquí el futuro no es una promesa, es la realidad cotidiana.',
      highlights: ['Shibuya Crossing', 'Mercado Tsukiji', 'Harajuku', 'Observatorio Tokyo Skytree']
    },
    {
      name: 'Osaka',
      essence: 'La Capital Gastronómica',
      description: 'Si Tokyo es el cerebro de Japón, Osaka es su estómago y su corazón. Aquí nacieron el takoyaki y el okonomiyaki, pero también la hospitalidad japonesa más cálida.',
      highlights: ['Dotonbori', 'Castillo de Osaka', 'Mercados Nocturnos', 'Cocina Callejera']
    },
    {
      name: 'Nara',
      essence: 'La Serenidad Ancestral',
      description: 'Primera capital permanente de Japón, donde ciervos sagrados caminan libremente entre templos del siglo VIII. Un lugar donde el tiempo se detiene y el alma encuentra paz.',
      highlights: ['Parque de Nara', 'Templo Todaiji', 'Gran Buda', 'Ciervos Sagrados']
    },
    {
      name: 'Hiroshima',
      essence: 'La Lección de Esperanza',
      description: 'Una ciudad que se levantó de las cenizas para convertirse en símbolo mundial de paz y reconciliación. Su historia te conmoverá, su presente te inspirará.',
      highlights: ['Memorial de la Paz', 'Isla Miyajima', 'Torii Flotante', 'Museo de la Paz']
    },
    {
      name: 'Nikko',
      essence: 'La Puerta al Sagrado',
      description: 'Refugio espiritual en las montañas donde la naturaleza y la arquitectura sagrada crean una sinfonía de belleza que trasciende lo terrenal.',
      highlights: ['Santuario Toshogu', 'Lago Chuzenji', 'Cascadas Kegon', 'Bosques Sagrados']
    },
    {
      name: 'Kamakura',
      essence: 'El Zen Viviente',
      description: 'Antigua sede del shogunato donde el budismo zen echó raíces profundas. Aquí entenderás por qué la simplicidad puede ser la forma más elevada de sofisticación.',
      highlights: ['Gran Buda', 'Templo Hase', 'Jardines Zen', 'Playa Shonan']
    }
  ];

  detailedExperiences: DetailedExperience[] = [
    {
      title: 'Ceremonia del Té en Kyoto',
      category: 'Tradición Espiritual',
      description: 'Participa en una auténtica ceremonia del té de 400 años de antigüedad, donde cada movimiento es una meditación y cada sorbo una conexión con generaciones pasadas.',
      details: [
        'Aprenderás los 7 pasos sagrados de la preparación',
        'Meditarás en un jardín zen centenario',
        'Conectarás con una maestra del té con 30 años de experiencia',
        'Comprenderás la filosofía Wabi-Sabi a través del ritual'
      ],
      icon: '🍵',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      impact: 95
    },
    {
      title: 'Noche en Ryokan Tradicional',
      category: 'Inmersión Cultural',
      description: 'Duerme en un ryokan de 200 años donde samuráis una vez descansaron. Despierta con el sonido del bambú y el aroma del incienso matutino.',
      details: [
        'Cena kaiseki preparada por chef con estrella Michelin',
        'Baño en aguas termales naturales bajo las estrellas',
        'Dormir en futón sobre tatami ancestral',
        'Desayuno tradicional servido en tu habitación'
      ],
      icon: '🏯',
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      impact: 90
    },
    {
      title: 'Festival Nocturno en Osaka',
      category: 'Vida Local',
      description: 'Sumérgete en la energía contagiosa de un matsuri local, donde participarás en danzas tradicionales junto a familias que han celebrado aquí durante generaciones.',
      details: [
        'Aprenderás danzas tradicionales de 500 años',
        'Probarás comida de festival preparada por locales',
        'Participarás en rituales comunitarios',
        'Crearás lazos auténticos con familias japonesas'
      ],
      icon: '🎭',
      image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      impact: 85
    },
    {
      title: 'Amanecer en el Monte Fuji',
      category: 'Conexión Espiritual',
      description: 'Experimenta el "Goraiko" - el amanecer sagrado desde el símbolo más poderoso de Japón. Un momento que cambiará tu perspectiva sobre la vida y la naturaleza.',
      details: [
        'Ascenso nocturno guiado por expertos locales',
        'Meditación al amanecer a 3,776 metros de altura',
        'Ceremonia de agradecimiento shintoísta',
        'Vistas panorámicas de todo el archipiélago japonés'
      ],
      icon: '⛰️',
      image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      impact: 100
    }
  ];

  ngOnInit() {
    // Inicialización de componente
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          if (element.classList.contains('duration-card')) {
            this.isVisible.duration = true;
          } else if (element.classList.contains('season-card')) {
            this.isVisible.dates = true;
          } else if (element.classList.contains('cities-card')) {
            this.isVisible.cities = true;
          }
        }
      });
    }, { threshold: 0.2 });

    // Observar elementos cuando están disponibles
    setTimeout(() => {
      this.observedElements.forEach(element => {
        if (element && element.nativeElement) {
          observer.observe(element.nativeElement);
        }
      });
    }, 100);

    // Observer para experiencias
    const experienceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible.essence = true;
        }
      });
    }, { threshold: 0.1 });

    // Observar sección de experiencias
    setTimeout(() => {
      const experiencesSection = document.querySelector('.experiences-section');
      if (experiencesSection) {
        experienceObserver.observe(experiencesSection);
      }
    }, 100);
  }
}