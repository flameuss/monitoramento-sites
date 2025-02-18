// src/App.js
import React, { useEffect, useState } from 'react';
import { monitorSites } from './api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Importe o arquivo CSS
import SiteStatus from './components/SiteStatus';
import { BeatLoader } from 'react-spinners'; // Importe o componente de carregamento

function App() {
  const [sitesStatus, setSitesStatus] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  const checkSites = async () => {
    setLoading(true); // Define o estado de carregamento como true
    const offlineSites = await monitorSites();
    setSitesStatus(offlineSites);
    setLoading(false); // Define o estado de carregamento como false

    if (offlineSites.length > 0) {
      offlineSites.forEach(site => {
        toast.error(`Site offline: ${site.site} - ${site.message} (Código: ${site.errorCode || 'N/A'})`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
    } else {
      toast.success('Todos os sites estão online!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    checkSites(); // Verifica os sites na primeira vez
    const interval = setInterval(checkSites, 5 * 60 * 1000); // Verifica a cada 5 minutos
    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Monitoramento de Sites do CCST/INPE</h1>
      </header>
      <main>
        {loading ? ( // Exibe o indicador de carregamento enquanto loading for true
          <div className="loading">
            <BeatLoader color="#36D7B7" loading={loading} />
            <p>Carregando...</p>
          </div>
        ) : (
          <div className="sites-container">
            {sitesStatus.map((site, index) => (
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