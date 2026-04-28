import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Button } from '@/shadcn/button';
import { FloatingNavbar } from '@/shared/components/floating-navbar';
import { Footer } from '@/shared/components/footer';
import {
	DoorOpenIcon,
	CalendarIcon,
	ShieldCheckIcon,
	ArrowRightIcon,
	CheckIcon,
	ClockIcon,
	UsersIcon,
	StarIcon,
	ZapIcon,
	BuildingIcon,
} from 'lucide-react';

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
};

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const stats = [
	{ value: '500+', label: 'Active Users' },
	{ value: '8', label: 'Available Rooms' },
	{ value: '1000+', label: 'Reservations' },
	{ value: '99%', label: 'Approval Rate' },
];

const features = [
	{
		icon: DoorOpenIcon,
		title: 'Browse Rooms',
		description:
			'Explore all available labs, seminar rooms, and meeting spaces with detailed information about capacity and facilities.',
	},
	{
		icon: CalendarIcon,
		title: 'Easy Booking',
		description:
			'Reserve rooms in just a few clicks. View real-time availability and book instantly without any hassle.',
	},
	{
		icon: ShieldCheckIcon,
		title: 'Quick Approval',
		description:
			'Get fast approval from administrators. Track your booking status in real-time from your dashboard.',
	},
	{
		icon: ClockIcon,
		title: 'Real-time Updates',
		description:
			'Stay informed with instant notifications about your booking status and any schedule changes.',
	},
	{
		icon: UsersIcon,
		title: 'Team Friendly',
		description:
			'Book rooms for your team projects, presentations, and group study sessions effortlessly.',
	},
	{
		icon: ZapIcon,
		title: 'Lightning Fast',
		description:
			'Optimized for speed and performance. Complete your reservation in under a minute.',
	},
];

const testimonials = [
	{
		name: 'Budi Santoso',
		role: 'Computer Science Student',
		content:
			'Go Reserve made booking lab rooms so much easier. I used to wait in long queues, now I can book from anywhere!',
		avatar: 'B',
	},
	{
		name: 'Dr. Siti Aminah',
		role: 'Faculty Member',
		content:
			'The admin dashboard is intuitive and helps me manage room reservations efficiently. Great tool for FILKOM!',
		avatar: 'S',
	},
	{
		name: 'Andi Wijaya',
		role: 'Student Organization Head',
		content:
			'We use Go Reserve for all our events. The approval process is fast and the system never fails us.',
		avatar: 'A',
	},
];

export function HomePage() {
	return (
		<div className="min-h-screen bg-linear-to-br from-background via-background to-primary/5">
			<div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
				<div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
				<div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
				<div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
			</div>

			<FloatingNavbar />

			<section className="container mx-auto px-6 pb-24 pt-16 lg:pt-24">
				<motion.div
					initial="initial"
					animate="animate"
					variants={staggerContainer}
					className="mx-auto max-w-4xl text-center"
				>
					<motion.div
						variants={fadeInUp}
						className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
					>
						<ShieldCheckIcon className="h-4 w-4" />
						FILKOM UB Official Platform
					</motion.div>

					<motion.h1
						variants={fadeInUp}
						className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
					>
						Book Rooms at{' '}
						<span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
							FILKOM UB
						</span>{' '}
						with Ease
					</motion.h1>

					<motion.p
						variants={fadeInUp}
						className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
					>
						Go Reserve is the official room reservation system for Faculty of
						Computer Science, Universitas Brawijaya. Find and book labs, seminar
						rooms, and meeting spaces in just a few clicks.
					</motion.p>

					<motion.div
						variants={fadeInUp}
						className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
					>
						<Link to="/login">
							<Button size="lg" className="gap-2 px-8">
								Get Started
								<ArrowRightIcon className="h-4 w-4" />
							</Button>
						</Link>
						<Link to="/services">
							<Button size="lg" variant="outline" className="gap-2">
								<BuildingIcon className="h-4 w-4" />
								View Rooms
							</Button>
						</Link>
					</motion.div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.5 }}
					className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4"
				>
					{stats.map((stat) => (
						<div key={stat.label} className="text-center">
							<p className="text-3xl font-bold text-primary lg:text-4xl">
								{stat.value}
							</p>
							<p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
						</div>
					))}
				</motion.div>
			</section>

			<section className="bg-card/50 py-24">
				<div className="container mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mx-auto max-w-2xl text-center"
					>
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
							Everything You Need
						</h2>
						<p className="mt-4 text-muted-foreground">
							Go Reserve provides all the tools you need to manage your room
							reservations efficiently.
						</p>
					</motion.div>

					<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								whileHover={{ y: -5 }}
								className="rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
							>
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
									<feature.icon className="h-6 w-6" />
								</div>
								<h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
								<p className="mt-2 text-sm text-muted-foreground">
									{feature.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<section className="py-24">
				<div className="container mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mx-auto max-w-2xl text-center"
					>
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
							What People Say
						</h2>
						<p className="mt-4 text-muted-foreground">
							See what our users have to say about Go Reserve.
						</p>
					</motion.div>

					<div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={testimonial.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="rounded-2xl border bg-card p-6"
							>
								<div className="flex gap-1">
									{[...Array(5)].map((_, i) => (
										<StarIcon
											key={i.toString()}
											className="h-4 w-4 fill-yellow-400 text-yellow-400"
										/>
									))}
								</div>
								<p className="mt-4 text-sm text-muted-foreground">
									"{testimonial.content}"
								</p>
								<div className="mt-4 flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
										{testimonial.avatar}
									</div>
									<div>
										<p className="font-medium">{testimonial.name}</p>
										<p className="text-xs text-muted-foreground">
											{testimonial.role}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-card/50 py-24">
				<div className="container mx-auto px-6">
					<div className="mx-auto max-w-5xl">
						<div className="grid items-center gap-12 lg:grid-cols-2">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, amount: 0.5 }}
							>
								<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
									Why Choose Go Reserve?
								</h2>
								<p className="mt-4 text-muted-foreground">
									Designed specifically for FILKOM UB community, Go Reserve
									simplifies the room booking process.
								</p>
								<div className="mt-8 grid gap-4 sm:grid-cols-2">
									{[
										'Real-time room availability',
										'Easy-to-use booking interface',
										'Instant status notifications',
										'Comprehensive room details',
										'Mobile-friendly design',
										'Secure & reliable system',
									].map((benefit) => (
										<div key={benefit} className="flex items-center gap-3">
											<div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
												<CheckIcon className="h-3.5 w-3.5 text-primary" />
											</div>
											<span className="text-sm">{benefit}</span>
										</div>
									))}
								</div>
								<div className="mt-8">
									<Link to="/about">
										<Button variant="outline" className="gap-2">
											Learn More
											<ArrowRightIcon className="h-4 w-4" />
										</Button>
									</Link>
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, amount: 0.5 }}
								className="relative"
							>
								<div className="aspect-square overflow-hidden rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 p-8">
									<div className="flex h-full flex-col justify-center gap-4">
										<div className="rounded-xl bg-card p-4 shadow-lg">
											<p className="text-sm font-medium">Lab Komputer 1</p>
											<p className="text-xs text-muted-foreground">
												<span className="text-primary">Available •</span> 40
												seats
											</p>
										</div>
										<div className="ml-8 rounded-xl bg-card p-4 shadow-lg">
											<p className="text-sm font-medium">Ruang Seminar A</p>
											<p className="text-xs text-muted-foreground">
												<span className="text-primary">Available •</span> 100
												seats
											</p>
										</div>
										<div className="rounded-xl bg-card p-4 shadow-lg">
											<p className="text-sm font-medium">Ruang Rapat 1</p>
											<p className="text-xs text-muted-foreground">
												<span className="text-primary">Available •</span> 20
												seats
											</p>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-24">
				<div className="container mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mx-auto rounded-2xl bg-linear-to-br from-primary to-primary/70 p-8 text-center text-primary-foreground md:p-12"
					>
						<h2 className="text-2xl font-bold sm:text-3xl">
							Ready to Book Your First Room?
						</h2>
						<p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
							Join hundreds of students and faculty members who use Go Reserve
							for their room bookings.
						</p>
						<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
							<Link to="/login">
								<Button
									size="lg"
									variant="secondary"
									className="gap-2 text-primary"
								>
									Create Account
									<ArrowRightIcon className="h-4 w-4" />
								</Button>
							</Link>
							<Link to="/contact">
								<Button
									size="lg"
									variant="ghost"
									className="text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
								>
									Contact Us
								</Button>
							</Link>
						</div>
					</motion.div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
