export default async function handler(req, res) {
  console.log('📨 Request Method:', req.method);
  console.log('📨 Request Body:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Solo POST permitido' });
  }

  try {
    // Obtener datos del body
    let data = req.body;
    
    // Si viene como FormData, convertir
    if (typeof data === 'string') {
      data = Object.fromEntries(new URLSearchParams(data));
    }

    console.log('✅ Datos procesados:', data);

    // URL de Google Apps Script
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzgrOb6RYT3QAxBMUu5uELOvbtFU2o2-65oPOE0e0tXiW2DCaJuFGbznQ2dN6gzqfkn/exec';

    // Enviar a Google Apps Script
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.text();
    console.log('✅ Respuesta Apps Script:', result);

    return res.status(200).json({
      success: true,
      message: 'Reserva guardada exitosamente',
      data: result,
    });

  } catch (error) {
    console.error('❌ Error en webhook:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
