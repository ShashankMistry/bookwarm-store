import booksData from './books.json'

export const BOOK_COVER_CLASS = 'book-cover-card'

export const formatPrice = (value) => `$${Number(value).toFixed(2)}`

export const getRandomOrderId = () => `#BKW-${Math.floor(Math.random() * 9000 + 1000)}`

export const getBookById = (bookId) =>
  booksData.find((book) => book.id === Number(bookId)) || null

export const getTentativeDeliveryDate = (createdAt, offsetDays = 5) => {
  const date = new Date(createdAt)
  date.setDate(date.getDate() + offsetDays)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

const createBookCover = (title, author, primary, secondary) => {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const safeAuthor = author.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const titleLines = []
  const words = title.split(' ')
  let currentLine = ''

  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word
    if (nextLine.length <= 12) {
      currentLine = nextLine
      return
    }

    if (currentLine) titleLines.push(currentLine)
    currentLine = word
  })

  if (currentLine) titleLines.push(currentLine)

  const titleMarkup = titleLines
    .slice(0, 3)
    .map((line, index) => `<tspan x="450" dy="${index === 0 ? 0 : 76}">${line}</tspan>`)
    .join('')

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
      </defs>
      <rect width="900" height="1200" fill="url(#g)"/>
      <rect x="78" y="70" width="744" height="1060" rx="30" fill="rgba(15,23,42,0.18)" stroke="rgba(255,255,255,0.3)"/>
      <circle cx="740" cy="210" r="130" fill="rgba(255,255,255,0.12)"/>
      <circle cx="170" cy="930" r="160" fill="rgba(255,255,255,0.08)"/>
      <text x="450" y="350" text-anchor="middle" fill="white" font-family="Georgia, serif" font-size="72" font-weight="700" letter-spacing="2">${titleMarkup}</text>
      <text x="450" y="830" text-anchor="middle" fill="rgba(255,255,255,0.82)" font-family="Arial, sans-serif" font-size="28" letter-spacing="7">${safeAuthor.toUpperCase()}</text>
      <rect x="260" y="880" width="380" height="4" fill="rgba(255,255,255,0.7)"/>
      <text x="450" y="955" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="Arial, sans-serif" font-size="22" letter-spacing="10">BOOKWORM</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export const resolveBookCover = (book) => {
  const palette = [
    ['#f97316', '#7c2d12'],
    ['#22c55e', '#14532d'],
    ['#38bdf8', '#0f172a'],
    ['#a78bfa', '#312e81'],
    ['#f43f5e', '#7f1d1d'],
    ['#facc15', '#713f12'],
  ]
  const [primary, secondary] = palette[book.id % palette.length]
  return createBookCover(book.title, book.author, primary, secondary)
}

export const BOOK_CATEGORIES = ['All', 'Fiction', 'Mystery', 'Romance', 'Non-Fiction']
