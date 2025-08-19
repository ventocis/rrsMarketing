brand:  
  name: "Road Ready Safety"  
  domain: "roadreadysafety.com"  
  logo: "/public/images/logo.svg"  
  support\_email: "support@roadreadysafety.com"  
  support\_phone: "(888) 885 – 5707"  
  phone\_hours: "Mon–Fri 9–5"

build:  
  framework: "react-vite"  
  language: "jsx"  
  static: true

routing:  
  home: "/"  
  results: "/find/:state/:courseType"   \# hidden route; only used by Finder  
  course: "/courses/:slug"  
  support: "/support"  
  privacy: "/privacy"  
  terms: "/terms"

toggles:                      \# ← merge into ONE block  
  showResultsPage: true  
  showPartnerPill: true  
  showFAQ: true  
  showTrustStrip: true  
  showHowItWorks: true  
  showUSP: true:  
  useHeroFinder: true        \# optional style hint for Cursor (compact card in hero)

links:  
  login: "\#"  
  courses\_anchor: "\#find-course"

notes:  
  goal: "Single static site. Finder → (optional Results) → Course page. S3 deploy."

