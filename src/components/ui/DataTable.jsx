import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function DataTable({ columns = [], data = [], onRowClick }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (key, sortable) => {
    if (!sortable) return;
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const av = a[sortKey];
    const bv = b[sortKey];
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av === 'string') {
      const cmp = av.localeCompare(bv);
      return sortDir === 'asc' ? cmp : -cmp;
    }
    return sortDir === 'asc' ? av - bv : bv - av;
  });

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 14,
          color: '#0F1E33',
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key, col.sortable)}
                style={{
                  position: 'sticky',
                  top: 0,
                  background: '#fff',
                  textAlign: 'left',
                  padding: '10px 14px',
                  borderBottom: '2px solid #D8D3C8',
                  fontWeight: 600,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: '#5B6472',
                  cursor: col.sortable ? 'pointer' : 'default',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 && (
            <tr>
              <td
                colSpan={columns.length || 1}
                style={{
                  padding: '32px 14px',
                  textAlign: 'center',
                  color: '#5B6472',
                  fontStyle: 'italic',
                }}
              >
                No data available.
              </td>
            </tr>
          )}
          {sorted.map((row, ri) => (
            <tr
              key={ri}
              onClick={() => onRowClick?.(row)}
              style={{
                cursor: onRowClick ? 'pointer' : 'default',
                borderBottom: '1px solid #D8D3C8',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#F2F0E9')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '')}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}
                >
                  {row[col.key] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
