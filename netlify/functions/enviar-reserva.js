exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ success: false, error: "Method not allowed" }) };
  }

  try {
    const payload = JSON.parse(event.body);
    
    const webhookUrl = "https://script.google.com/macros/s/AKfycbzgrOb6RYT3QAxBMUu5uELOvbtFU2o2-65oPOE0e0tXiW2DCaJuFGbznQ2dN6gzqfkn/exec";

    // Enviar datos a Google Apps Script
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(payload).toString()
    });

    const result = await response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Reserva procesada exitosamente",
        data: result
      })
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
