const app = document.getElementById('app');
let modalAutoCloseTimer = null;

function render() {
  app.innerHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 3rem auto; color: #111;">
      <h1>Simple Frontend</h1>
      <p>This page calls the backend and shows a basic message.</p>
      <div style="margin: 1.5rem 0; padding: 1rem; border: 1px solid #ddd; border-radius: 12px;">
        <strong>Current time</strong>
        <div id="clock" style="font-size: 1.5rem; margin-top: 0.5rem;">--:--:--</div>
      </div>
      <div style="margin: 1.5rem 0; padding: 1rem; border: 1px solid #ddd; border-radius: 12px;">
        <button id="fetchBackend" style="padding: 0.8rem 1.2rem; font-size: 1rem; cursor: pointer; margin-right: 0.75rem;">Fetch backend message</button>
        <button id="queryServerInfo" style="padding: 0.8rem 1.2rem; font-size: 1rem; cursor: pointer;">Query server info</button>
        <pre id="backendResult" style="margin-top: 1rem; background: #f7f7f7; padding: 1rem; border-radius: 8px;">Backend result will appear here.</pre>
      </div>
    </div>
    <div id="modalOverlay" style="display:none; position: fixed; inset: 0; background: rgba(0,0,0,0.45); backdrop-filter: blur(1px); align-items: center; justify-content: center; z-index: 9999;">
      <div style="background: #fff; color: #111; border-radius: 16px; max-width: 380px; width: calc(100% - 2rem); padding: 1.5rem; box-shadow: 0 24px 48px rgba(0,0,0,0.25);">
        <h2 style="margin-top: 0;">Server Info</h2>
        <div id="modalContent" style="margin: 1rem 0; font-size: 0.97rem; line-height: 1.5;"></div>
        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem;">
          <button id="modalOk" style="padding: 0.8rem 1rem; border-radius: 10px; background: #10b981; color: #fff;">OK</button>
          <button id="modalClose" style="padding: 0.8rem 1rem; border-radius: 10px; background: #ef4444; color: #fff;">Close</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('fetchBackend').addEventListener('click', fetchBackendMessage);
  document.getElementById('queryServerInfo').addEventListener('click', queryServerInfo);
  document.getElementById('modalOk').addEventListener('click', hideModal);
  document.getElementById('modalClose').addEventListener('click', hideModal);
  updateClock();
}

function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString();
}

function fetchBackendMessage() {
  const result = document.getElementById('backendResult');
  result.textContent = 'Calling backend...';

  fetch('/api/hello')
    .then((response) => response.json())
    .then((data) => {
      result.textContent = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
      result.textContent = `Error: ${error}`;
    });
}

function queryServerInfo() {
  const result = document.getElementById('backendResult');
  result.textContent = 'Querying server info...';
  document.getElementById('modalContent').textContent = 'Loading server info...';
  showModal();
  setModalLoading(true);

  fetch('/api/server-info')
    .then((response) => response.json())
    .then((data) => {
      setModalLoading(false);
      if (data.error) {
        const message = `Error: ${data.error}`;
        document.getElementById('modalContent').textContent = message;
        result.textContent = message;
      } else {
        const content = `Server name: ${data.servername}\nConfigured CPU: ${data.cpu}`;
        document.getElementById('modalContent').textContent = content;
        result.textContent = 'Server info received.';
      }
    })
    .catch((error) => {
      setModalLoading(false);
      const message = `Error: ${error}`;
      document.getElementById('modalContent').textContent = message;
      result.textContent = message;
    });
}

function showModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.style.display = 'flex';

  if (modalAutoCloseTimer) {
    clearTimeout(modalAutoCloseTimer);
  }
  modalAutoCloseTimer = setTimeout(() => {
    hideModal();
  }, 7000);
}

function hideModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.style.display = 'none';

  if (modalAutoCloseTimer) {
    clearTimeout(modalAutoCloseTimer);
    modalAutoCloseTimer = null;
  }
}

function setModalLoading(isLoading) {
  const okButton = document.getElementById('modalOk');
  const closeButton = document.getElementById('modalClose');
  okButton.disabled = isLoading;
  closeButton.disabled = isLoading;
  okButton.style.opacity = isLoading ? '0.6' : '1';
  closeButton.style.opacity = isLoading ? '0.6' : '1';
}

render();
setInterval(updateClock, 1000);
