import React from 'react'
import { Heart, Search, ShoppingCart, Star } from 'lucide-react'

import { BOOK_CATEGORIES, BOOK_COVER_CLASS, formatPrice, resolveBookCover } from '../data/bookUtils'

export function HomeScreen({
  activeCategory,
  setActiveCategory,
  books,
  filteredBooks,
  homeShelves,
  searchTerm,
  setSearchTerm,
  cartCount,
  setCurrentView,
  handleOpenBook,
  handleToggleWishlist,
  handleAddToCart,
  wishlist,
  showAllCatalog,
  setShowAllCatalog,
  handleLogout,
}) {
  const renderShelf = (title, items) => (
    <section key={title} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <button
          type="button"
          onClick={() => setShowAllCatalog(!showAllCatalog)}
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          {showAllCatalog ? 'Show less' : 'View all'}
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3">
        {items.length > 0 ? (
          items.map((book) => (
            <article key={book.id} className="min-w-[220px] rounded-2xl border border-neutral-800 bg-[#1e1e1e] p-3 shadow-lg shadow-black/20">
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

  return (
    <div className="min-h-screen bg-[#121212] text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-2xl border border-neutral-800 bg-[#1e1e1e] px-4 py-4 shadow-lg shadow-black/20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">B</div>
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
                onClick={() => setCurrentView('orders')}
                className="rounded-xl border border-neutral-800 bg-[#161616] px-3 py-2 text-sm text-slate-200 transition hover:border-slate-700"
              >
                My Orders
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('wishlist')}
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
              {BOOK_CATEGORIES.map((category) => (
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
                    <article key={book.id} className="rounded-2xl border border-neutral-800 bg-[#1e1e1e] p-3 shadow-lg shadow-black/20">
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
                return renderShelf(title, items)
              })
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
