export const whatsAppNumber = '525634048862'

const defaultWhatsappText = 'Hola Dimensión quiero agendar el envío de una joya a mi domicilio'

const createWhatsAppUrl = (phone, text) => {
  const encodedText = encodeURIComponent(text)

  // https://api.whatsapp.com/send abre la app de WhatsApp si está instalada
  // (Android, iOS y escritorio) y cae al navegador si no. Es el formato oficial
  // y válido en todas las plataformas.
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`
}

export const socialLinks = {
  instagram: 'https://www.instagram.com/joyeria_dimension?igsh=MTJlY2Q5cmIxcWVjMQ%3D%3D&utm_source=qr',
  facebook: 'https://www.facebook.com/share/1JcxFNBGXj/?mibextid=wwXIfr',
  whatsapp: createWhatsAppUrl(whatsAppNumber, defaultWhatsappText),
}

export const createWhatsAppProductLink = (productName) =>
  createWhatsAppUrl(
    whatsAppNumber,
    `Hola Dimensión quiero agendar el envío de esta joya ${productName} a mi domicilio`,
  )
