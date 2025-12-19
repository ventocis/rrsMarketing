import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button.jsx';

export default function TexasLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // #region agent log
  React.useEffect(() => {
    const logEndpoint = 'http://127.0.0.1:7242/ingest/d43cc9bd-40ea-434a-b828-df0c6f64d204';
    const safeLog = (data) => {
      fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).catch(()=>{});
    };
    safeLog({location:'TexasLayout.jsx:mount',message:'TexasLayout component mounted',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'});
    
    // Check logo asset
    fetch('/assets/logo.svg', { method: 'HEAD' }).then(res => {
      if (!res.ok) {
        safeLog({location:'TexasLayout.jsx:logo-check',message:'Logo asset missing or wrong path',data:{path:'/assets/logo.svg',status:res.status},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'});
        console.warn('Logo missing at /assets/logo.svg, status:', res.status);
      }
    }).catch(() => {});
    
    // Check social icons
    ['/assets/social/facebook.svg', '/assets/social/youtube.svg'].forEach(icon => {
      fetch(icon, { method: 'HEAD' }).then(res => {
        if (!res.ok) {
          safeLog({location:'TexasLayout.jsx:social-icon-check',message:'Social icon missing',data:{icon,status:res.status},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'});
          console.warn('Social icon missing:', icon);
        }
      }).catch(() => {});
    });
  }, []);
  // #endregion

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const logoImage = "/assets/icons/texas/logo-shield.svg";

  // #region agent log
  React.useEffect(() => {
    const logEndpoint = 'http://127.0.0.1:7242/ingest/d43cc9bd-40ea-434a-b828-df0c6f64d204';
    const safeLog = (data) => {
      fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).catch(()=>{});
    };
    safeLog({location:'TexasLayout.jsx:header-button',message:'Header Start Course button props',data:{href:'/courses/tx-defensive',variant:'custom',text:'Start Course'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'});
  }, []);
  // #endregion

  // #region agent log
  React.useEffect(() => {
    const logEndpoint = 'http://127.0.0.1:7242/ingest/d43cc9bd-40ea-434a-b828-df0c6f64d204';
    const safeLog = (data) => {
      fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).catch(()=>{});
    };
    
    // Log viewport scaling for diagnosis - mobile vs desktop
    const checkViewportScaling = () => {
      const viewportWidth = window.innerWidth;
      const screenWidth = window.screen.width;
      const devicePixelRatio = window.devicePixelRatio || 1;
      const expectedViewport = screenWidth / devicePixelRatio;
      const zoomRatio = viewportWidth / expectedViewport;
      const isMobile = viewportWidth < 768;
      const isTablet = viewportWidth >= 768 && viewportWidth < 1024;
      const isDesktop = viewportWidth >= 1024;
      
      // Check all section containers
      const containers = document.querySelectorAll('section > div.max-w-7xl, section > div.max-w-4xl, section > div.max-w-6xl');
      const containerData = Array.from(containers).map((el, idx) => {
        const computed = window.getComputedStyle(el);
        return {
          index: idx,
          className: el.className,
          maxWidth: computed.maxWidth,
          width: computed.width,
          actualWidth: el.offsetWidth,
          paddingLeft: computed.paddingLeft,
          paddingRight: computed.paddingRight,
          marginLeft: computed.marginLeft,
          marginRight: computed.marginRight
        };
      });
      
      safeLog({location:'TexasLayout.jsx:viewport-fix',message:'Viewport scaling check - mobile vs desktop',data:{
        viewportWidth,
        screenWidth,
        devicePixelRatio,
        expectedViewport,
        zoomRatio,
        isMobile,
        isTablet,
        isDesktop,
        userAgent: navigator.userAgent,
        containerCount: containers.length,
        containers: containerData,
        needsFix:Math.abs(zoomRatio - 1) > 0.1
      },timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C'});
    };
    
    // Run check after a short delay to ensure DOM is ready
    setTimeout(checkViewportScaling, 100);
    
    // Hypothesis A: Check outermost wrapper computed styles
    const wrapperEl = document.querySelector('div.w-full.overflow-x-hidden');
    if (wrapperEl) {
      const computed = window.getComputedStyle(wrapperEl);
      safeLog({location:'TexasLayout.jsx:mount',message:'Outermost wrapper styles',data:{
        width:computed.width,
        maxWidth:computed.maxWidth,
        marginLeft:computed.marginLeft,
        marginRight:computed.marginRight,
        display:computed.display,
        actualWidth:wrapperEl.offsetWidth,
        clientWidth:wrapperEl.clientWidth
      },timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'});
    }
    
    // Hypothesis B: Check global element styles
    const body = document.body;
    const html = document.documentElement;
    const root = document.getElementById('root');
    if (body && html && root) {
      const bodyComputed = window.getComputedStyle(body);
      const htmlComputed = window.getComputedStyle(html);
      const rootComputed = window.getComputedStyle(root);
      safeLog({location:'TexasLayout.jsx:mount',message:'Global element styles',data:{
        bodyWidth:bodyComputed.width,
        bodyMaxWidth:bodyComputed.maxWidth,
        bodyMargin:bodyComputed.margin,
        bodyTransform:bodyComputed.transform,
        bodyZoom:body.style.zoom || 'none',
        htmlWidth:htmlComputed.width,
        htmlMaxWidth:htmlComputed.maxWidth,
        htmlTransform:htmlComputed.transform,
        rootWidth:rootComputed.width,
        rootMaxWidth:rootComputed.maxWidth,
        rootDisplay:rootComputed.display,
        rootTransform:rootComputed.transform,
        viewportWidth:window.innerWidth,
        viewportHeight:window.innerHeight,
        bodyActualWidth:body.offsetWidth,
        rootActualWidth:root.offsetWidth
      },timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'B'});
    }
    
    // Hypothesis C: Check viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      safeLog({location:'TexasLayout.jsx:mount',message:'Viewport meta tag',data:{
        content:viewportMeta.getAttribute('content'),
        devicePixelRatio:window.devicePixelRatio,
        screenWidth:window.screen.width,
        screenHeight:window.screen.height
      },timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'});
    }
    
    // Hypothesis D: Check for container class usage
    const containers = document.querySelectorAll('.container');
    safeLog({location:'TexasLayout.jsx:mount',message:'Container class elements',data:{
      count:containers.length,
      elements:Array.from(containers).map(el => ({
        className:el.className,
        computedMaxWidth:window.getComputedStyle(el).maxWidth,
        actualWidth:el.offsetWidth
      }))
    },timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'});
    
    // Hypothesis E: Check main content wrapper
    const mainEl = document.querySelector('main');
    if (mainEl) {
      const mainComputed = window.getComputedStyle(mainEl);
      safeLog({location:'TexasLayout.jsx:mount',message:'Main element styles',data:{
        width:mainComputed.width,
        maxWidth:mainComputed.maxWidth,
        margin:mainComputed.margin,
        display:mainComputed.display,
        actualWidth:mainEl.offsetWidth
      },timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'});
    }
  }, []);
  // #endregion

  return (
    <div className="w-full overflow-x-hidden">
      {/* Header */}
      <header className="backdrop-blur-[2px] backdrop-filter bg-[rgba(255,255,255,0.95)] border-[#e4e6ea] border-b sticky top-0 z-50">
        {/* Promotional Banner */}
        <div className="bg-[#17a34a] w-full">
          <div className="px-4 py-2">
            <p className="text-white text-sm font-medium text-center leading-5">
              🎉 Limited Time: Texas Defensive Driving Course — Only $25 + $3 state fee
            </p>
          </div>
        </div>
        
        {/* Main Navigation */}
        <nav className="h-20 max-w-[1152px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 w-full">
          {/* Logo - Left aligned */}
          <Link to="/texas" className="flex items-center gap-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded flex-shrink-0">
            <img src={logoImage} alt="Road Ready Safety Logo" className="h-[39.633px] w-9" />
            <div className="flex flex-col">
              <span className="text-[18px] font-bold text-[#1e2832] leading-[22.5px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Road Ready</span>
              <span className="text-xs font-medium text-[#616d7b] leading-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Safety</span>
            </div>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 flex-shrink-0">
            <Link to="/texas/pricing" className="text-sm font-medium text-[#616d7b] hover:text-[#1e2832] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pricing</Link>
            <Link to="/texas/faq" className="text-sm font-medium text-[#616d7b] hover:text-[#1e2832] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>FAQ</Link>
            <Link to="/texas/helpcenter" className="text-sm font-medium text-[#616d7b] hover:text-[#1e2832] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Help Center</Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <button className="h-9 px-4 rounded-[10px] text-xs font-semibold text-[#1e2832] hover:bg-gray-100 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Log In
            </button>
            <Button 
              href="/courses/tx-defensive" 
              variant="custom" 
              className="bg-[#0667d1] hover:bg-[#0556b3] text-white pt-[11.6px] pb-[12.4px] px-[20px] rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(17,23,34,0.08),0px_4px_6px_-4px_rgba(17,23,34,0.05)] text-sm font-semibold flex items-center justify-center leading-[20px] no-underline text-center"
              style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '44px', textAlign: 'center' }}
            >
              Start Course
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-[#616d7b] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link to="/texas/pricing" onClick={closeMenu} className="block text-sm font-medium text-[#616d7b] hover:text-[#1e2832]">Pricing</Link>
              <Link to="/texas/faq" onClick={closeMenu} className="block text-sm font-medium text-[#616d7b] hover:text-[#1e2832]">FAQ</Link>
              <Link to="/texas/helpcenter" onClick={closeMenu} className="block text-sm font-medium text-[#616d7b] hover:text-[#1e2832]">Help Center</Link>
              <div className="pt-2 space-y-2">
                <button className="w-full h-9 px-4 rounded-[10px] text-xs font-semibold text-[#1e2832] border border-gray-300 hover:bg-gray-100">
                  Log In
                </button>
                <Button 
                  href="/courses/tx-defensive" 
                  variant="custom" 
                  className="w-full h-11 px-5 rounded-xl bg-[#0667d1] text-white text-sm font-semibold shadow-[0px_10px_15px_-3px_rgba(17,23,34,0.08),0px_4px_6px_-4px_rgba(17,23,34,0.05)] hover:bg-[#0556b3]"
                >
                  Start Course
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1e2832]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Footer Content - 4 Column Grid */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-12 items-start justify-center mb-12">
            {/* Column 1 - Company Info */}
            <div className="flex flex-col gap-6 items-start w-full lg:w-[432px]">
              {/* Logo */}
              <Link to="/texas" className="flex gap-2 items-center hover:opacity-80">
                <div className="bg-[#0351b4] rounded-2xl w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <img src="/assets/icons/texas/logo-shield-footer.svg" alt="Road Ready Safety Logo" className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white leading-[22.5px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Road Ready</span>
                  <span className="text-xs font-medium text-[#f6f6f9] leading-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Safety</span>
                </div>
              </Link>
              
              {/* Description */}
              <p className="text-sm text-[#f6f6f9] leading-5 max-w-[384px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Texas' trusted defensive driving course provider. TDLR-<br />
                approved, court-accepted, and designed for busy Texans.
              </p>
              
              {/* Contact Info */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <img src="/assets/icons/texas/email-icon.svg" alt="" className="w-4 h-4" />
                  <a href="mailto:support@roadreadysafety.com" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    support@roadreadysafety.com
                  </a>
                </div>
                <div className="flex gap-3 items-center">
                  <img src="/assets/icons/texas/location-icon.svg" alt="" className="w-4 h-4" />
                  <span className="text-sm text-[#f6f6f9] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Provider License #: xxxxx</span>
                </div>
              </div>
            </div>
            
            {/* Column 2 - Course Links */}
            <div className="flex flex-col gap-4 items-start w-full lg:w-[192px]">
              <h4 className="text-base font-semibold text-white leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Course</h4>
              <div className="flex flex-col gap-3">
                <Link to="/texas" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Texas Course</Link>
                <Link to="/texas/pricing" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pricing</Link>
                <Link to="/texas/faq" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>FAQ</Link>
              </div>
            </div>
            
            {/* Column 3 - Support Links */}
            <div className="flex flex-col gap-4 items-start w-full lg:w-[192px]">
              <h4 className="text-base font-semibold text-white leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Support</h4>
              <div className="flex flex-col gap-3">
                <Link to="/texas/helpcenter" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Help Center</Link>
                <Link to="/texas/contactus" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Contact Us</Link>
              </div>
              </div>
              
            {/* Column 4 - Legal Links */}
            <div className="flex flex-col gap-4 items-start w-full lg:w-[192px]">
              <h4 className="text-base font-semibold text-white leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Legal</h4>
              <div className="flex flex-col gap-3">
                <Link to="/privacy" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Privacy Policy</Link>
                <Link to="/texas/terms" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Terms of Service</Link>
                <Link to="/refund" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Refund Policy</Link>
                <Link to="/accessibility" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Accessibility</Link>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-[#1c2331] pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[#616d7b] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                © 2025 Road Ready Safety. All rights reserved.
              </p>
              <div className="flex gap-2 items-center">
                <img src="/assets/icons/texas/tdlr-badge-footer.svg" alt="" className="w-4 h-4" />
                <span className="text-sm text-[#616d7b] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>TDLR Approved Provider</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

