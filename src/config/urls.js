export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://roadreadysafety.com';
export const PORTAL_URL = import.meta.env.VITE_PORTAL_URL || 'https://app.roadreadysafety.com';
// Main site Contact Us / Support redirect URL (Texas footer/header stay /texas/contactus)
export const CONTACT_US_URL = import.meta.env.VITE_CONTACT_US_URL || `${PORTAL_URL}/contact`;
// Portal login URL; when set, header "Log In" goes here (with ?returnUrl= current path). Empty in prod = button does nothing.
export const LOGIN_URL = import.meta.env.VITE_LOGIN_URL || '';
// When true, components use course.qa_link instead of course.affiliate_link for enrollment CTAs
export const IS_QA = import.meta.env.VITE_IS_QA === 'true';
