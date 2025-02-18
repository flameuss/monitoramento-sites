import React from 'react';

function SiteStatus({ site, status, message, errorCode }) {
  const isOnline = status === 200; // Verifica se o status é 200 (online)

  return (
    <div className="site-status">
      <div style={{ display: 'flex', alignItems: 'center' }}> {/* Container para alinhamento */}
        <span
          style={{
            color: isOnline ? 'green' : 'red',
            cursor: 'pointer',
            marginRight: '5px' // Espaçamento entre o ponto e o link
          }}
          title={isOnline ? 'Este site está online' : `Erro: ${message} (Código: ${errorCode || 'N/A'})`}
        >
          {isOnline ? '•' : '•'}
        </span>
        <a href={site} target="_blank" rel="noopener noreferrer">{site}</a> {/* Link para o site */}
      </div>

      {!isOnline && ( // Exibe mensagem de erro apenas se offline
        <div> {/* Div para agrupar as mensagens de erro */}
          {message && <p>Mensagem: {message}</p>}
          {errorCode && <p>Código de Erro: {errorCode}</p>}
        </div>
      )}
    </div>
  );
}

export default SiteStatus;