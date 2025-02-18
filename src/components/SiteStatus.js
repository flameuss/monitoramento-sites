import React from 'react';

function SiteStatus({ site, status, message, errorCode }) {
  const isOnline = status === 200;

  return (
    <div className="site-status">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            color: isOnline ? 'green' : 'red',
            cursor: 'pointer',
            marginRight: '5px'
          }}
          title={isOnline ? 'Este site está online' : `Erro: ${message} (Código: ${errorCode || 'N/A'})`}
        >
          {isOnline ? '•' : '•'}
        </span>
        <a href={site} target="_blank" rel="noopener noreferrer">{site}</a>
      </div>

      {!isOnline && ( // Exibe mensagem de erro apenas se offline
        <div>
          {message && <p>Mensagem: {message}</p>}
          {errorCode && <p>Código de Erro: {errorCode}</p>}
        </div>
      )}
    </div>
  );
}

export default SiteStatus;