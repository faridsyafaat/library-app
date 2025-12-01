import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import NavbarAfter from "@/components/layout/NavbarAfter";
import FooterSection from "@/components/layout/FooterSection";

interface LoanItem {
  id: number;
  userId: number;
  bookId: number;
  status?: string;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  Book: {
    id: number;
    title: string;
    author?: string;
    coverImage?: string;
    category?: string;
  };
}

function StatusBadge({ status }: { status: "Active" | "Returned" | "Overdue" }) {
  if (status === "Active")
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
        Active
      </span>
    );
  if (status === "Returned")
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">
        Returned
      </span>
    );
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700">
      Overdue
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="flex items-center bg-white rounded-lg shadow p-4 animate-pulse">
      <div className="w-20 h-24 bg-gray-200 rounded mr-4" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
      </div>
      <div className="w-28 ml-4">
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export default function BorrowListPage() {
  const navigate = useNavigate();
  const token = useAppSelector((s) => s.auth.token);

  const [loading, setLoading] = useState(true);
  const [loans, setLoans] = useState<LoanItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<"all" | "active" | "returned" | "overdue">("all");
  const [q, setQ] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const abort = new AbortController();
    async function load() {
      setLoading(true);
      setError(null);
      try {
        console.log("BorrowList: token ->", token);
        const res = await fetch("https://be-library-api-xh3x6c5iiq-et.a.run.app/api/loans/my", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          signal: abort.signal,
        });

        if (!res.ok) {
          const b = await res.json().catch(() => null);
          throw new Error(b?.message || `Fetch failed: ${res.status}`);
        }

        const body = await res.json();
        console.log("BorrowList API response:", body);
        setLoans(body.data?.loans || []);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error(err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => abort.abort();
  }, [token]);

  const loansWithStatus = useMemo(() => {
    const today = new Date();
    return loans.map((ln) => {
      const due = new Date(ln.dueAt);
      let computed: "Active" | "Returned" | "Overdue" = "Active";
      if (ln.returnedAt) computed = "Returned";
      else if (due < today) computed = "Overdue";
      return { ...ln, computedStatus: computed } as LoanItem & { computedStatus: typeof computed };
    });
  }, [loans]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return (loansWithStatus as any[])
      .filter((ln) => {
        if (filter === "all") return true;
        if (filter === "active") return ln.computedStatus === "Active";
        if (filter === "returned") return ln.computedStatus === "Returned";
        if (filter === "overdue") return ln.computedStatus === "Overdue";
        return true;
      })
      .filter((ln) => {
        if (!qq) return true;
        const title = (ln.Book?.title || "").toLowerCase();
        const author = (ln.Book?.author || "").toLowerCase();
        return title.includes(qq) || author.includes(qq);
      });
  }, [loansWithStatus, filter, q]);

  const visible = filtered.slice(0, visibleCount);

  const handleReturn = async (loanId: number) => {
    if (!token) return alert("Please login first");
    if (!confirm("Return this book?")) return;
    try {
      const res = await fetch(`https://be-library-api-xh3x6c5iiq-et.a.run.app/api/loans/${loanId}/return`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const b = await res.json().catch(() => null);
        throw new Error(b?.message || `Return failed: ${res.status}`);
      }
      setLoans((prev) => prev.map((l) => (l.id === loanId ? { ...l, returnedAt: new Date().toISOString() } : l)));
      alert("Return success");
    } catch (err: unknown) {
      console.error(err);
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <>
      <NavbarAfter />

      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Borrowed List</h1>
            <div className="hidden sm:block">
              <div className="inline-flex overflow-hidden rounded-full bg-gray-100 p-1">
                <button onClick={() => setFilter("all")} className={`px-3 py-1 text-sm ${filter === "all" ? "bg-white shadow" : ""}`}>All</button>
                <button onClick={() => setFilter("active")} className={`px-3 py-1 text-sm ${filter === "active" ? "bg-white shadow" : ""}`}>Active</button>
                <button onClick={() => setFilter("returned")} className={`px-3 py-1 text-sm ${filter === "returned" ? "bg-white shadow" : ""}`}>Returned</button>
                <button onClick={() => setFilter("overdue")} className={`px-3 py-1 text-sm ${filter === "overdue" ? "bg-white shadow" : ""}`}>Overdue</button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search book"
              className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {loading ? (
            <div className="space-y-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              You haven't borrowed any books yet.
            </div>
          ) : (
            <div className="space-y-4">
              {visible.map((ln: any) => (
                <div key={ln.id} className="bg-white rounded-lg shadow p-4 flex items-start gap-4">
                  <img src={ln.Book.coverImage || "/placeholder-80x100.png"} alt={ln.Book.title} className="w-20 h-24 object-cover rounded" />

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <div className="text-xs text-gray-500">Status</div>
                          <StatusBadge status={ln.computedStatus} />
                        </div>

                        <h3 className="text-lg font-semibold">{ln.Book.title}</h3>
                        <p className="text-sm text-gray-600">{ln.Book.author || "Unknown author"}</p>
                        <p className="text-sm text-gray-500 mt-2">{new Date(ln.borrowedAt).toLocaleDateString()} • Duration: {Math.ceil((new Date(ln.dueAt).getTime() - new Date(ln.borrowedAt).getTime())/(1000*60*60*24))} days</p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="text-sm text-gray-500">Due Date</div>
                        <div className="text-sm text-red-600 font-semibold">{new Date(ln.dueAt).toLocaleDateString()}</div>

                        <div className="mt-4 flex flex-col gap-2 w-36">
                          <button onClick={() => navigate(`/borrow-detail/${ln.id}`)} className="w-full px-3 py-2 bg-blue-600 text-white rounded">View Details</button>
                          <button onClick={() => navigate(`/reviews/create?bookId=${ln.bookId}`)} className="w-full px-3 py-2 border rounded">Give Review</button>
                          {(ln.computedStatus === "Active" || ln.computedStatus === "Overdue") && (
                            <button onClick={() => handleReturn(ln.id)} className="w-full px-3 py-2 bg-gray-100 rounded">Return Book</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {visibleCount < filtered.length && (
                <div className="flex justify-center">
                  <button className="px-6 py-2 bg-white border rounded" onClick={() => setVisibleCount((v) => v + 3)}>Load More</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <FooterSection />
    </>
  );
}
