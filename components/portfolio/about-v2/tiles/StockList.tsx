'use client'

const STOCKS = [
  { ticker: 'ADSK', company: 'Autodesk', value: 'PM', logo: '🏢' },
  { ticker: 'TSLA', company: 'Tesla', value: 'Infra Eng', logo: '⚡' },
  { ticker: 'INTC', company: 'Intuit', value: 'Frontend', logo: '💼' },
  { ticker: 'OMRS', company: 'OMERS', value: 'Systems', logo: '🔧' },
]

export function StockList() {
  return (
    <div className="stock-list">
      <h3>Experience Ticker</h3>
      <div className="ticker-items">
        {STOCKS.map((stock) => (
          <div key={stock.ticker} className="ticker-item">
            <span className="ticker">{stock.ticker}</span>
            <span className="company">{stock.company}</span>
            <span className="value">{stock.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
