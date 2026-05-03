import { motion } from 'framer-motion';
import {
	GraduationCapIcon,
	HeartIcon,
	TargetIcon,
	UsersIcon,
} from 'lucide-react';
import {
	useLandingRoomStats,
	usePublicStats,
} from '@/features/landing/hooks/use-landing-data';
import { Button } from '@/shadcn/button';
import { FloatingNavbar } from '@/shared/components/floating-navbar';
import { Footer } from '@/shared/components/footer';

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
};

const values = [
	{
		icon: TargetIcon,
		title: 'Efficiency',
		description:
			'We streamline the room booking process to save time for students and staff.',
	},
	{
		icon: HeartIcon,
		title: 'User-Centric',
		description:
			'Every feature is designed with our users needs and feedback in mind.',
	},
	{
		icon: UsersIcon,
		title: 'Community',
		description:
			'Building a better experience for the entire FILKOM UB community.',
	},
	{
		icon: GraduationCapIcon,
		title: 'Education First',
		description:
			'Supporting academic activities by making resources accessible to all.',
	},
];

function StatsSectionFallback({ onRetry }: { onRetry: () => void }) {
	return (
		<div className="rounded-2xl border border-dashed bg-background/80 p-8 text-center">
			<p className="text-lg font-semibold">Statistik belum bisa dimuat</p>
			<p className="mt-2 text-sm text-muted-foreground">
				Halaman tetap tersedia. Coba muat ulang data bagian ini.
			</p>
			<Button className="mt-4" variant="outline" onClick={onRetry}>
				Coba lagi
			</Button>
		</div>
	);
}

function StorySectionFallback({ onRetry }: { onRetry: () => void }) {
	return (
		<div className="rounded-2xl border border-dashed bg-background p-8 text-center">
			<h2 className="text-2xl font-bold">
				Cerita dan misi sedang tidak tersedia
			</h2>
			<p className="mt-3 text-sm text-muted-foreground">
				Data pendukung untuk section ini gagal dimuat. Section lain tetap bisa
				diakses.
			</p>
			<Button className="mt-4" variant="outline" onClick={onRetry}>
				Coba lagi
			</Button>
		</div>
	);
}

export function AboutPage() {
	const publicStatsQuery = usePublicStats();
	const roomStatsQuery = useLandingRoomStats();
	const publicStats = publicStatsQuery.data;
	const roomStats = roomStatsQuery.data;
	const statsPending = publicStatsQuery.isPending || roomStatsQuery.isPending;
	const statsError = publicStatsQuery.isError || roomStatsQuery.isError;
	const retryStats = () => {
		publicStatsQuery.refetch();
		roomStatsQuery.refetch();
	};

	return (
		<div className="min-h-screen bg-background">
			<FloatingNavbar />

			<section className="container mx-auto px-6 py-16 lg:py-24">
				<motion.div
					initial="initial"
					animate="animate"
					variants={fadeInUp}
					className="mx-auto max-w-3xl text-center"
				>
					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
						About Go Reserve
					</h1>
					<p className="mt-6 text-lg text-muted-foreground">
						Go Reserve is the official room reservation system for the Faculty
						of Computer Science (FILKOM) at Universitas Brawijaya. Our mission
						is to simplify the room booking process for students, faculty, and
						staff.
					</p>
				</motion.div>
			</section>

			<section className="bg-primary/5 py-12">
				<div className="container mx-auto px-6">
					{statsError && !publicStats && !roomStats ? (
						<StatsSectionFallback onRetry={retryStats} />
					) : (
						<div className="mx-auto grid max-w-4xl gap-8 text-center md:grid-cols-4">
							{[
								{
									label: 'Active Users',
									value: publicStats ? `${publicStats.activeUsers}+` : '...',
									delay: 0,
								},
								{
									label: 'Total Rooms',
									value: roomStats ? `${roomStats.total}` : '...',
									delay: 0.1,
								},
								{
									label: 'Reservations Made',
									value: publicStats
										? `${publicStats.totalReservations}+`
										: '...',
									delay: 0.2,
								},
								{
									label: 'Approval Rate',
									value: publicStats ? `${publicStats.approvalRate}%` : '...',
									delay: 0.3,
								},
							].map((stat) => (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: stat.delay }}
								>
									<p className="text-4xl font-bold text-primary">
										{statsPending && stat.value === '...' ? '...' : stat.value}
									</p>
									<p className="mt-1 text-sm text-muted-foreground">
										{stat.label}
									</p>
								</motion.div>
							))}
						</div>
					)}
				</div>
			</section>

			<section className="bg-card/50 py-16">
				<div className="container mx-auto px-6">
					<div className="mx-auto max-w-4xl">
						{publicStats && roomStats ? (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="grid gap-8 md:grid-cols-2"
							>
								<div>
									<h2 className="text-2xl font-bold">Our Story</h2>
									<p className="mt-4 text-muted-foreground">
										Go Reserve was born from the need to modernize how rooms are
										booked at FILKOM UB. Previously, the process involved
										physical forms and long waiting times.
									</p>
									<p className="mt-4 text-muted-foreground">
										Today, our platform serves {publicStats.activeUsers}+ users,
										making room reservations quick, transparent, and
										hassle-free.
									</p>
								</div>
								<div>
									<h2 className="text-2xl font-bold">Our Mission</h2>
									<p className="mt-4 text-muted-foreground">
										To provide a seamless, efficient, and transparent room
										booking experience for the entire FILKOM UB community.
									</p>
									<p className="mt-4 text-muted-foreground">
										With {roomStats.available} rooms currently available for
										booking, we make academic resources accessible to all.
									</p>
								</div>
							</motion.div>
						) : statsPending ? (
							<div className="grid gap-8 md:grid-cols-2">
								<div className="h-44 animate-pulse rounded-2xl bg-muted" />
								<div className="h-44 animate-pulse rounded-2xl bg-muted" />
							</div>
						) : (
							<StorySectionFallback onRetry={retryStats} />
						)}
					</div>
				</div>
			</section>

			<section className="py-16">
				<div className="container mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mx-auto max-w-2xl text-center"
					>
						<h2 className="text-3xl font-bold">Our Values</h2>
						<p className="mt-4 text-muted-foreground">
							The principles that guide everything we do.
						</p>
					</motion.div>

					<div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{values.map((value, index) => (
							<motion.div
								key={value.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="rounded-xl border bg-card p-6 text-center"
							>
								<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
									<value.icon className="h-6 w-6" />
								</div>
								<h3 className="mt-4 font-semibold">{value.title}</h3>
								<p className="mt-2 text-sm text-muted-foreground">
									{value.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
}
