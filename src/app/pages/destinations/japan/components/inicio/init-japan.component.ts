import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit, Output, EventEmitter } from '@angular/core';
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

  @Output() goToItinerary = new EventEmitter<number>();

  goToItineraryTab(value:number) {
    this.goToItinerary.emit(value);
  }

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