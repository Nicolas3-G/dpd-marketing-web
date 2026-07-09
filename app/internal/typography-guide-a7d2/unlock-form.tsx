"use client";

import { useActionState } from "react";

import { unlockInternalDoc, type UnlockState } from "./actions";

const initialState: UnlockState = {};

const fieldClass =
  "w-full rounded-md border-[1.5px] border-white-light bg-white px-3 py-2.5 text-sm text-custom-black outline-none transition-shadow placeholder:text-gray-card-text/50 focus:border-white-light focus:ring-2 focus:ring-gray-card-border/20";

export function UnlockForm() {
  const [state, formAction, pending] = useActionState(
    unlockInternalDoc,
    initialState,
  );

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <form
        action={formAction}
        className="flex w-full max-w-sm flex-col gap-4"
      >
        <h1 className="custom-md-title-bold text-custom-black">
          Internal document
        </h1>
        <p className="custom-body text-light">
          Enter the password to view this page.
        </p>
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="off"
          placeholder="Password"
          className={fieldClass}
        />
        {state.error ? (
          <p className="text-sm text-rose-600" role="alert">
            {state.error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-custom-black py-3 custom-label-bold tracking-tight text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Checking…" : "Unlock"}
        </button>
      </form>
    </div>
  );
}
