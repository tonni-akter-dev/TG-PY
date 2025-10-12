'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardCard({ title, subtitle, badge, children }: DashboardCardProps) {
  return (
    <Card className='border-border bg-card'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-foreground'>{title}</CardTitle>
            {subtitle ? (
              <CardDescription className='text-muted-foreground'>{subtitle}</CardDescription>
            ) : null}
          </div>
          {badge}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
