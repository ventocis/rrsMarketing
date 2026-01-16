import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../../components/SEO.jsx';
import { SimpleBreadcrumbs } from '../../../components/Breadcrumbs.jsx';
import courtData from '../../../data/texas-courts.json';

export default function CourtsIndex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedCourtType, setSelectedCourtType] = useState('');

  // Get unique counties and court types
  const { counties, courtTypes } = useMemo(() => {
    const countySet = new Set();
    const courtTypeSet = new Set();
    
    courtData.courts.forEach(court => {
      countySet.add(court.county);
      courtTypeSet.add(court.courtType);
    });
    
    return {
      counties: Array.from(countySet).sort(),
      courtTypes: Array.from(courtTypeSet).sort()
    };
  }, []);

  // Filter and group courts by county
  const groupedCourts = useMemo(() => {
    // First filter courts
    const filtered = courtData.courts.filter(court => {
      const matchesSearch = searchTerm === '' || 
        court.county.toLowerCase().includes(searchTerm.toLowerCase()) ||
        court.courtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        court.judges.some(judge => judge.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCounty = selectedCounty === '' || court.county === selectedCounty;
      const matchesCourtType = selectedCourtType === '' || court.courtType === selectedCourtType;
      
      return matchesSearch && matchesCounty && matchesCourtType;
    });

    // Group by county
    const grouped = {};
    filtered.forEach(court => {
      if (!grouped[court.county]) {
        grouped[court.county] = [];
      }
      grouped[court.county].push(court);
    });

    // Sort counties alphabetically and sort courts within each county
    const sortedCounties = Object.keys(grouped).sort();
    const result = sortedCounties.map(county => ({
      county,
      courts: grouped[county].sort((a, b) => a.courtName.localeCompare(b.courtName))
    }));

    return result;
  }, [searchTerm, selectedCounty, selectedCourtType]);

  return (
    <>
      <SEO 
        title="Texas Court Directory - Find Your Court | Driver Safety Course"
        description="Find your Texas court and get step-by-step instructions for completing your Driver Safety Course. Browse by county or court type."
        keywords="Texas courts, court directory, driver safety course, defensive driving, Texas traffic court"
        url="/texas/courts"
      />
      
      <section className="pt-8 pb-[112px] px-4 sm:px-6 lg:px-8 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <SimpleBreadcrumbs items={[
            { label: 'Texas', href: '/texas' },
            { label: 'Courts', href: '/texas/courts' }
          ]} />

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[36px] font-bold text-[#1e2832] leading-[40px] tracking-[-0.9px] mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Texas Court Directory
            </h1>
            <p className="text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Find your court and get step-by-step instructions for completing your Driver Safety Course. 
              Search by court name, county, or judge name.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-[#e4e6ea] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-semibold text-[#1e2832] mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Court name, county, or judge..."
                  className="w-full px-4 py-2 border border-[#e4e6ea] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0667d1] focus:border-transparent"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              {/* County Filter */}
              <div>
                <label htmlFor="county" className="block text-sm font-semibold text-[#1e2832] mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  County
                </label>
                <select
                  id="county"
                  value={selectedCounty}
                  onChange={(e) => setSelectedCounty(e.target.value)}
                  className="w-full px-4 py-2 border border-[#e4e6ea] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0667d1] focus:border-transparent"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <option value="">All Counties</option>
                  {counties.map(county => (
                    <option key={county} value={county}>{county}</option>
                  ))}
                </select>
              </div>

              {/* Court Type Filter */}
              <div>
                <label htmlFor="courtType" className="block text-sm font-semibold text-[#1e2832] mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Court Type
                </label>
                <select
                  id="courtType"
                  value={selectedCourtType}
                  onChange={(e) => setSelectedCourtType(e.target.value)}
                  className="w-full px-4 py-2 border border-[#e4e6ea] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0667d1] focus:border-transparent"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <option value="">All Court Types</option>
                  {courtTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-[#616d7b]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Showing {groupedCourts.reduce((sum, group) => sum + group.courts.length, 0)} of {courtData.courts.length} courts
            </p>
          </div>

          {/* Courts List Grouped by County */}
          {groupedCourts.length > 0 ? (
            <div className="space-y-8">
              {groupedCourts.map(({ county, courts }) => (
                <div key={county}>
                  {/* County Header */}
                  <h2 className="text-lg font-normal text-[#616d7b] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {county}
                  </h2>
                  
                  {/* Courts Grid for this County */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {courts.map(court => (
                      <Link
                        key={court.slug}
                        to={`/texas/courts/${court.slug}`}
                        className="bg-white rounded-2xl border border-[#e4e6ea] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] p-6 hover:shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] transition-shadow"
                      >
                        {/* Court Name with Badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-base font-semibold text-[#1e2832] flex-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            {court.courtName}
                          </h3>
                          {court.courtType === 'Municipal' ? (
                            <div className="inline-block px-2.5 py-1 rounded-lg bg-[#E6F6FF] shrink-0">
                              <span className="text-xs font-semibold text-[#0351b4]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                Municipal
                              </span>
                            </div>
                          ) : (
                            <div className="inline-block px-2.5 py-1 rounded-lg bg-[#F0F4F8] shrink-0">
                              <span className="text-xs font-semibold text-[#475569]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                JP
                              </span>
                            </div>
                          )}
                        </div>

                        {/* County as Secondary Text */}
                        <p className="text-sm text-[#616d7b] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {court.county}
                        </p>
                        
                        <div className="mt-3 pt-3 border-t border-[#e4e6ea]">
                          <span className="text-xs text-[#616d7b] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            View Details →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#e4e6ea] p-12 text-center">
              <p className="text-base text-[#616d7b]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                No courts found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

