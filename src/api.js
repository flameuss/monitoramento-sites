import axios from 'axios';

export const monitorSites = async () => {
  try {
    const response = await axios.get('https://servidor-monitoramento.onrender.com/monitor-sites');
    return response.data; // Retorna o objeto completo
  } catch (error) {
    console.error('Erro ao verificar sites:', error);
    return { results: [] }; // Retorna um objeto com uma chave results vazia
  }
};