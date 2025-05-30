"""
Configuração do backend Flask para funções serverless ou API externa.
Este arquivo adapta o backend para ser compatível com plataformas serverless.
"""

import os
import json
from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from datetime import datetime, timedelta

# Configuração da aplicação Flask
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configuração para ambiente serverless
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'Meta Ads Platform API',
        'version': '1.0.0',
        'timestamp': datetime.now().isoformat()
    })

# Endpoint de status da API
@app.route('/api/status', methods=['GET'])
def api_status():
    return jsonify({
        'status': 'online',
        'version': '1.0.0',
        'timestamp': datetime.now().isoformat()
    })

# Endpoints de autenticação
@app.route('/api/auth/login', methods=['POST'])
def login():
    # Simulação de login para demonstração
    data = request.json
    if data and data.get('email') and data.get('password'):
        return jsonify({
            'message': 'Login realizado com sucesso',
            'access_token': 'demo-token-12345',
            'refresh_token': 'demo-refresh-token-12345',
            'user': {
                'email': data.get('email'),
                'name': 'Usuário Demo'
            }
        })
    return jsonify({'error': 'Credenciais inválidas'}), 401

# Endpoints de Meta Ads
@app.route('/api/meta/accounts', methods=['GET'])
def get_accounts():
    # Dados simulados para demonstração
    return jsonify({
        'accounts': [
            {
                'id': 'act_123456789',
                'name': 'Conta Principal',
                'currency': 'BRL',
                'timezone': 'America/Sao_Paulo',
                'status': 'ACTIVE'
            },
            {
                'id': 'act_987654321',
                'name': 'Conta Secundária',
                'currency': 'BRL',
                'timezone': 'America/Sao_Paulo',
                'status': 'ACTIVE'
            }
        ]
    })

@app.route('/api/meta/account/<account_id>/campaigns', methods=['GET'])
def get_campaigns(account_id):
    # Dados simulados para demonstração
    return jsonify({
        'account_id': account_id,
        'campaigns': [
            {
                'id': '23851234567890',
                'name': '🔵 RINO PRO - VENDAS - Produto Premium',
                'status': 'ACTIVE',
                'objective': 'CONVERSIONS',
                'daily_budget': 5000,
                'insights': {
                    'spend': 120000,
                    'impressions': 500000,
                    'clicks': 15000,
                    'ctr': 3.0,
                    'cpc': 8.0,
                    'conversions': 300,
                    'cost_per_conversion': 400.0
                }
            },
            {
                'id': '23851234567891',
                'name': '🔵 RINO PRO - TRÁFEGO - Blog Institucional',
                'status': 'ACTIVE',
                'objective': 'TRAFFIC',
                'daily_budget': 3000,
                'insights': {
                    'spend': 45000,
                    'impressions': 300000,
                    'clicks': 12000,
                    'ctr': 4.0,
                    'cpc': 3.75,
                    'landing_page_views': 10000
                }
            }
        ],
        'paging': {
            'limit': 50,
            'offset': 0,
            'total': 2
        }
    })

# Endpoints de IA
@app.route('/api/ai/analyze-url', methods=['POST'])
def analyze_url():
    # Simulação de análise de URL para demonstração
    data = request.json
    url = data.get('url', 'https://example.com/product')
    
    return jsonify({
        'url': url,
        'analyzed_at': datetime.now().isoformat(),
        'site_type': 'e-commerce',
        'product_category': 'tecnologia',
        'recommended_campaign': {
            'name': '🔵 RINO PRO - VENDAS - Produto Tecnológico',
            'objective': 'CONVERSIONS',
            'conversion_event': 'PURCHASE',
            'daily_budget': 5000,
            'targeting': {
                'age_min': 25,
                'age_max': 55,
                'genders': [1, 2],
                'interests': ['Tecnologia', 'Gadgets', 'Inovação']
            },
            'creative_suggestions': [
                {
                    'type': 'IMAGE',
                    'title': 'Tecnologia que Transforma',
                    'body': 'Descubra como nosso produto pode revolucionar seu dia a dia. Compre agora com 15% de desconto!',
                    'call_to_action': 'SHOP_NOW'
                }
            ]
        }
    })

@app.route('/api/ai/chat', methods=['POST'])
def chat_with_agent():
    # Simulação de chat com agente para demonstração
    data = request.json
    message = data.get('message', '')
    conversation_id = data.get('conversation_id', '12345')
    
    return jsonify({
        'response': {
            'message': f'Olá! Sou seu assistente de Meta Ads. Entendi sua mensagem: "{message}". Como posso ajudar hoje?',
            'suggestions': [
                'Otimizar minhas campanhas',
                'Criar uma nova campanha',
                'Ver relatório de desempenho'
            ],
            'actions': []
        },
        'conversation_id': conversation_id
    })

# Configuração para serverless
def handler(event, context):
    """Função handler para AWS Lambda."""
    return awsgi.response(app, event, context)

# Configuração para Google Cloud Functions
def gcp_handler(request):
    """Função handler para Google Cloud Functions."""
    with app.request_context(request.environ):
        try:
            rv = app.preprocess_request()
            if rv is None:
                rv = app.dispatch_request()
            response = app.make_response(rv)
            return app.process_response(response)
        except Exception as e:
            return app.handle_exception(e)

# Configuração para execução local
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
