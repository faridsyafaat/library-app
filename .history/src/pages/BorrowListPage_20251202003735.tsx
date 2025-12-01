// BorrowListPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import NavbarAfter from "@/components/layout/NavbarAfter";
import FooterSection from "@/components/layout/FooterSection";

interface LoanItem {
  id: number;
  userId: number;
  bookId: number;
  status: string;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  Book: {
    id: number;
    title: string;
    author?: string;
    coverImage?: string;
  };
}

export default function BorrowListPage() {
  const navigate = useNavigate();
  const token = useAppSelector((s) => s.auth.token);

  const [loading, setLoading] = useState(true);
  const [loans, setLoans] = useState<LoanItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // UI states
  const [filter, setFilter] = useState<
    "all" | "active" | "returned" | "overdue"
  >("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(3); // show 3 cards initially

  useEffect(() => {
    const abort = new AbortController();

    async function fetchLoans() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/loans/my",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
            signal: abort.signal,
          }
        );

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.message || "Failed to fetch loans");
        }

        const body = await res.json();
        setLoans(body.data?.loans || []);
      } catch (err: unknown) {
        // handle AbortError specifically (fetch abort)
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        console.error(err);
        // set readable error message
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchLoans();

    return () => abort.abort();
  }, [token]);

  // computed status: if returnedAt != null -> Returned, else if today > dueAt -> Overdue, else Active
  const loansWithStatus = useMemo(() => {
    const today = new Date();
    return loans.map((ln) => {
      let computedStatus: "Active" | "Returned" | "Overdue" = "Active";
      if (ln.returnedAt) computedStatus = "Returned";
      else if (new Date(ln.dueAt) < today) computedStatus = "Overdue";
      return { ...ln, computedStatus };
    });
  }, [loans]);

  const filtered = useMemo(() => {
    return loansWithStatus
      .filter((ln) => {
        if (filter === "all") return true;
        if (filter === "active") return ln.computedStatus === "Active";
        if (filter === "returned") return ln.computedStatus === "Returned";
        if (filter === "overdue") return ln.computedStatus === "Overdue";
        return true;
      })
      .filter((ln) => {
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          ln.Book.title.toLowerCase().includes(q) ||
          (ln.Book.author || "").toLowerCase().includes(q)
        );
      });
  }, [loansWithStatus, filter, query]);

  const visible = filtered.slice(0, visibleCount);

  // Return book (calls API PATCH /api/loans/:id/return)
  const handleReturn = async (loanId: number) => {
    if (!token) {
      alert("Please login first");
      return;
    }

    if (!confirm("Are you sure you want to return this book?")) return;

    try {
      const res = await fetch(
        `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/loans/${loanId}/return`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Return failed");
      }

      // update local list: mark returnedAt with now
      setLoans((prev) =>
        prev.map((l) =>
          l.id === loanId ? { ...l, returnedAt: new Date().toISOString() } : l
        )
      );
      alert("Return success");
    } catch (err: unknown) {
      console.error(err);
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <>
      <NavbarAfter />

      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Borrowed List</h1>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search book"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border rounded px-3 py-2 w-60"
            />

            <div className="flex items-center gap-2">
              <button
                className={`px-3 py-1 rounded-full ${
                  filter === "all" ? "bg-gray-200" : "bg-white border"
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  filter === "active" ? "bg-green-100" : "bg-white border"
                }`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  filter === "returned" ? "bg-gray-100" : "bg-white border"
                }`}
                onClick={() => setFilter("returned")}
              >
                Returned
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  filter === "overdue" ? "bg-red-100" : "bg-white border"
                }`}
                onClick={() => setFilter("overdue")}
              >
                Overdue
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-600">Loading...</div>
        ) : error ? (
          <div className="py-20 text-center text-red-600">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-gray-600">
            No borrowed books found.
          </div>
        ) : (
          <div className="space-y-4">
            {visible.map((ln) => (
              <div
                key={ln.id}
                className="flex items-center bg-white rounded-lg shadow-sm p-4"
              >
                <img
                  src={ln.Book.coverImage || "https://via.placeholder.com/80x100"}
                  alt={ln.Book.title}
                  className="w-20 h-24 object-cover rounded"
                />

                <div className="flex-1 px-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">
                        Status
                        <span
                          className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                            ln.computedStatus === "Active"
                              ? "bg-green-100 text-green-700"
                              : ln.computedStatus === "Returned"
                              ? "bg-gray-100 text-gray-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {ln.computedStatus}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg">{ln.Book.title}</h3>
                      <p className="text-sm text-gray-600">
                        {ln.Book.author || "Unknown author"}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(ln.borrowedAt).toLocaleDateString()} • Duration:{" "}
                        {Math.ceil(
                          (new Date(ln.dueAt).getTime() -
                            new Date(ln.borrowedAt).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500">Due Date</div>
                      <div className="text-sm text-red-600 font-semibold">
                        {new Date(ln.dueAt).toLocaleDateString()}
                      </div>

                      <div className="mt-4 flex flex-col gap-2">
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded"
                          onClick={() => navigate(`/borrow-detail/${ln.id}`)}
                        >
                          View Details
                        </button>

                        {/* Give Review - dummy navigation */}
                        <button
                          className="px-4 py-2 border rounded"
                          onClick={() =>
                            navigate(`/reviews/create?bookId=${ln.bookId}`)
                          }
                        >
                          Give Review
                        </button>

                        {/* Return button only when active or overdue */}
                        {(ln.computedStatus === "Active" ||
                          ln.computedStatus === "Overdue") && (
                          <button
                            className="px-4 py-2 bg-gray-100 rounded text-sm"
                            onClick={() => handleReturn(ln.id)}
                          >
                            Return Book
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {visibleCount < filtered.length && (
              <div className="flex justify-center">
                <button
                  className="mt-4 px-6 py-2 bg-white border rounded"
                  onClick={() => setVisibleCount((v) => v + 3)}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <FooterSection />
    </>
  );
}
