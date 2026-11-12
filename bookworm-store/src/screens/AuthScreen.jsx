import React from 'react'

export function AuthScreen({
  authMode,
  setAuthMode,
  authForm,
  setAuthForm,
  authError,
  handleAuthSubmit,
}) {
  return (
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
}
