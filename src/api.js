import axios from 'axios';

export const monitorSites = async () => {
  try {
    const response = await axios.get('https://servidor-monitoramento.onrender.com/monitor-sites');
    return response.data.results; // Retorna diretamente o array de sites
  } catch (error) {
    console.error('Erro ao verificar sites:', error);
    return []; // Retorna um array vazio em caso de erro
  }
};