import { AlertCircleIcon } from 'lucide-react';
import { Button } from '@/shadcn/button';
import { Card, CardContent } from '@/shadcn/card';

interface PageErrorFallbackProps {
	title: string;
	description: string;
	onRetry?: () => void;
}

export function PageErrorFallback({
	title,
	description,
	onRetry,
}: PageErrorFallbackProps) {
	return (
		<Card>
			<CardContent className="flex flex-col items-center justify-center py-14 text-center">
				<div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
					<AlertCircleIcon className="h-6 w-6" />
				</div>
				<h2 className="mt-4 text-xl font-semibold">{title}</h2>
				<p className="mt-2 max-w-md text-sm text-muted-foreground">
					{description}
				</p>
				{onRetry ? (
					<Button className="mt-5" variant="outline" onClick={onRetry}>
						Coba lagi
					</Button>
				) : null}
			</CardContent>
		</Card>
	);
}
