export default async function handler(req, res) {
  console.log('📨 Request recibido');
  console.log('Body:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Solo POST permitido' });
  }

  try {
    let data = req.body;

    // Convertir si viene como string
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    console.log('✅ Datos recibidos:', data);

    // URL de Google Apps Script
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzgrOb6RYT3QAxBMUu5uELOvbtFU2o2-65oPOE0e0tXiW2DCaJuFGbznQ2dN6gzqfkn/exec';

    // Convertir JSON a URLSearchParams (FormData) que entiende Apps Script
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(data)) {
      params.append(key, String(value));
    }

    console.log('📤 Enviando a Apps Script:', params.toString());

    // Enviar como FormData (application/x-www-form-urlencoded)
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const result = await response.text();
    console.log('✅ Respuesta Apps Script:', result);

    return res.status(200).json({
      success: true,
      message: 'Reserva guardada exitosamente',
    });

  } catch (error) {
    console.error('❌ Error en webhook:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
