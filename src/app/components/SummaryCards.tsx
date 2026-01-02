import { averageSpendPerDay, topCategory } from "@/data/insights";
import { totalSpend, transactions } from "@/data/transactions";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    value
  );

const formatDaily = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 1 }).format(
    value
  );

const highlightColor = ["#1e3a8a", "#1d4ed8", "#3b82f6"];

const summaryItems = () => {
  const top = topCategory();

  return [
    {
      title: "Total Spend",
      value: formatCurrency(totalSpend),
      helper: `${transactions.length} transactions`,
      accent: highlightColor[0]
    },
    {
      title: "Highest Category",
      value: top ? `${top.category} • ${formatCurrency(top.amount)}` : "–",
      helper: "Where most money went",
      accent: highlightColor[1]
    },
    {
      title: "Average / Day",
      value: formatDaily(averageSpendPerDay()),
      helper: "Smoothed over active days",
      accent: highlightColor[2]
    }
  ];
};

export const SummaryCards = () => {
  return (
    <section className="summary-grid" aria-label="Expense summary">
      {summaryItems().map((item) => (
        <article key={item.title} className="summary-card" style={{ borderTopColor: item.accent }}>
          <p className="summary-title">{item.title}</p>
          <p className="summary-value">{item.value}</p>
          <p className="summary-helper">{item.helper}</p>
        </article>
      ))}
    </section>
  );
};

export default SummaryCards;
