'use client'

import type { CSSProperties, ReactNode } from 'react'
import { colors, spacing, transitions } from '@/lib/design-system'

interface TableProps {
  headers: string[]
  rows: ReactNode[][]
  onRowClick?: (rowIndex: number) => void
  striped?: boolean
  hover?: boolean
}

export function Table({ headers, rows, onRowClick, striped = true, hover = true }: TableProps) {
  const headerCellStyle: CSSProperties = {
    padding:    spacing.md,
    textAlign:  'left',
    fontWeight: 700,
    fontSize:   '0.9rem',
    color:      colors.neutral[700],
    fontFamily: 'var(--font-inter)',
  }

  const cellStyle: CSSProperties = {
    padding:    spacing.md,
    textAlign:  'left',
    fontSize:   '0.95rem',
    color:      colors.neutral[700],
    fontFamily: 'var(--font-inter)',
  }

  const rowBg = (index: number) =>
    striped && index % 2 === 1 ? colors.neutral[50] : colors.neutral.white

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ backgroundColor: colors.neutral[100], borderBottom: `2px solid ${colors.neutral[300]}` }}>
            {headers.map((h, i) => <th key={i} style={headerCellStyle}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              style={{
                backgroundColor: rowBg(ri),
                borderBottom:    `1px solid ${colors.neutral[200]}`,
                transition:      transitions.normal,
                cursor:          onRowClick ? 'pointer' : 'default',
              }}
              onClick={() => onRowClick?.(ri)}
              onMouseEnter={(e) => {
                if (hover && onRowClick) e.currentTarget.style.backgroundColor = colors.primary.idm + '1A'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = rowBg(ri)
              }}
            >
              {row.map((cell, ci) => <td key={ci} style={cellStyle}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
