import { Settings, Wrench } from "lucide-react";

/**
 * Resolve a friendly service name from the current hostname.
 *
 * Configure mappings via the VITE_SERVICE_NAME_MAP env variable as JSON, e.g.:
 *   VITE_SERVICE_NAME_MAP='{"fines.bbd.6180.co.za":"Team Fines Manager"}'
 *
 * Matching is case-insensitive. Supports either exact hostnames or suffix
 * matches via a leading dot (e.g. ".bbd.6180.co.za": "BBD Service").
 * Falls back to VITE_DEFAULT_SERVICE_NAME, then to no name at all.
 */
const resolveServiceName = (): string | null => {
  if (typeof window === "undefined") return null;

  const raw = (window as any).__APP_CONFIG__?.SERVICE_NAME_MAP;
  const fallback = (window as any).__APP_CONFIG__?.DEFAULT_SERVICE_NAME ?? null;

  console.log(raw);
  console.log(fallback);

  const host = window.location.hostname.toLowerCase();

  console.log(host);

  if (raw) {
    try {
      const map = JSON.parse(raw) as Record<string, string>;
      const normalized: Record<string, string> = {};
      for (const [k, v] of Object.entries(map)) {
        normalized[k.toLowerCase()] = v;
      }

      if (normalized[host]) return normalized[host];

      // Suffix matches: keys starting with "." match any subdomain ending with them.
      for (const [key, value] of Object.entries(normalized)) {
        if (key.startsWith(".") && host.endsWith(key)) return value;
      }
    } catch (err) {
      console.warn("Invalid VITE_SERVICE_NAME_MAP JSON:", err);
    }
  }

  return fallback;
};

const Maintenance = () => {
  const serviceName = resolveServiceName();

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Ambient orbs */}
      <div
        className="orb animate-float-slow"
        style={{
          top: "-10%",
          left: "-10%",
          width: "55vw",
          height: "55vw",
          background: "var(--gradient-orb-1)",
        }}
        aria-hidden="true"
      />
      <div
        className="orb animate-float-slower"
        style={{
          bottom: "-15%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          background: "var(--gradient-orb-2)",
        }}
        aria-hidden="true"
      />
      <div
        className="orb animate-pulse-glow"
        style={{
          top: "30%",
          right: "20%",
          width: "30vw",
          height: "30vw",
          background: "var(--gradient-orb-3)",
        }}
        aria-hidden="true"
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="glass-card animate-fade-up w-full max-w-xl rounded-3xl p-10 text-center sm:p-14">
          {/* Animated gear emblem */}
          <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
            <div
              className="absolute inset-0 rounded-full opacity-60 blur-2xl"
              style={{ background: "var(--gradient-text)" }}
              aria-hidden="true"
            />
            <div className="relative flex h-full w-full items-center justify-center rounded-full border border-border/60 bg-card/40">
              <Settings
                className="absolute h-16 w-16 text-primary animate-spin-slow"
                strokeWidth={1.4}
                aria-hidden="true"
              />
              <Wrench
                className="relative h-7 w-7 text-accent animate-spin-reverse"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>
          </div>

          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            {serviceName ?? "Currently unavailable"}
          </p>

          <h1 className="mb-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            <span className="text-gradient">We'll be back soon</span>
          </h1>

          <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            This service is temporarily offline. Please check back in a little while —
            thanks for your patience.
          </p>

          {/* Animated dots */}
          <div className="mb-8 flex items-center justify-center gap-2" aria-label="Working">
            <span className="animate-dot h-2 w-2 rounded-full bg-primary" style={{ animationDelay: "0s" }} />
            <span className="animate-dot h-2 w-2 rounded-full bg-accent" style={{ animationDelay: "0.2s" }} />
            <span className="animate-dot h-2 w-2 rounded-full bg-primary" style={{ animationDelay: "0.4s" }} />
          </div>

          <div className="mx-auto flex max-w-sm items-center justify-center gap-3 rounded-full border border-border/60 bg-secondary/40 px-5 py-3 text-sm text-muted-foreground">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <span>Status: temporarily offline</span>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <footer className="relative z-10 pb-8 text-center text-xs text-muted-foreground/70">
        Please check back in a few minutes.
      </footer>
    </main>
  );
};

export default Maintenance;
