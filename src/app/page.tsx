import { Suspense } from "react";
import DailySpendChart from "@/app/components/DailySpendChart";
import CategoryBarChart from "@/app/components/CategoryBarChart";
import SummaryCards from "@/app/components/SummaryCards";
import TransactionsTable from "@/app/components/TransactionsTable";
import { spendByCategory } from "@/data/insights";
import { transactions } from "@/data/transactions";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    value
  );

const InsightNarrative = () => {
  const [primary, secondary] = spendByCategory();
  const recent = transactions.slice(-5).map((txn) => txn.category);

  return (
    <section className="insight-card" aria-label="Highlights">
      <h2>Quick Highlights</h2>
      <ul>
        <li>
          {primary ? `${primary.category} leads total spending` : "Spending is evenly distributed"},{" "}
          followed by {secondary?.category ?? "other categories"}. Consider earmarking a fixed weekly
          budget if you want to rein in impulse meals.
        </li>
        <li>
          Transport spikes twice (Nov 26 & Dec 24). Planning ahead for larger trips could smooth the
          monthly cash flow.
        </li>
        <li>
          Recent habit check: {recent.join(", ")}—mostly quick food runs. Packing snacks might free up
          funds for savings.
        </li>
      </ul>
    </section>
  );
};

export default function HomePage() {
  return (
    <main>
      <header className="page-header">
        <div>
          <p className="eyebrow">Nur Mohammad · Personal Ledger</p>
          <h1>Expense Pulse</h1>
          <p className="lede">
            A clean overview of WhatsApp logged spending between October 27, 2025 and January 2, 2026.
            Track where the cash goes and spot patterns instantly.
          </p>
        </div>
      </header>

      <SummaryCards />

      <section className="grid-two" aria-label="Charts">
        <article className="chart-card">
          <div className="chart-card-header">
            <div>
              <h2>Daily Spend Trend</h2>
              <p>Totals with food and transport layers for context</p>
            </div>
            <span className="badge">{transactions.length} txns</span>
          </div>
          <Suspense fallback={<div className="chart-fallback">Loading trend…</div>}>
            <DailySpendChart />
          </Suspense>
        </article>
        <article className="chart-card">
          <div className="chart-card-header">
            <div>
              <h2>Category Breakdown</h2>
              <p>Where the money concentrated</p>
            </div>
            <span className="badge">{formatCurrency(spendByCategory()[0]?.amount ?? 0)} top</span>
          </div>
          <Suspense fallback={<div className="chart-fallback">Loading categories…</div>}>
            <CategoryBarChart />
          </Suspense>
        </article>
      </section>

      <InsightNarrative />

      <TransactionsTable />
    </main>
  );
}
