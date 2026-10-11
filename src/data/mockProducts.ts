import type { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Teclado Mecânico Gamer Razer BlackWidow V4 Pro',
    slug: 'teclado-mecanico-gamer-razer-blackwidow-v4-pro',
    price: 1199.90,
    originalPrice: 1499.90,
    discount: 20,
    rating: 4.8,
    reviewCount: 128,
    inStock: true,
    stockQuantity: 15,
    description: 'O Razer BlackWidow V4 Pro é um teclado mecânico gamer completo, equipado com switches mecânicos Razer Green para cliques táteis audíveis, iluminação Razer Chroma RGB por tecla e sob o chassi, além de botões dedicados de macro.',
    shortDescription: 'Teclado Mecânico Gamer de Alto Desempenho com Switches Verdes Razer e Iluminação RGB.',
    features: [
      'Switches Mecânicos Verdes Razer (Táctil e Audível)',
      'Iluminação Razer Chroma RGB personalizável',
      'Teclas de macro dedicadas e dial multifuncional',
      'Descanso de pulso magnético de couro sintético macio'
    ],
    specifications: {
      'Tipo': 'Mecânico',
      'Switch': 'Razer Green Switch',
      'Layout': 'US Layout',
      'Conexão': 'Cabo USB-C removível',
      'Iluminação': 'RGB Chroma'
    },
    images: [
      '/showroom/keyboard.png'
    ],
    category: 'Periféricos',
    brand: 'Razer',
    sku: 'RZ03-04710200-R3U1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Placa de Vídeo NVIDIA RTX 4080 Super ASUS ROG Strix',
    slug: 'placa-de-video-nvidia-rtx-4080-super-asus-rog-strix',
    price: 8499.00,
    originalPrice: 9499.00,
    discount: 10,
    rating: 4.9,
    reviewCount: 64,
    inStock: true,
    stockQuantity: 5,
    description: 'A ROG Strix GeForce RTX 4080 Super traz um significado totalmente novo para seguir o fluxo. Por dentro e por fora, cada elemento da placa dá à monstruosa GPU espaço para respirar livremente e alcançar o desempenho máximo.',
    shortDescription: 'Placa de vídeo de última geração com arquitetura Ada Lovelace, 16GB GDDR6X e ventoinhas Axial-tech.',
    features: [
      'NVIDIA DLSS 3 e Ray Tracing de 3ª geração',
      '16GB de memória GDDR6X',
      'Ventoinhas Axial-tech atualizadas para 23% mais fluxo de ar',
      'Chassi reforçado de metal para rigidez estrutural'
    ],
    specifications: {
      'Chipset': 'NVIDIA GeForce RTX 4080 Super',
      'Memória': '16GB GDDR6X',
      'Interface': '256-bit',
      'Conectores': '3x DisplayPort 1.4a, 2x HDMI 2.1a',
      'Fonte recomendada': '850W'
    },
    images: [
      '/showroom/gpu.png'
    ],
    category: 'Hardware',
    brand: 'ASUS',
    sku: 'ROG-STRIX-RTX4080S-O16G',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Mouse Gamer Logitech G Pro X Superlight 2',
    slug: 'mouse-gamer-logitech-g-pro-x-superlight-2',
    price: 899.90,
    originalPrice: 1099.90,
    discount: 18,
    rating: 4.7,
    reviewCount: 245,
    inStock: true,
    stockQuantity: 22,
    description: 'O ícone do e-sports profissional, agora mais rápido e preciso. O Logitech G Pro X Superlight 2 pesa apenas 60g e conta com o sensor HERO 2 de última geração de 32k DPI, interruptores híbridos LIGHTFORCE e bateria de longa duração.',
    shortDescription: 'Mouse Gamer sem fio ultra-leve de 60g para e-Sports de precisão absoluta.',
    features: [
      'Design ultra-leve de 60 gramas',
      'Sensor óptico HERO 2 com 32.000 DPI',
      'Interruptores mecânico-ópticos híbridos LIGHTFORCE',
      'Tecnologia sem fio LIGHTSPEED com 2000Hz de taxa de transmissão'
    ],
    specifications: {
      'Peso': '60g',
      'Sensor': 'HERO 2',
      'Resolução': '100 - 32.000 DPI',
      'Duração da bateria': 'Até 95 horas de uso contínuo',
      'Conexão': 'Sem fio LIGHTSPEED / USB-C'
    },
    images: [
      '/showroom/mouse.png'
    ],
    category: 'Periféricos',
    brand: 'Logitech',
    sku: '910-006628',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Processador Intel Core i9-14900K Core 24-Threads',
    slug: 'processador-intel-core-i9-14900k-core-24-threads',
    price: 3899.00,
    originalPrice: 4299.00,
    discount: 9,
    rating: 4.9,
    reviewCount: 88,
    inStock: true,
    stockQuantity: 8,
    description: 'O processador Intel Core i9-14900K de 14ª geração eleva os limites do desempenho de desktop. Apresentando 24 núcleos (8 núcleos de desempenho e 16 núcleos eficientes) e frequências de clock de até 6.0 GHz.',
    shortDescription: 'Processador de desktop topo de linha de 24 núcleos de 14ª geração desobstruído para overclock.',
    features: [
      '24 núcleos (8 P-cores + 16 E-cores) / 32 Threads',
      'Intel Thermal Velocity Boost frequência máxima de até 6.0 GHz',
      'Compatível com chipsets Intel séries 600 e 700',
      'Gráficos integrados Intel UHD Graphics 770'
    ],
    specifications: {
      'Socket': 'LGA1700',
      'Frequência base': '3.2 GHz',
      'Cache': '36MB Intel Smart Cache',
      'TDP': '125W base (253W Max Turbo)',
      'Suporte de Memória': 'DDR5 até 5600 MT/s, DDR4 até 3200 MT/s'
    },
    images: [
      '/showroom/cpu.png'
    ],
    category: 'Hardware',
    brand: 'Intel',
    sku: 'BX8071514900K',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Monitor Gamer Alienware 34" Curvo OLED AW3423DWF',
    slug: 'monitor-gamer-alienware-34-curvo-oled-aw3423dwf',
    price: 6499.00,
    originalPrice: 7499.00,
    discount: 13,
    rating: 4.8,
    reviewCount: 39,
    inStock: true,
    stockQuantity: 3,
    description: 'Experimente visuais incrivelmente realistas com o monitor curvo QD-OLED Alienware de 34 polegadas. Apresentando cores vibrantes e pretos infinitos de nível infinito de cinema, taxa de atualização de 165Hz e tempo de resposta de 0.1ms.',
    shortDescription: 'Monitor curvo gamer de 34 polegadas com painel QD-OLED, HDR True Black 400 e taxa de 165Hz.',
    features: [
      'Tecnologia Quantum Dot OLED (QD-OLED)',
      'Tempo de resposta de 0.1ms cinza-a-cinza',
      'Taxa de atualização rápida de 165Hz',
      'Curvatura 1800R para imersão total'
    ],
    specifications: {
      'Tamanho da tela': '34.18 polegadas',
      'Resolução': 'UWQHD (3440 x 1440)',
      'Brilho': '250 cd/m² (típico), 1000 cd/m² (pico)',
      'Contraste': '1.000.000:1 (típico)',
      'Entradas': '2x DisplayPort 1.4, 1x HDMI 2.0, Hub USB'
    },
    images: [
      '/showroom/monitor.png'
    ],
    category: 'Monitores',
    brand: 'Dell Alienware',
    sku: 'AW3423DWF',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Memória RAM Corsair Dominator Platinum RGB 32GB DDR5',
    slug: 'memoria-ram-corsair-dominator-platinum-rgb-32gb-ddr5',
    price: 1399.90,
    originalPrice: 1599.90,
    discount: 12,
    rating: 4.8,
    reviewCount: 92,
    inStock: true,
    stockQuantity: 18,
    description: 'A memória DDR5 Dominator Platinum RGB é otimizada para placas-mãe Intel e AMD, oferecendo frequências mais altas e maior capacidade da tecnologia DDR5, refrigerada pelo sistema patenteado DHX da Corsair.',
    shortDescription: 'Kit de Memória de Desktop DDR5 de alto desempenho com LEDs RGB endereçáveis individualmente.',
    features: [
      'Frequência ultra alta de 6000MHz',
      'Capacidade de 32GB (2x16GB)',
      'Dissipador de calor de alumínio anodizado elegante',
      'LEDs RGB CAPELLIX ultrabrilhantes integrados'
    ],
    specifications: {
      'Capacidade': '32GB (2 x 16GB)',
      'Tipo': 'DDR5 SDRAM',
      'Velocidade': '6000MHz (PC5-48000)',
      'Latência': 'CL36 (36-36-36-76)',
      'Voltagem': '1.35V'
    },
    images: [
      '/showroom/ram.png'
    ],
    category: 'Hardware',
    brand: 'Corsair',
    sku: 'CMT32GX5M2B6000C36',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
