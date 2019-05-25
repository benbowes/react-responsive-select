import * as React from 'react';

export function Code({ children }: { children: string }): React.ReactElement {
  return (
    <pre className="code">
      <code>
        {children}
      </code>
    </pre>
  );
}
