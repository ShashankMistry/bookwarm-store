import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from '../src/App.jsx'

describe('AI Augmented ICA Test Generator', () => {
  it('renders the bookstore home screen and books', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /Book Worm/i })).toBeInTheDocument()
    expect(screen.getByText(/Recommended for You/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Joy of Minimalism/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Paper Hearts/i).length).toBeGreaterThan(0)
  })

  it('adds a book to the cart and updates the cart badge', () => {
    render(<App />)

    fireEvent.click(screen.getAllByRole('button', { name: /Add to Cart/i })[0])

    const cartButton = screen.getByRole('button', { name: /^Cart\s*1$/i })
    expect(cartButton).toHaveTextContent('1')
  })

  it('opens the payment modal when checkout is triggered', () => {
    render(<App />)

    fireEvent.click(screen.getAllByRole('button', { name: /Add to Cart/i })[0])

    const cartTrigger = screen.getAllByRole('button').find((button) => {
      const text = button.textContent || ''
      return text.includes('Cart') && !text.includes('Add to Cart')
    })

    fireEvent.click(cartTrigger)

    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), {
      target: { value: 'Ava Sharma' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Street Address/i), {
      target: { value: '12 River Road' },
    })
    fireEvent.change(screen.getByPlaceholderText(/City/i), {
      target: { value: 'Bengaluru' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Pincode/i), {
      target: { value: '560001' },
    })

    fireEvent.click(screen.getByRole('button', { name: /^Proceed to Payment$/i }))

    expect(screen.getByText(/^Payment$/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Pay Now$/i })).toBeInTheDocument()
  })

  it('opens the My Orders and Wishlist screens from the header', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /^My Orders$/i }))
    expect(screen.getByRole('heading', { name: /^My Orders$/i })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /^Back to home$/i }))
    fireEvent.click(screen.getByRole('button', { name: /^Wishlist$/i }))
    expect(screen.getByRole('heading', { name: /^Wishlist$/i })).toBeInTheDocument()
  })

  it('blocks checkout when the delivery address is incomplete', () => {
    render(<App />)

    fireEvent.click(screen.getAllByRole('button', { name: /Add to Cart/i })[0])
    const cartTrigger = screen.getAllByRole('button').find((button) => {
      const text = button.textContent || ''
      return text.includes('Cart') && !text.includes('Add to Cart')
    })

    fireEvent.click(cartTrigger)
    fireEvent.click(screen.getByRole('button', { name: /^Proceed to Payment$/i }))

    expect(screen.getByText(/Full name is required/i)).toBeInTheDocument()
  })

  it('expands the catalog when View all is clicked', () => {
    render(<App />)

    fireEvent.click(screen.getAllByRole('button', { name: /^View all$/i })[0])

    expect(screen.getByText(/The Red Hour/i)).toBeInTheDocument()
    expect(screen.getByText(/All Books/i)).toBeInTheDocument()
  })

  it('restores saved wishlist and orders from localStorage', () => {
    const savedOrders = [{
      id: '#BKW-9001',
      user_id: 1,
      status: 'paid',
      total_amount: 349,
      shipping_address: 'Saved lane, Bengaluru',
      coupon_code: 'GIFT50',
      created_at: '2026-11-10T10:00:00.000Z',
      items: [{ book_id: 2, quantity: 1, price_at_purchase: 349 }],
    }]

    window.localStorage.setItem('bookworm-orders', JSON.stringify(savedOrders))
    window.localStorage.setItem('bookworm-wishlist', JSON.stringify([2, 3, 5]))

    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /^My Orders$/i }))
    expect(screen.getByText(/#BKW-9001/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /^Back to home$/i }))
    fireEvent.click(screen.getByRole('button', { name: /^Wishlist$/i }))
    expect(screen.getByText(/The Silent Archive/i)).toBeInTheDocument()
  })
})
