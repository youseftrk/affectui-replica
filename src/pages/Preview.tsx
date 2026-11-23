import { lazy, Suspense, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Stage from '../components/Stage';

const modules = import.meta.glob('../components/ui/*.tsx');
const demoCssModules = import.meta.glob('../demo-css/*.css', { query: '?raw', import: 'default' });

export default function Preview() {
  const { slug } = useParams<{ slug: string }>();
  const loader = slug ? modules[`../components/ui/${slug}.tsx`] : undefined;

  const Comp = useMemo(() => {
    if (!loader) return null;
    const cssLoader = slug ? demoCssModules[`../demo-css/${slug}.css`] : undefined;
    return lazy(async () => {
      const [m, css] = await Promise.all([
        (loader as () => Promise<Record<string, unknown>>)(),
        cssLoader ? (cssLoader as () => Promise<string>)() : Promise.resolve(''),
      ]);
      let Inner: React.ComponentType;
      if (m.default) {
        Inner = m.default as React.ComponentType;
      } else {
        const fns = Object.entries(m).filter(([, v]) => typeof v === 'function');
        const compact = (slug || '').replace(/-/g, '').toLowerCase();
        const pick =
          fns.find(([k]) => k.toLowerCase().includes(compact.slice(0, 6))) ||
          fns.find(([k]) => /^[A-Z]/.test(k)) ||
          fns[0];
        Inner = (pick ? pick[1] : () => null) as React.ComponentType;
      }
      return {
        default: function PreviewWithCss() {
          return (
            <>
              {css ? <style>{css}</style> : null}
              <Inner />
            </>
          );
        },
      };
    });
  }, [loader, slug]);

  if (!Comp) {
    return (
      <div className="preview-page">
        <div style={{ fontFamily: 'monospace' }}>no component for slug: {slug}</div>
      </div>
    );
  }
  return (
    <div className="preview-page">
      <Suspense fallback={null}>
        <Stage>
          <Comp />
        </Stage>
      </Suspense>
      <div style={{ position: 'fixed', top: 8, left: 8 }}>
        <Link to="/" style={{ fontSize: 12, color: '#666' }}>← index</Link>
      </div>
    </div>
  );
}
