import natural from 'natural';

export const vectors = (docs: string[]) => {
  const TfIdf = natural.TfIdf;
  const tfidf = new TfIdf();
  docs.forEach(d => tfidf.addDocument(d || ''));
  const vects = [];
  for (let i=0;i<docs.length;i++) {
    const obj: any = {};
    const terms: any[] = tfidf.listTerms(i);
    terms.forEach(t => obj[t.term] = t.tfidf);
    vects.push(obj);
  }
  return {
    vectors: (indexes: number[]) => indexes.map(i => vects[i]),
    // For cosine compute dense arrays aligned to union of terms
    dense: () => {
      const terms = new Set<string>();
      vects.forEach(v => Object.keys(v).forEach(k => terms.add(k)));
      const keys = Array.from(terms);
      return vects.map(v => keys.map(k => v[k] || 0));
    }
  };
};

export const cosineSimilarity = (a: number[], b: number[]) => {
  if (!a || !b) return 0;
  let dot = 0, na = 0, nb = 0;
  for (let i=0;i<a.length;i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
};
