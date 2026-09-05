'use client'

import { useActionState } from 'react'
import { login } from './actions'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'

const initialState = {
  error: null as string | null,
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full py-space-md px-space-lg bg-primary text-on-primary font-headline-sm rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      {pending ? 'Authenticating...' : 'Sign In'}
    </button>
  )
}

export default function LoginPage() {
  const [state, formAction] = useActionState(
    async (prevState: typeof initialState, formData: FormData) => {
      const result = await login(formData)
      if (result?.error) {
        return { error: result.error }
      }
      return prevState
    },
    initialState
  )

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-space-md relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-space-2xl">
          <Link href="/">
            <img src="/logo.svg" alt="TerraVerify Logo" className="h-12 w-auto mb-space-lg" />
          </Link>
          <h1 className="font-headline-lg text-on-surface tracking-tight">Admin Authentication</h1>
          <p className="text-on-surface-variant font-body-md mt-space-xs text-center">
            Sign in to access the cadastral processing pipeline and deterministic ledger.
          </p>
        </div>

        <div className="bg-surface-container-lowest p-space-2xl rounded-2xl border border-outline-variant/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <form action={formAction} className="flex flex-col gap-space-lg">
            
            <div className="flex flex-col gap-space-xs">
              <label htmlFor="email" className="font-label-md text-on-surface">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                className="px-space-md py-space-md rounded-lg bg-surface-container border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface"
                placeholder="admin@terraverify.gov"
              />
            </div>
            
            <div className="flex flex-col gap-space-xs">
              <label htmlFor="password" className="font-label-md text-on-surface">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                required 
                className="px-space-md py-space-md rounded-lg bg-surface-container border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface"
                placeholder="••••••••"
              />
            </div>

            {state.error && (
              <div className="p-space-sm rounded bg-error-container text-on-error-container text-body-sm font-medium border border-error/20">
                {state.error}
              </div>
            )}

            <div className="pt-space-sm">
              <SubmitButton />
            </div>
          </form>
        </div>
        
        <div className="mt-space-xl text-center text-on-surface-variant text-body-sm">
          <p>This is a restricted access system for authorized personnel only.</p>
          <Link href="/" className="text-primary hover:underline mt-2 inline-block">Return to home</Link>
        </div>
      </div>
    </div>
  )
}
