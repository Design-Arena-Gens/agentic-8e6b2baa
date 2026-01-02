import { transactions } from "@/data/transactions";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    value
  );

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));

export const TransactionsTable = () => {
  return (
    <section className="table-card" aria-label="Transaction history">
      <header className="table-header">
        <h2>All Transactions</h2>
        <p>{transactions.length} records · Oct 27 – Jan 2</p>
      </header>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col" className="numeric">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id}>
                <td>{formatDateTime(txn.timestamp)}</td>
                <td>
                  <span className={`chip chip-${txn.category.toLowerCase()}`}>
                    {txn.category}
                  </span>
                </td>
                <td>{txn.description}</td>
                <td className="numeric">{formatCurrency(txn.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TransactionsTable;
