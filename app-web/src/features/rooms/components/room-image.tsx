import * as React from 'react';
import { DoorOpenIcon } from 'lucide-react';
import { cn } from '@/shared/utils';

interface RoomImageProps {
	src: string | null;
	alt: string;
	containerClassName?: string;
	imageClassName?: string;
	fallbackIconClassName?: string;
}

export function RoomImage({
	src,
	alt,
	containerClassName,
	imageClassName,
	fallbackIconClassName,
}: RoomImageProps) {
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [hasError, setHasError] = React.useState(false);

	React.useEffect(() => {
		setIsLoaded(false);
		setHasError(false);
	}, [src]);

	if (!src || hasError) {
		return (
			<div
				className={cn(
					'flex h-full w-full items-center justify-center bg-linear-to-br from-primary/20 to-primary/5',
					containerClassName,
				)}
			>
				<DoorOpenIcon
					className={cn('h-12 w-12 text-primary/40', fallbackIconClassName)}
				/>
			</div>
		);
	}

	return (
		<div className={cn('relative h-full w-full overflow-hidden', containerClassName)}>
			{!isLoaded ? (
				<div className="absolute inset-0 animate-pulse bg-muted" />
			) : null}
			<img
				src={src}
				alt={alt}
				onLoad={() => setIsLoaded(true)}
				onError={() => setHasError(true)}
				className={cn(
					'h-full w-full object-cover',
					!isLoaded && 'opacity-0',
					imageClassName,
				)}
			/>
		</div>
	);
}
