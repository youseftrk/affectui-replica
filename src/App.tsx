import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Preview from './pages/Preview';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/preview/:slug" element={<Preview />} />
    </Routes>
  );
}
