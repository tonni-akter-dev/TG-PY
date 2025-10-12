'use client';

import * as React from 'react';

export interface DailyBar {
  label: string;
  height: number;
}

interface Props {
  data?: DailyBar[]; // height from 0..100 maps to bar height
}

export function DailyActiveUsersChart({ data }: Props) {
  return (
    <div className='relative h-64 w-full'>
      <svg className='h-full w-full' viewBox='0 0 400 200' aria-label='Daily Active Users'>
        <defs>
          <linearGradient id='barGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#3b82f6' stopOpacity='0.8' />
            <stop offset='100%' stopColor='#8b5cf6' stopOpacity='0.6' />
          </linearGradient>
        </defs>
        <line x1='50' y1='20' x2='50' y2='180' stroke='#374151' strokeWidth='1' />
        <line x1='50' y1='180' x2='350' y2='180' stroke='#374151' strokeWidth='1' />
        <line x1='50' y1='140' x2='350' y2='140' stroke='#374151' strokeWidth='0.5' opacity='0.5' />
        <line x1='50' y1='100' x2='350' y2='100' stroke='#374151' strokeWidth='0.5' opacity='0.5' />
        <line x1='50' y1='60' x2='350' y2='60' stroke='#374151' strokeWidth='0.5' opacity='0.5' />

        {data ? (
          data.map((d, i) => {
            const x = 70 + i * 40;
            const h = Math.max(0, Math.min(100, d.height));
            const height = (h / 100) * 120; // map to 120px max
            const y = 180 - height;
            return (
              <rect
                key={d.label}
                x={x}
                y={y}
                width={30}
                height={height}
                fill='url(#barGradient)'
                rx={2}
              />
            );
          })
        ) : (
          <>
            <rect x='70' y='120' width='30' height='60' fill='url(#barGradient)' rx='2' />
            <rect x='110' y='100' width='30' height='80' fill='url(#barGradient)' rx='2' />
            <rect x='150' y='90' width='30' height='90' fill='url(#barGradient)' rx='2' />
            <rect x='190' y='110' width='30' height='70' fill='url(#barGradient)' rx='2' />
            <rect x='230' y='95' width='30' height='85' fill='url(#barGradient)' rx='2' />
            <rect x='270' y='85' width='30' height='95' fill='url(#barGradient)' rx='2' />
            <rect x='310' y='105' width='30' height='75' fill='url(#barGradient)' rx='2' />
          </>
        )}

        {(
          data || [
            { label: 'Mon' },
            { label: 'Tue' },
            { label: 'Wed' },
            { label: 'Thu' },
            { label: 'Fri' },
            { label: 'Sat' },
            { label: 'Sun' }
          ]
        ).map((d, i) => (
          <text
            key={d.label}
            x={85 + i * 40}
            y={195}
            textAnchor='middle'
            className='fill-gray-400 text-xs'
          >
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
