"use client";
import { useForm } from 'react-hook-form';

type FormInput = { name: string; email: string; message: string };

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormInput>();

  const onSubmit = async (data: FormInput) => {
    await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
  };

  return (
    <section className="max-w-xl">
      <h1 className="text-2xl font-bold">Contact</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Have a question or suggestion? Send a note.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" {...register('name', { required: true })} />
          {errors.name && <p className="text-sm text-red-600">Name is required.</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" {...register('email', { required: true })} />
          {errors.email && <p className="text-sm text-red-600">Email is required.</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea rows={5} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" {...register('message', { required: true })} />
          {errors.message && <p className="text-sm text-red-600">Message is required.</p>}
        </div>
        <button disabled={isSubmitting} className="rounded-md bg-brand-600 text-white px-4 py-2">
          {isSubmitting ? 'Sending…' : 'Send'}
        </button>
        {isSubmitSuccessful && <p className="text-sm text-green-600">Thanks! We'll reply soon.</p>}
      </form>
    </section>
  );
}


