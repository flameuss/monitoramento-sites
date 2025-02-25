import React, { useEffect, useState } from 'react';
import { monitorSites } from './api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SiteStatus from './components/SiteStatus';
import { BeatLoader } from 'react-spinners';

function App() {
  const [sitesStatus, setSitesStatus] = useState([]);
  const [offlineSites, setOfflineSites] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkSites = async () => {
    setLoading(true);
    try {
      const response = await monitorSites();
      const allSites = response.results || []; // Lida com dados ausentes da API

      if (Array.isArray(allSites)) {
        setSitesStatus(allSites);
        const offline = allSites.filter(site => !site.online); // Filtra offlineSites após atualizar sitesStatus
        setOfflineSites(offline);

        if (offline.length > 0) {
          offline.forEach(site => {
            toast.error(`Site offline: ${site.site} - ${site.message} (Código: ${site.errorCode || 'N/A'})`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        } else {
          toast.success('Todos os sites estão online!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        console.error("Dados da API não estão no formato esperado:", allSites);
        setSitesStatus([]);
        toast.error("Erro ao carregar sites. Verifique o console.");
      }
    } catch (error) {
      console.error("Erro na chamada à API:", error);
      setSitesStatus([]);
      setOfflineSites([]);
      toast.error("Erro ao carregar sites. Verifique o console.");
    } finally {
      setLoading(false);
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
            {orderSites(sitesStatus).map((site, index) => (
              <SiteStatus key={index} {...site} />
            ))}
          </div>
        )}
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;