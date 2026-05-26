// api/webhook.js - COPIA ESTE ARCHIVO EN TU REPO

export default async function handler(req, res) {
  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const data = req.body;
    
    console.log('📨 Webhook recibido en Vercel:', data);

    // URL del Google Apps Script
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzgrOb6RYT3QAxBMUu5uELOvbtFU2o2-65oPOE0e0tXiW2DCaJuFGbznQ2dN6gzqfkn/exec';

    // Enviar a Google Apps Script
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data).toString(),
    });

    const result = await response.text();
    console.log('✅ Respuesta de Apps Script:', result);

    // Retornar al cliente
    return res.status(200).json({ 
      success: true, 
      message: 'Reserva guardada',
      data: result 
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
