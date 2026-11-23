import type { ReactNode } from 'react';

export default function Stage({ children }: { children: ReactNode }) {
  return (
    <div className="stage">
      <div className="stage__look">{children}</div>
    </div>
  );
}
