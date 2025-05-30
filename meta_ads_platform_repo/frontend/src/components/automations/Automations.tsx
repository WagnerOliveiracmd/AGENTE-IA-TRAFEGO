import React, { useState } from 'react';
import { 
  Settings, 
  ToggleLeft, 
  BrainCircuit, 
  AlertTriangle, 
  Clock, 
  DollarSign,
  Save,
  RefreshCw
} from 'lucide-react';

// Componente de card de automação
interface AutomationCardProps {
  title: string;
  description: string;
  active: boolean;
  onToggle: () => void;
  type: 'budget' | 'bidding' | 'creative' | 'targeting';
  lastRun?: string;
  impact?: string;
}

const AutomationCard: React.FC<AutomationCardProps> = ({ 
  title, 
  description, 
  active, 
  onToggle, 
  type,
  lastRun,
  impact
}) => {
  const typeIcons = {
    budget: <DollarSign size={20} />,
    bidding: <RefreshCw size={20} />,
    creative: <Settings size={20} />,
    targeting: <BrainCircuit size={20} />
  };
  
  const typeColors = {
    budget: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
    bidding: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
    creative: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300',
    targeting: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className={`p-2 rounded-full ${typeColors[type]} mr-3`}>
            {typeIcons[type]}
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
            
            {lastRun && (
              <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock size={12} className="mr-1" />
                <span>Última execução: {lastRun}</span>
              </div>
            )}
            
            {impact && (
              <div className="flex items-center mt-1 text-xs text-green-600 dark:text-green-400">
                <span>{impact}</span>
              </div>
            )}
          </div>
        </div>
        
        <button 
          onClick={onToggle}
          className={`p-1 rounded-full ${
            active 
              ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' 
              : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
          }`}
        >
          <ToggleLeft size={24} className={active ? 'transform rotate-180' : ''} />
        </button>
      </div>
    </div>
  );
};

// Componente de configuração de regra
interface RuleConfigProps {
  title: string;
  conditions: Array<{
    metric: string;
    operator: string;
    value: number;
  }>;
  actions: Array<{
    type: string;
    value: string;
  }>;
  onSave: () => void;
}

const RuleConfig: React.FC<RuleConfigProps> = ({ title, conditions, actions, onSave }) => {
  const [ruleTitle, setRuleTitle] = useState(title);
  const [ruleConditions, setRuleConditions] = useState(conditions);
  const [ruleActions, setRuleActions] = useState(actions);
  
  // Funções para manipular condições e ações
  const updateCondition = (index: number, field: string, value: any) => {
    const newConditions = [...ruleConditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setRuleConditions(newConditions);
  };
  
  const updateAction = (index: number, field: string, value: any) => {
    const newActions = [...ruleActions];
    newActions[index] = { ...newActions[index], [field]: value };
    setRuleActions(newActions);
  };
  
  const addCondition = () => {
    setRuleConditions([...ruleConditions, { metric: 'ctr', operator: '>', value: 0 }]);
  };
  
  const addAction = () => {
    setRuleActions([...ruleActions, { type: 'increase_budget', value: '10%' }]);
  };
  
  const removeCondition = (index: number) => {
    const newConditions = [...ruleConditions];
    newConditions.splice(index, 1);
    setRuleConditions(newConditions);
  };
  
  const removeAction = (index: number) => {
    const newActions = [...ruleActions];
    newActions.splice(index, 1);
    setRuleActions(newActions);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Configurar regra de automação
      </h3>
      
      <div className="space-y-6">
        {/* Nome da regra */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nome da regra
          </label>
          <input
            type="text"
            value={ruleTitle}
            onChange={(e) => setRuleTitle(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        {/* Condições */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Condições (SE)
            </label>
            <button 
              onClick={addCondition}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              + Adicionar condição
            </button>
          </div>
          
          {ruleConditions.map((condition, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <select
                value={condition.metric}
                onChange={(e) => updateCondition(index, 'metric', e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="ctr">CTR</option>
                <option value="cpc">CPC</option>
                <option value="conversions">Conversões</option>
                <option value="roas">ROAS</option>
                <option value="spend">Gasto</option>
              </select>
              
              <select
                value={condition.operator}
                onChange={(e) => updateCondition(index, 'operator', e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value=">">maior que</option>
                <option value="<">menor que</option>
                <option value=">=">maior ou igual a</option>
                <option value="<=">menor ou igual a</option>
                <option value="==">igual a</option>
              </select>
              
              <input
                type="number"
                value={condition.value}
                onChange={(e) => updateCondition(index, 'value', parseFloat(e.target.value))}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              />
              
              <button 
                onClick={() => removeCondition(index)}
                className="text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </div>
          ))}
          
          {ruleConditions.length === 0 && (
            <div className="text-sm text-gray-500 dark:text-gray-400 italic">
              Nenhuma condição definida
            </div>
          )}
        </div>
        
        {/* Ações */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Ações (ENTÃO)
            </label>
            <button 
              onClick={addAction}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              + Adicionar ação
            </button>
          </div>
          
          {ruleActions.map((action, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <select
                value={action.type}
                onChange={(e) => updateAction(index, 'type', e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="increase_budget">Aumentar orçamento</option>
                <option value="decrease_budget">Diminuir orçamento</option>
                <option value="increase_bid">Aumentar lance</option>
                <option value="decrease_bid">Diminuir lance</option>
                <option value="pause_ad">Pausar anúncio</option>
                <option value="pause_adset">Pausar conjunto</option>
                <option value="send_notification">Enviar notificação</option>
              </select>
              
              <input
                type="text"
                value={action.value}
                onChange={(e) => updateAction(index, 'value', e.target.value)}
                placeholder="Valor ou %"
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              />
              
              <button 
                onClick={() => removeAction(index)}
                className="text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </div>
          ))}
          
          {ruleActions.length === 0 && (
            <div className="text-sm text-gray-500 dark:text-gray-400 italic">
              Nenhuma ação definida
            </div>
          )}
        </div>
        
        {/* Frequência */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Frequência de verificação
          </label>
          <select
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="hourly">A cada hora</option>
            <option value="daily">Diariamente</option>
            <option value="weekly">Semanalmente</option>
          </select>
        </div>
        
        {/* Botões */}
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          
          <button
            onClick={onSave}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center"
          >
            <Save size={16} className="mr-2" />
            Salvar regra
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal de automações
export const Automations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('predefined');
  const [showRuleConfig, setShowRuleConfig] = useState(false);
  const [automations, setAutomations] = useState([
    {
      id: '1',
      title: 'Otimização de orçamento',
      description: 'Ajusta automaticamente o orçamento entre campanhas com base no desempenho',
      active: true,
      type: 'budget' as const,
      lastRun: 'Hoje, 14:30',
      impact: '+15% em ROAS nos últimos 30 dias'
    },
    {
      id: '2',
      title: 'Ajuste de lances',
      description: 'Otimiza lances para maximizar conversões dentro do orçamento',
      active: true,
      type: 'bidding' as const,
      lastRun: 'Hoje, 10:15',
      impact: '-12% em CPA nos últimos 30 dias'
    },
    {
      id: '3',
      title: 'Rotação de criativos',
      description: 'Pausa automaticamente anúncios com baixo desempenho e sugere novos',
      active: false,
      type: 'creative' as const
    },
    {
      id: '4',
      title: 'Expansão de públicos',
      description: 'Testa e expande públicos similares com base em conversões',
      active: false,
      type: 'targeting' as const
    }
  ]);
  
  const [customRules, setCustomRules] = useState([
    {
      id: '101',
      title: 'Pausar anúncios com CTR baixo',
      description: 'Pausa anúncios com CTR < 1% após 1000 impressões',
      active: true,
      type: 'creative' as const,
      lastRun: 'Ontem, 18:45',
      conditions: [
        { metric: 'ctr', operator: '<', value: 1 },
        { metric: 'impressions', operator: '>=', value: 1000 }
      ],
      actions: [
        { type: 'pause_ad', value: 'immediate' }
      ]
    },
    {
      id: '102',
      title: 'Aumentar orçamento para ROAS alto',
      description: 'Aumenta orçamento em 10% quando ROAS > 3',
      active: true,
      type: 'budget' as const,
      lastRun: 'Anteontem, 09:30',
      impact: '+5% em orçamento para campanhas de alto desempenho',
      conditions: [
        { metric: 'roas', operator: '>', value: 3 }
      ],
      actions: [
        { type: 'increase_budget', value: '10%' }
      ]
    }
  ]);
  
  // Função para alternar estado de automação
  const toggleAutomation = (id: string, isPredefined: boolean) => {
    if (isPredefined) {
      setAutomations(automations.map(auto => 
        auto.id === id ? { ...auto, active: !auto.active } : auto
      ));
    } else {
      setCustomRules(customRules.map(rule => 
        rule.id === id ? { ...rule, active: !rule.active } : rule
      ));
    }
  };
  
  // Função para salvar regra personalizada
  const saveRule = () => {
    // Lógica para salvar regra
    setShowRuleConfig(false);
    // Adicionar nova regra ou atualizar existente
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Automações</h1>
          <p className="text-gray-500 dark:text-gray-400">Configure automações inteligentes para suas campanhas</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={() => setShowRuleConfig(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
          >
            + Nova automação
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('predefined')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'predefined'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Automações predefinidas
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'custom'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Regras personalizadas
          </button>
        </nav>
      </div>
      
      {/* Conteúdo da tab ativa */}
      {activeTab === 'predefined' ? (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <BrainCircuit className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Automações com IA
                </h3>
                <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                  <p>
                    Estas automações utilizam inteligência artificial para otimizar suas campanhas 24/7.
                    Ative-as para melhorar o desempenho automaticamente.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {automations.map((automation) => (
              <AutomationCard
                key={automation.id}
                title={automation.title}
                description={automation.description}
                active={automation.active}
                onToggle={() => toggleAutomation(automation.id, true)}
                type={automation.type}
                lastRun={automation.lastRun}
                impact={automation.impact}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                  Regras personalizadas
                </h3>
                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
                  <p>
                    Crie regras personalizadas para automatizar tarefas específicas.
                    Estas regras serão executadas conforme a frequência definida.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {customRules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customRules.map((rule) => (
                <AutomationCard
                  key={rule.id}
                  title={rule.title}
                  description={rule.description}
                  active={rule.active}
                  onToggle={() => toggleAutomation(rule.id, false)}
                  type={rule.type}
                  lastRun={rule.lastRun}
                  impact={rule.impact}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                Você ainda não criou nenhuma regra personalizada.
              </p>
              <button
                onClick={() => setShowRuleConfig(true)}
                className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Criar primeira regra
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Modal de configuração de regra */}
      {showRuleConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Nova regra de automação
                </h2>
                <button 
                  onClick={() => setShowRuleConfig(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  &times;
                </button>
              </div>
              
              <RuleConfig
                title="Nova regra"
                conditions={[{ metric: 'ctr', operator: '<', value: 1 }]}
                actions={[{ type: 'pause_ad', value: 'immediate' }]}
                onSave={saveRule}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
