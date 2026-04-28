import { motion } from 'framer-motion';
import { FloatingNavbar } from '@/shared/components/floating-navbar';
import { Footer } from '@/shared/components/footer';
import { Button } from '@/shadcn/button';
import { Input } from '@/shadcn/input';
import { Textarea } from '@/shadcn/textarea';
import { Field, FieldGroup, FieldLabel } from '@/shadcn/field';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/card';
import {
	MailIcon,
	PhoneIcon,
	MapPinIcon,
	ClockIcon,
	SendIcon,
	Loader2Icon,
} from 'lucide-react';
import { useContactForm } from '../hooks/use-contact-form';

const contactInfo = [
	{
		icon: MailIcon,
		title: 'Email',
		value: 'goreserve@filkom.ub.ac.id',
		description: 'We reply within 24 hours',
	},
	{
		icon: PhoneIcon,
		title: 'Phone',
		value: '+62 341 577 911',
		description: 'Mon-Fri 8am-4pm',
	},
	{
		icon: MapPinIcon,
		title: 'Address',
		value: 'Gedung F FILKOM UB',
		description: 'Jl. Veteran, Malang',
	},
	{
		icon: ClockIcon,
		title: 'Office Hours',
		value: '08:00 - 16:00 WIB',
		description: 'Monday to Friday',
	},
];

const faqItems = [
	{
		question: 'How do I book a room?',
		answer:
			'Login to your account, browse available rooms, select your preferred time slot, and submit your booking request.',
	},
	{
		question: 'How long does approval take?',
		answer:
			'Most bookings are approved within 24 hours. You will receive a notification once your request is processed.',
	},
	{
		question: 'Can I cancel my booking?',
		answer:
			'Yes, you can cancel your booking up to 12 hours before the scheduled time from your dashboard.',
	},
	{
		question: 'Who can use Go Reserve?',
		answer:
			'Go Reserve is available for all FILKOM UB students, faculty, and staff with valid university credentials.',
	},
];

export function ContactPage() {
	const { isSubmitting, submitted, handleSubmit, resetForm } = useContactForm();

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
						Contact Us
					</h1>
					<p className="mt-6 text-lg text-muted-foreground">
						Have questions or feedback? We&apos;d love to hear from you. Reach
						out to us through any of the channels below.
					</p>
				</motion.div>
			</section>

			<section className="bg-card/50 py-16">
				<div className="container mx-auto px-6">
					<div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{contactInfo.map((info, index) => (
							<motion.div
								key={info.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="rounded-xl border bg-card p-6 text-center"
							>
								<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
									<info.icon className="h-6 w-6" />
								</div>
								<h3 className="mt-4 font-semibold">{info.title}</h3>
								<p className="mt-1 text-sm font-medium text-primary">
									{info.value}
								</p>
								<p className="mt-1 text-xs text-muted-foreground">
									{info.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<section className="py-16">
				<div className="container mx-auto px-6">
					<div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
						>
							<Card>
								<CardHeader>
									<CardTitle className="text-2xl">Send us a Message</CardTitle>
								</CardHeader>
								<CardContent>
									{submitted ? (
										<motion.div
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											className="py-8 text-center"
										>
											<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
												<SendIcon className="h-8 w-8 text-green-600" />
											</div>
											<h3 className="mt-4 text-lg font-semibold">
												Message Sent!
											</h3>
											<p className="mt-2 text-muted-foreground">
												Thank you for reaching out. We&apos;ll get back to you
												soon.
											</p>
											<Button
												className="mt-4"
												variant="outline"
												onClick={resetForm}
											>
												Send Another Message
											</Button>
										</motion.div>
									) : (
										<form onSubmit={handleSubmit} className="space-y-4">
											<FieldGroup>
												<div className="grid gap-4 sm:grid-cols-2">
													<Field>
														<FieldLabel htmlFor="name">Name</FieldLabel>
														<Input
															id="name"
															name="name"
															placeholder="Your name"
															required
														/>
													</Field>
													<Field>
														<FieldLabel htmlFor="email">Email</FieldLabel>
														<Input
															id="email"
															name="email"
															type="email"
															placeholder="your@email.com"
															required
														/>
													</Field>
												</div>

												<Field>
													<FieldLabel htmlFor="subject">Subject</FieldLabel>
													<Input
														id="subject"
														name="subject"
														placeholder="How can we help?"
														required
													/>
												</Field>

												<Field>
													<FieldLabel htmlFor="message">Message</FieldLabel>
													<Textarea
														id="message"
														name="message"
														placeholder="Your message..."
														rows={5}
														required
													/>
												</Field>
											</FieldGroup>

											<Button
												type="submit"
												className="w-full gap-2"
												disabled={isSubmitting}
											>
												{isSubmitting ? (
													<>
														<Loader2Icon className="h-4 w-4 animate-spin" />
														Sending...
													</>
												) : (
													<>
														<SendIcon className="h-4 w-4" />
														Send Message
													</>
												)}
											</Button>
										</form>
									)}
								</CardContent>
							</Card>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
						>
							<h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
							<div className="mt-6 space-y-4">
								{faqItems.map((item, index) => (
									<motion.div
										key={index.toString()}
										initial={{ opacity: 0, y: 10 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.1 }}
										className="rounded-lg border bg-card p-4"
									>
										<h3 className="font-semibold">{item.question}</h3>
										<p className="mt-2 text-sm text-muted-foreground">
											{item.answer}
										</p>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			<section className="bg-card/50 py-16">
				<div className="container mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mx-auto max-w-4xl"
					>
						<h2 className="mb-6 text-center text-2xl font-bold">Find Us</h2>
						<div className="aspect-video overflow-hidden rounded-2xl border">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.342857144655!2d112.61376531477985!3d-7.952341994266454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6282f1b494e15%3A0x9e7967f0e4c8e607!2sFakultas%20Ilmu%20Komputer%20Universitas%20Brawijaya!5e0!3m2!1sen!2sid!4v1703747200000!5m2!1sen!2sid"
								width="100%"
								height="100%"
								style={{ border: 0 }}
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								title="FILKOM UB Location"
							/>
						</div>
					</motion.div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
