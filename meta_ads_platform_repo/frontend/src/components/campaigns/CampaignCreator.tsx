import React, { useState } from 'react';
import { 
  ArrowRight, 
  Globe, 
  ShoppingCart, 
  MessageCircle, 
  Users, 
  ThumbsUp,
  Award,
  Smartphone,
  Tag,
  Calendar
} from 'lucide-react';

// Componente de seleção de objetivo
interface ObjectiveCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const ObjectiveCard: React.FC<ObjectiveCardProps> = ({ 
  id, 
  title, 
  description, 
  icon, 
  selected, 
  onClick 
}) => {
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        selected 
          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' 
          : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={`p-2 rounded-full ${
          selected 
            ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' 
            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
        } mr-3`}>
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Componente de progresso de criação
interface ProgressStepProps {
  steps: string[];
  currentStep: number;
}

const ProgressStep: React.FC<ProgressStepProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Conectores entre passos */}
            {index > 0 && (
              <div className={`flex-1 h-1 mx-2 ${
                index <= currentStep ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}></div>
            )}
            
            {/* Círculo de passo */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                index < currentStep 
                  ? 'bg-indigo-600 text-white' 
                  : index === currentStep 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}>
                {index < currentStep ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">{step}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Componente principal de criação de campanha
export const CampaignCreator: React.FC = () => {
  // Estados para controlar o fluxo de criação
  const [mode, setMode] = useState<'simple' | 'advanced'>('simple');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedObjective, setSelectedObjective] = useState<string | null>(null);
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [dailyBudget, setDailyBudget] = useState(5000); // R$ 50,00
  
  // Passos do fluxo avançado
  const advancedSteps = ['Objetivo', 'Público', 'Orçamento', 'Criativos', 'Revisão'];
  
  // Objetivos disponíveis
  const objectives = [
    {
      id: 'CONVERSIONS',
      title: 'Vendas',
      description: 'Gerar conversões de vendas no seu site ou app',
      icon: <ShoppingCart size={20} />
    },
    {
      id: 'TRAFFIC',
      title: 'Tráfego',
      description: 'Direcionar pessoas para um destino dentro ou fora do Meta',
      icon: <Globe size={20} />
    },
    {
      id: 'MESSAGES',
      title: 'Mensagens',
      description: 'Incentivar conversas no WhatsApp, Messenger ou Instagram Direct',
      icon: <MessageCircle size={20} />
    },
    {
      id: 'LEAD_GENERATION',
      title: 'Geração de leads',
      description: 'Coletar informações de potenciais clientes',
      icon: <Users size={20} />
    },
    {
      id: 'ENGAGEMENT',
      title: 'Engajamento',
      description: 'Obter mais curtidas, comentários e compartilhamentos',
      icon: <ThumbsUp size={20} />
    },
    {
      id: 'BRAND_AWARENESS',
      title: 'Reconhecimento de marca',
      description: 'Aumentar o conhecimento sobre sua marca',
      icon: <Award size={20} />
    },
    {
      id: 'APP_INSTALLS',
      title: 'Instalações de app',
      description: 'Direcionar pessoas para loja de aplicativos',
      icon: <Smartphone size={20} />
    },
    {
      id: 'CATALOG_SALES',
      title: 'Vendas de catálogo',
      description: 'Mostrar produtos do seu catálogo',
      icon: <Tag size={20} />
    },
    {
      id: 'EVENTS',
      title: 'Eventos',
      description: 'Promover eventos e aumentar participação',
      icon: <Calendar size={20} />
    }
  ];

  // Função para alternar entre modos simples e avançado
  const toggleMode = () => {
    setMode(mode === 'simple' ? 'advanced' : 'simple');
    setCurrentStep(0);
  };

  // Função para analisar URL no modo simples
  const analyzeUrl = () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // Simulação de análise - na implementação real, chamaria a API
    setTimeout(() => {
      setIsAnalyzing(false);
      // Avançar para a tela de confirmação
      setCurrentStep(1);
    }, 2000);
  };

  // Função para avançar no fluxo avançado
  const nextStep = () => {
    if (currentStep < advancedSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Função para voltar no fluxo avançado
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Renderização do modo simples
  const renderSimpleMode = () => {
    if (currentStep === 0) {
      return (
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Crie sua campanha em segundos
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Apenas insira o link do seu produto ou serviço e deixe nossa IA fazer o resto
            </p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL do produto ou serviço
            </label>
            <div className="flex">
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://seusite.com/produto"
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={analyzeUrl}
                disabled={!url || isAnalyzing}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md flex items-center disabled:bg-indigo-400"
              >
                {isAnalyzing ? (
                  <span>Analisando...</span>
                ) : (
                  <>
                    <span>Analisar</span>
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={toggleMode}
              className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline"
            >
              Prefiro criar manualmente (modo avançado)
            </button>
          </div>
        </div>
      );
    } else if (currentStep === 1) {
      // Tela de confirmação após análise
      return (
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Campanha pronta para lançamento!
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Nossa IA analisou seu site e criou uma campanha otimizada
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Detalhes da campanha
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Nome da campanha
                </label>
                <input
                  type="text"
                  value={campaignName || '🔵 RINO PRO - VENDAS - Produto Tecnológico'}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Objetivo
                </label>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2 text-gray-900 dark:text-white">
                  Conversões (Compra)
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Orçamento diário
                </label>
                <div className="flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 mr-2">R$</span>
                  <input
                    type="number"
                    value={dailyBudget / 100}
                    onChange={(e) => setDailyBudget(Number(e.target.value) * 100)}
                    min="10"
                    step="5"
                    className="w-24 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Público-alvo
                </label>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2 text-gray-900 dark:text-white">
                  Idade: 25-55 anos • Interesses: Tecnologia, Gadgets, Inovação
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Criativos
                </label>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2 text-gray-900 dark:text-white">
                  2 anúncios gerados (1 imagem, 1 carrossel)
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(0)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Voltar
            </button>
            
            <button
              onClick={() => alert('Campanha lançada com sucesso!')}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
            >
              Lançar campanha
            </button>
          </div>
        </div>
      );
    }
    
    return null;
  };

  // Renderização do modo avançado
  const renderAdvancedMode = () => {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Criar campanha
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Configure sua campanha passo a passo
          </p>
        </div>
        
        <ProgressStep steps={advancedSteps} currentStep={currentStep} />
        
        {/* Conteúdo do passo atual */}
        {currentStep === 0 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Selecione o objetivo da sua campanha
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {objectives.map((objective) => (
                <ObjectiveCard
                  key={objective.id}
                  id={objective.id}
                  title={objective.title}
                  description={objective.description}
                  icon={objective.icon}
                  selected={selectedObjective === objective.id}
                  onClick={() => setSelectedObjective(objective.id)}
                />
              ))}
            </div>
          </div>
        )}
        
        {currentStep === 1 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Configure o público-alvo
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Aqui seria implementada a interface de configuração de público-alvo
              </p>
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Configure o orçamento e lances
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Aqui seria implementada a interface de configuração de orçamento
              </p>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Configure os criativos
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Aqui seria implementada a interface de configuração de criativos
              </p>
            </div>
          </div>
        )}
        
        {currentStep === 4 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Revise e lance sua campanha
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Aqui seria implementada a interface de revisão final
              </p>
            </div>
          </div>
        )}
        
        {/* Botões de navegação */}
        <div className="mt-8 flex justify-between">
          <div>
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Voltar
              </button>
            )}
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={toggleMode}
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Mudar para modo simples
            </button>
            
            {currentStep < advancedSteps.length - 1 ? (
              <button
                onClick={nextStep}
                disabled={currentStep === 0 && !selectedObjective}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md disabled:bg-indigo-400"
              >
                Próximo
              </button>
            ) : (
              <button
                onClick={() => alert('Campanha lançada com sucesso!')}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
              >
                Lançar campanha
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-6">
      {mode === 'simple' ? renderSimpleMode() : renderAdvancedMode()}
    </div>
  );
};
