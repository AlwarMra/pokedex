const english = {
  MessageHello: 'Hello',
  MessageHowAreYou: 'How are you?',
  MessageNew: 'This is a new message',
}
const spanish = {
  MessageHello: 'Hola',
  MessageHowAreYou: '¿Cómo estás?',
  MessageNew: 'This is a new message',
  MessageRestorePassword: 'Restaurar contraseña',
}

function areTranslationsCorrect(lang1, lang2): boolean {
  const keys1 = Object.keys(lang1)
  const keys2 = Object.keys(lang2)
  if (keys1.length !== keys2.length) return false

  const uniqueKeys = [...new Set([...keys1, ...keys2])]

  for (let key in uniqueKeys) {
    if (uniqueKeys[key] !== lang1[key]) return false
    if (uniqueKeys[key] !== lang2[key]) return false
  }

  return true
}

areTranslationsCorrect(english, spanish)
