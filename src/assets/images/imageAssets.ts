// Bundled images imported directly so Vite processes and hashes them properly in production builds
import heroImg from './hero_school_digital_1793805015402.jpg';
import simScienceLabImg from './sim_science_lab_1793805016304.jpg';
import simVocationalTechImg from './sim_vocational_tech_1793805049878.jpg';

export const IMAGES = {
  hero: heroImg,
  scienceLab: simScienceLabImg,
  vocationalTech: simVocationalTechImg,
  // Public fallbacks
  heroPublic: '/images/hero_school_digital_1793805015402.jpg',
  scienceLabPublic: '/images/sim_science_lab_1793805016304.jpg',
  vocationalTechPublic: '/images/sim_vocational_tech_1793805049878.jpg',
};

// Generates an inline SVG data URI as 100% reliable fallback for course covers
export const getCourseCoverFallback = (title: string, category: string): string => {
  const bg = category.includes('MIPA') ? '%230369a1' : '%230f766e';
  const text = encodeURIComponent(title.slice(0, 18));
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340"><rect width="600" height="340" fill="${bg}"/><circle cx="500" cy="80" r="140" fill="%23ffffff" fill-opacity="0.08"/><circle cx="100" cy="280" r="180" fill="%23ffffff" fill-opacity="0.05"/><text x="50" y="160" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23ffffff">${text}</text><text x="50" y="200" font-family="sans-serif" font-size="16" fill="%23bae6fd">SMAN 25 Jakarta · Kelas 11 MIPA</text></svg>`;
};
