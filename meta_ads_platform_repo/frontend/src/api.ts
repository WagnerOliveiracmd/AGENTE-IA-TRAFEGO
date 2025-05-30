import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    // Tratamento de erro de autenticação
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Serviços de autenticação
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('isAuthenticated', 'true');
    }
    return response.data;
  },
  
  register: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
  },
  
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },
  
  connectMetaAccount: async (accessToken: string) => {
    const response = await api.post('/auth/meta-connect', { access_token: accessToken });
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  }
};

// Serviços de integração com Meta Ads
export const metaService = {
  getAccounts: async () => {
    const response = await api.get('/meta/accounts');
    return response.data;
  },
  
  getCampaigns: async (accountId: string, params = {}) => {
    const response = await api.get(`/meta/account/${accountId}/campaigns`, { params });
    return response.data;
  },
  
  getAdsets: async (accountId: string, params = {}) => {
    const response = await api.get(`/meta/account/${accountId}/adsets`, { params });
    return response.data;
  },
  
  getAds: async (accountId: string, params = {}) => {
    const response = await api.get(`/meta/account/${accountId}/ads`, { params });
    return response.data;
  },
  
  getInsights: async (accountId: string, params = {}) => {
    const response = await api.get(`/meta/account/${accountId}/insights`, { params });
    return response.data;
  },
  
  createCampaign: async (accountId: string, campaignData: any) => {
    const response = await api.post(`/meta/account/${accountId}/campaign`, campaignData);
    return response.data;
  },
  
  updateCampaign: async (accountId: string, campaignId: string, campaignData: any) => {
    const response = await api.put(`/meta/account/${accountId}/campaign/${campaignId}`, campaignData);
    return response.data;
  },
  
  createAdset: async (accountId: string, adsetData: any) => {
    const response = await api.post(`/meta/account/${accountId}/adset`, adsetData);
    return response.data;
  },
  
  createAd: async (accountId: string, adData: any) => {
    const response = await api.post(`/meta/account/${accountId}/ad`, adData);
    return response.data;
  }
};

// Serviços de IA e automação
export const aiService = {
  analyzeUrl: async (url: string) => {
    const response = await api.post('/ai/analyze-url', { url });
    return response.data;
  },
  
  optimizeCampaign: async (campaignId: string, accountId: string, autoApply = false) => {
    const response = await api.post(`/ai/optimize-campaign/${campaignId}`, { 
      account_id: accountId,
      auto_apply: autoApply
    });
    return response.data;
  },
  
  generateCreative: async (productDescription: string, creativeType: string) => {
    const response = await api.post('/ai/generate-creative', { 
      product_description: productDescription,
      creative_type: creativeType
    });
    return response.data;
  },
  
  predictPerformance: async (campaignConfig: any, accountId: string) => {
    const response = await api.post('/ai/predict-performance', { 
      campaign_config: campaignConfig,
      account_id: accountId
    });
    return response.data;
  },
  
  chatWithAgent: async (message: string, conversationId?: string, context = {}) => {
    const response = await api.post('/ai/chat', { 
      message,
      conversation_id: conversationId,
      context
    });
    return response.data;
  }
};

export default api;
