import fetch from 'node-fetch';

async function getLogs() {
  try {
    const res = await fetch('https://aviationonline-production.up.railway.app/api/admin/logs');
    const data = await res.json();
    console.log(JSON.stringify(data.slice(-50), null, 2)); // Get last 50 logs
  } catch (err) {
    console.error("Error:", err);
  }
}

getLogs();
