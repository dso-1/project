import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { FloatingNavbar } from '@/shared/components/floating-navbar';
import { Footer } from '@/shared/components/footer';
import { Button } from '@/shadcn/button';
import { Badge } from '@/shadcn/badge';
import {
	DoorOpenIcon,
	UsersIcon,
	ArrowRightIcon,
	CheckIcon,
} from 'lucide-react';

interface Room {
	id: string;
	name: string;
	capacity: number;
	location: string | null;
	facilities: string[];
	description: string | null;
	image: string | null;
}
// I'll assume that exists, otherwise I'll need to define it or import from prisma.

// For now, let's define the props interface clearly.

const bookingSteps = [
	{
		step: 1,
		title: 'Browse Rooms',
		description: 'Explore available rooms and check their facilities',
	},
	{
		step: 2,
		title: 'Select Date & Time',
		description: 'Choose your preferred booking slot',
	},
	{
		step: 3,
		title: 'Submit Request',
		description: 'Fill in the purpose and submit for approval',
	},
	{
		step: 4,
		title: 'Get Approved',
		description: 'Receive confirmation and booking details',
	},
];

interface ServicesPageProps {
	rooms: Room[];
	// Re-checking imports from original file: "import { getAvailableRoomsFn, getRoomStatsFn } from '@/features/rooms/api/rooms.api';"
	// It didn't explicitly import a Room type.
	stats: {
		total: number;
		available: number;
		maintenance: number;
	};
}

export function ServicesPage({ rooms, stats }: ServicesPageProps) {
	return (
		<div className="min-h-screen bg-background">
			<FloatingNavbar />

			<section className="container mx-auto px-6 py-16 lg:py-24">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mx-auto max-w-3xl text-center"
				>
					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
						Our Rooms & Services
					</h1>
					<p className="mt-6 text-lg text-muted-foreground">
						Discover the variety of rooms available for booking at FILKOM UB.
						From computer labs to seminar halls, we have spaces for every need.
					</p>
					<div className="mt-6 flex justify-center gap-4 text-sm">
						<Badge variant="outline" className="text-base px-4 py-2">
							<DoorOpenIcon className="mr-2 h-4 w-4" />
							{stats.total} Total Rooms
						</Badge>
						<Badge className="bg-green-500/20 text-green-700 text-base px-4 py-2">
							{stats.available} Available
						</Badge>
					</div>
				</motion.div>
			</section>

			<section className="bg-card/50 py-16">
				<div className="container mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mx-auto max-w-2xl text-center"
					>
						<h2 className="text-3xl font-bold">How It Works</h2>
						<p className="mt-4 text-muted-foreground">
							Book a room in just four simple steps.
						</p>
					</motion.div>

					<div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{bookingSteps.map((item, index) => (
							<motion.div
								key={item.step}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="relative rounded-xl border bg-card p-6 text-center"
							>
								<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
									{item.step}
								</div>
								<h3 className="mt-4 font-semibold">{item.title}</h3>
								<p className="mt-2 text-sm text-muted-foreground">
									{item.description}
								</p>
							</motion.div>
						))}
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
						<h2 className="text-3xl font-bold">Available Rooms</h2>
						<p className="mt-4 text-muted-foreground">
							Browse our selection of {rooms.length} available rooms.
						</p>
					</motion.div>

					<div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{rooms.map((room, index) => (
							<motion.div
								key={room.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.05 }}
								whileHover={{ y: -5 }}
								className="overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg"
							>
								<div className="flex h-32 items-center justify-center bg-linear-to-br from-primary/20 to-primary/5">
									<DoorOpenIcon className="h-12 w-12 text-primary/50" />
								</div>

								<div className="p-4">
									<div className="flex items-start justify-between">
										<h3 className="font-semibold">{room.name}</h3>
										<Badge className="bg-green-500/20 text-green-700 text-xs">
											Available
										</Badge>
									</div>

									<p className="mt-1 text-sm text-muted-foreground">
										{room.location || 'FILKOM UB'}
									</p>

									<div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
										<UsersIcon className="h-4 w-4" />
										<span>{room.capacity} seats</span>
									</div>

									<div className="mt-3 flex flex-wrap gap-1">
										{room.facilities.slice(0, 3).map((facility: string) => (
											<Badge
												key={facility}
												variant="outline"
												className="text-xs"
											>
												{facility}
											</Badge>
										))}
										{room.facilities.length > 3 && (
											<Badge variant="outline" className="text-xs">
												+{room.facilities.length - 3}
											</Badge>
										)}
									</div>
								</div>
							</motion.div>
						))}
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mt-12 text-center"
					>
						<Link to="/login">
							<Button size="lg" className="gap-2">
								Book a Room Now
								<ArrowRightIcon className="h-4 w-4" />
							</Button>
						</Link>
					</motion.div>
				</div>
			</section>

			<section className="bg-card/50 py-16">
				<div className="container mx-auto px-6">
					<div className="mx-auto max-w-4xl">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-center"
						>
							<h2 className="text-3xl font-bold">Booking Guidelines</h2>
							<p className="mt-4 text-muted-foreground">
								Please read and follow these guidelines when booking rooms.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="mt-12 grid gap-4 md:grid-cols-2"
						>
							{[
								'Bookings must be made at least 24 hours in advance',
								'Maximum booking duration is 4 hours per session',
								'Cancellations should be made 12 hours before the scheduled time',
								'Room usage is free for academic purposes',
								'Equipment damage must be reported immediately',
								'Leave the room clean and organized after use',
								'Food and drinks are not allowed in computer labs',
								'Respect other users and maintain quiet in study areas',
							].map((rule, index) => (
								<div key={index.toString()} className="flex items-start gap-3">
									<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
										<CheckIcon className="h-3.5 w-3.5 text-primary" />
									</div>
									<span className="text-sm">{rule}</span>
								</div>
							))}
						</motion.div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
