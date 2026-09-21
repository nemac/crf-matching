import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const PAGES_DIR = path.resolve(__dirname, '../pages');

const readPage = filename => fs.readFileSync(path.join(PAGES_DIR, filename), 'utf-8');

const extractHeaderSx = source => {
  const match = source.match(
    /<NavBar\s*\/>[\s\S]*?<Box\s*\n\s*sx=\{\{([\s\S]*?)\}\}\s*\n\s*>/
  );
  if (!match) return null;
  return match[1].replace(/\s+/g, ' ').trim();
};

const extractBottomWrappers = source => {
  const pattern =
    /<Box sx=\{\{\s*px:\s*\{[^}]+\},\s*py:\s*\d+,\s*bgcolor:\s*'[^']+'\s*\}\}>/g;
  return [...source.matchAll(pattern)].map(m =>
    m[0].replace(/\s+/g, ' ').trim()
  );
};

describe('Page styling consistency', () => {
  const aboutSource = readPage('AboutPage.jsx');
  const howToApplySource = readPage('HowToApplyPage.jsx');

  it('should have matching page header wrapper sx', () => {
    const aboutHeader = extractHeaderSx(aboutSource);
    const howToApplyHeader = extractHeaderSx(howToApplySource);

    expect(aboutHeader).not.toBeNull();
    expect(howToApplyHeader).not.toBeNull();
    expect(aboutHeader).toBe(howToApplyHeader);
  });

  it('should use the same bottom section wrapper pattern', () => {
    const aboutWrappers = extractBottomWrappers(aboutSource);
    const howToApplyWrappers = extractBottomWrappers(howToApplySource);

    expect(aboutWrappers.length).toBeGreaterThan(0);
    expect(howToApplyWrappers.length).toBeGreaterThan(0);

    const aboutPattern = aboutWrappers[0];
    const howToApplyPattern = howToApplyWrappers[0];
    expect(aboutPattern).toBe(howToApplyPattern);
  });

  it('should both include ContactUs component', () => {
    expect(aboutSource).toContain('<ContactUs');
    expect(howToApplySource).toContain('<ContactUs');
  });

  it('should both include Footer component', () => {
    expect(aboutSource).toContain('<Footer');
    expect(howToApplySource).toContain('<Footer');
  });

  it('should both include NavBar component', () => {
    expect(aboutSource).toContain('<NavBar');
    expect(howToApplySource).toContain('<NavBar');
  });

  it('should both wrap content in ThemeProvider', () => {
    expect(aboutSource).toContain('<ThemeProvider');
    expect(howToApplySource).toContain('<ThemeProvider');
  });
});
