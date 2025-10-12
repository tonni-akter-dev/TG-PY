'use client';

import * as React from 'react';

export type MonthlyPoint = { x: number; y: number };

interface Props {
  points?: MonthlyPoint[];
  values?: number[]; // 0..100 data (e.g., costs/profit)
}

function mapValuesToPath(values: number[], xStart = 60, xEnd = 340, yMin = 60, yMax = 160) {
  if (!values.length) return '';
  const n = values.length;
  const step = (xEnd - xStart) / Math.max(1, n - 1);
  const xs = values.map((_, i) => xStart + i * step);
  const ys = values.map((v) => {
    const t = Math.max(0, Math.min(100, v)) / 100; // clamp 0..1
    return yMax - t * (yMax - yMin); // invert for SVG
  });

  // Catmull-Rom to cubic Bezier for smooth curve
  const d: string[] = [];
  d.push(`M${xs[0]} ${ys[0]}`);
  for (let i = 0; i < n - 1; i++) {
    const x0 = i > 0 ? xs[i - 1] : xs[i];
    const y0 = i > 0 ? ys[i - 1] : ys[i];
    const x1 = xs[i];
    const y1 = ys[i];
    const x2 = xs[i + 1];
    const y2 = ys[i + 1];
    const x3 = i !== n - 2 ? xs[i + 2] : xs[i + 1];
    const y3 = i !== n - 2 ? ys[i + 2] : ys[i + 1];
    const cp1x = x1 + (x2 - x0) / 6;
    const cp1y = y1 + (y2 - y0) / 6;
    const cp2x = x2 - (x3 - x1) / 6;
    const cp2y = y2 - (y3 - y1) / 6;
    d.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`);
  }
  return d.join(' ');
}

export function MonthlyProfitChart({ points, values }: Props) {
  return (
    <div className='relative h-64 w-full'>
      <svg className='h-full w-full' viewBox='0 0 400 200' aria-label='Monthly Profit'>
        <defs>
          <linearGradient id='profitGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#8b5cf6' stopOpacity='0.8' />
            <stop offset='100%' stopColor='#ec4899' stopOpacity='0.3' />
          </linearGradient>
        </defs>
        <line x1='50' y1='20' x2='50' y2='180' stroke='#374151' strokeWidth='1' />
        <line x1='50' y1='180' x2='350' y2='180' stroke='#374151' strokeWidth='1' />
        <line x1='50' y1='140' x2='350' y2='140' stroke='#374151' strokeWidth='0.5' opacity='0.5' />
        <line x1='50' y1='100' x2='350' y2='100' stroke='#374151' strokeWidth='0.5' opacity='0.5' />
        <line x1='50' y1='60' x2='350' y2='60' stroke='#374151' strokeWidth='0.5' opacity='0.5' />

        {/* Curve */}
        {points && points.length > 1 ? (
          <path
            d={
              `M${points[0].x} ${points[0].y} ` +
              points
                .slice(1)
                .map((p) => `L ${p.x} ${p.y}`)
                .join(' ')
            }
            fill='none'
            stroke='#e11d8a'
            strokeWidth={3}
          />
        ) : values && values.length > 1 ? (
          <path d={mapValuesToPath(values)} fill='none' stroke='#e11d8a' strokeWidth={3} />
        ) : (
          <path
            d='M60 150 C 70 120, 90 130, 100 140 C 110 155, 130 150, 140 135 C 150 120, 165 125, 175 140 C 185 155, 200 170, 210 150 C 220 130, 235 110, 245 105 C 255 100, 265 140, 275 80 C 285 50, 300 60, 310 120 C 320 160, 330 150, 340 120'
            fill='none'
            stroke='#e11d8a'
            strokeWidth={3}
          />
        )}

        {/* Subtle glow under curve */}
        {!points && !values && (
          <path
            d='M60 150 C 70 120, 90 130, 100 140 C 110 155, 130 150, 140 135 C 150 120, 165 125, 175 140 C 185 155, 200 170, 210 150 C 220 130, 235 110, 245 105 C 255 100, 265 140, 275 80 C 285 50, 300 60, 310 120 C 320 160, 330 150, 340 120 L 340 180 L 60 180 Z'
            fill='url(#profitGradient)'
          />
        )}

        {!points && !values && (
          <>
            <circle cx='80' cy='140' r='3' fill='#e11d8a' />
            <circle cx='120' cy='150' r='3' fill='#e11d8a' />
            <circle cx='160' cy='138' r='3' fill='#e11d8a' />
            <circle cx='200' cy='165' r='3' fill='#e11d8a' />
            <circle cx='240' cy='110' r='3' fill='#e11d8a' />
            <circle cx='300' cy='120' r='3' fill='#e11d8a' />
          </>
        )}

        <text x='70' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
          Aug
        </text>
        <text x='120' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
          Sep
        </text>
        <text x='170' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
          Oct
        </text>
        <text x='220' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
          Nov
        </text>
        <text x='270' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
          Dec
        </text>
        <text x='320' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
          Jan
        </text>
      </svg>
    </div>
  );
}
