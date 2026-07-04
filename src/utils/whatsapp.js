const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '923001234567'

export function whatsappUrl(message) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function productInquiry(product) {
  return whatsappUrl(`Assalam o Alaikum, please check availability for ${product.name}. Product ID: ${product.id || 'N/A'}`)
}

export function supportMessage(topic = 'I need help with car accessories') {
  return whatsappUrl(`Assalam o Alaikum, ${topic}`)
}
