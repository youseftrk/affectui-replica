import { Link } from 'react-router-dom';
import slugs from './slugs.json';

export default function Index() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 32, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 22, fontWeight: 600 }}>affectUI component replica — {slugs.length} components</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8, marginTop: 20 }}>
        {slugs.map((s: any) => (
          <Link key={s.slug} to={`/preview/${s.slug}`}
            style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#fff', border: '1px solid #e5e5e5', borderRadius: 8, color: '#0a0a0a', textDecoration: 'none', fontSize: 13 }}>
            <span>{s.slug}</span>
            <span style={{ color: s.pro ? '#b45309' : '#15803d', fontSize: 11 }}>{s.pro ? 'pro' : 'free'}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
