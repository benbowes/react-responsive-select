import * as React from 'react';

export function Code({ children }: { children: string }) {
  return (
    <pre className="code">
      <code>
        {children}
      </code>
    </pre>
  );  
}
