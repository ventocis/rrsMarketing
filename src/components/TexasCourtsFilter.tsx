import { useState, useMemo } from "react";

interface Court {
  slug: string;
  county: string;
  courtType: string;
  courtName: string;
  judges: string[];
  phone: string[];
  address: string[];
  website: string[];
  email: string[];
}

interface Props {
  courts: Court[];
}

export default function TexasCourtsFilter({ courts }: Props) {
  const [searchText, setSearchText] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedCourtType, setSelectedCourtType] = useState("");

  const counties = useMemo(() => {
    const set = new Set(courts.map((c) => c.county));
    return Array.from(set).sort();
  }, [courts]);

  const courtTypes = useMemo(() => {
    const set = new Set(courts.map((c) => c.courtType));
    return Array.from(set).sort();
  }, [courts]);

  const filteredCourts = useMemo(() => {
    const query = searchText.toLowerCase().trim();
    return courts.filter((court) => {
      if (selectedCounty && court.county !== selectedCounty) return false;
      if (selectedCourtType && court.courtType !== selectedCourtType) return false;
      if (query) {
        const inName = court.courtName.toLowerCase().includes(query);
        const inCounty = court.county.toLowerCase().includes(query);
        const inJudges = court.judges.some((j) => j.toLowerCase().includes(query));
        if (!inName && !inCounty && !inJudges) return false;
      }
      return true;
    });
  }, [courts, searchText, selectedCounty, selectedCourtType]);

  const groupedByCounty = useMemo(() => {
    const map = new Map<string, Court[]>();
    for (const court of filteredCourts) {
      if (!map.has(court.county)) map.set(court.county, []);
      map.get(court.county)!.push(court);
    }
    const sorted = Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
    return sorted.map(([county, list]) => ({
      county,
      courts: [...list].sort((a, b) => a.courtName.localeCompare(b.courtName)),
    }));
  }, [filteredCourts]);

  const courtTypeBadge = (courtType: string) => {
    if (courtType === "Municipal") {
      return (
        <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-info text-info-text">
          {courtType}
        </span>
      );
    }
    return (
      <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-surface-muted text-text-muted">
        {courtType}
      </span>
    );
  };

  return (
    <div>
      {/* Filter box */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by court name, county, or judge..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Counties</option>
            {counties.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
          <select
            value={selectedCourtType}
            onChange={(e) => setSelectedCourtType(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Court Types</option>
            {courtTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result count */}
      <p className="text-sm text-text-body mb-6">
        Showing {filteredCourts.length} of 1742 courts
      </p>

      {/* Results */}
      {filteredCourts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 text-center text-text-body">
          No courts found matching your search criteria.
        </div>
      ) : (
        groupedByCounty.map(({ county, courts: countyCourts }) => (
          <div key={county}>
            <h2 className="text-lg font-normal text-text-body mb-4">{county} County</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {countyCourts.map((court) => (
                <a
                  key={court.slug}
                  href={`/texas/courts/${court.slug}`}
                  className="bg-white rounded-2xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col no-underline"
                >
                  <div className="flex-1">
                    <div className="mb-2">{courtTypeBadge(court.courtType)}</div>
                    <h3 className="text-base font-semibold text-text mb-1 leading-snug">
                      {court.courtName}
                    </h3>
                    <p className="text-sm text-text-body">{court.county} County</p>
                  </div>
                  <div className="mt-4 text-sm text-primary font-medium">
                    View Details →
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
