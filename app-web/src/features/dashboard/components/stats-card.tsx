import * as React from 'react';
import { cn } from '@/shared/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/card';

interface StatsCardProps {
	title: string;
	value: string | number;
	description?: string;
	icon?: React.ReactNode;
	trend?: {
		value: number;
		isPositive: boolean;
	};
	className?: string;
}

export function StatsCard({
	title,
	value,
	description,
	icon,
	trend,
	className,
}: StatsCardProps) {
	return (
		<Card className={cn('overflow-hidden', className)}>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="text-sm font-medium text-muted-foreground">
					{title}
				</CardTitle>
				{icon && (
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
						{icon}
					</div>
				)}
			</CardHeader>
			<CardContent>
				<div className="text-3xl font-bold">{value}</div>
				{(description || trend) && (
					<div className="mt-1 flex items-center gap-2 text-sm">
						{trend && (
							<span
								className={cn(
									'font-medium',
									trend.isPositive ? 'text-green-600' : 'text-red-600',
								)}
							>
								{trend.isPositive ? '+' : '-'}
								{Math.abs(trend.value)}%
							</span>
						)}
						{description && (
							<span className="text-muted-foreground">{description}</span>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
