import React, { useState, useEffect } from "react";
import "./App.css";

/*
  === Constants for Theme ===
*/
const theme = {
  primary: "#4CAF50",
  secondary: "#81C784",
  accent: "#388E3C",
  background: "#F9FAFB",
  card: "#FFFFFF",
  border: "#EBEBEB",
  text: "#1A1A1A",
  muted: "#657786"
};

/*
  === Mock Utility for APIs (Replace with real APIs in future) ===
*/
const mockProducts = [
  {
    id: "P1",
    name: "Eco-Friendly Bamboo Toothbrush",
    brand: "GreenBrush",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=300&q=80",
    price: 3.99,
    rating: 4.6,
    availableAt: ["Amazon"],
    carbonScore: 12,
    sustainabilitySummary: "Made from renewable bamboo. Plastic-free. Compostable.",
    greenerAlternative: null
  },
  {
    id: "P2",
    name: "Electric Toothbrush",
    brand: "BrandElec",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=300&q=80",
    price: 29.99,
    rating: 4.3,
    availableAt: ["Flipkart", "Amazon"],
    carbonScore: 52,
    sustainabilitySummary: "Plastic body, rechargeable battery, moderate energy usage.",
    greenerAlternative: "P1"
  },
  {
    id: "P3",
    name: "Plastic Toothbrush",
    brand: "RegularBrush",
    image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?fit=crop&w=300&q=80",
    price: 0.99,
    rating: 4.0,
    availableAt: ["Flipkart"],
    carbonScore: 95,
    sustainabilitySummary: "Conventional plastic. Not compostable. Single-use.",
    greenerAlternative: "P1"
  }
];

const getMockGreenerAlternative = (product) =>
  product.greenerAlternative
    ? mockProducts.find((p) => p.id === product.greenerAlternative)
    : null;

/*
  === API Mocks (to be replaced by real requests) ===
*/
// PUBLIC_INTERFACE
async function fetchProducts(query, filterGreenMode) {
  // Simulate search delay and filtering by green mode
  await new Promise((res) => setTimeout(res, 500));
  let results = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
  if (filterGreenMode) {
    results = results.filter((p) => p.carbonScore && p.carbonScore < 30);
  }
  return results;
}

// PUBLIC_INTERFACE
async function fetchCarbonImpact(product) {
  // Simulate delay
  await new Promise((res) => setTimeout(res, 200));
  return {
    carbonScore: product.carbonScore,
    sustainabilitySummary: product.sustainabilitySummary
  };
}

/*
  === Components ===
*/

// PUBLIC_INTERFACE
function Navbar({ onGreenModeToggle, greenMode, gamificationPoints }) {
  return (
    <nav style={{
      background: theme.card,
      borderBottom: `1px solid ${theme.border}`,
      boxShadow: "0 2px 4px 0 rgba(100, 100, 100, 0.02)",
      position: "fixed",
      width: "100%",
      top: 0,
      zIndex: 100,
      minHeight: 64
    }}>
      <div className="nav-inner">
        <div className="navbar-logo">
          <span style={{
            color: theme.primary,
            fontWeight: "700",
            fontSize: 28,
            marginRight: 10
          }}>🌱</span>
          <span style={{ fontWeight: 700 }}>EcoCart Navigator</span>
        </div>
        <div className="navbar-tools">
          <GreenModeToggle enabled={greenMode} onToggle={onGreenModeToggle} />
          <div className="gamification-badge">
            <span role="img" aria-label="leaf">🏆</span> {gamificationPoints} pts
          </div>
        </div>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
function GreenModeToggle({ enabled, onToggle }) {
  return (
    <div className="green-toggle" title="Show only eco-friendly products">
      <label className="switch">
        <input type="checkbox" checked={enabled} onChange={onToggle} />
        <span className="slider" />
      </label>
      <span style={{
        marginLeft: 8,
        color: enabled ? theme.primary : theme.muted,
        fontWeight: 500
      }}>
        Green Mode
      </span>
    </div>
  );
}

// PUBLIC_INTERFACE
function FilterBar({ query, setQuery }) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        className="search-input"
        value={query}
        placeholder="Search for products, e.g. toothbrush"
        onChange={e => setQuery(e.target.value)}
      />
    </div>
  );
}

// PUBLIC_INTERFACE
function ProductGrid({ products, onProductHover }) {
  if (!products.length) {
    return (
      <div className="no-results">No products found for your search.</div>
    );
  }
  return (
    <div className="product-grid">
      {products.map(prod =>
        <ProductCard key={prod.id} product={prod} onHover={onProductHover} />
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
function ProductCard({ product, onHover }) {
  const [impact, setImpact] = useState(null);
  useEffect(() => {
    fetchCarbonImpact(product).then(data => setImpact(data));
  }, [product]);
  const greener = getMockGreenerAlternative(product);

  // Impact color logic (green = good, red = bad)
  const getImpactColor = (score) => {
    if (score < 30) return theme.primary;
    if (score < 60) return "#ffc107"; // yellow
    return "#f44336"; // red
  };

  return (
    <div
      className="product-card"
      onMouseEnter={() => onHover && onHover(product)}
      style={{
        borderLeft: `4px solid ${getImpactColor(product.carbonScore)}`
      }}
    >
      <img src={product.image} alt={product.name} className="product-img" />
      <div className="product-details">
        <div className="product-name" title={product.name}>{product.name}</div>
        <div className="brand">{product.brand}</div>
        <div className="availability">
          {product.availableAt.map(store =>
            <span className="store-badge" key={store}>{store}</span>
          )}
        </div>
        <div className="price-rating">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-rating">⭐ {product.rating}</span>
        </div>
        {impact && (
          <div className="sustainability-summary" style={{ color: getImpactColor(impact.carbonScore) }}>
            <span className="impact-dot" style={{ background: getImpactColor(impact.carbonScore)}} />
            {impact.sustainabilitySummary}
          </div>
        )}
        {greener &&
          <div className="greener-alternative">
            <span style={{ color: theme.accent, fontWeight: 500 }}>Greener Alternative:</span>
            <span> {greener.name}</span>
          </div>
        }
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function ImpactTrackerSidebar({ totalCarbonSaved, greenerChoices, recentImpactEvents }) {
  return (
    <aside className="impact-sidebar">
      <h2>🌍 Impact Tracker</h2>
      <div className="impact-metric">
        <strong>Total Carbon Saved</strong>
        <div className="impact-value">{totalCarbonSaved} kgCO₂e</div>
      </div>
      <div className="impact-metric">
        <strong>Greener Choices</strong>
        <div className="impact-value">{greenerChoices}</div>
      </div>
      <div className="impact-events">
        <div className="impact-events-title">Recent Actions</div>
        <ul>
          {recentImpactEvents.map((ev, i) => (
            <li key={i}>{ev}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

// PUBLIC_INTERFACE
function PersonalizationPanel({ preferences, setPreferences }) {
  // Simple toggle for now
  return (
    <div className="personalization-panel">
      <strong>Personalization</strong>
      <div className="personalize-item">
        <label>
          <input
            type="checkbox"
            checked={preferences.onlyFairtrade}
            onChange={e => setPreferences({
              ...preferences,
              onlyFairtrade: e.target.checked
            })}
          /> {" "}Show only certified Fairtrade
        </label>
      </div>
    </div>
  );
}

/*
  === Main App ===
*/
function App() {
  // States
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [greenMode, setGreenMode] = useState(false);
  // Gamification/Personalization
  const [gamificationPoints, setGamificationPoints] = useState(20);
  const [totalCarbonSaved, setTotalCarbonSaved] = useState(7.82);
  const [greenerChoices, setGreenerChoices] = useState(2);
  const [recentImpactEvents, setRecentImpactEvents] = useState([
    "Chose a bamboo toothbrush (4.3 kgCO₂e saved!)",
    "Switched to Green Mode 🟢"
  ]);
  const [preferences, setPreferences] = useState({
    onlyFairtrade: false
  });

  // Fetch products whenever search query or green mode changes
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    fetchProducts(query, greenMode)
      .then(results => {
        // Optionally, personalize results
        let filtered = results;
        if (preferences.onlyFairtrade) {
          filtered = filtered.filter(p =>
            p.sustainabilitySummary &&
            (p.sustainabilitySummary.toLowerCase().includes("fairtrade") ||
             p.sustainabilitySummary.toLowerCase().includes("eco"))
          );
        }
        setSearchResults(filtered);
        setLoading(false);
      });
  }, [query, greenMode, preferences.onlyFairtrade]);

  // When a greener product is hovered, increment points, carbon saved dummy
  function handleProductHover(product) {
    if (product.carbonScore < 30) {
      setGamificationPoints((pts) => pts + 1);
      setTotalCarbonSaved((t) => Math.round((t + 1.27)*100)/100);
      setGreenerChoices((g) => g + 1);
      setRecentImpactEvents(events =>
        ["Browsed: " + product.name + " (eco-friendly!)", ...events.slice(0, 4)]
      );
    }
  }

  /*
    Layout:
    - Navbar at top
    - Sidebar (left or right) for impact tracker, hidden on mobile
    - Main content: filterbar, product grid, personalization
  */

  return (
    <div
      className="app"
      style={{ background: theme.background, color: theme.text, minHeight: "100vh" }}
    >
      <Navbar
        onGreenModeToggle={() => setGreenMode((m) => !m)}
        greenMode={greenMode}
        gamificationPoints={gamificationPoints}
      />
      <div style={{height: 72}} />
      <div className="main-layout">
        <ImpactTrackerSidebar
          totalCarbonSaved={totalCarbonSaved}
          greenerChoices={greenerChoices}
          recentImpactEvents={recentImpactEvents}
        />
        <main className="main-content">
          <section className="search-section">
            <FilterBar query={query} setQuery={setQuery} />
            <PersonalizationPanel preferences={preferences} setPreferences={setPreferences} />
          </section>
          <section>
            {loading && <div style={{margin: "24px", fontSize: "1.2em", color: theme.accent}}>Loading...</div>}
            <ProductGrid products={searchResults} onProductHover={handleProductHover} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
