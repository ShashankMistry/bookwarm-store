import React from 'react'
import { ArrowLeft, Heart, PackageCheck, ShieldCheck, Star } from 'lucide-react'

import { BOOK_COVER_CLASS, formatPrice, resolveBookCover } from '../data/bookUtils'

export function DetailScreen({
  selectedBook,
  relatedBooks,
  wishlist,
  setCurrentView,
  handleOpenBook,
  handleToggleWishlist,
  handleAddToCart,
}) {
  return (
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
            <img src={resolveBookCover(selectedBook)} alt={selectedBook.title} className={BOOK_COVER_CLASS} />
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
}
