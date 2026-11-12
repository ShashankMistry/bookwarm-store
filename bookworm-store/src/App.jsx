import React, { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  Check,
  CreditCard,
  Heart,
  MapPin,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Tag,
  Trash2,
  Wallet,
} from 'lucide-react'

const BOOK_COVER_CLASS = 'book-cover-card'
const categories = ['All', 'Fiction', 'Mystery', 'Romance', 'Non-Fiction']
const STORAGE_KEYS = {
  cart: 'bookworm-cart',
  wishlist: 'bookworm-wishlist',
  orders: 'bookworm-orders',
}

const readStorageValue = (key, fallback) => {
  if (typeof window === 'undefined') return fallback

  try {
    const rawValue = window.localStorage.getItem(key)
    return rawValue ? JSON.parse(rawValue) : fallback
  } catch {
    return fallback
  }
}

const writeStorageValue = (key, value) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore storage write errors from restricted browser contexts.
  }
}

const books = [
  {
    id: 1,
    title: 'Joy of Minimalism',
    author: 'Daniel Reed',
    category: 'Fiction',
    price: 149,
    rating: 4.8,
    reviews: 284,
    delivery: 'Delivery by Thursday',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
    description: 'A thoughtful journey toward calmer living, intentional habits, and the quiet pleasure of owning less.',
  },
  {
    id: 2,
    title: 'The Silent Archive',
    author: 'Nadia Quinn',
    category: 'Mystery',
    price: 299,
    rating: 4.7,
    reviews: 197,
    delivery: 'Delivery by Friday',
    cover: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=900&q=80',
    description: 'A missing historian, a hidden collection, and a trail of coded truths that reshapes a city’s past.',
  },
  {
    id: 3,
    title: 'Paper Hearts',
    author: 'Sofia Bennett',
    category: 'Romance',
    price: 219,
    rating: 4.9,
    reviews: 362,
    delivery: 'Delivery by Wednesday',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80',
    description: 'When a bestselling novelist meets a veteran bookstore owner, a handwritten correspondence changes everything.',
  },
  {
    id: 4,
    title: 'Tiny Habits, Big Wins',
    author: 'Priya Sharma',
    category: 'Non-Fiction',
    price: 189,
    rating: 4.6,
    reviews: 214,
    delivery: 'Delivery by Thursday',
    cover: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    description: 'Build sustainable routines that stick with simple changes, measured progress, and the power of consistency.',
  },
  {
    id: 5,
    title: 'The Midnight Almanac',
    author: 'Ethan Cole',
    category: 'Mystery',
    price: 329,
    rating: 4.8,
    reviews: 286,
    delivery: 'Delivery by Friday',
    cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80',
    description: 'A cold-case journalist uncovers a chain of disappearances hidden inside a forgotten city chronicle.',
  },
  {
    id: 6,
    title: 'Skyline Letters',
    author: 'Mila Rhodes',
    category: 'Romance',
    price: 249,
    rating: 4.7,
    reviews: 241,
    delivery: 'Delivery by Saturday',
    cover: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80',
    description: 'A decades-old love note and an unexpected move bring two strangers together in the heart of a rainy city.',
  },
  {
    id: 7,
    title: 'The Last Page',
    author: 'Harper Lane',
    category: 'Fiction',
    price: 279,
    rating: 4.9,
    reviews: 401,
    delivery: 'Delivery by Thursday',
    cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80',
    description: 'A story about memory, second chances, and the bravery it takes to rewrite a life after a fading chapter.',
  },
  {
    id: 8,
    title: 'Purpose in Plain Sight',
    author: 'Alicia Moore',
    category: 'Non-Fiction',
    price: 169,
    rating: 4.5,
    reviews: 145,
    delivery: 'Delivery by Wednesday',
    cover: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=900&q=80',
    description: 'A practical and inspiring guide to aligning your work, energy, and values with a meaningful life.',
  },
  {
    id: 9,
    title: 'Velvet Echoes',
    author: 'Lena Cartwright',
    category: 'Romance',
    price: 259,
    rating: 4.8,
    reviews: 211,
    delivery: 'Delivery by Thursday',
    cover: 'https://images.unsplash.com/photo-1525302220185-c387a117886e?auto=format&fit=crop&w=900&q=80',
    description: 'A singer and a restaurateur trade secrets across a city lit by velvet nights and second chances.',
  },
  {
    id: 10,
    title: 'The Lantern Code',
    author: 'Marcus Vale',
    category: 'Mystery',
    price: 319,
    rating: 4.7,
    reviews: 248,
    delivery: 'Delivery by Friday',
    cover: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80',
    description: 'An encrypted lantern map leads a town through a labyrinth of secrets and betrayals.',
  },
  {
    id: 11,
    title: 'Ashes of Morning',
    author: 'Maya Torres',
    category: 'Fiction',
    price: 179,
    rating: 4.6,
    reviews: 189,
    delivery: 'Delivery by Tuesday',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80',
    description: 'A mother returns to her hometown to heal old wounds and discover what remains after the fire.',
  },
  {
    id: 12,
    title: 'The Art of Enough',
    author: 'Nora Greene',
    category: 'Non-Fiction',
    price: 199,
    rating: 4.9,
    reviews: 310,
    delivery: 'Delivery by Monday',
    cover: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    description: 'A modern philosophy for living well without chasing endless accumulation and burnout.',
  },
  {
    id: 13,
    title: 'Northbound Signal',
    author: 'Ravi Sethi',
    category: 'Mystery',
    price: 344,
    rating: 4.8,
    reviews: 267,
    delivery: 'Delivery by Friday',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80',
    description: 'A railway engineer hears a final whistle that leads him toward a vanished convoy and a buried lie.',
  },
  {
    id: 14,
    title: 'Bloom in Winter',
    author: 'Olivia Park',
    category: 'Romance',
    price: 229,
    rating: 4.7,
    reviews: 204,
    delivery: 'Delivery by Wednesday',
    cover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    description: 'Two winter wedding planners find love in the hush between deadlines and impossible vows.',
  },
  {
    id: 15,
    title: 'Blueprint for Calm',
    author: 'Theo Miller',
    category: 'Non-Fiction',
    price: 179,
    rating: 4.5,
    reviews: 172,
    delivery: 'Delivery by Thursday',
    cover: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    description: 'Design your home and mind around stillness, order, and habits that feel possible.',
  },
  {
    id: 16,
    title: 'Glass Harbor',
    author: 'Ava Wilson',
    category: 'Fiction',
    price: 289,
    rating: 4.9,
    reviews: 345,
    delivery: 'Delivery by Friday',
    cover: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    description: 'An isolated coastal town and a hidden family memoir unravel a century of silence and grief.',
  },
  {
    id: 17,
    title: 'The Pine Room',
    author: 'Samantha Brooks',
    category: 'Mystery',
    price: 264,
    rating: 4.6,
    reviews: 193,
    delivery: 'Delivery by Tuesday',
    cover: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
    description: 'A cabin in the woods hides many winter stories, but one belongs to the missing caretaker.',
  },
  {
    id: 18,
    title: 'Before the Moon Rises',
    author: 'Nikhil Rao',
    category: 'Romance',
    price: 239,
    rating: 4.8,
    reviews: 228,
    delivery: 'Delivery by Thursday',
    cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80',
    description: 'A moonlit rooftop conversation turns into a tender, witty love story across a city skyline.',
  },
  {
    id: 19,
    title: 'Slow Brightness',
    author: 'Cora Flint',
    category: 'Non-Fiction',
    price: 214,
    rating: 4.7,
    reviews: 166,
    delivery: 'Delivery by Monday',
    cover: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&w=900&q=80',
    description: 'Learn how to focus attention, recover your energy, and design a life of gentle intention.',
  },
  {
    id: 20,
    title: 'Concrete & Tulips',
    author: 'Eva Rossi',
    category: 'Fiction',
    price: 209,
    rating: 4.5,
    reviews: 180,
    delivery: 'Delivery by Friday',
    cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    description: 'A young artist plants tulips between stone walls and starts to rebuild the life she left behind.',
  },
  {
    id: 21,
    title: 'The Hidden Ledger',
    author: 'Julian Price',
    category: 'Mystery',
    price: 332,
    rating: 4.8,
    reviews: 279,
    delivery: 'Delivery by Saturday',
    cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    description: 'A finance clerk discovers evidence pointing to an empire built on missing numbers and stolen trust.',
  },
  {
    id: 22,
    title: 'Mosaic of Us',
    author: 'Harper James',
    category: 'Romance',
    price: 219,
    rating: 4.6,
    reviews: 198,
    delivery: 'Delivery by Wednesday',
    cover: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    description: 'A couple pieces together a life from fragments of memories, chance meetings, and second chances.',
  },
  {
    id: 23,
    title: 'The Gentle Algorithm',
    author: 'Rina Shah',
    category: 'Non-Fiction',
    price: 244,
    rating: 4.9,
    reviews: 292,
    delivery: 'Delivery by Thursday',
    cover: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80',
    description: 'A practical guide to using technology with intention, clarity, and the patience to live well.',
  },
  {
    id: 24,
    title: 'Juniper House',
    author: 'Clara Bennett',
    category: 'Fiction',
    price: 269,
    rating: 4.7,
    reviews: 206,
    delivery: 'Delivery by Tuesday',
    cover: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80',
    description: 'A house full of inherited stories becomes a place for reinvention and the courage to start over.',
  },
  {
    id: 25,
    title: 'The Last Sunset Club',
    author: 'Noah Griffith',
    category: 'Mystery',
    price: 299,
    rating: 4.6,
    reviews: 187,
    delivery: 'Delivery by Friday',
    cover: 'https://images.unsplash.com/photo-1517486800579-0b2c2f44c8f9?auto=format&fit=crop&w=900&q=80',
    description: 'An old beach club becomes the stage for a missing heir, a hidden will, and a very long summer.',
  },
  {
    id: 26,
    title: 'My Lovely Forecast',
    author: 'Iris Stone',
    category: 'Romance',
    price: 199,
    rating: 4.5,
    reviews: 177,
    delivery: 'Delivery by Wednesday',
    cover: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=900&q=80',
    description: 'A weather expert and a local café owner fall in love one storm at a time.',
  },
  {
    id: 27,
    title: 'The Long Route Home',
    author: 'Samir Khan',
    category: 'Fiction',
    price: 239,
    rating: 4.8,
    reviews: 254,
    delivery: 'Delivery by Monday',
    cover: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=900&q=80',
    description: 'A road trip across the coast becomes a reunion with memory, family, and self-discovery.',
  },
  {
    id: 28,
    title: 'Build a Life You Keep',
    author: 'Leah Turner',
    category: 'Non-Fiction',
    price: 179,
    rating: 4.7,
    reviews: 188,
    delivery: 'Delivery by Thursday',
    cover: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    description: 'Create routines that honor your values and give your life shape, rhythm, and joy.',
  },
  {
    id: 29,
    title: 'Copper Leaves',
    author: 'Zoe Holloway',
    category: 'Mystery',
    price: 289,
    rating: 4.7,
    reviews: 195,
    delivery: 'Delivery by Friday',
    cover: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    description: 'In a town famous for autumn color, a missing journalist is linked to a decades-old photograph.',
  },
  {
    id: 30,
    title: 'The Quiet Apartment',
    author: 'Priya Nair',
    category: 'Fiction',
    price: 189,
    rating: 4.6,
    reviews: 176,
    delivery: 'Delivery by Tuesday',
    cover: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    description: 'A solitary apartment becomes a mirror for love, grief, and the courage to start life again.',
  },
  {
    id: 31,
    title: 'Whispering Maps',
    author: 'Mason Hill',
    category: 'Mystery',
    price: 312,
    rating: 4.8,
    reviews: 241,
    delivery: 'Delivery by Saturday',
    cover: 'https://images.unsplash.com/photo-1517486800579-0b2c2f44c8f9?auto=format&fit=crop&w=900&q=80',
    description: 'A mapmaker follows hand-drawn routes that only appear in forgotten stories and lost letters.',
  },
  {
    id: 32,
    title: 'The Summer We Stayed',
    author: 'Megan Holt',
    category: 'Romance',
    price: 234,
    rating: 4.7,
    reviews: 214,
    delivery: 'Delivery by Wednesday',
    cover: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    description: 'A summer house and an old notebook rewrite the future for two people who thought they were done.',
  },
  {
    id: 33,
    title: 'Unfinished Notes',
    author: 'Felix Harper',
    category: 'Non-Fiction',
    price: 204,
    rating: 4.6,
    reviews: 149,
    delivery: 'Delivery by Thursday',
    cover: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    description: 'A practical memoir on creative habits, attention, and the courage to make work that matters.',
  },
  {
    id: 34,
    title: 'Common Ground',
    author: 'Ella Davis',
    category: 'Fiction',
    price: 224,
    rating: 4.8,
    reviews: 228,
    delivery: 'Delivery by Friday',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80',
    description: 'Neighbors, memories, and a shared garden become the soil for a new beginning.',
  },
  {
    id: 35,
    title: 'The Night Window',
    author: 'Adrian West',
    category: 'Mystery',
    price: 320,
    rating: 4.9,
    reviews: 337,
    delivery: 'Delivery by Saturday',
    cover: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=900&q=80',
    description: 'A writer sees something across the alleyway that could destroy a mayoral secret and a family lie.',
  },
  {
    id: 36,
    title: 'Letters to the Sea',
    author: 'Catherine Blue',
    category: 'Romance',
    price: 215,
    rating: 4.7,
    reviews: 205,
    delivery: 'Delivery by Wednesday',
    cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    description: 'A writer and a ferryman exchange letters under a salt-air sky and discover home in each other.',
  },
  {
    id: 37,
    title: 'Threads of Focus',
    author: 'Daniel Wu',
    category: 'Non-Fiction',
    price: 194,
    rating: 4.6,
    reviews: 163,
    delivery: 'Delivery by Tuesday',
    cover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    description: 'A practical playbook for deep work, calm attention, and sustainable creative momentum.',
  },
  {
    id: 38,
    title: 'The Orchard Key',
    author: 'Elena Frost',
    category: 'Fiction',
    price: 275,
    rating: 4.8,
    reviews: 260,
    delivery: 'Delivery by Thursday',
    cover: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    description: 'An orchard full of old keys, hidden rooms, and family stories turns into a winter legend.',
  },
  {
    id: 39,
    title: 'The Brightest Habit',
    author: 'Grace Quinn',
    category: 'Non-Fiction',
    price: 186,
    rating: 4.5,
    reviews: 171,
    delivery: 'Delivery by Monday',
    cover: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    description: 'A focused and hopeful manual for creating daily rituals that support your energy and goals.',
  },
  {
    id: 40,
    title: 'The Red Hour',
    author: 'Victor Lane',
    category: 'Mystery',
    price: 349,
    rating: 4.9,
    reviews: 358,
    delivery: 'Delivery by Friday',
    cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    description: 'As a city closes for the night, a single hour of surveillance footage exposes a long-running cover-up.',
  },
]

const formatPrice = (value) => `$${Number(value).toFixed(2)}`
const getRandomOrderId = () => `#BKW-${Math.floor(Math.random() * 9000 + 1000)}`
const getBookById = (bookId) => books.find((book) => book.id === bookId)
const getTentativeDeliveryDate = (createdAt, offsetDays = 5) => {
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

const resolveBookCover = (book) => {
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

const initialOrders = [
  {
    id: '#BKW-1041',
    user_id: 1,
    status: 'paid',
    total_amount: 368,
    shipping_address: '12 River Road, Bengaluru, 560001',
    coupon_code: 'GIFT50',
    created_at: '2026-11-03T10:30:00.000Z',
    items: [
      { book_id: 1, quantity: 1, price_at_purchase: 149 },
      { book_id: 3, quantity: 1, price_at_purchase: 219 },
    ],
  },
  {
    id: '#BKW-2038',
    user_id: 1,
    status: 'shipped',
    total_amount: 249,
    shipping_address: '12 River Road, Bengaluru, 560001',
    coupon_code: null,
    created_at: '2026-11-07T13:45:00.000Z',
    items: [{ book_id: 6, quantity: 1, price_at_purchase: 249 }],
  },
]

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentView, setCurrentView] = useState('home')
  const [selectedBookId, setSelectedBookId] = useState(1)
  const [cart, setCart] = useState(() => readStorageValue(STORAGE_KEYS.cart, []))
  const [wishlist, setWishlist] = useState(() => readStorageValue(STORAGE_KEYS.wishlist, [2, 6]))
  const [orders, setOrders] = useState(() => readStorageValue(STORAGE_KEYS.orders, initialOrders))
  const [showAllCatalog, setShowAllCatalog] = useState(false)
  const [toast, setToast] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [authMode, setAuthMode] = useState('login')
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [authError, setAuthError] = useState('')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [cancelNotice, setCancelNotice] = useState('')
  const [couponInput, setCouponInput] = useState('')
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    pincode: '',
  })
  const [addressErrors, setAddressErrors] = useState({})
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
  })
  const [paymentErrors, setPaymentErrors] = useState({})

  useEffect(() => {
    writeStorageValue(STORAGE_KEYS.cart, cart)
  }, [cart])

  useEffect(() => {
    writeStorageValue(STORAGE_KEYS.wishlist, wishlist)
  }, [wishlist])

  useEffect(() => {
    writeStorageValue(STORAGE_KEYS.orders, orders)
  }, [orders])

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesCategory = activeCategory === 'All' || book.category === activeCategory
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchTerm])

  const homeShelves = useMemo(
    () => [
      { title: 'Recommended for You', start: 0 },
      { title: 'Bestsellers this Month', start: 5 },
      { title: 'New Launches', start: 10 },
    ],
    [],
  )

  const selectedBook = books.find((book) => book.id === selectedBookId) || books[0]
  const relatedBooks = books.filter(
    (book) => book.category === selectedBook.category && book.id !== selectedBook.id,
  )

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const couponDiscount = couponInput.trim().toUpperCase() === 'GIFT50' ? 50 : 0
  const tax = subtotal * 0.08
  const total = Math.max(0, subtotal + tax - couponDiscount)

  useEffect(() => {
    if (!toast) return

    const timeoutId = window.setTimeout(() => setToast(null), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [toast])

  const handleOpenBook = (bookId) => {
    setSelectedBookId(bookId)
    setCurrentView('detail')
  }

  const handleToggleWishlist = (bookId) => {
    const isInWishlist = wishlist.includes(bookId)

    setWishlist((current) =>
      isInWishlist ? current.filter((id) => id !== bookId) : [...current, bookId],
    )

    setToast({
      message: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      type: 'info',
    })
  }

  const handleAddToCart = (book, openCart = false) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === book.id)
      if (existing) {
        return currentCart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...currentCart, { ...book, quantity: 1 }]
    })

    setToast({
      message: `${book.title} added to cart`,
      type: 'success',
    })

    if (openCart) {
      setCurrentView('cart')
    }
  }

  const handleChangeQuantity = (bookId, delta) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === bookId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const handleRemoveItem = (bookId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== bookId))
  }

  const validateAddress = () => {
    const nextErrors = {}

    if (!address.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!address.street.trim()) nextErrors.street = 'Street address is required.'
    if (!address.city.trim()) nextErrors.city = 'City is required.'
    if (!address.pincode.trim()) nextErrors.pincode = 'Pincode is required.'

    setAddressErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const validatePayment = () => {
    const nextErrors = {}

    if (paymentMethod === 'card') {
      const cardNumber = paymentDetails.cardNumber.replace(/\s+/g, '')
      if (!/^\d{16}$/.test(cardNumber)) nextErrors.cardNumber = 'Enter a valid 16-digit card number.'
      if (!/^(0[1-9]|1[0-2])\/?\d{2}$/.test(paymentDetails.expiry)) nextErrors.expiry = 'Use MM/YY format.'
      if (!/^\d{3,4}$/.test(paymentDetails.cvv)) nextErrors.cvv = 'Enter a valid CVV.'
      if (!paymentDetails.cardName.trim()) nextErrors.cardName = 'Name on card is required.'
    }

    setPaymentErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleProceedToPayment = () => {
    if (cart.length === 0) return
    if (!validateAddress()) return
    setCurrentView('checkout')
    setShowPaymentModal(true)
  }

  const handlePayNow = () => {
    if (!validatePayment()) return

    setPaymentProcessing(true)
    window.setTimeout(() => {
      const createdOrderId = getRandomOrderId()
      const createdOrder = {
        id: createdOrderId,
        user_id: 1,
        status: 'paid',
        total_amount: Number(total.toFixed(2)),
        shipping_address: [address.fullName, address.street, address.city, address.pincode]
          .filter(Boolean)
          .join(', '),
        coupon_code: couponInput.trim() || null,
        created_at: new Date().toISOString(),
        items: cart.map((item) => ({
          book_id: item.id,
          quantity: item.quantity,
          price_at_purchase: item.price,
        })),
      }

      setPaymentProcessing(false)
      setShowPaymentModal(false)
      setOrderId(createdOrderId)
      setOrders((currentOrders) => [createdOrder, ...currentOrders])
      setCurrentView('confirmation')
    }, 1500)
  }

  const handleBuyAgain = (book) => {
    handleAddToCart(book, true)
  }

  const handleContinueShopping = () => {
    setCurrentView('home')
    setCart([])
    setCouponInput('')
    setAddress({ fullName: '', street: '', city: '', pincode: '' })
    setCancelNotice('')
    setShowPaymentModal(false)
    setPaymentProcessing(false)
    setOrderId('')
  }

  const handleAuthSubmit = (event) => {
    event.preventDefault()

    if (authMode === 'register') {
      if (!authForm.name.trim()) {
        setAuthError('Please enter your full name.')
        return
      }
      if (!authForm.email.includes('@')) {
        setAuthError('Please enter a valid email address.')
        return
      }
      if (authForm.password.length < 6) {
        setAuthError('Password must be at least 6 characters long.')
        return
      }
      if (authForm.password !== authForm.confirmPassword) {
        setAuthError('Passwords do not match.')
        return
      }
    } else if (!authForm.email.includes('@') || authForm.password.length < 6) {
      setAuthError('Please enter a valid email and password.')
      return
    }

    setAuthError('')
    setIsAuthenticated(true)
    setCurrentView('home')
    setAuthForm({ name: '', email: '', password: '', confirmPassword: '' })
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentView('auth')
    setAuthMode('login')
    setAuthError('')
  }

  const handleOpenOrders = () => {
    setCancelNotice('')
    setCurrentView('orders')
  }

  const handleOpenWishlist = () => {
    setCancelNotice('')
    setCurrentView('wishlist')
  }

  const handleCancelOrder = () => {
    setOrders((currentOrders) =>
      currentOrders.map((entry) =>
        entry.id === orderId ? { ...entry, status: 'cancelled' } : entry,
      ),
    )
    setCancelNotice('Order cancelled successfully. Refund will be processed within 48 hours.')
  }

  const renderShelf = (title, items, isExpanded = false) => (
    <section key={title} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <button
          type="button"
          onClick={() => setShowAllCatalog(!showAllCatalog)}
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          {isExpanded ? 'Show less' : 'View all'}
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3">
        {items.length > 0 ? (
          items.map((book) => (
            <article
              key={book.id}
              className="min-w-[220px] rounded-2xl border border-neutral-800 bg-[#1e1e1e] p-3 shadow-lg shadow-black/20"
            >
              <div className="relative">
                <button type="button" onClick={() => handleOpenBook(book.id)} className="block rounded-xl">
                  <img src={resolveBookCover(book)} alt={book.title} className={BOOK_COVER_CLASS} />
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleWishlist(book.id)}
                  className={`absolute right-2 top-2 rounded-full p-2 ${
                    wishlist.includes(book.id) ? 'bg-blue-500 text-white' : 'bg-slate-900/80 text-slate-200'
                  }`}
                  aria-label={`wishlist-${book.title}`}
                >
                  <Heart size={16} fill={wishlist.includes(book.id) ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <button type="button" onClick={() => handleOpenBook(book.id)} className="text-left">
                  <h3 className="text-lg font-semibold text-white">{book.title}</h3>
                </button>
                <p className="text-sm text-slate-400">{book.author}</p>

                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span className="font-medium text-blue-400">{formatPrice(book.price)}</span>
                  <span className="flex items-center gap-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    {book.rating}
                  </span>
                </div>

                <p className="text-xs text-slate-400">{book.delivery}</p>

                <button
                  type="button"
                  onClick={() => handleAddToCart(book)}
                  className="mt-3 w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-700 bg-[#1e1e1e] p-6 text-slate-400">
            No books match your search.
          </div>
        )}
      </div>
    </section>
  )

  const renderAuthView = () => (
    <div className="flex min-h-screen items-center justify-center bg-[#121212] px-4 py-10 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-[#1e1e1e] p-7 shadow-2xl shadow-black/30">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">B</div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Bookworm</p>
            <h1 className="text-2xl font-bold text-white">Book Worm</h1>
          </div>
        </div>

        <div className="mb-5 flex rounded-xl border border-neutral-800 bg-[#161616] p-1">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold ${
              authMode === 'login' ? 'bg-blue-600 text-white' : 'text-slate-300'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold ${
              authMode === 'register' ? 'bg-blue-600 text-white' : 'text-slate-300'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="mb-1 block text-sm text-slate-300">Full Name</label>
              <input
                type="text"
                value={authForm.name}
                onChange={(event) => setAuthForm({ ...authForm, name: event.target.value })}
                placeholder="Jane Doe"
                className="w-full rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm text-slate-300">Email</label>
            <input
              type="email"
              value={authForm.email}
              onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Password</label>
            <input
              type="password"
              value={authForm.password}
              onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })}
              placeholder="At least 6 characters"
              className="w-full rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {authMode === 'register' && (
            <div>
              <label className="mb-1 block text-sm text-slate-300">Confirm Password</label>
              <input
                type="password"
                value={authForm.confirmPassword}
                onChange={(event) => setAuthForm({ ...authForm, confirmPassword: event.target.value })}
                placeholder="Repeat password"
                className="w-full rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          )}

          {authError && <p className="text-sm text-red-400">{authError}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            {authMode === 'login' ? 'Login to Continue' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )

  const renderHomePage = () => (
    <div className="min-h-screen bg-[#121212] text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-2xl border border-neutral-800 bg-[#1e1e1e] px-4 py-4 shadow-lg shadow-black/20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                B
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Bookworm</p>
                <h1 className="text-xl font-bold text-white">Book Worm</h1>
              </div>
            </div>

            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search books, authors, genres"
                className="w-full rounded-xl border border-neutral-800 bg-[#161616] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleOpenOrders}
                className="rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2 text-sm text-slate-200 transition hover:border-slate-700"
              >
                My Orders
              </button>
              <button
                type="button"
                onClick={handleOpenWishlist}
                className="rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2 text-sm text-slate-200 transition hover:border-slate-700"
              >
                Wishlist
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2 text-sm text-slate-200 transition hover:border-slate-700"
              >
                Logout
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('cart')}
                className="relative inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                <ShoppingCart size={18} />
                Cart
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-blue-700">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-neutral-800 bg-[#1e1e1e] p-4 shadow-lg shadow-black/20">
            <h2 className="mb-4 text-lg font-semibold text-white">Browse</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                      : 'bg-[#161616] text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{category}</span>
                  {category !== 'All' && (
                    <span className="text-xs text-slate-400">
                      {books.filter((book) => book.category === category).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </aside>

          <main className="space-y-10">
            {showAllCatalog ? (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-white">All Books</h2>
                  <button
                    type="button"
                    onClick={() => setShowAllCatalog(false)}
                    className="text-sm font-medium text-blue-400 hover:text-blue-300"
                  >
                    Show less
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {filteredBooks.map((book) => (
                    <article
                      key={book.id}
                      className="rounded-2xl border border-neutral-800 bg-[#1e1e1e] p-3 shadow-lg shadow-black/20"
                    >
                      <div className="relative">
                        <button type="button" onClick={() => handleOpenBook(book.id)} className="block rounded-xl">
                          <img src={resolveBookCover(book)} alt={book.title} className={BOOK_COVER_CLASS} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleWishlist(book.id)}
                          className={`absolute right-2 top-2 rounded-full p-2 ${
                            wishlist.includes(book.id) ? 'bg-blue-500 text-white' : 'bg-slate-900/80 text-slate-200'
                          }`}
                          aria-label={`wishlist-${book.title}`}
                        >
                          <Heart size={16} fill={wishlist.includes(book.id) ? 'currentColor' : 'none'} />
                        </button>
                      </div>

                      <div className="mt-4 space-y-2">
                        <button type="button" onClick={() => handleOpenBook(book.id)} className="text-left">
                          <h3 className="text-lg font-semibold text-white">{book.title}</h3>
                        </button>
                        <p className="text-sm text-slate-400">{book.author}</p>
                        <div className="flex items-center justify-between text-sm text-slate-300">
                          <span className="font-medium text-blue-400">{formatPrice(book.price)}</span>
                          <span className="flex items-center gap-1">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            {book.rating}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddToCart(book)}
                          className="mt-3 w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : (
              homeShelves.map(({ title, start }) => {
                const items = filteredBooks.slice(start, start + 5)
                return renderShelf(title, items, false)
              })
            )}
          </main>
        </div>
      </div>
    </div>
  )

  const renderDetailView = () => (
    <div className="min-h-screen bg-[#121212] px-4 py-6 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => setCurrentView('home')}
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-[#1e1e1e] px-3 py-2 text-sm text-slate-200 transition hover:border-slate-700"
        >
          <ArrowLeft size={16} />
          Back to home
        </button>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1.3fr_0.8fr]">
          <div className="rounded-3xl border border-neutral-800 bg-[#1e1e1e] p-6 shadow-lg shadow-black/20">
            <img src={resolveBookCover(selectedBook)} alt={selectedBook.title} className="h-[520px] w-full rounded-2xl object-cover" />
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-[#1e1e1e] p-6 shadow-lg shadow-black/20">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-blue-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-blue-300">
                {selectedBook.category}
              </span>
              <button
                type="button"
                onClick={() => handleToggleWishlist(selectedBook.id)}
                className={`rounded-full p-2 ${
                  wishlist.includes(selectedBook.id) ? 'bg-blue-600 text-white' : 'bg-[#161616] text-slate-200'
                }`}
              >
                <Heart size={18} fill={wishlist.includes(selectedBook.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            <h2 className="mt-4 text-4xl font-bold text-white">{selectedBook.title}</h2>
            <p className="mt-2 text-lg text-slate-400">by {selectedBook.author}</p>

            <div className="mt-4 flex items-center gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-1 rounded-full bg-slate-800 px-2 py-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                {selectedBook.rating}
              </span>
              <span>{selectedBook.reviews} reviews</span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-3xl font-bold text-white">{formatPrice(selectedBook.price)}</span>
              <span className="mb-1 text-sm text-green-400">In stock</span>
            </div>

            <p className="mt-6 text-base leading-7 text-slate-300">{selectedBook.description}</p>

            <div className="mt-6 space-y-3 rounded-2xl bg-[#161616] p-4 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <PackageCheck size={16} className="text-blue-400" />
                {selectedBook.delivery}
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-400" />
                Secure checkout with instant confirmation
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => handleAddToCart(selectedBook, true)}
                className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => handleToggleWishlist(selectedBook.id)}
                className="rounded-xl border border-neutral-800 bg-[#161616] px-5 py-3 text-sm font-semibold text-slate-200 hover:border-slate-700"
              >
                Wishlist
              </button>
            </div>
          </div>

          <aside className="rounded-3xl border border-neutral-800 bg-[#1e1e1e] p-5 shadow-lg shadow-black/20">
            <h3 className="text-xl font-semibold text-white">Related Reads</h3>
            <div className="mt-4 space-y-4">
              {relatedBooks.slice(0, 3).map((book) => (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => handleOpenBook(book.id)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-neutral-800 bg-[#161616] p-2 text-left transition hover:border-slate-700"
                >
                  <img src={resolveBookCover(book)} alt={book.title} className="h-20 w-16 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{book.title}</p>
                    <p className="mt-1 text-xs text-slate-400">{book.author}</p>
                    <p className="mt-2 text-sm font-medium text-blue-400">{formatPrice(book.price)}</p>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )

  const renderWishlistView = () => {
    const wishlistBooks = wishlist.map((bookId) => getBookById(bookId)).filter(Boolean)

    return (
      <div className="min-h-screen bg-[#121212] px-4 py-6 text-slate-100">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-[#1e1e1e] px-3 py-2 text-sm text-slate-200 transition hover:border-slate-700"
          >
            <ArrowLeft size={16} />
            Back to home
          </button>

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">Wishlist</h2>
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
              {wishlistBooks.length} saved
            </span>
          </div>

          {wishlistBooks.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-neutral-800 bg-[#161616] p-10 text-center text-slate-400">
              Your wishlist is empty. Add a few books you love to keep track of them.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {wishlistBooks.map((book) => (
                <article key={book.id} className="rounded-3xl border border-neutral-800 bg-[#1e1e1e] p-4 shadow-lg shadow-black/20">
                  <button type="button" onClick={() => handleOpenBook(book.id)} className="block overflow-hidden rounded-2xl">
                    <img src={resolveBookCover(book)} alt={book.title} className="h-56 w-full object-cover" />
                  </button>

                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{book.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{book.author}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleWishlist(book.id)}
                      className="rounded-full bg-blue-600 p-2 text-white"
                    >
                      <Heart size={16} fill="currentColor" />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-blue-400">{formatPrice(book.price)}</span>
                    <span className="inline-flex items-center gap-1 text-sm text-slate-300">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      {book.rating}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(book, true)}
                    className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
                  >
                    Add to Cart
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderOrdersView = () => (
    <div className="min-h-screen bg-[#121212] px-4 py-6 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => setCurrentView('home')}
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-[#1e1e1e] px-3 py-2 text-sm text-slate-200 transition hover:border-slate-700"
        >
          <ArrowLeft size={16} />
          Back to home
        </button>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">My Orders</h2>
          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
            {orders.length} orders
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-800 bg-[#161616] p-10 text-center text-slate-400">
            No orders yet. Your confirmed purchases will appear here.
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <article key={order.id} className="rounded-3xl border border-neutral-800 bg-[#1e1e1e] p-5 shadow-lg shadow-black/20">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Order {order.id}</p>
                    <p className="mt-1 text-sm text-slate-300">
                      Placed on {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide ${
                      order.status === 'cancelled'
                        ? 'bg-red-500/10 text-red-300'
                        : order.status === 'shipped'
                          ? 'bg-amber-500/10 text-amber-300'
                          : 'bg-green-500/10 text-green-300'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {order.items.map((item, index) => {
                    const book = getBookById(item.book_id)
                    if (!book) return null

                    const tentativeDate = getTentativeDeliveryDate(order.created_at, 5 + index)

                    return (
                      <div key={`${order.id}-${book.id}`} className="flex items-center gap-3 rounded-2xl border border-neutral-800 bg-[#161616] p-3">
                        <img src={resolveBookCover(book)} alt={book.title} className="h-16 w-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="font-medium text-white">{book.title}</p>
                          <p className="text-sm text-slate-400">Qty: {item.quantity}</p>
                          <span className="mt-2 inline-flex items-center rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-amber-300">
                            Tentative delivery: {tentativeDate}
                          </span>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <p className="font-semibold text-blue-400">{formatPrice(item.price_at_purchase * item.quantity)}</p>
                          <button
                            type="button"
                            onClick={() => handleBuyAgain(book)}
                            className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500"
                          >
                            Buy It Again
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-5 flex flex-col gap-3 border-t border-neutral-800 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Shipping address</p>
                    <p className="text-sm text-slate-200">{order.shipping_address}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-slate-400">Total paid</p>
                    <p className="text-xl font-semibold text-white">{formatPrice(order.total_amount)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const renderCartView = () => (
    <div className="min-h-screen bg-[#121212] px-4 py-6 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => setCurrentView('home')}
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-[#1e1e1e] px-3 py-2 text-sm text-slate-200 transition hover:border-slate-700"
        >
          <ArrowLeft size={16} />
          Continue shopping
        </button>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl border border-neutral-800 bg-[#1e1e1e] p-5 shadow-lg shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">
                {currentView === 'checkout' ? 'Checkout' : 'Shopping Cart'}
              </h2>
              <span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-300">
                {cartCount} items
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-neutral-800 bg-[#161616] p-10 text-center text-slate-400">
                Your cart is empty. Add a few titles from the home shelf to begin.
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-[#161616] p-4 sm:flex-row">
                    <img src={resolveBookCover(item)} alt={item.title} className="h-28 w-20 rounded-xl object-cover" />

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                          <p className="text-sm text-slate-400">{item.author}</p>
                        </div>
                        <button type="button" onClick={() => handleRemoveItem(item.id)} className="text-slate-400 hover:text-red-400">
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-[#1e1e1e] px-2 py-1">
                          <button type="button" onClick={() => handleChangeQuantity(item.id, -1)} className="p-1 text-slate-200 hover:text-white">
                            <Minus size={16} />
                          </button>
                          <span className="min-w-6 text-center text-sm font-medium text-white">{item.quantity}</span>
                          <button type="button" onClick={() => handleChangeQuantity(item.id, 1)} className="p-1 text-slate-200 hover:text-white">
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-slate-400">{formatPrice(item.price)} each</p>
                          <p className="text-lg font-semibold text-white">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-neutral-800 bg-[#1e1e1e] p-5 shadow-lg shadow-black/20">
              <div className="flex items-center gap-2 text-lg font-semibold text-white">
                <MapPin size={18} className="text-blue-400" />
                Delivery Address
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(event) => {
                      setAddress({ ...address, fullName: event.target.value })
                      if (addressErrors.fullName) setAddressErrors((current) => ({ ...current, fullName: '' }))
                    }}
                    placeholder="Full Name"
                    className="w-full rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                    aria-invalid={Boolean(addressErrors.fullName)}
                  />
                  {addressErrors.fullName && <p className="mt-1 text-xs text-red-400">{addressErrors.fullName}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(event) => {
                      setAddress({ ...address, street: event.target.value })
                      if (addressErrors.street) setAddressErrors((current) => ({ ...current, street: '' }))
                    }}
                    placeholder="Street Address"
                    className="w-full rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                    aria-invalid={Boolean(addressErrors.street)}
                  />
                  {addressErrors.street && <p className="mt-1 text-xs text-red-400">{addressErrors.street}</p>}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(event) => {
                        setAddress({ ...address, city: event.target.value })
                        if (addressErrors.city) setAddressErrors((current) => ({ ...current, city: '' }))
                      }}
                      placeholder="City"
                      className="w-full rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                      aria-invalid={Boolean(addressErrors.city)}
                    />
                    {addressErrors.city && <p className="mt-1 text-xs text-red-400">{addressErrors.city}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={address.pincode}
                      onChange={(event) => {
                        setAddress({ ...address, pincode: event.target.value })
                        if (addressErrors.pincode) setAddressErrors((current) => ({ ...current, pincode: '' }))
                      }}
                      placeholder="Pincode"
                      className="w-full rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                      aria-invalid={Boolean(addressErrors.pincode)}
                    />
                    {addressErrors.pincode && <p className="mt-1 text-xs text-red-400">{addressErrors.pincode}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-800 bg-[#1e1e1e] p-5 shadow-lg shadow-black/20">
              <div className="flex items-center gap-2 text-lg font-semibold text-white">
                <Tag size={18} className="text-blue-400" />
                Coupon / Gift points
              </div>
              <div className="mt-4 rounded-xl border border-blue-500/30 bg-blue-500/5 px-3 py-2 text-sm text-blue-200">
                Discount code: <span className="font-semibold">GIFT50</span> for <span className="font-semibold">$50 off</span>
              </div>
              <input
                type="text"
                value={couponInput}
                onChange={(event) => setCouponInput(event.target.value)}
                placeholder="Enter GIFT50"
                className="mt-4 w-full rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
              {couponInput.trim().toUpperCase() === 'GIFT50' && (
                <p className="mt-2 text-sm text-green-400">Gift credit applied: $50 discount</p>
              )}
            </div>

            <div className="rounded-3xl border border-neutral-800 bg-[#1e1e1e] p-5 shadow-lg shadow-black/20">
              <h3 className="text-lg font-semibold text-white">Order Summary</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(Math.round(tax))}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex items-center justify-between text-green-400">
                    <span>Gift discount</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-4 text-lg font-semibold text-white">
                <span>Total</span>
                <span>{formatPrice(Math.round(total))}</span>
              </div>

              <button
                type="button"
                onClick={handleProceedToPayment}
                disabled={cart.length === 0}
                className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-neutral-800 bg-[#1e1e1e] p-6 shadow-2xl shadow-black/40">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-2xl font-semibold text-white">
                <CreditCard size={20} className="text-blue-400" />
                Payment
              </div>
              <button type="button" onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="mb-5 flex gap-2 rounded-xl bg-[#161616] p-1">
              {[
                { key: 'card', label: 'Credit/Debit Card' },
                { key: 'wallet', label: 'Wallets' },
              ].map((method) => (
                <button
                  key={method.key}
                  type="button"
                  onClick={() => setPaymentMethod(method.key)}
                  className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium ${
                    paymentMethod === method.key ? 'bg-blue-600 text-white' : 'text-slate-300'
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>

            {paymentMethod === 'card' ? (
              <div className="space-y-3">
                <div>
                  <input
                    type="text"
                    value={paymentDetails.cardNumber}
                    onChange={(event) => {
                      setPaymentDetails({ ...paymentDetails, cardNumber: event.target.value })
                      if (paymentErrors.cardNumber) setPaymentErrors((current) => ({ ...current, cardNumber: '' }))
                    }}
                    placeholder="Card Number"
                    className="w-full rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                    aria-invalid={Boolean(paymentErrors.cardNumber)}
                  />
                  {paymentErrors.cardNumber && <p className="mt-1 text-xs text-red-400">{paymentErrors.cardNumber}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      value={paymentDetails.expiry}
                      onChange={(event) => {
                        setPaymentDetails({ ...paymentDetails, expiry: event.target.value })
                        if (paymentErrors.expiry) setPaymentErrors((current) => ({ ...current, expiry: '' }))
                      }}
                      placeholder="MM/YY"
                      className="w-full rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                      aria-invalid={Boolean(paymentErrors.expiry)}
                    />
                    {paymentErrors.expiry && <p className="mt-1 text-xs text-red-400">{paymentErrors.expiry}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={paymentDetails.cvv}
                      onChange={(event) => {
                        setPaymentDetails({ ...paymentDetails, cvv: event.target.value })
                        if (paymentErrors.cvv) setPaymentErrors((current) => ({ ...current, cvv: '' }))
                      }}
                      placeholder="CVV"
                      className="w-full rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                      aria-invalid={Boolean(paymentErrors.cvv)}
                    />
                    {paymentErrors.cvv && <p className="mt-1 text-xs text-red-400">{paymentErrors.cvv}</p>}
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    value={paymentDetails.cardName}
                    onChange={(event) => {
                      setPaymentDetails({ ...paymentDetails, cardName: event.target.value })
                      if (paymentErrors.cardName) setPaymentErrors((current) => ({ ...current, cardName: '' }))
                    }}
                    placeholder="Name on Card"
                    className="w-full rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                    aria-invalid={Boolean(paymentErrors.cardName)}
                  />
                  {paymentErrors.cardName && <p className="mt-1 text-xs text-red-400">{paymentErrors.cardName}</p>}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-[#161616] p-3 text-sm text-slate-300">
                  <Wallet size={18} className="text-blue-400" />
                  Pay using your bundled wallet balance.
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handlePayNow}
              disabled={paymentProcessing}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
            >
              {paymentProcessing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </>
              ) : (
                'Pay Now'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )

  const renderConfirmationView = () => (
    <div className="min-h-screen bg-[#121212] px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-800 bg-[#1e1e1e] p-8 text-center shadow-2xl shadow-black/25">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/15 text-green-400">
          <Check size={40} />
        </div>

        <h2 className="mt-6 text-4xl font-bold text-white">Payment Successful!</h2>
        <p className="mt-2 text-lg text-slate-300">Your order has been placed.</p>
        <p className="mt-6 text-sm uppercase tracking-[0.2em] text-slate-400">Order ID: {orderId || '#BKW-9482'}</p>

        <div className="mt-8 rounded-2xl border border-neutral-800 bg-[#161616] p-5 text-left">
          <div className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
            <ShoppingCart size={18} className="text-blue-400" />
            Summary
          </div>

          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="mb-3 flex items-center justify-between gap-4 rounded-xl bg-[#1e1e1e] px-3 py-2">
                <div className="flex items-center gap-3">
                  <img src={resolveBookCover(item)} alt={item.title} className="h-12 w-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-sm text-slate-300">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">No items to display.</p>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handleCancelOrder}
            className="rounded-xl border border-orange-500/40 bg-orange-500/10 px-5 py-3 text-sm font-semibold text-orange-300 hover:bg-orange-500/20"
          >
            Cancel Order (within 48 hrs)
          </button>
          <button
            type="button"
            onClick={handleContinueShopping}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Continue Shopping
          </button>
        </div>

        {cancelNotice && (
          <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            {cancelNotice}
          </div>
        )}
      </div>
    </div>
  )

  const renderToast = () => {
    if (!toast) return null

    return (
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center">
        <div
          className={`rounded-full border px-4 py-2 text-sm font-medium shadow-lg ${
            toast.type === 'success'
              ? 'border-green-500/30 bg-green-600/90 text-white'
              : 'border-blue-500/30 bg-blue-600/90 text-white'
          }`}
        >
          {toast.message}
        </div>
      </div>
    )
  }

  if (!isAuthenticated || currentView === 'auth') return renderAuthView()

  if (currentView === 'detail') return (
    <>
      {renderDetailView()}
      {renderToast()}
    </>
  )
  if (currentView === 'cart' || currentView === 'checkout') return (
    <>
      {renderCartView()}
      {renderToast()}
    </>
  )
  if (currentView === 'orders') return (
    <>
      {renderOrdersView()}
      {renderToast()}
    </>
  )
  if (currentView === 'wishlist') return (
    <>
      {renderWishlistView()}
      {renderToast()}
    </>
  )
  if (currentView === 'confirmation') return (
    <>
      {renderConfirmationView()}
      {renderToast()}
    </>
  )

  return (
    <>
      {renderHomePage()}
      {renderToast()}
    </>
  )
}

export default App
