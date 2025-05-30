import React, { useState } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  DollarSign, 
  Users, 
  MousePointer, 
  ShoppingCart,
  TrendingUp,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

// Componente de card de métrica
interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  iconBg: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, iconBg }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
        <div className={`p-2 rounded-full ${iconBg}`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{value}</div>
      <div className="flex items-center">
        {change > 0 ? (
          <ArrowUp size={16} className="text-green-500 mr-1" />
        ) : (
          <ArrowDown size={16} className="text-red-500 mr-1" />
        )}
        <span className={`text-sm font-medium ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {Math.abs(change)}% desde o último período
        </span>
      </div>
    </div>
  );
};

// Componente de recomendação da IA
interface AIRecommendationProps {
  title: string;
  description: string;
  impact: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  onApply: () => void;
}

const AIRecommendation: React.FC<AIRecommendationProps> = ({ 
  title, 
  description, 
  impact, 
  confidence,
  onApply 
}) => {
  const confidenceColor = {
    HIGH: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    LOW: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-3">
      <div className="flex items-start">
        <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mr-3">
          <BrainCircuit size={20} />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Impacto: {impact}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${confidenceColor[confidence]}`}>
                {confidence === 'HIGH' ? 'Alta confiança' : confidence === 'MEDIUM' ? 'Média confiança' : 'Baixa confiança'}
              </span>
            </div>
            <button 
              onClick={onApply}
              className="px-3 py-1 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de campanha ativa
interface CampaignItemProps {
  id: string;
  name: string;
  status: string;
  spend: string;
  results: number;
  cpa: string;
}

const CampaignItem: React.FC<CampaignItemProps> = ({ 
  id, 
  name, 
  status, 
  spend, 
  results, 
  cpa 
}) => {
  const statusColor = {
    ACTIVE: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    PAUSED: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    DELETED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-2 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <h4 className="font-medium text-gray-900 dark:text-white">{name}</h4>
            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${statusColor[status] || 'bg-gray-100 text-gray-800'}`}>
              {status}
            </span>
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-4">Gasto: {spend}</span>
            <span className="mr-4">Resultados: {results}</span>
            <span>CPA: {cpa}</span>
          </div>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
      </div>
    </div>
  );
};

// Componente de alerta
interface AlertItemProps {
  type: 'warning' | 'error' | 'success';
  message: string;
  time: string;
}

const AlertItem: React.FC<AlertItemProps> = ({ type, message, time }) => {
  const alertStyles = {
    warning: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900',
    error: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900',
    success: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900',
  };

  const iconStyles = {
    warning: 'text-yellow-500',
    error: 'text-red-500',
    success: 'text-green-500',
  };

  return (
    <div className={`p-3 border rounded-lg mb-2 ${alertStyles[type]}`}>
      <div className="flex items-start">
        <AlertCircle size={18} className={`mr-2 mt-0.5 ${iconStyles[type]}`} />
        <div className="flex-1">
          <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
          <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
        </div>
      </div>
    </div>
  );
};

// Importação do ícone BrainCircuit
import { BrainCircuit } from 'lucide-react';

// Componente principal do Dashboard
export const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  
  // Dados simulados
  const metrics = [
    { 
      title: 'Gasto Total', 
      value: 'R$ 15.000,00', 
      change: 12.5, 
      icon: <DollarSign size={18} className="text-white" />, 
      iconBg: 'bg-blue-500' 
    },
    { 
      title: 'Conversões', 
      value: '375', 
      change: 8.2, 
      icon: <ShoppingCart size={18} className="text-white" />, 
      iconBg: 'bg-green-500' 
    },
    { 
      title: 'CPA', 
      value: 'R$ 40,00', 
      change: -5.3, 
      icon: <TrendingUp size={18} className="text-white" />, 
      iconBg: 'bg-purple-500' 
    },
    { 
      title: 'Alcance', 
      value: '250.000', 
      change: 15.7, 
      icon: <Users size={18} className="text-white" />, 
      iconBg: 'bg-orange-500' 
    },
  ];

  const recommendations = [
    {
      title: 'Aumente o orçamento da campanha "Produto Premium"',
      description: 'Esta campanha está performando 30% acima da média com ROAS de 3.2x.',
      impact: '+15% conversões estimadas',
      confidence: 'HIGH' as const,
      onApply: () => console.log('Aplicando recomendação 1')
    },
    {
      title: 'Pause anúncios de baixo desempenho',
      description: '3 anúncios têm CPA 50% acima da média nos últimos 7 dias.',
      impact: '-20% em gastos ineficientes',
      confidence: 'MEDIUM' as const,
      onApply: () => console.log('Aplicando recomendação 2')
    },
  ];

  const campaigns = [
    {
      id: '23851234567890',
      name: '🔵 RINO PRO - VENDAS - Produto Premium',
      status: 'ACTIVE',
      spend: 'R$ 8.500,00',
      results: 212,
      cpa: 'R$ 40,09'
    },
    {
      id: '23851234567891',
      name: '🔵 RINO PRO - TRÁFEGO - Blog Institucional',
      status: 'ACTIVE',
      spend: 'R$ 4.500,00',
      results: 12000,
      cpa: 'R$ 0,38'
    },
    {
      id: '23851234567892',
      name: '🔵 RINO PRO - LEADS - Webinar',
      status: 'PAUSED',
      spend: 'R$ 2.000,00',
      results: 85,
      cpa: 'R$ 23,53'
    },
  ];

  const alerts = [
    {
      type: 'warning' as const,
      message: 'Orçamento diário quase atingido (85%) para campanha "Produto Premium"',
      time: 'Há 35 minutos'
    },
    {
      type: 'success' as const,
      message: 'Otimização automática aplicada: ajuste de lance para conjunto "Interesse em Marketing"',
      time: 'Há 2 horas'
    },
    {
      type: 'error' as const,
      message: 'Anúncio rejeitado: "Carrossel Produto v2" - Texto com muito texto',
      time: 'Há 5 horas'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Visão geral do desempenho das suas campanhas</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
          </select>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm">
            Exportar
          </button>
        </div>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
            iconBg={metric.iconBg}
          />
        ))}
      </div>

      {/* Gráfico principal e recomendações */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico principal */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Desempenho ao longo do tempo</h3>
            <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm">
              <option value="spend">Gasto</option>
              <option value="conversions">Conversões</option>
              <option value="cpa">CPA</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            [Gráfico de desempenho seria renderizado aqui]
          </div>
        </div>

        {/* Recomendações da IA */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center mb-4">
            <BrainCircuit size={20} className="text-indigo-600 dark:text-indigo-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recomendações da IA</h3>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <AIRecommendation
                key={index}
                title={rec.title}
                description={rec.description}
                impact={rec.impact}
                confidence={rec.confidence}
                onApply={rec.onApply}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Campanhas ativas e alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campanhas ativas */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Campanhas ativas</h3>
            <a href="/campaigns" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              Ver todas
            </a>
          </div>
          <div className="space-y-2">
            {campaigns.map((campaign) => (
              <CampaignItem
                key={campaign.id}
                id={campaign.id}
                name={campaign.name}
                status={campaign.status}
                spend={campaign.spend}
                results={campaign.results}
                cpa={campaign.cpa}
              />
            ))}
          </div>
        </div>

        {/* Alertas e notificações */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Alertas e notificações</h3>
            <a href="/alerts" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              Ver todos
            </a>
          </div>
          <div>
            {alerts.map((alert, index) => (
              <AlertItem
                key={index}
                type={alert.type}
                message={alert.message}
                time={alert.time}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
