import { useMemo, useState } from "react";

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "http://localhost:3001";

function formatEur(n) {
  if (n == null || !Number.isFinite(Number(n))) return "—";
  return new Intl.NumberFormat("fi-FI", { style: "currency", currency: "EUR" }).format(Number(n));
}

function formatKm(n) {
  if (n == null || !Number.isFinite(Number(n))) return "—";
  return new Intl.NumberFormat("fi-FI").format(Number(n)) + " km";
}

function titleCaseWord(w) {
  if (!w) return "";
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
}

function extractBudgetEur(text) {
  const m = text
    .replace(/\s/g, "")
    .match(/(?:€|eur|euro|euros)?(\d{2,3}(?:[.,]\d{3})+|\d{4,6})(?:€|eur|euro|euros)?/i);
  if (!m) return null;

  const raw = m[1].replace(/\./g, "").replace(/,/g, "");
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function guessTransmission(text) {
  const t = text.toLowerCase();
  if (t.includes("auto") || t.includes("automatic") || t.includes("automaatti")) return "Automaatti";
  if (t.includes("manual") || t.includes("manuaali")) return "Manuaali";
  return null;
}

function guessFuel(text) {
  const t = text.toLowerCase();
  if (t.includes("electric") || t.includes("ev") || t.includes("sähkö")) return "Sähkö";
  if (t.includes("hybrid") || t.includes("hybridi")) return "Hybrid";
  if (t.includes("diesel")) return "Diesel";
  if (t.includes("petrol") || t.includes("bensiini") || t.includes("gasoline")) return "Bensiini";
  return null;
}

// Common car makes to look for in text
const CAR_MAKES = [
  "toyota", "volkswagen", "vw", "bmw", "mercedes", "audi", "volvo", 
  "ford", "honda", "nissan", "mazda", "skoda", "kia", "hyundai",
  "peugeot", "renault", "citroen", "seat", "opel", "tesla", "lexus",
  "porsche", "land rover", "range rover", "jaguar", "mini", "fiat",
  "alfa romeo", "jeep", "subaru", "mitsubishi", "suzuki", "dacia"
];

function extractCarMake(text) {
  const lower = text.toLowerCase();
  
  // Look for any known car make in the text
  for (const make of CAR_MAKES) {
    if (lower.includes(make)) {
      // Return title-cased version
      return make.split(' ').map(w => titleCaseWord(w)).join(' ');
    }
  }
  
  return null;
}

function buildFiltersFromText(text) {
  const maxPrice = extractBudgetEur(text);
  const transmission = guessTransmission(text);
  const fuel = guessFuel(text);
  const make = extractCarMake(text);

  const filters = { source: "all" };
  if (maxPrice != null) filters.maxPrice = maxPrice;
  if (transmission) filters.transmission = transmission;
  if (fuel) filters.fuel = fuel;
  if (make) filters.make = make;

  return filters;
}

function extractSearchQuery(text) {
  // First, try to find a car make
  const make = extractCarMake(text);
  if (make) return make;
  
  // Otherwise, look for meaningful keywords
  const lower = text.toLowerCase();
  const keywords = [];
  
  // Look for size/type keywords
  if (lower.includes("suv")) keywords.push("SUV");
  if (lower.includes("sedan")) keywords.push("sedan");
  if (lower.includes("wagon") || lower.includes("estate")) keywords.push("wagon");
  if (lower.includes("hatchback")) keywords.push("hatchback");
  if (lower.includes("van") || lower.includes("family")) keywords.push("van");
  if (lower.includes("sport")) keywords.push("sport");
  if (lower.includes("compact")) keywords.push("compact");
  if (lower.includes("luxury")) keywords.push("luxury");
  
  // If we found type keywords, return them
  if (keywords.length > 0) return keywords.join(" ");
  
  // As a last resort, return empty string to search all
  return "";
}

function Card({ children }) {
  return <div className="bg-white rounded-xl shadow-md p-6">{children}</div>;
}

function ListingCard({ listing, highlight }) {
  const title = listing?.title || `${listing?.make || ""} ${listing?.model || ""}`.trim() || "Listing";
  const href = listing?.listingUrl || "#";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`block rounded-xl border bg-white hover:shadow-md transition ${
        highlight ? "border-blue-400 ring-2 ring-blue-100" : "border-gray-200"
      }`}
    >
      <div className="flex gap-4 p-4">
        <div className="w-28 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          {listing?.thumbnailUrl ? (
            <img src={listing.thumbnailUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-gray-400">No image</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-semibold text-gray-900 truncate">{title}</h4>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 shrink-0">
              {String(listing?.source || "").toUpperCase()}
            </span>
          </div>

          <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
            <span>{listing?.year ?? "—"}</span>
            <span>{formatEur(listing?.priceEur)}</span>
            <span>{formatKm(listing?.mileageKm)}</span>
            <span>{listing?.fuel ?? "—"}</span>
            <span>{listing?.transmission ?? "—"}</span>
            <span>{listing?.location ?? "—"}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

function PicksPanel({ data }) {
  const picks = data?.picks || [];
  const summary = data?.summary || "";

  return (
    <div className="mt-6">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900">Recommendations</h3>
        {summary ? <p className="text-sm text-gray-700 mt-2">{summary}</p> : null}

        {picks.length === 0 ? (
          <p className="text-sm text-gray-500 mt-3">No picks returned.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {picks.map((p, i) => {
              const listing = p?.listing || {};
              return (
                <div key={p.listingUrl || i} className="rounded-xl border border-gray-200 overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold text-gray-900">
                        #{i + 1} {p.title}
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                        Score: {Number(p.score ?? 0).toFixed(1)}/10
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      <div>
                        <span className="font-semibold">Why:</span> {p.why}
                      </div>
                      <div className="mt-1">
                        <span className="font-semibold">Tradeoffs:</span> {p.tradeoffs}
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <ListingCard listing={listing} highlight />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function AIAdvisor() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [error, setError] = useState("");

  const lastUserNeed = useMemo(() => {
    const last = [...messages].reverse().find((m) => m.role === "user");
    return last?.content || "";
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setError("");
    setAiResult(null);

    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const filters = buildFiltersFromText(text);
      const q = extractSearchQuery(text);

      console.log("Sending to backend:", { need: text, q, filters });

      const res = await fetch(`${API_BASE}/api/ai/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          need: text,
          q,
          filters,
          preferences: {}, 
          maxPicks: 5
        })
      });

      const json = await res.json();

      if (!res.ok) {
        const msg = json?.error || `Request failed (${res.status})`;
        throw new Error(msg);
      }

      const data = json?.data || null;
      setAiResult(data);

      // Add assistant summary into chat
      const assistantText =
        data?.summary ||
        (Array.isArray(data?.picks) && data.picks.length
          ? `I found ${data.picks.length} good options. Scroll down to see details.`
          : "I couldn't find good matches from current listings. Try being more specific or relaxing your requirements.");

      setMessages((prev) => [...prev, { role: "assistant", content: assistantText }]);
    } catch (err) {
      setError(err?.message || "Something went wrong");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't generate recommendations right now. Please try again in a minute."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Car Advisor</h2>
          <p className="text-gray-600">Get personalized car recommendations based on your needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-2">Budget Analysis</h3>
            <p className="text-sm text-gray-600">
              Get recommendations based on your budget and total cost of ownership
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-2">Family Needs</h3>
            <p className="text-sm text-gray-600">
              Find cars that match your family size and lifestyle requirements
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-2">Fuel Efficiency</h3>
            <p className="text-sm text-gray-600">
              Compare fuel types and running costs for your driving habits
            </p>
          </Card>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">💡 How to use</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Natural language examples:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>"I need a family car under 30000 euros"</li>
              <li>"Show me BMW automatic transmission cars"</li>
              <li>"Looking for a reliable Toyota hybrid"</li>
              <li>"Need a diesel SUV under 40000"</li>
              <li>"Recommend an electric car for city driving"</li>
              <li>"Want a luxury sedan with low mileage"</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h3 className="text-white font-semibold">Chat with AI Advisor</h3>
          </div>

          <div className="h-96 overflow-y-auto p-6 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-12">
                <p className="mb-4 text-lg">Start a conversation to get personalized car recommendations!</p>
                <div className="text-sm text-gray-400 space-y-2">
                  <p><strong>Try asking:</strong></p>
                  <p>"I need a family car under 30000 euros"</p>
                  <p>"Show me automatic BMWs"</p>
                  <p>"Looking for a hybrid Toyota"</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.role === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-white border border-gray-200 text-gray-900"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {loading ? (
                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-900">
                      Thinking…
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="border-t p-4 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about car recommendations... (e.g., 'I need a family car under 30000')"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg transition-colors font-medium ${
                  loading ? "bg-blue-300 text-white cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Send
              </button>
            </div>
          </form>
        </div>

        {error ? (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              <span className="font-semibold">Error:</span> {error}
            </p>
          </div>
        ) : null}

        {aiResult ? <PicksPanel data={aiResult} /> : null}

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <span className="font-semibold">Note:</span> This feature uses your aggregated listings as the only source.
            If listings are missing key details (e.g. service history), the advisor will mention limitations.
          </p>
          {lastUserNeed ? (
            <p className="text-xs text-yellow-700 mt-2">
              Last need: <span className="font-mono">{lastUserNeed}</span>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AIAdvisor;