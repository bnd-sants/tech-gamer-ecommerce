import type { Product } from '@/types';

export type CheckStatus = 'ok' | 'warning' | 'unknown';
export type SetupSlot = 'cpu' | 'gpu' | 'memory';
export interface SetupInput {
  cpu: Product | null;
  gpu: Product | null;
  memory: Product | null;
  boardSocket: string;
  boardMemory: string;
  psuWatts: number | null;
  gpuLengthMm: number | null;
  caseClearanceMm: number | null;
}
export interface SetupCheck { title: string; detail: string; status: CheckStatus }

export function productSlot(product: Product): SetupSlot | null {
  if (product.specifications.Socket) return 'cpu';
  if (product.specifications.Chipset) return 'gpu';
  if (product.category === 'Hardware' && product.specifications.Tipo?.toUpperCase().includes('DDR')) return 'memory';
  return null;
}

export function evaluateSetup(input: SetupInput): SetupCheck[] {
  const checks: SetupCheck[] = [];
  const socket = input.cpu?.specifications.Socket?.toUpperCase();
  const boardSocket = input.boardSocket.toUpperCase();
  if (!input.cpu || !boardSocket) checks.push({ title: 'Processador e placa-mãe', detail: 'Escolha um processador e informe o socket da placa-mãe para conferir o encaixe.', status: 'unknown' });
  else checks.push(socket === boardSocket
    ? { title: 'Processador e placa-mãe', detail: `Socket ${socket} coincide com o informado para a placa-mãe. BIOS e chipset ainda precisam ser conferidos.`, status: 'ok' }
    : { title: 'Processador e placa-mãe', detail: `O processador usa ${socket || 'socket não informado'}, mas a placa-mãe foi informada como ${boardSocket}.`, status: 'warning' });

  const memoryType = input.memory?.specifications.Tipo?.toUpperCase().match(/DDR\d/)?.[0];
  const boardMemory = input.boardMemory.toUpperCase();
  if (!input.memory || !boardMemory) checks.push({ title: 'Memória e placa-mãe', detail: 'Escolha uma memória e informe o tipo aceito pela placa-mãe.', status: 'unknown' });
  else checks.push(memoryType === boardMemory
    ? { title: 'Memória e placa-mãe', detail: `${memoryType} coincide com o tipo informado. Capacidade e frequência ainda precisam ser confirmadas na ficha da placa-mãe.`, status: 'ok' }
    : { title: 'Memória e placa-mãe', detail: `A memória selecionada é ${memoryType || 'de tipo desconhecido'}; a placa-mãe foi informada como ${boardMemory}.`, status: 'warning' });

  if (!input.cpu || !input.memory) checks.push({ title: 'Memória e processador', detail: 'Selecione processador e memória para verificar o tipo de memória anunciado na ficha.', status: 'unknown' });
  else {
    const cpuMemory = input.cpu.specifications['Suporte de Memória']?.toUpperCase() || '';
    checks.push(cpuMemory && memoryType && cpuMemory.includes(memoryType)
      ? { title: 'Memória e processador', detail: `A ficha do processador menciona ${memoryType}. Frequência final depende da placa-mãe e da configuração.`, status: 'ok' }
      : { title: 'Memória e processador', detail: `A ficha do processador não confirma suporte a ${memoryType || 'este tipo de memória'}.`, status: 'warning' });
  }

  const recommendedWatts = Number(input.gpu?.specifications['Fonte recomendada']?.match(/\d+/)?.[0] || 0);
  if (!input.gpu || !input.psuWatts || !recommendedWatts) checks.push({ title: 'Fonte e placa de vídeo', detail: 'Informe a potência da fonte e escolha uma GPU com recomendação cadastrada.', status: 'unknown' });
  else checks.push(input.psuWatts >= recommendedWatts
    ? { title: 'Fonte e placa de vídeo', detail: `${input.psuWatts} W atende à recomendação de ${recommendedWatts} W da ficha da GPU. Conectores e consumo do conjunto ainda precisam ser verificados.`, status: 'ok' }
    : { title: 'Fonte e placa de vídeo', detail: `A ficha da GPU recomenda ${recommendedWatts} W; você informou ${input.psuWatts} W.`, status: 'warning' });

  if (!input.gpu || !input.gpuLengthMm || !input.caseClearanceMm) checks.push({ title: 'GPU e gabinete', detail: 'Informe o comprimento da GPU e o espaço livre do gabinete segundo as fichas dos fabricantes.', status: 'unknown' });
  else checks.push(input.gpuLengthMm <= input.caseClearanceMm
    ? { title: 'GPU e gabinete', detail: `${input.gpuLengthMm} mm cabem nos ${input.caseClearanceMm} mm informados. Reserve espaço adicional para cabos e refrigeração.`, status: 'ok' }
    : { title: 'GPU e gabinete', detail: `A GPU informada mede ${input.gpuLengthMm} mm, acima dos ${input.caseClearanceMm} mm livres no gabinete.`, status: 'warning' });

  return checks;
}
