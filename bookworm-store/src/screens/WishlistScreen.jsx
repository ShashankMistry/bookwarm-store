import React from 'react'
import { ArrowLeft, Heart, Star } from 'lucide-react'

import { formatPrice, getBookById, resolveBookCover } from '../data/bookUtils'

export function WishlistScreen({
  wishlist,
  setCurrentView,
  handleOpenBook,
  handleToggleWishlist,
  handleAddToCart,
}) {
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
