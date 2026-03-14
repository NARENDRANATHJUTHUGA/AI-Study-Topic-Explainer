"use client";

import { useCallback, useMemo, useState } from "react";
import ExplanationCard from "@/components/ExplanationCard";
import TopicInput from "@/components/TopicInput";

type ExplainResponse =
  | { ok: true; explanation: string }
  | { ok: false; error: { message: string; code?: string } };

const EXAMPLE_TOPICS = [
  "Newton’s Laws",
  "Photosynthesis",
  "Binary Search",
  "World War II",
] as const;

export default function Home() {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const t = topic.trim();
    return t.length > 0 && !isLoading;
  }, [topic, isLoading]);

  const submit = useCallback(async () => {
    const t = topic.trim();

    if (!t) {
      setInputError("Please enter a topic to continue.");
      setApiError(null);
      setExplanation(null);
      return;
    }

    setIsLoading(true);
    setInputError(null);
    setApiError(null);

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: t }),
      });

      const data = (await res.json()) as ExplainResponse;
      if (!data.ok) {
        setExplanation(null);
        setApiError(data.error.message || "Something went wrong. Please try again.");
        return;
      }

      setExplanation(data.explanation);
    } catch {
      setExplanation(null);
      setApiError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  return (
    <div className="min-h-dvh bg-gradient-to-br from-sky-50 via-white to-fuchsia-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            AI Study Topic Explainer
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            Enter any topic and get a student-friendly explanation.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur lg:col-span-2">
            <TopicInput
              topic={topic}
              disabled={isLoading}
              error={inputError}
              onTopicChange={(v) => {
                setTopic(v);
                if (inputError) setInputError(null);
                if (apiError) setApiError(null);
              }}
              onSubmit={submit}
            />

            <div className="mt-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-600">
                Try an example
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {EXAMPLE_TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                      setTopic(t);
                      setInputError(null);
                      setApiError(null);
                      setExplanation(null);
                    }}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 disabled:opacity-60"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur lg:col-span-3">
            <ExplanationCard
              topic={topic.trim()}
              explanation={explanation}
              isLoading={isLoading}
              error={apiError}
              onRetry={canSubmit ? submit : undefined}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
