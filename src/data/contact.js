export const whatsAppNumber = '525634048862'

const defaultWhatsappText = 'Hola Dimensión quiero agendar el envío de una joya a mi domicilio'

const createWhatsAppUrl = (phone, text) => {
  const encodedText = encodeURIComponent(text)
  const browserFallback = encodeURIComponent(
    `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`,
  )

  if (typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent)) {
    return `intent://send?phone=${phone}&text=${encodedText}#Intent;scheme=whatsapp;package=com.whatsapp;S.browser_fallback_url=${browserFallback};end`
  }

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
