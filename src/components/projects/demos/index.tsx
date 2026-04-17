"use client";

import { useEffect, useMemo, useState } from "react";
import type { DemoKey } from "@/data/projects";
import { cn } from "@/lib/cn";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Edit3,
  Eye,
  MessageCircle,
  Minus,
  Plus,
  Scissors,
  Sparkles,
  Zap,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// shared primitives
// ─────────────────────────────────────────────────────────────────────────────

function Kpi({
  label,
  value,
  accent = "phosphor",
  delta,
}: {
  label: string;
  value: string;
  accent?: "phosphor" | "amber" | "magenta" | "red";
  delta?: string;
}) {
  const color = {
    phosphor: "text-[var(--color-phosphor)]",
    amber: "text-[var(--color-amber)]",
    magenta: "text-[var(--color-magenta)]",
    red: "text-[var(--color-red)]",
  }[accent];
  return (
    <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-3">
      <div className="text-[10px] uppercase tracking-widest text-[var(--color-phosphor-mute)]">
        {label}
      </div>
      <div className={cn("pt-1 text-xl phosphor-glow-soft", color)}>
        {value}
      </div>
      {delta && (
        <div className="text-[10px] text-[var(--color-phosphor-dim)]">
          {delta}
        </div>
      )}
    </div>
  );
}

function TinyBtn({
  children,
  onClick,
  tone = "phosphor",
  type = "button",
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  tone?: "phosphor" | "amber" | "magenta";
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const color = {
    phosphor:
      "border-[var(--color-phosphor)] text-[var(--color-phosphor)] hover:bg-[var(--color-phosphor)] hover:text-[var(--color-bg)]",
    amber:
      "border-[var(--color-amber)] text-[var(--color-amber)] hover:bg-[var(--color-amber)] hover:text-[var(--color-bg)]",
    magenta:
      "border-[var(--color-magenta)] text-[var(--color-magenta)] hover:bg-[var(--color-magenta)] hover:text-[var(--color-bg)]",
  }[tone];
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-xs transition disabled:opacity-40 disabled:cursor-not-allowed",
        color,
      )}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 01 · expense-tracker
// ─────────────────────────────────────────────────────────────────────────────

const EXPENSE_TX_SEED = [
  { id: 1, date: "Apr 14", merchant: "Continente", amount: -38.42, cat: "groceries" },
  { id: 2, date: "Apr 14", merchant: "IKEA", amount: -129.99, cat: "home" },
  { id: 3, date: "Apr 13", merchant: "EDP Energia", amount: -64.1, cat: "utilities" },
  { id: 4, date: "Apr 12", merchant: "Uber Trip", amount: -7.8, cat: "transport" },
  { id: 5, date: "Apr 12", merchant: "Salary — Capgemini", amount: 2650, cat: "income" },
  { id: 6, date: "Apr 11", merchant: "Netflix", amount: -13.99, cat: "entertainment" },
  { id: 7, date: "Apr 10", merchant: "Lidl", amount: -22.15, cat: "groceries" },
  { id: 8, date: "Apr 09", merchant: "A Padaria Portuguesa", amount: -4.2, cat: "dining" },
];

const CAT_COLORS: Record<string, string> = {
  groceries: "#33ff66",
  home: "#f4c430",
  furniture: "#ff4d94",
  utilities: "#4de3ff",
  transport: "#7dff9b",
  entertainment: "#c084fc",
  dining: "#ff5e5e",
  income: "#1f9c3d",
};

function ExpenseTrackerDemo() {
  const [tx, setTx] = useState(EXPENSE_TX_SEED);
  const [recategorizing, setRecategorizing] = useState(false);

  const spent = tx.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);
  const income = tx.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const balance = income + spent;

  const byCat = useMemo(() => {
    const map = new Map<string, number>();
    tx.filter((t) => t.amount < 0).forEach((t) => {
      map.set(t.cat, (map.get(t.cat) ?? 0) + Math.abs(t.amount));
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [tx]);

  function recategorize() {
    setRecategorizing(true);
    setTimeout(() => {
      setTx((prev) =>
        prev.map((t) =>
          t.merchant === "IKEA" ? { ...t, cat: "furniture" } : t,
        ),
      );
      setRecategorizing(false);
    }, 900);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <Kpi label="balance" value={`€${balance.toFixed(0)}`} accent="phosphor" />
          <Kpi label="spent" value={`€${Math.abs(spent).toFixed(0)}`} accent="red" delta="apr / month-to-date" />
          <Kpi label="income" value={`€${income.toFixed(0)}`} accent="amber" />
        </div>
        <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-2 text-xs">
            <span className="text-[var(--color-phosphor-dim)]">
              recent transactions
            </span>
            <TinyBtn tone="magenta" onClick={recategorize} disabled={recategorizing}>
              <Sparkles className="size-3" />
              {recategorizing ? "analyzing…" : "re-categorize w/ claude"}
            </TinyBtn>
          </div>
          <ul className="divide-y divide-[var(--color-border)] text-xs">
            {tx.map((t) => (
              <li
                key={t.id}
                className="grid grid-cols-[60px_1fr_90px_100px] items-center gap-2 px-3 py-2"
              >
                <span className="text-[var(--color-phosphor-mute)]">{t.date}</span>
                <span className="text-[var(--color-phosphor)]">{t.merchant}</span>
                <span
                  className="justify-self-start rounded-sm px-1.5 py-0.5 text-[10px] uppercase tracking-widest"
                  style={{
                    background: `${CAT_COLORS[t.cat] ?? "#1f9c3d"}22`,
                    color: CAT_COLORS[t.cat] ?? "#33ff66",
                    border: `1px solid ${CAT_COLORS[t.cat] ?? "#33ff66"}55`,
                  }}
                >
                  {t.cat}
                </span>
                <span
                  className={cn(
                    "justify-self-end tabular-nums",
                    t.amount < 0 ? "text-[var(--color-red)]" : "text-[var(--color-phosphor)]",
                  )}
                >
                  {t.amount < 0 ? "-" : "+"}€{Math.abs(t.amount).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-3">
        <div className="text-xs text-[var(--color-phosphor-dim)]">spend by category · last 30 days</div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={byCat}
                dataKey="value"
                nameKey="name"
                innerRadius={48}
                outerRadius={86}
                paddingAngle={2}
              >
                {byCat.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={CAT_COLORS[entry.name] ?? "#33ff66"}
                    stroke="#0a0f0a"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0f1710",
                  border: "1px solid #2d4a32",
                  color: "#33ff66",
                  fontSize: 11,
                }}
                formatter={(v: number) => `€${v.toFixed(2)}`}
              />
              <Legend
                iconSize={8}
                wrapperStyle={{ fontSize: 10, color: "#1f9c3d" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 02 · formeq (bilingual site + inline CMS)
// ─────────────────────────────────────────────────────────────────────────────

function FormeqDemo() {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [admin, setAdmin] = useState(false);
  const [heading, setHeading] = useState({
    pt: "Engenharia civil com rigor.",
    en: "Civil engineering, done right.",
  });

  const copy = {
    pt: {
      tag: "eng. civil · lisboa",
      sub: "Projetos de estruturas, reabilitação e fiscalização de obra.",
      blocks: [
        { t: "estruturas", d: "Cálculo e dimensionamento para edifícios e infraestruturas." },
        { t: "reabilitação", d: "Reforço, consolidação e adaptação de edifícios existentes." },
        { t: "fiscalização", d: "Acompanhamento de obra e controlo de qualidade em campo." },
      ],
      cta: "pedir proposta",
    },
    en: {
      tag: "civil eng. · lisbon",
      sub: "Structural design, rehabilitation, and on-site supervision.",
      blocks: [
        { t: "structures", d: "Calculations and sizing for buildings and infrastructure." },
        { t: "rehabilitation", d: "Reinforcing and adapting existing structures." },
        { t: "supervision", d: "On-site supervision and quality control." },
      ],
      cta: "request a proposal",
    },
  }[lang];

  return (
    <div className="relative rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-2 text-xs text-[var(--color-phosphor-dim)]">
        <span>formeq.pt / {lang}</span>
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-sm border border-[var(--color-border-bright)]">
            {(["pt", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={cn(
                  "px-2 py-0.5 text-[10px] uppercase tracking-widest",
                  lang === l
                    ? "bg-[var(--color-phosphor)] text-[var(--color-bg)]"
                    : "text-[var(--color-phosphor-dim)]",
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <TinyBtn tone="amber" onClick={() => setAdmin((v) => !v)}>
            <Edit3 className="size-3" />
            {admin ? "preview" : "admin mode"}
          </TinyBtn>
        </div>
      </div>
      <div className="space-y-5 p-6">
        <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-amber)]">
          {copy.tag}
        </div>
        {admin ? (
          <input
            value={heading[lang]}
            onChange={(e) => setHeading((h) => ({ ...h, [lang]: e.target.value }))}
            className="w-full border-b border-[var(--color-amber)] bg-transparent text-2xl text-[var(--color-phosphor)] outline-none phosphor-glow-soft"
          />
        ) : (
          <h3 className="text-2xl text-[var(--color-phosphor)] phosphor-glow-soft">
            {heading[lang]}
          </h3>
        )}
        <p className="max-w-xl text-sm text-[var(--color-phosphor-dim)]">{copy.sub}</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {copy.blocks.map((b) => (
            <div
              key={b.t}
              className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-3"
            >
              <div className="text-xs uppercase tracking-widest text-[var(--color-amber)]">
                {b.t}
              </div>
              <div className="pt-1 text-xs text-[var(--color-phosphor-dim)]">
                {b.d}
              </div>
            </div>
          ))}
        </div>
        <TinyBtn tone="phosphor">
          {copy.cta}
          <ArrowRight className="size-3" />
        </TinyBtn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 03 · restaurant-automation
// ─────────────────────────────────────────────────────────────────────────────

const MENU = [
  { id: "bife", name: "Bife à portuguesa", price: 14.5, ai: "add mushroom sauce for +€1.50" },
  { id: "bacalhau", name: "Bacalhau à brás", price: 13.0, ai: "pairs well with white wine" },
  { id: "polvo", name: "Polvo à lagareiro", price: 17.5, ai: "recommend roast potatoes side" },
  { id: "arroz", name: "Arroz de marisco", price: 15.0, ai: "spicy variant available" },
  { id: "francesinha", name: "Francesinha", price: 12.0, ai: "extra cheese suggested" },
  { id: "sardinhas", name: "Sardinhas assadas", price: 11.0, ai: "grilled peppers recommended" },
];

function RestaurantAutomationDemo() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [ordered, setOrdered] = useState(false);

  const total = Object.entries(cart).reduce((s, [id, q]) => {
    const m = MENU.find((x) => x.id === id);
    return s + (m ? m.price * q : 0);
  }, 0);

  function inc(id: string) {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  }
  function dec(id: string) {
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) - 1) }));
  }

  if (ordered) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-sm border border-[var(--color-phosphor)] bg-[var(--color-bg-raised)] p-8 text-center">
        <Check className="size-10 text-[var(--color-phosphor)] phosphor-glow" />
        <div className="text-lg text-[var(--color-phosphor)] phosphor-glow-soft">
          order #{Math.floor(Math.random() * 9000 + 1000)} sent to kitchen
        </div>
        <div className="text-xs text-[var(--color-phosphor-dim)]">
          €{total.toFixed(2)} · est. ready in 18 minutes
        </div>
        <TinyBtn tone="phosphor" onClick={() => { setCart({}); setOrdered(false); }}>
          new order
        </TinyBtn>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-2">
        <div className="text-xs text-[var(--color-phosphor-dim)]">menu · click to add</div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {MENU.map((m) => {
            const qty = cart[m.id] ?? 0;
            return (
              <li
                key={m.id}
                className={cn(
                  "group relative rounded-sm border p-3 transition",
                  qty > 0
                    ? "border-[var(--color-phosphor-dim)] bg-[var(--color-phosphor)]/5"
                    : "border-[var(--color-border)] bg-[var(--color-bg-raised)]",
                )}
              >
                <button
                  type="button"
                  onClick={() => inc(m.id)}
                  className="block w-full text-left"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm text-[var(--color-phosphor)]">
                      {m.name}
                    </span>
                    <span className="text-xs text-[var(--color-amber)]">
                      €{m.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-1 text-[10px] text-[var(--color-magenta)]">
                    <Sparkles className="inline size-2.5 mr-1" />
                    claude: {m.ai}
                  </div>
                </button>
                {qty > 0 && (
                  <div className="absolute right-2 top-2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => dec(m.id)}
                      className="size-5 rounded-sm border border-[var(--color-phosphor-dim)] text-[var(--color-phosphor-dim)]"
                      aria-label="remove one"
                    >
                      <Minus className="size-3 mx-auto" />
                    </button>
                    <span className="tabular-nums text-xs text-[var(--color-phosphor)]">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => inc(m.id)}
                      className="size-5 rounded-sm border border-[var(--color-phosphor-dim)] text-[var(--color-phosphor-dim)]"
                      aria-label="add one"
                    >
                      <Plus className="size-3 mx-auto" />
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <aside className="flex flex-col rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
        <div className="border-b border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-phosphor-dim)]">
          cart · table 3
        </div>
        <ul className="flex-1 divide-y divide-[var(--color-border)] text-xs">
          {Object.entries(cart)
            .filter(([, q]) => q > 0)
            .map(([id, q]) => {
              const m = MENU.find((x) => x.id === id)!;
              return (
                <li
                  key={id}
                  className="flex items-center justify-between px-3 py-2"
                >
                  <span className="text-[var(--color-phosphor)]">
                    {q}× {m.name}
                  </span>
                  <span className="text-[var(--color-phosphor-dim)]">
                    €{(m.price * q).toFixed(2)}
                  </span>
                </li>
              );
            })}
          {total === 0 && (
            <li className="p-3 text-center text-[var(--color-phosphor-mute)]">
              (no items yet)
            </li>
          )}
        </ul>
        <div className="border-t border-[var(--color-border)] p-3">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-widest text-[var(--color-phosphor-dim)]">
              total
            </span>
            <span className="text-lg text-[var(--color-amber)] phosphor-glow-soft">
              €{total.toFixed(2)}
            </span>
          </div>
          <TinyBtn
            tone="phosphor"
            onClick={() => total > 0 && setOrdered(true)}
            disabled={total === 0}
          >
            send to kitchen
            <ArrowRight className="size-3" />
          </TinyBtn>
        </div>
      </aside>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 04 · vilela-notifications
// ─────────────────────────────────────────────────────────────────────────────

function VilelaNotificationsDemo() {
  const [step, setStep] = useState(0);
  const [twitch, setTwitch] = useState("");
  const [channels, setChannels] = useState<string[]>(["#live-alerts"]);
  const [notif, setNotif] = useState({ live: true, clips: true, uploads: false, subs: true });

  const steps = ["connect twitch", "pick channels", "toggle events", "done"];
  const availableChannels = ["#live-alerts", "#highlights", "#general", "#notifications"];

  return (
    <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-3 py-2 text-xs overflow-x-auto phosphor-scroll">
        {steps.map((s, i) => (
          <div key={s} className="flex shrink-0 items-center gap-2">
            <span
              className={cn(
                "inline-flex size-5 items-center justify-center rounded-full text-[10px]",
                i <= step
                  ? "bg-[var(--color-phosphor)] text-[var(--color-bg)] phosphor-glow"
                  : "border border-[var(--color-border-bright)] text-[var(--color-phosphor-mute)]",
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                "uppercase tracking-widest",
                i === step ? "text-[var(--color-phosphor)]" : "text-[var(--color-phosphor-dim)]",
              )}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <ChevronRight className="size-3 text-[var(--color-phosphor-mute)]" />
            )}
          </div>
        ))}
      </div>
      <div className="p-6">
        {step === 0 && (
          <div className="space-y-4">
            <h4 className="text-sm text-[var(--color-phosphor)]">
              paste your twitch channel name
            </h4>
            <input
              value={twitch}
              onChange={(e) => setTwitch(e.target.value)}
              placeholder="e.g. vilela"
              className="w-full rounded-sm border border-[var(--color-border-bright)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-phosphor)] outline-none focus:border-[var(--color-phosphor)]"
            />
            <TinyBtn
              tone="phosphor"
              onClick={() => twitch.trim() && setStep(1)}
              disabled={!twitch.trim()}
            >
              continue
              <ArrowRight className="size-3" />
            </TinyBtn>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-sm text-[var(--color-phosphor)]">
              pick the discord channels to post to
            </h4>
            <ul className="space-y-1">
              {availableChannels.map((c) => {
                const on = channels.includes(c);
                return (
                  <li key={c}>
                    <label className="flex cursor-pointer items-center gap-3 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-2 text-sm hover:border-[var(--color-phosphor-dim)]">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() =>
                          setChannels((cs) =>
                            on ? cs.filter((x) => x !== c) : [...cs, c],
                          )
                        }
                        className="accent-[var(--color-phosphor)]"
                      />
                      <span className={on ? "text-[var(--color-phosphor)]" : "text-[var(--color-phosphor-dim)]"}>
                        {c}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <TinyBtn
              tone="phosphor"
              onClick={() => channels.length && setStep(2)}
              disabled={!channels.length}
            >
              continue
              <ArrowRight className="size-3" />
            </TinyBtn>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="text-sm text-[var(--color-phosphor)]">
              which events should post to discord?
            </h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {(Object.keys(notif) as Array<keyof typeof notif>).map((k) => (
                <label
                  key={k}
                  className="flex cursor-pointer items-center justify-between rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-2 text-sm"
                >
                  <span className={notif[k] ? "text-[var(--color-phosphor)]" : "text-[var(--color-phosphor-dim)]"}>
                    {k === "live" && "live alerts"}
                    {k === "clips" && "new clips"}
                    {k === "uploads" && "youtube uploads"}
                    {k === "subs" && "new subscribers"}
                  </span>
                  <input
                    type="checkbox"
                    checked={notif[k]}
                    onChange={() => setNotif((n) => ({ ...n, [k]: !n[k] }))}
                    className="accent-[var(--color-phosphor)]"
                  />
                </label>
              ))}
            </div>
            <TinyBtn tone="phosphor" onClick={() => setStep(3)}>
              deploy bot
              <Zap className="size-3" />
            </TinyBtn>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-3">
            <div className="text-sm text-[var(--color-phosphor)] phosphor-glow-soft">
              ✓ bot deployed — posting to {channels.join(", ")}
            </div>
            <div className="rounded-sm border border-[var(--color-magenta)]/40 bg-[var(--color-bg-elev)] p-3">
              <div className="mb-1 text-[10px] uppercase tracking-widest text-[var(--color-magenta)]">
                preview · #live-alerts
              </div>
              <div className="text-sm text-[var(--color-phosphor-dim)]">
                🔴 <span className="text-[var(--color-phosphor)]">{twitch || "vilela"}</span> is now live: <span className="italic">&quot;Just Chatting — catch up with the week&quot;</span>
              </div>
            </div>
            <TinyBtn tone="amber" onClick={() => setStep(0)}>
              start over
            </TinyBtn>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 05 · cahico-erp
// ─────────────────────────────────────────────────────────────────────────────

const ERP_ACT_SEED = [
  { t: "09:12", who: "A. Ferreira", what: { pt: "fatura criada", en: "invoice created", es: "factura creada" }, ref: "INV-0421" },
  { t: "09:04", who: "M. Costa", what: { pt: "cliente adicionado", en: "customer added", es: "cliente añadido" }, ref: "C-114" },
  { t: "08:48", who: "sys", what: { pt: "cópia de segurança", en: "backup completed", es: "copia de seguridad" }, ref: "db" },
];

function CahicoErpDemo() {
  const [lang, setLang] = useState<"pt" | "en" | "es">("pt");
  const [invoices, setInvoices] = useState(18);
  const [act, setAct] = useState(ERP_ACT_SEED);

  const t = {
    pt: { revenue: "receita", customers: "clientes", invoices: "faturas", overdue: "em atraso", feed: "atividade recente", add: "+ nova fatura" },
    en: { revenue: "revenue", customers: "customers", invoices: "invoices", overdue: "overdue", feed: "recent activity", add: "+ new invoice" },
    es: { revenue: "ingresos", customers: "clientes", invoices: "facturas", overdue: "vencidas", feed: "actividad reciente", add: "+ nueva factura" },
  }[lang];

  function add() {
    const n = `INV-${(Math.floor(Math.random() * 900) + 100).toString()}`;
    setInvoices((v) => v + 1);
    setAct((prev) => [
      { t: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), who: "you", what: { pt: "fatura criada", en: "invoice created", es: "factura creada" }, ref: n },
      ...prev.slice(0, 4),
    ]);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xs text-[var(--color-phosphor-dim)]">cahico erp / dashboard</div>
        <div className="flex overflow-hidden rounded-sm border border-[var(--color-border-bright)]">
          {(["pt", "en", "es"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={cn(
                "px-2 py-0.5 text-[10px] uppercase tracking-widest",
                lang === l ? "bg-[var(--color-phosphor)] text-[var(--color-bg)]" : "text-[var(--color-phosphor-dim)]",
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        <Kpi label={t.revenue} value="€42,180" accent="phosphor" delta="+12% mom" />
        <Kpi label={t.customers} value="238" accent="amber" />
        <Kpi label={t.invoices} value={String(invoices)} accent="phosphor" delta="apr · month-to-date" />
        <Kpi label={t.overdue} value="3" accent="red" />
      </div>
      <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-3">
          <div className="mb-2 text-xs text-[var(--color-phosphor-dim)]">monthly revenue · 2026</div>
          <div className="h-44">
            <ResponsiveContainer>
              <BarChart
                data={[
                  { m: "jan", v: 28 }, { m: "feb", v: 31 }, { m: "mar", v: 36 },
                  { m: "apr", v: 42 }, { m: "may", v: 0 }, { m: "jun", v: 0 },
                ]}
              >
                <CartesianGrid stroke="#1c2a1f" vertical={false} />
                <XAxis dataKey="m" stroke="#1f9c3d" fontSize={10} />
                <YAxis stroke="#1f9c3d" fontSize={10} />
                <Tooltip contentStyle={{ background: "#0f1710", border: "1px solid #2d4a32", color: "#33ff66", fontSize: 11 }} />
                <Bar dataKey="v" fill="#33ff66" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-2 text-xs">
            <span className="text-[var(--color-phosphor-dim)]">{t.feed}</span>
            <TinyBtn tone="phosphor" onClick={add}>{t.add}</TinyBtn>
          </div>
          <ul className="divide-y divide-[var(--color-border)] text-xs">
            {act.map((a, i) => (
              <li key={i} className="grid grid-cols-[50px_1fr_auto] items-center gap-2 px-3 py-2">
                <span className="text-[var(--color-phosphor-mute)] tabular-nums">{a.t}</span>
                <span className="text-[var(--color-phosphor-dim)]">
                  <span className="text-[var(--color-phosphor)]">{a.who}</span> · {a.what[lang]}
                </span>
                <span className="text-[var(--color-amber)]">{a.ref}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 06 · driving-school
// ─────────────────────────────────────────────────────────────────────────────

const STUDENTS = [
  { id: 1, name: "Ana Ramos", progress: 78, status: "active", lessons: 12, nextExam: "May 03" },
  { id: 2, name: "Bruno Lopes", progress: 45, status: "active", lessons: 7, nextExam: "May 17" },
  { id: 3, name: "Catarina Pires", progress: 92, status: "ready", lessons: 18, nextExam: "Apr 24" },
  { id: 4, name: "Diogo Matos", progress: 30, status: "active", lessons: 4, nextExam: "-" },
  { id: 5, name: "Elena Santos", progress: 100, status: "graduated", lessons: 22, nextExam: "passed" },
  { id: 6, name: "Filipe Alves", progress: 62, status: "active", lessons: 10, nextExam: "May 10" },
];

function DrivingSchoolDemo() {
  const [sort, setSort] = useState<"name" | "progress">("progress");
  const [filter, setFilter] = useState<"all" | "active" | "ready" | "graduated">("all");
  const [selected, setSelected] = useState<number | null>(null);

  const shown = [...STUDENTS]
    .filter((s) => filter === "all" || s.status === filter)
    .sort((a, b) => (sort === "name" ? a.name.localeCompare(b.name) : b.progress - a.progress));

  const sel = STUDENTS.find((s) => s.id === selected);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[var(--color-phosphor-dim)]">filter:</span>
          {(["all", "active", "ready", "graduated"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-sm border px-2 py-0.5 uppercase tracking-widest",
                filter === f
                  ? "border-[var(--color-phosphor)] bg-[var(--color-phosphor)]/10 text-[var(--color-phosphor)]"
                  : "border-[var(--color-border)] text-[var(--color-phosphor-dim)]",
              )}
            >
              {f}
            </button>
          ))}
          <span className="ml-4 text-[var(--color-phosphor-dim)]">sort:</span>
          <button
            onClick={() => setSort("name")}
            className={cn("text-xs", sort === "name" ? "text-[var(--color-phosphor)]" : "text-[var(--color-phosphor-dim)]")}
          >
            name
          </button>
          <span className="text-[var(--color-phosphor-mute)]">·</span>
          <button
            onClick={() => setSort("progress")}
            className={cn("text-xs", sort === "progress" ? "text-[var(--color-phosphor)]" : "text-[var(--color-phosphor-dim)]")}
          >
            progress
          </button>
        </div>
        <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] text-xs">
          <div className="grid grid-cols-[1fr_100px_70px_90px] border-b border-[var(--color-border)] px-3 py-2 text-[10px] uppercase tracking-widest text-[var(--color-phosphor-mute)]">
            <span>student</span>
            <span>progress</span>
            <span>lessons</span>
            <span>status</span>
          </div>
          <ul className="divide-y divide-[var(--color-border)]">
            {shown.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setSelected(s.id)}
                  className={cn(
                    "grid w-full grid-cols-[1fr_100px_70px_90px] items-center gap-2 px-3 py-2 text-left",
                    selected === s.id
                      ? "bg-[var(--color-bg-elev)] text-[var(--color-phosphor)]"
                      : "text-[var(--color-phosphor-dim)] hover:bg-[var(--color-bg-elev)]",
                  )}
                >
                  <span>{s.name}</span>
                  <span className="flex items-center gap-1">
                    <span className="h-1 flex-1 rounded-full bg-[var(--color-border-bright)]">
                      <span
                        className="block h-1 rounded-full bg-[var(--color-phosphor)]"
                        style={{ width: `${s.progress}%` }}
                      />
                    </span>
                    <span className="tabular-nums text-[10px]">{s.progress}%</span>
                  </span>
                  <span>{s.lessons}</span>
                  <span
                    className={cn(
                      "text-[10px] uppercase tracking-widest",
                      s.status === "ready" && "text-[var(--color-amber)]",
                      s.status === "graduated" && "text-[var(--color-phosphor)]",
                      s.status === "active" && "text-[var(--color-phosphor-dim)]",
                    )}
                  >
                    {s.status}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <aside className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-3">
        {sel ? (
          <div className="space-y-3 text-xs">
            <div className="text-sm text-[var(--color-phosphor)] phosphor-glow-soft">
              {sel.name}
            </div>
            <div className="text-[var(--color-phosphor-dim)]">
              enrolled · category B · next exam <span className="text-[var(--color-amber)]">{sel.nextExam}</span>
            </div>
            <div>
              <div className="mb-1 uppercase tracking-widest text-[var(--color-phosphor-mute)]">
                skill progress
              </div>
              <ul className="space-y-1">
                {[
                  { k: "theory", v: Math.min(100, sel.progress + 10) },
                  { k: "maneuvers", v: Math.max(0, sel.progress - 8) },
                  { k: "city", v: sel.progress },
                  { k: "motorway", v: Math.max(0, sel.progress - 25) },
                ].map((p) => (
                  <li key={p.k} className="grid grid-cols-[90px_1fr_40px] items-center gap-2">
                    <span className="text-[var(--color-phosphor-dim)]">{p.k}</span>
                    <span className="h-1 rounded-full bg-[var(--color-border-bright)]">
                      <span className="block h-1 rounded-full bg-[var(--color-amber)]" style={{ width: `${p.v}%` }} />
                    </span>
                    <span className="text-right tabular-nums">{p.v}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="p-3 text-xs text-[var(--color-phosphor-mute)]">
            select a student to see their lesson plan.
          </div>
        )}
      </aside>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 07 · iracing-leaderboard
// ─────────────────────────────────────────────────────────────────────────────

const DRIVERS = [
  { id: 1, name: "R. Silva", best: 82.412, gap: 0, inc: 0, laps: [83.2, 82.9, 82.5, 82.4, 82.6] },
  { id: 2, name: "M. Pereira", best: 82.611, gap: 0.199, inc: 2, laps: [83.4, 83.1, 82.8, 82.6, 82.7] },
  { id: 3, name: "K. Lindström", best: 82.743, gap: 0.331, inc: 1, laps: [83.8, 83.2, 82.9, 82.8, 82.9] },
  { id: 4, name: "J. Hayashi", best: 82.908, gap: 0.496, inc: 0, laps: [83.6, 83.3, 82.9, 82.9, 83.1] },
  { id: 5, name: "A. Volkov", best: 83.011, gap: 0.599, inc: 4, laps: [84.1, 83.8, 83.2, 83.0, 83.3] },
  { id: 6, name: "L. Bianchi", best: 83.204, gap: 0.792, inc: 2, laps: [84.3, 83.9, 83.4, 83.2, 83.5] },
];

function IracingLeaderboardDemo() {
  const [selected, setSelected] = useState(1);
  const sel = DRIVERS.find((d) => d.id === selected)!;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-2 text-xs">
          <span className="text-[var(--color-phosphor-dim)]">
            practice · session 2 · spa-francorchamps
          </span>
          <span className="text-[var(--color-amber)]">
            <Clock className="inline size-3 mr-1" />
            live
          </span>
        </div>
        <div className="grid grid-cols-[24px_1fr_80px_70px_40px] border-b border-[var(--color-border)] px-3 py-2 text-[10px] uppercase tracking-widest text-[var(--color-phosphor-mute)]">
          <span>#</span>
          <span>driver</span>
          <span>best</span>
          <span>gap</span>
          <span>inc</span>
        </div>
        <ul className="divide-y divide-[var(--color-border)] text-xs">
          {DRIVERS.map((d, i) => (
            <li key={d.id}>
              <button
                onClick={() => setSelected(d.id)}
                className={cn(
                  "grid w-full grid-cols-[24px_1fr_80px_70px_40px] items-center gap-2 px-3 py-2 text-left transition",
                  selected === d.id
                    ? "bg-[var(--color-phosphor)]/10 text-[var(--color-phosphor)]"
                    : "text-[var(--color-phosphor-dim)] hover:bg-[var(--color-bg-elev)]",
                )}
              >
                <span className="tabular-nums">{i + 1}</span>
                <span>{d.name}</span>
                <span className="tabular-nums text-[var(--color-amber)]">
                  1:{d.best.toFixed(3)}
                </span>
                <span className="tabular-nums text-[var(--color-phosphor-dim)]">
                  {d.gap === 0 ? "leader" : `+${d.gap.toFixed(3)}`}
                </span>
                <span
                  className={cn(
                    "tabular-nums",
                    d.inc > 2 ? "text-[var(--color-red)]" : "text-[var(--color-phosphor-dim)]",
                  )}
                >
                  {d.inc}x
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-3">
        <div className="mb-2 flex items-baseline justify-between text-xs">
          <span className="text-[var(--color-phosphor)] phosphor-glow-soft">
            {sel.name}
          </span>
          <span className="text-[var(--color-phosphor-dim)]">last 5 laps</span>
        </div>
        <div className="h-48">
          <ResponsiveContainer>
            <LineChart
              data={sel.laps.map((v, i) => ({ lap: i + 1, t: v }))}
              margin={{ top: 4, right: 8, left: -24, bottom: 0 }}
            >
              <CartesianGrid stroke="#1c2a1f" vertical={false} />
              <XAxis dataKey="lap" stroke="#1f9c3d" fontSize={10} />
              <YAxis stroke="#1f9c3d" fontSize={10} domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{ background: "#0f1710", border: "1px solid #2d4a32", color: "#33ff66", fontSize: 11 }}
                formatter={(v: number) => `1:${v.toFixed(3)}`}
              />
              <Line type="monotone" dataKey="t" stroke="#33ff66" strokeWidth={2} dot={{ fill: "#7dff9b", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <ul className="mt-2 grid grid-cols-2 gap-2 text-[10px] text-[var(--color-phosphor-dim)]">
          <li>best: <span className="text-[var(--color-amber)]">1:{sel.best.toFixed(3)}</span></li>
          <li>avg: <span className="text-[var(--color-phosphor)]">1:{(sel.laps.reduce((a, b) => a + b, 0) / sel.laps.length).toFixed(3)}</span></li>
          <li>incidents: <span className={sel.inc > 2 ? "text-[var(--color-red)]" : "text-[var(--color-phosphor)]"}>{sel.inc}x</span></li>
          <li>gap: <span className="text-[var(--color-phosphor)]">{sel.gap === 0 ? "leader" : `+${sel.gap.toFixed(3)}`}</span></li>
        </ul>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 08 · barber-shop
// ─────────────────────────────────────────────────────────────────────────────

const BARBERS = [
  { id: "d", name: "Dragan", role: "master", img: "▲" },
  { id: "s", name: "Sérgio", role: "stylist", img: "◆" },
  { id: "a", name: "Ana", role: "stylist", img: "●" },
];
const SERVICES = [
  { id: "cut", name: "hair cut", price: 15, min: 30 },
  { id: "cut-beard", name: "hair + beard", price: 22, min: 45 },
  { id: "beard", name: "beard trim", price: 10, min: 20 },
  { id: "kids", name: "kids cut", price: 10, min: 25 },
];
const SLOTS = ["09:00", "10:30", "11:15", "13:00", "14:30", "16:00", "17:15", "18:30"];

function BarberShopDemo() {
  const [step, setStep] = useState(0);
  const [barber, setBarber] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);

  const stepNames = ["barber", "service", "time", "done"];
  const selService = SERVICES.find((s) => s.id === service);

  return (
    <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-3 py-2 text-xs overflow-x-auto phosphor-scroll">
        {stepNames.map((s, i) => (
          <div key={s} className="flex shrink-0 items-center gap-2">
            <span
              className={cn(
                "inline-flex size-5 items-center justify-center rounded-full text-[10px]",
                i <= step ? "bg-[var(--color-amber)] text-[var(--color-bg)]" : "border border-[var(--color-border-bright)] text-[var(--color-phosphor-mute)]",
              )}
            >
              {i + 1}
            </span>
            <span className={cn("uppercase tracking-widest", i === step ? "text-[var(--color-amber)]" : "text-[var(--color-phosphor-dim)]")}>
              {s}
            </span>
            {i < stepNames.length - 1 && <ChevronRight className="size-3 text-[var(--color-phosphor-mute)]" />}
          </div>
        ))}
      </div>
      <div className="p-6">
        {step === 0 && (
          <div className="grid gap-3 sm:grid-cols-3">
            {BARBERS.map((b) => (
              <button
                key={b.id}
                onClick={() => { setBarber(b.id); setStep(1); }}
                className="flex flex-col items-center gap-2 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-4 transition hover:border-[var(--color-amber)]"
              >
                <div className="grid size-14 place-items-center rounded-full border border-[var(--color-amber)] text-2xl text-[var(--color-amber)]">
                  {b.img}
                </div>
                <span className="text-sm text-[var(--color-phosphor)]">{b.name}</span>
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-phosphor-dim)]">{b.role}</span>
              </button>
            ))}
          </div>
        )}
        {step === 1 && (
          <div className="grid gap-2 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => { setService(s.id); setStep(2); }}
                className="flex items-center justify-between rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-3 text-sm transition hover:border-[var(--color-amber)]"
              >
                <span className="flex items-center gap-2 text-[var(--color-phosphor)]">
                  <Scissors className="size-3" />
                  {s.name}
                </span>
                <span className="text-xs text-[var(--color-amber)]">
                  €{s.price} · {s.min}min
                </span>
              </button>
            ))}
          </div>
        )}
        {step === 2 && (
          <div className="grid gap-2 sm:grid-cols-4">
            {SLOTS.map((t) => (
              <button
                key={t}
                onClick={() => { setSlot(t); setStep(3); }}
                className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-3 text-sm text-[var(--color-phosphor)] transition hover:border-[var(--color-amber)] hover:text-[var(--color-amber)]"
              >
                {t}
              </button>
            ))}
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col items-center gap-3 text-center">
            <Check className="size-10 text-[var(--color-phosphor)] phosphor-glow" />
            <div className="text-lg text-[var(--color-phosphor)]">
              booking confirmed
            </div>
            <div className="rounded-sm border border-[var(--color-amber)]/40 bg-[var(--color-bg-elev)] p-3 text-sm">
              <div>barber: <span className="text-[var(--color-amber)]">{BARBERS.find((b) => b.id === barber)?.name}</span></div>
              <div>service: <span className="text-[var(--color-amber)]">{selService?.name} · €{selService?.price}</span></div>
              <div>time: <span className="text-[var(--color-amber)]">today {slot}</span></div>
              <div className="pt-1 text-[10px] text-[var(--color-phosphor-dim)]">
                ref · BR-{Math.floor(Math.random() * 9000 + 1000)} — confirmation sent via resend
              </div>
            </div>
            <TinyBtn tone="amber" onClick={() => { setStep(0); setBarber(null); setService(null); setSlot(null); }}>
              book another
            </TinyBtn>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 09 · vilela-bridge
// ─────────────────────────────────────────────────────────────────────────────

const CHAT_SEED = [
  "WhaddupFam: gg!",
  "rai_: that corner was 🔥",
  "noelia: play radio on the next one",
  "tiago_k: pog",
  "ana.m: join the discord folks",
];
const CHAT_NAMES = ["rai_", "ana.m", "tiago_k", "noelia", "WhaddupFam"];
const CHAT_MSGS = ["🔥", "gg", "pog", "play radio!", "w move", "lfg", "let's go", "lol"];

function VilelaBridgeDemo() {
  const [viewers, setViewers] = useState(1247);
  const [chat, setChat] = useState(CHAT_SEED);

  useEffect(() => {
    const id = window.setInterval(() => {
      setViewers((v) => {
        const delta = Math.round((Math.random() - 0.4) * 20);
        return Math.max(1180, Math.min(1380, v + delta));
      });
      setChat((c) => {
        const name = CHAT_NAMES[Math.floor(Math.random() * CHAT_NAMES.length)];
        const msg = CHAT_MSGS[Math.floor(Math.random() * CHAT_MSGS.length)];
        return [`${name}: ${msg}`, ...c].slice(0, 9);
      });
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <Kpi label="viewers" value={viewers.toLocaleString()} accent="phosphor" delta="live · 01:42:18" />
          <Kpi label="followers" value="+14" accent="amber" delta="this stream" />
          <Kpi label="subs" value="283" accent="magenta" delta="+3 new" />
        </div>
        <div className="aspect-video rounded-sm border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-bg-elev)] via-[var(--color-bg-raised)] to-[var(--color-bg)] p-6">
          <div className="flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-2 text-[var(--color-red)]">
              <span className="inline-block size-2 rounded-full bg-[var(--color-red)] phosphor-glow" />
              LIVE
            </span>
            <span className="text-[var(--color-phosphor-dim)]">
              <Eye className="inline size-3 mr-1" />
              {viewers.toLocaleString()}
            </span>
          </div>
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <div className="text-3xl text-[var(--color-phosphor)] phosphor-glow">
              vilela · live
            </div>
            <div className="text-xs text-[var(--color-phosphor-dim)]">
              just chatting · #catch-up-stream
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-[var(--color-magenta)]/40 bg-[var(--color-bg-raised)] p-3">
          <div className="mb-2 flex items-center gap-2 text-xs">
            <Sparkles className="size-3 text-[var(--color-magenta)]" />
            <span className="text-[var(--color-magenta)]">claude · clip suggestions</span>
          </div>
          <ul className="space-y-1 text-xs">
            <li className="flex items-center justify-between rounded-sm bg-[var(--color-bg-elev)] px-2 py-1">
              <span className="text-[var(--color-phosphor-dim)]">
                <span className="text-[var(--color-phosphor)]">01:12:05</span> — audience laughter + applause peak
              </span>
              <span className="text-[var(--color-amber)]">0.94</span>
            </li>
            <li className="flex items-center justify-between rounded-sm bg-[var(--color-bg-elev)] px-2 py-1">
              <span className="text-[var(--color-phosphor-dim)]">
                <span className="text-[var(--color-phosphor)]">00:43:28</span> — story about portugal road trip
              </span>
              <span className="text-[var(--color-amber)]">0.81</span>
            </li>
            <li className="flex items-center justify-between rounded-sm bg-[var(--color-bg-elev)] px-2 py-1">
              <span className="text-[var(--color-phosphor-dim)]">
                <span className="text-[var(--color-phosphor)]">00:21:44</span> — sub raid from @ana_m
              </span>
              <span className="text-[var(--color-amber)]">0.77</span>
            </li>
          </ul>
        </div>
      </div>
      <aside className="flex flex-col rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
        <div className="border-b border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-phosphor-dim)]">
          <MessageCircle className="mr-1 inline size-3" />
          chat · 8.2k msg
        </div>
        <ul className="phosphor-scroll flex-1 overflow-y-auto p-3 text-xs">
          {chat.map((m, i) => (
            <li
              key={`${i}-${m}`}
              className={cn(
                "py-1",
                i === 0 ? "text-[var(--color-phosphor)] phosphor-glow-soft" : "text-[var(--color-phosphor-dim)]",
              )}
            >
              {m}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10 · auto-theme
// ─────────────────────────────────────────────────────────────────────────────

function AutoThemeDemo() {
  const [primary, setPrimary] = useState("#c084fc");
  const [text, setText] = useState("#0f172a");
  const [surface, setSurface] = useState("#fdf4ff");
  const [fontFamily, setFontFamily] = useState<"serif" | "sans" | "mono">("serif");

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
      <div className="space-y-3">
        <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-3">
          <div className="mb-2 text-xs uppercase tracking-widest text-[var(--color-phosphor-dim)]">
            colors
          </div>
          <ul className="space-y-2 text-xs">
            {[
              { label: "primary", val: primary, set: setPrimary },
              { label: "text", val: text, set: setText },
              { label: "surface", val: surface, set: setSurface },
            ].map((row) => (
              <li key={row.label} className="flex items-center justify-between gap-2">
                <span className="text-[var(--color-phosphor-dim)]">{row.label}</span>
                <div className="flex items-center gap-2">
                  <span className="tabular-nums text-[var(--color-amber)]">{row.val}</span>
                  <input
                    type="color"
                    value={row.val}
                    onChange={(e) => row.set(e.target.value)}
                    className="size-7 cursor-pointer rounded-sm border border-[var(--color-border-bright)] bg-transparent p-0.5"
                    aria-label={`${row.label} color`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-3">
          <div className="mb-2 text-xs uppercase tracking-widest text-[var(--color-phosphor-dim)]">
            font family
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["serif", "sans", "mono"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFontFamily(f)}
                className={cn(
                  "rounded-sm border py-2 text-xs uppercase tracking-widest",
                  fontFamily === f
                    ? "border-[var(--color-amber)] bg-[var(--color-amber)]/10 text-[var(--color-amber)]"
                    : "border-[var(--color-border)] text-[var(--color-phosphor-dim)]",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        className="rounded-md border border-[var(--color-border-bright)] p-6 transition"
        style={{
          background: surface,
          color: text,
          fontFamily:
            fontFamily === "serif"
              ? "Georgia, serif"
              : fontFamily === "sans"
                ? "system-ui, sans-serif"
                : "ui-monospace, monospace",
        }}
      >
        <div className="text-[10px] uppercase tracking-widest" style={{ color: primary }}>
          preview · adriana&apos;s store
        </div>
        <h3 className="pt-2 text-3xl font-bold" style={{ color: text }}>
          A whisper of spring.
        </h3>
        <p className="pt-2 text-sm" style={{ color: text, opacity: 0.75 }}>
          Curated linens, ceramics, and stationery — new drops every Friday.
        </p>
        <div className="flex gap-2 pt-3">
          <button
            className="rounded-sm px-3 py-2 text-xs font-medium"
            style={{ background: primary, color: surface }}
          >
            shop the collection →
          </button>
          <button
            className="rounded-sm border px-3 py-2 text-xs font-medium"
            style={{ borderColor: primary, color: primary }}
          >
            newsletter
          </button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["linen", "ceramics", "paper"].map((p) => (
            <div
              key={p}
              className="aspect-square rounded-sm"
              style={{ background: `${primary}22`, border: `1px dashed ${primary}` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// registry
// ─────────────────────────────────────────────────────────────────────────────

export const DEMOS: Record<DemoKey, React.ComponentType> = {
  "expense-tracker": ExpenseTrackerDemo,
  formeq: FormeqDemo,
  "restaurant-automation": RestaurantAutomationDemo,
  "vilela-notifications": VilelaNotificationsDemo,
  "cahico-erp": CahicoErpDemo,
  "driving-school": DrivingSchoolDemo,
  "iracing-leaderboard": IracingLeaderboardDemo,
  "barber-shop": BarberShopDemo,
  "vilela-bridge": VilelaBridgeDemo,
  "auto-theme": AutoThemeDemo,
};
