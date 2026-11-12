import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  BadgePercent,
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

const categories = ['All', 'Fiction', 'Mystery', 'Romance', 'Non-Fiction']

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
    cover:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
    description:
      'A thoughtful journey toward calmer living, intentional habits, and the quiet pleasure of owning less.',
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
    cover:
      'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=900&q=80',
    description:
      'A missing historian, a hidden collection, and a trail of coded truths that reshapes a city’s past.',
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
    cover:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80',
    description:
      'When a bestselling novelist meets a veteran bookstore owner, a handwritten correspondence changes everything.',
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
    cover:
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    description:
      'Build sustainable routines that stick with simple changes, measured progress, and the power of consistency.',
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
    cover:
      'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80',
    description:
      'A cold-case journalist uncovers a chain of disappearances hidden inside a forgotten city chronicle.',
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
    cover:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80',
    description:
      'A decades-old love note and an unexpected move bring two strangers together in the heart of a rainy city.',
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
    cover:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80',
    description:
      'A story about memory, second chances, and the bravery it takes to rewrite a life after a fading chapter.',
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
    cover:
      'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=900&q=80',
    description:
      'A practical and inspiring guide to aligning your work, energy, and values with a meaningful life.',
  },
]

const formatPrice = (value) => `₹${value}`
const getRandomOrderId = () => `#BKW-${Math.floor(Math.random() * 9000 + 1000)}`

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentView, setCurrentView] = useState('home')
  const [selectedBookId, setSelectedBookId] = useState(1)
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([2, 6])
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

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesCategory = activeCategory === 'All' || book.category === activeCategory
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchTerm])

  const selectedBook = books.find((book) => book.id === selectedBookId) || books[0]

  const relatedBooks = books.filter(
    (book) => book.category === selectedBook.category && book.id !== selectedBook.id,
  )

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const couponDiscount = couponInput.trim().toUpperCase() === 'GIFT50' ? 50 : 0
  const tax = subtotal * 0.08
  const shipping = subtotal > 0 ? 0 : 0
  const total = Math.max(0, subtotal + tax + shipping - couponDiscount)

  const handleOpenBook = (bookId) => {
    setSelectedBookId(bookId)
    setCurrentView('detail')
  }

  const handleToggleWishlist = (bookId) => {
    setWishlist((current) =>
      current.includes(bookId) ? current.filter((id) => id !== bookId) : [...current, bookId],
    )
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

  const handleProceedToPayment = () => {
    if (cart.length === 0) return
    setCurrentView('checkout')
    setShowPaymentModal(true)
  }

  const handlePayNow = () => {
    setPaymentProcessing(true)

    window.setTimeout(() => {
      setPaymentProcessing(false)
      setShowPaymentModal(false)
      setOrderId(getRandomOrderId())
      setCurrentView('confirmation')
    }, 1500)
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

  const handleCancelOrder = () => {
    setCancelNotice('Order cancelled successfully. Refund will be processed within 48 hours.')
  }

  const renderShelf = (title, items) => (
    <section key={title} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <button type="button" className="text-sm font-medium text-blue-400 hover:text-blue-300">
          View all
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.length > 0 ? (
          items.map((book) => (
            <article
              key={book.id}
              className="min-w-[240px] max-w-[240px] rounded-2xl border border-slate-800 bg-[#1e1e1e] p-3 shadow-lg shadow-black/20"
            >
              <div className="relative">
                <button type="button" onClick={() => handleOpenBook(book.id)} className="block overflow-hidden rounded-xl">
                  <img src={book.cover} alt={book.title} className="h-64 w-full object-cover transition duration-300 hover:scale-105" />
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleWishlist(book.id)}
                  className={`absolute right-2 top-2 rounded-full p-2 ${
                    wishlist.includes(book.id) ? 'bg-blue-500 text-white' : 'bg-slate-900/80 text-slate-200'
                  }`}
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

  const renderHomePage = () => (
    <div className="min-h-screen bg-[#121212] text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-2xl border border-slate-800 bg-[#1e1e1e] px-4 py-4 shadow-lg shadow-black/20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                B
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Bookworm</p>
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
                className="w-full rounded-xl border border-slate-700 bg-[#161616] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <button type="button" className="rounded-xl border border-slate-700 bg-[#161616] px-3 py-2 text-sm text-slate-200 hover:border-slate-600">
                My Orders
              </button>
              <button type="button" className="rounded-xl border border-slate-700 bg-[#161616] px-3 py-2 text-sm text-slate-200 hover:border-slate-600">
                Wishlist
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('cart')}
                className="relative flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
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

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-800 bg-[#1e1e1e] p-4 shadow-lg shadow-black/20">
            <h2 className="mb-4 text-lg font-semibold text-white">Browse</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#161616] text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{category}</span>
                  {category !== 'All' && <span className="text-xs text-slate-400">{books.filter((book) => book.category === category).length}</span>}
                </button>
              ))}
            </div>
          </aside>

          <main className="space-y-10">
            {['Recommended for You', 'Bestsellers this Month', 'New Launches'].map((title) => {
              let items = []
              if (title === 'Recommended for You') items = filteredBooks.slice(0, 4)
              if (title === 'Bestsellers this Month') items = filteredBooks.slice(0, 4)
              if (title === 'New Launches') items = filteredBooks.slice(0, 4)
              return renderShelf(title, items)
            })}
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
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#1e1e1e] px-3 py-2 text-sm text-slate-200 hover:border-slate-600"
        >
          <ArrowLeft size={16} />
          Back to home
        </button>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1.3fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-[#1e1e1e] p-6 shadow-lg shadow-black/20">
            <img src={selectedBook.cover} alt={selectedBook.title} className="h-[540px] w-full rounded-2xl object-cover" />
          </div>

          <div className="rounded-3xl border border-slate-800 bg-[#1e1e1e] p-6 shadow-lg shadow-black/20">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium uppercase tracking-wide text-blue-300">
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
                className="rounded-xl border border-slate-700 bg-[#161616] px-5 py-3 text-sm font-semibold text-slate-200 hover:border-slate-600"
              >
                Wishlist
              </button>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-800 bg-[#1e1e1e] p-5 shadow-lg shadow-black/20">
            <h3 className="text-xl font-semibold text-white">Related Reads</h3>
            <div className="mt-4 space-y-4">
              {relatedBooks.slice(0, 3).map((book) => (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => handleOpenBook(book.id)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-slate-700 bg-[#161616] p-2 text-left transition hover:border-slate-600"
                >
                  <img src={book.cover} alt={book.title} className="h-20 w-16 rounded-xl object-cover" />
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

  const renderCartView = () => (
    <div className="min-h-screen bg-[#121212] px-4 py-6 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => setCurrentView('home')}
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#1e1e1e] px-3 py-2 text-sm text-slate-200 hover:border-slate-600"
        >
          <ArrowLeft size={16} />
          Continue shopping
        </button>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl border border-slate-800 bg-[#1e1e1e] p-5 shadow-lg shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">{currentView === 'checkout' ? 'Checkout' : 'Shopping Cart'}</h2>
              <span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-300">
                {cartCount} items
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-[#161616] p-10 text-center text-slate-400">
                Your cart is empty. Add a few titles from the home shelf to begin.
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-slate-700 bg-[#161616] p-4 sm:flex-row">
                    <img src={item.cover} alt={item.title} className="h-28 w-20 rounded-xl object-cover" />

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
                        <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-[#1e1e1e] px-2 py-1">
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
                          <p className="text-lg font-semibold text-white">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-[#1e1e1e] p-5 shadow-lg shadow-black/20">
              <h3 className="text-lg font-semibold text-white">Delivery Address</h3>
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  value={address.fullName}
                  onChange={(event) => setAddress({ ...address, fullName: event.target.value })}
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-slate-700 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={address.street}
                  onChange={(event) => setAddress({ ...address, street: event.target.value })}
                  placeholder="Street Address"
                  className="w-full rounded-xl border border-slate-700 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    value={address.city}
                    onChange={(event) => setAddress({ ...address, city: event.target.value })}
                    placeholder="City"
                    className="w-full rounded-xl border border-slate-700 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(event) => setAddress({ ...address, pincode: event.target.value })}
                    placeholder="Pincode"
                    className="w-full rounded-xl border border-slate-700 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#1e1e1e] p-5 shadow-lg shadow-black/20">
              <div className="flex items-center gap-2 text-lg font-semibold text-white">
                <Tag size={18} className="text-blue-400" />
                Coupon / Gift points
              </div>
              <input
                type="text"
                value={couponInput}
                onChange={(event) => setCouponInput(event.target.value)}
                placeholder="Enter GIFT50"
                className="mt-4 w-full rounded-xl border border-slate-700 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
              {couponInput.trim().toUpperCase() === 'GIFT50' && (
                <p className="mt-2 text-sm text-green-400">Gift credit applied: ₹50 discount</p>
              )}
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#1e1e1e] p-5 shadow-lg shadow-black/20">
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

              <div className="mt-4 flex items-center justify-between border-t border-slate-700 pt-4 text-lg font-semibold text-white">
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
          <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-[#1e1e1e] p-6 shadow-2xl shadow-black/40">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-white">Payment</h3>
              <button type="button" onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="mb-5 flex gap-2 rounded-xl bg-[#161616] p-1">
              {['Credit/Debit Card', 'UPI', 'Wallets'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method === 'Credit/Debit Card' ? 'card' : method === 'UPI' ? 'upi' : 'wallet')}
                  className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium ${
                    paymentMethod === (method === 'Credit/Debit Card' ? 'card' : method === 'UPI' ? 'upi' : 'wallet')
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            {paymentMethod === 'card' ? (
              <div className="space-y-3">
                <input type="text" placeholder="Card Number" className="w-full rounded-xl border border-slate-700 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="MM/YY" className="w-full rounded-xl border border-slate-700 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none" />
                  <input type="text" placeholder="CVV" className="w-full rounded-xl border border-slate-700 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none" />
                </div>
                <input type="text" placeholder="Name on Card" className="w-full rounded-xl border border-slate-700 bg-[#161616] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none" />
              </div>
            ) : paymentMethod === 'upi' ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-[#161616] px-3 py-2.5 text-sm text-slate-300">
                  <span className="text-blue-400">@</span>
                  <input type="text" placeholder="yourname@upi" className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none" />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-[#161616] p-3 text-sm text-slate-300">
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
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-[#1e1e1e] p-8 text-center shadow-2xl shadow-black/25">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/15 text-green-400">
          <Check size={40} />
        </div>

        <h2 className="mt-6 text-4xl font-bold text-white">Payment Successful!</h2>
        <p className="mt-2 text-lg text-slate-300">Your order has been placed.</p>
        <p className="mt-6 text-sm uppercase tracking-[0.2em] text-slate-400">Order ID: {orderId || '#BKW-9482'}</p>

        <div className="mt-8 rounded-2xl border border-slate-700 bg-[#161616] p-5 text-left">
          <div className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
            <ShoppingCart size={18} className="text-blue-400" />
            Summary
          </div>

          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="mb-3 flex items-center justify-between gap-4 rounded-xl bg-[#1e1e1e] px-3 py-2">
                <div className="flex items-center gap-3">
                  <img src={item.cover} alt={item.title} className="h-12 w-10 rounded-lg object-cover" />
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
            className="rounded-xl border border-orange-500/50 bg-orange-500/10 px-5 py-3 text-sm font-semibold text-orange-300 hover:bg-orange-500/20"
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

  if (currentView === 'detail') return renderDetailView()
  if (currentView === 'cart' || currentView === 'checkout') return renderCartView()
  if (currentView === 'confirmation') return renderConfirmationView()

  return renderHomePage()
}

export default App
