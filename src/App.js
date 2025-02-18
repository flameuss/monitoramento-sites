import React, { useEffect, useState } from 'react';
import { monitorSites } from './api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SiteStatus from './components/SiteStatus';
import { BeatLoader } from 'react-spinners';

function App() {
  const [sitesStatus, setSitesStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkSites = async () => {
    setLoading(true);
    const response = await monitorSites(); // Obtém a resposta da API
    const allSites = response.results;      // Acessa o array de sites dentro de "results"
    setSitesStatus(allSites);
    setLoading(false);

    const offlineSites = allSites.filter(site => !site.online);
    if (offlineSites.length > 0) {
      offlineSites.forEach(site => {
        toast.error(`Site offline: ${site.site} - ${site.message} (Código: ${site.errorCode || 'N/A'})`, {
          // ... (configuração do toast)
        });
      });
    } else {
      toast.success('Todos os sites estão online!', {
        // ... (configuração do toast)
      });
    }
  };

  useEffect(() => {
    checkSites();
    const interval = setInterval(checkSites, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const orderSites = (sites) => {
    return [...sites].sort((a, b) => b.online - a.online);
  };

  return (
    <div className="App">
      <header>
        <h1>Monitoramento de Sites do CCST/INPE</h1>
      </header>
      <main>
        {loading ? (
          <div className="loading">
            <BeatLoader color="#36D7B7" loading={loading} />
            <p>Carregando...</p>
          </div>
        ) : (
          <div className="sites-container">
            {orderSites(sitesStatus).map((site, index) => ( // Ordena e renderiza
              <SiteStatus key={index} {...site} /> // Passa todos os dados para SiteStatus
            ))}
          </div>
        )}
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;