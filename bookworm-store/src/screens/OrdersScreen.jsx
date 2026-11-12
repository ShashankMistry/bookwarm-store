import React from 'react'
import { ArrowLeft } from 'lucide-react'

import { formatPrice, getBookById, getTentativeDeliveryDate, resolveBookCover } from '../data/bookUtils'

export function OrdersScreen({
  orders,
  setCurrentView,
  handleBuyAgain,
  handleOpenBook,
}) {
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
}
