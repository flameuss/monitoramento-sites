// src/components/SiteStatus.js
import React from 'react';

function SiteStatus({ site, status, message, errorCode }) {
  return (
    <div className="site-status">
      <h3>{site}</h3>
      <p>
        Status: {status ? <span className="online">Online</span> : <span className="offline">Offline</span>}
      </p>
      {message && <p>Mensagem: {message}</p>}
      {errorCode && <p>Código de Erro: {errorCode}</p>}
    </div>
  );
}

export default SiteStatus;