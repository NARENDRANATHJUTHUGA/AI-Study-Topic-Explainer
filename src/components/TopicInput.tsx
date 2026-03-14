type Props = {
  topic: string;
  disabled: boolean;
  error: string | null;
  onTopicChange: (value: string) => void;
  onSubmit: () => void;
};

export default function TopicInput({
  topic,
  disabled,
  error,
  onTopicChange,
  onSubmit,
}: Props) {
  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="topic"
          className="text-xs font-medium uppercase tracking-wide text-slate-600"
        >
          Topic
        </label>
        <input
          id="topic"
          name="topic"
          value={topic}
          disabled={disabled}
          onChange={(e) => onTopicChange(e.target.value)}
          placeholder="e.g., Photosynthesis, Binary Search"
          autoComplete="off"
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-shadow placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70"
        />
        {error ? (
          <div className="text-sm text-rose-600">{error}</div>
        ) : (
          <div className="text-sm text-slate-600">Enter a topic or question.</div>
        )}
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {disabled ? "Generating…" : "Explain Topic"}
      </button>
    </form>
  );
}
