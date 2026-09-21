import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const PAGES_DIR = path.resolve(__dirname, '../pages');

const readPage = filename =>
  fs.readFileSync(path.join(PAGES_DIR, filename), 'utf-8');

const normalize = text => text.replace(/\s+/g, ' ').replace(/,\s*}/g, ' }').trim();

const extractSxBlocks = source => {
  const blocks = [];
  const marker = 'sx={{';
  let searchFrom = 0;
  while (true) {
    const start = source.indexOf(marker, searchFrom);
    if (start === -1) break;
    let depth = 0;
    let index = start + 'sx='.length;
    for (; index < source.length; index += 1) {
      if (source[index] === '{') depth += 1;
      if (source[index] === '}') {
        depth -= 1;
        if (depth === 0) break;
      }
    }
    blocks.push(normalize(source.slice(start + 'sx='.length, index + 1)));
    searchFrom = index + 1;
  }
  return blocks;
};

const extractHeaderSx = source => {
  const match = source.match(
    /<NavBar\s*\/>[\s\S]*?<Box\s*\n\s*sx=\{\{([\s\S]*?)\}\}\s*\n\s*>/
  );
  return match ? normalize(match[1]) : null;
};

const extractVariants = source =>
  new Set([...source.matchAll(/variant="([^"]+)"/g)].map(m => m[1]));

describe('RegistryTermsConditionsPage styling matches HowToApplyPage', () => {
  const termsSource = readPage('RegistryTermsConditionsPage.jsx');
  const howToApplySource = readPage('HowToApplyPage.jsx');
  const howToApplyBlocks = new Set(extractSxBlocks(howToApplySource));
  const howToApplyNormalized = normalize(howToApplySource);

  it('uses only sx blocks that appear verbatim in HowToApplyPage', () => {
    const termsBlocks = extractSxBlocks(termsSource);
    expect(termsBlocks.length).toBeGreaterThan(0);
    const strayBlocks = termsBlocks.filter(
      block => !howToApplyBlocks.has(block)
    );
    expect(strayBlocks).toEqual([]);
  });

  it('has an identical page header wrapper', () => {
    const termsHeader = extractHeaderSx(termsSource);
    const howToApplyHeader = extractHeaderSx(howToApplySource);
    expect(termsHeader).not.toBeNull();
    expect(termsHeader).toBe(howToApplyHeader);
  });

  it('uses the same content wrapper as HowToApplyPage', () => {
    const contentWrapper = normalize(
      "<Box sx={{ px: { xs: 2, sm: 4, md: 12 }, py: 4, bgcolor: '#FFFFFF' }}>"
    );
    expect(normalize(termsSource)).toContain(contentWrapper);
    expect(howToApplyNormalized).toContain(contentWrapper);
  });

  it('uses only Typography variants that HowToApplyPage uses', () => {
    const termsVariants = [...extractVariants(termsSource)];
    const howToApplyVariants = extractVariants(howToApplySource);
    expect(termsVariants.length).toBeGreaterThan(0);
    const strayVariants = termsVariants.filter(v => !howToApplyVariants.has(v));
    expect(strayVariants).toEqual([]);
  });

  it('does not use inline style props or styled components', () => {
    expect(termsSource).not.toMatch(/\sstyle=\{/);
    expect(termsSource).not.toMatch(/\bstyled\(/);
    expect(termsSource).not.toMatch(/className=/);
  });

  it('has the same page skeleton', () => {
    expect(termsSource).toContain('<ThemeProvider theme={theme}>');
    expect(termsSource).toContain('<NavBar />');
    expect(termsSource).toContain('<Footer />');
    expect(termsSource).not.toContain('<ContactUs');
    expect(termsSource).not.toContain('<IncludedInRegistry');
  });
});
