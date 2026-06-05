import { MODULES } from '../constants/modules';

// Mock do useRouter do Next.js
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Sistema de Navegação Global', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Validar se o módulo Personagens está implementado e navega corretamente', () => {
    const module = MODULES.find(m => m.name === 'Personagens');
    expect(module?.implemented).toBe(true);
    expect(module?.route).toBe('/personagens');
  });

  test('Validar se o módulo Campanhas não está implementado e redireciona para fallback', () => {
    const module = MODULES.find(m => m.name === 'Campanhas');
    expect(module?.implemented).toBe(false);
  });

  test('Validar se o módulo Mundo não está implementado e redireciona para fallback', () => {
    const module = MODULES.find(m => m.name === 'Mundo');
    expect(module?.implemented).toBe(false);
  });

  test('Validar se o módulo Biblioteca RPG não está implementado e redireciona para fallback', () => {
    const module = MODULES.find(m => m.name === 'Biblioteca RPG');
    expect(module?.implemented).toBe(false);
  });

  test('Simulação de fluxo de clique: Módulo Implementado', () => {
    const handleModuleClick = (module: typeof MODULES[0]) => {
      if (module.implemented) {
        mockPush(module.route);
      } else {
        mockPush('/em-construcao');
      }
    };

    const implementedModule = MODULES.find(m => m.implemented)!;
    handleModuleClick(implementedModule);
    expect(mockPush).toHaveBeenCalledWith(implementedModule.route);
  });

  test('Simulação de fluxo de clique: Módulo Em Construção', () => {
    const handleModuleClick = (module: typeof MODULES[0]) => {
      if (module.implemented) {
        mockPush(module.route);
      } else {
        mockPush('/em-construcao');
      }
    };

    const notImplementedModule = MODULES.find(m => !m.implemented)!;
    handleModuleClick(notImplementedModule);
    expect(mockPush).toHaveBeenCalledWith('/em-construcao');
  });
});
