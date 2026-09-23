// Pure SVG/CSS visuals: no image downloads, crisp at any size, and themed per project.

function AiVisual() {
  const layers = [
    [60, 110, 160, 210],
    [40, 85, 135, 185, 230],
    [75, 135, 195],
    [110, 160],
  ]
  const xs = [55, 150, 245, 340]
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="Abstract neural network diagram">
      <defs>
        <radialGradient id="ai-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor="#8b6cff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#8b6cff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill="url(#ai-glow)" />
      {layers.slice(0, -1).map((l, li) =>
        l.map((y1, a) =>
          layers[li + 1].map((y2, b) => (
            <line key={`${li}-${a}-${b}`} x1={xs[li]} y1={y1} x2={xs[li + 1]} y2={y2} stroke="#6f8fff" strokeOpacity="0.22" />
          )),
        ),
      )}
      {layers.map((l, li) =>
        l.map((y, i) => (
          <circle
            key={`${li}-${i}`}
            cx={xs[li]}
            cy={y}
            r="7"
            fill={li === 3 ? '#4fd8e8' : '#0c1433'}
            stroke={li === 3 ? '#4fd8e8' : '#8b9dff'}
            strokeWidth="1.5"
            className="motion-safe:animate-pulse"
            style={{ animationDelay: `${(li * 3 + i) * 0.25}s`, animationDuration: '3s' }}
          />
        )),
      )}
    </svg>
  )
}

function WebVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-full max-w-[320px] overflow-hidden rounded-xl border border-line bg-ink/70 shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="ml-3 h-3 flex-1 rounded-full bg-white/8" />
        </div>
        <div className="space-y-3 p-4">
          <div className="h-3 w-2/3 rounded bg-gradient-to-r from-blue to-violet" />
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-2 w-4/5 rounded bg-white/10" />
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="h-14 rounded-lg bg-blue/20" />
            <div className="h-14 rounded-lg bg-violet/20" />
            <div className="h-14 rounded-lg bg-cyan/20" />
          </div>
          <p className="pt-1 font-mono text-[11px] text-cyan/80">&lt;html&gt; &lt;css&gt; &lt;js&gt;</p>
        </div>
      </div>
    </div>
  )
}

function TripVisual() {
  const rows = [
    { w: 'w-20', c: 'bg-blue' },
    { w: 'w-24', c: 'bg-violet' },
    { w: 'w-16', c: 'bg-cyan' },
  ]
  return (
    <div className="flex h-full w-full items-center justify-center gap-5 p-6">
      <div className="w-[190px] rounded-[26px] border border-white/15 bg-ink/80 p-3 shadow-2xl">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />
        <p className="px-1 font-display text-sm font-semibold">Trip expenses</p>
        <div className="mt-3 space-y-2.5">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-xl bg-white/5 p-2.5">
              <span className={`h-7 w-7 shrink-0 rounded-full ${r.c}`} />
              <div className="space-y-1.5">
                <div className={`h-1.5 rounded bg-white/25 ${r.w}`} />
                <div className="h-1.5 w-12 rounded bg-white/10" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl bg-gradient-to-r from-blue to-violet py-2 text-center text-xs font-medium">Settle up</div>
      </div>
      <div className="hidden w-[150px] rounded-2xl border border-line bg-white/5 p-3 sm:block">
        <p className="text-[11px] text-muted">Who owes whom</p>
        <div className="mt-3 space-y-3">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="h-5 w-5 rounded-full bg-violet/70" />
              <span className="h-px flex-1 bg-gradient-to-r from-violet to-cyan" />
              <span className="h-5 w-5 rounded-full bg-cyan/70" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const visuals = { ai: AiVisual, web: WebVisual, trip: TripVisual }

export default function ProjectVisual({ type, className = '' }) {
  const V = visuals[type]
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#0d1636] via-[#0a0f28] to-[#160f36] ${className}`}>
      <div aria-hidden="true" className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative h-full w-full">
        <V />
      </div>
    </div>
  )
}
