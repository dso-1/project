import { motion } from 'framer-motion';
import { FloatingNavbar } from '@/shared/components/floating-navbar';
import { Footer } from '@/shared/components/footer';
import {
	UsersIcon,
	TargetIcon,
	HeartIcon,
	GraduationCapIcon,
} from 'lucide-react';

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

interface AboutPageProps {
	publicStats: {
		activeUsers: number;
		totalReservations: number;
		approvalRate: number;
	};
	roomStats: {
		total: number;
		available: number;
		maintenance: number;
	};
}

export function AboutPage({ publicStats, roomStats }: AboutPageProps) {
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
					<div className="mx-auto grid max-w-4xl gap-8 text-center md:grid-cols-4">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
						>
							<p className="text-4xl font-bold text-primary">
								{publicStats.activeUsers}+
							</p>
							<p className="mt-1 text-sm text-muted-foreground">Active Users</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
						>
							<p className="text-4xl font-bold text-primary">
								{roomStats.total}
							</p>
							<p className="mt-1 text-sm text-muted-foreground">Total Rooms</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
						>
							<p className="text-4xl font-bold text-primary">
								{publicStats.totalReservations}+
							</p>
							<p className="mt-1 text-sm text-muted-foreground">
								Reservations Made
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.3 }}
						>
							<p className="text-4xl font-bold text-primary">
								{publicStats.approvalRate}%
							</p>
							<p className="mt-1 text-sm text-muted-foreground">
								Approval Rate
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			<section className="bg-card/50 py-16">
				<div className="container mx-auto px-6">
					<div className="mx-auto max-w-4xl">
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
									booked at FILKOM UB. Previously, the process involved physical
									forms and long waiting times.
								</p>
								<p className="mt-4 text-muted-foreground">
									Today, our platform serves {publicStats.activeUsers}+ users,
									making room reservations quick, transparent, and hassle-free.
								</p>
							</div>
							<div>
								<h2 className="text-2xl font-bold">Our Mission</h2>
								<p className="mt-4 text-muted-foreground">
									To provide a seamless, efficient, and transparent room booking
									experience for the entire FILKOM UB community.
								</p>
								<p className="mt-4 text-muted-foreground">
									With {roomStats.available} rooms currently available for
									booking, we make academic resources accessible to all.
								</p>
							</div>
						</motion.div>
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

			<section className="bg-card/50 py-16">
				<div className="container mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mx-auto max-w-2xl text-center"
					>
						<h2 className="text-3xl font-bold">Built with Modern Technology</h2>
						<p className="mt-4 text-muted-foreground">
							Go Reserve is built with cutting-edge technologies for performance
							and reliability.
						</p>
					</motion.div>

					<div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2 md:grid-cols-4">
						{[
							'TanStack Start',
							'React 19',
							'Tailwind CSS',
							'PostgreSQL',
							'Prisma',
							'GraphQL',
							'TypeScript',
							'Framer Motion',
						].map((tech, i) => (
							<motion.div
								key={tech}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.05 }}
								className="rounded-lg border bg-card px-4 py-3 text-center text-sm font-medium"
							>
								{tech}
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
