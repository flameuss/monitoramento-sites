import axios from 'axios';

export const monitorSites = async () => {
  try {
    // const response = await axios.get('http://localhost:5000/monitor-sites');
    const response = await axios.get('https://servidor-monitoramento.onrender.com/monitor-sites');
    const results = response.data.results;
    const offlineSites = results.filter(result => !result.online).map(result => ({
      site: result.site,
      message: result.message, // Inclua a mensagem de erro
      errorCode: result.errorCode // Inclua o código de erro
    }));
    return offlineSites;
  } catch (error) {
    console.error('Erro ao verificar sites:', error);
    return [];
  }
}  