export const whatsAppNumber = '525634048862'

const defaultWhatsappText = 'Hola Dimensión quiero agendar el envío de una joya a mi domicilio'

export const socialLinks = {
  instagram: 'https://www.instagram.com/joyeria_dimension?igsh=MTJlY2Q5cmIxcWVjMQ%3D%3D&utm_source=qr',
  facebook: 'https://www.facebook.com/share/1JcxFNBGXj/?mibextid=wwXIfr',
  whatsapp: `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(defaultWhatsappText)}`,
}

export const createWhatsAppProductLink = (productName) =>
  `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(`Hola Dimensión quiero agendar el envío de esta joya ${productName} a mi domicilio`)}`
