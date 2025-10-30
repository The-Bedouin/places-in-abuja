"use client";
import React, { useState } from 'react';

const placeholderComments = [
  {
    author: "Aisha from Wuse",
    body: "Loved this guide! The suya spot in Garki you recommended was amazing.",
    date: "2025-01-31"
  },
  {
    author: "Michael",
    body: "Any more recommendations for vegetarian-friendly street food?",
    date: "2025-02-01"
  }
];

export default function CommentSection() {
  const [comments, setComments] = useState(placeholderComments);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setComments([
        { author: author || "Anonymous", body, date: new Date().toISOString().slice(0, 10) },
        ...comments
      ]);
      setAuthor("");
      setBody("");
      setSubmitting(false);
    }, 700);
  };

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Leave a comment</h2>
      <form className="space-y-3 mb-8" onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 rounded border border-white/20 dark:border-white/20 bg-white/10 dark:bg-black/10 resize-none min-h-[80px] focus:ring-2 focus:ring-green-500"
          placeholder="Share your thoughts or ask a question..."
          value={body}
          onChange={e => setBody(e.target.value)}
          required
        />
        <div className="flex gap-3 items-center">
          <input
            className="flex-1 px-2 py-1 rounded border border-white/20 dark:border-white/20 bg-white/10 dark:bg-black/10"
            placeholder="Name (optional)"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            maxLength={32}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Post"}
          </button>
        </div>
      </form>
      <div>
        {comments.length === 0 ? (
          <p className="text-gray-400">No comments yet. Be the first to leave one!</p>
        ) : (
          <ul className="space-y-5">
            {comments.map((comment, i) => (
              <li key={i} className="border-l-4 border-green-500 pl-4 bg-white/5 dark:bg-black/10 rounded py-2">
                <div className="text-sm text-gray-300 mb-1">{comment.author} <span className="text-xs text-gray-500 ml-2">{comment.date}</span></div>
                <div className="text-base text-white dark:text-gray-200">{comment.body}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
