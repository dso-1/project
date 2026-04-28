import * as React from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/shadcn/button';
import { cn } from '@/shared/utils';
import { DoorOpenIcon, MenuIcon, XIcon } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const navLinks = [
	{ label: 'Home', to: '/' },
	{ label: 'About', to: '/about' },
	{ label: 'Services', to: '/services' },
	{ label: 'Contact', to: '/contact' },
];

export function FloatingNavbar() {
	const [isScrolled, setIsScrolled] = React.useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
	const location = useLocation();
	const { scrollY } = useScroll();
	const isMobile = useIsMobile();

	useMotionValueEvent(scrollY, 'change', (latest) => {
		setIsScrolled(latest > 50);
	});

	return (
		<>
			<motion.nav
				initial={{ width: '100%' }}
				animate={{ width: isScrolled ? (isMobile ? '90%' : '60%') : '100%' }}
				exit={{ width: '100%' }}
				transition={{ duration: 0.2, ease: 'easeOut' }}
				className={cn(
					'fixed left-[50%] -translate-x-[50%] top-0 z-50 transition-all duration-300',
					isScrolled
						? 'mt-4 rounded-2xl w-full border bg-background/80 shadow-lg backdrop-blur-xl mx-auto'
						: mobileMenuOpen
							? 'bg-background shadow-lg'
							: 'bg-background',
				)}
			>
				<div
					className={cn(
						'container mx-auto flex px-6  items-center justify-between transition-all duration-300',
						isScrolled ? 'py-4' : 'py-5',
					)}
				>
					<Link to="/" className="flex items-center gap-2">
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={cn(
								'flex items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/70 shadow-lg transition-all duration-300',
								isScrolled ? 'h-9 w-9' : 'h-10 w-10',
							)}
						>
							<DoorOpenIcon
								className={cn(
									'text-primary-foreground transition-all duration-300',
									isScrolled ? 'h-4 w-4' : 'h-5 w-5',
								)}
							/>
						</motion.div>
						<motion.span
							className={cn(
								'font-bold transition-all duration-300',
								isScrolled ? 'text-lg' : 'text-xl',
							)}
						>
							Go Reserve
						</motion.span>
					</Link>

					<div className="hidden items-center gap-1 md:flex">
						{navLinks.map((link) => {
							const isActive = location.pathname === link.to;
							return (
								<Link key={link.to} to={link.to}>
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className={cn(
											'relative rounded-lg px-4 py-2 text-sm font-medium transition-colors',
											isActive
												? 'text-primary'
												: 'text-muted-foreground hover:text-primary',
										)}
									>
										{link.label}
										{isActive && (
											<motion.div
												layoutId="activeNavIndicator"
												className="absolute inset-0 -z-10 rounded-lg bg-primary/10"
												transition={{
													type: 'spring',
													stiffness: 380,
													damping: 30,
												}}
											/>
										)}
									</motion.div>
								</Link>
							);
						})}
					</div>

					<div className="flex items-center gap-3">
						<Link to="/login" className="hidden md:block">
							<Button
								variant={isScrolled ? 'default' : 'outline'}
								size={isScrolled ? 'sm' : 'default'}
								className="transition-all duration-300"
							>
								Sign In
							</Button>
						</Link>

						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							{mobileMenuOpen ? (
								<XIcon className="h-5 w-5" />
							) : (
								<MenuIcon className="h-5 w-5" />
							)}
						</Button>
					</div>
				</div>

				<motion.div
					initial={false}
					animate={{
						height: mobileMenuOpen ? 'auto' : 0,
						opacity: mobileMenuOpen ? 1 : 1,
					}}
					transition={{ duration: 0.2 }}
					className="overflow-hidden md:hidden"
				>
					<div className="border-t px-6 py-4">
						<div className="flex flex-col gap-2">
							{navLinks.map((link) => {
								const isActive = location.pathname === link.to;
								return (
									<Link
										key={link.to}
										to={link.to}
										onClick={() => setMobileMenuOpen(false)}
										className={cn(
											'rounded-lg px-4 py-3 text-sm font-medium transition-colors',
											isActive
												? 'bg-primary/10 text-primary'
												: 'text-muted-foreground hover:bg-accent hover:text-foreground',
										)}
									>
										{link.label}
									</Link>
								);
							})}
							<Link to="/login" onClick={() => setMobileMenuOpen(false)}>
								<Button className="mt-2 w-full">Sign In</Button>
							</Link>
						</div>
					</div>
				</motion.div>
			</motion.nav>
			<div
				className={cn(
					'transition-all duration-300',
					isScrolled ? 'h-10' : 'h-12',
				)}
			/>
		</>
	);
}
