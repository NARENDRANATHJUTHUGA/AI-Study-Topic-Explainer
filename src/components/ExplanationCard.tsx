import { RefreshCw } from "lucide-react";

type Props = {
  topic: string;
  explanation: string | null;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
};

export default function ExplanationCard({
  topic,
  explanation,
  isLoading,
  error,
  onRetry,
}: Props) {
  if (isLoading) {
    return (
      <div className="flex h-full min-h-[240px] flex-col gap-4">
        <div className="text-xs font-medium uppercase tracking-wide text-slate-600">
          Explanation
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-sky-500" />
          Generating explanation…
        </div>
        <div className="space-y-3">
          <div className="h-4 w-11/12 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-10/12 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-9/12 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-8/12 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full min-h-[240px] flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-600">
            Explanation
          </div>
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm transition-colors hover:bg-slate-50"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
          ) : null}
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {error}
        </div>
        <div className="text-sm text-slate-600">
          Tip: keep your topic short and specific.
        </div>
      </div>
    );
  }

  if (!explanation) {
    return (
      <div className="flex h-full min-h-[240px] flex-col gap-3">
        <div className="text-xs font-medium uppercase tracking-wide text-slate-600">
          Explanation
        </div>
        <div className="text-sm text-slate-600">Your explanation will appear here.</div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[240px] flex-col gap-4">
      <div className="text-xs font-medium uppercase tracking-wide text-slate-600">
        Explanation
      </div>

      {topic ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900">
          <span className="text-slate-600">Topic:</span> {topic}
        </div>
      ) : null}

      <div className="whitespace-pre-wrap text-sm leading-7 text-slate-900">
        {explanation}
      </div>
    </div>
  );
}
