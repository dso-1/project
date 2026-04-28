import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { DoorOpenIcon } from 'lucide-react';
import { LoginForm } from './login-form';

export function LoginPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-background to-primary/5 px-4">
			<div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
				<div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
				<div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md"
			>
				<Link to="/" className="mb-8 flex items-center justify-center gap-2">
					<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/70 shadow-lg">
						<DoorOpenIcon className="h-6 w-6 text-primary-foreground" />
					</div>
					<span className="text-2xl font-bold">Go Reserve</span>
				</Link>

				<LoginForm />

				<p className="mt-6 text-center text-xs text-muted-foreground">
					<Link to="/" className="hover:text-foreground">
						← Back to Home
					</Link>
				</p>
			</motion.div>
		</div>
	);
}
