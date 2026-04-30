import { Loader2Icon, LockIcon, MailIcon } from 'lucide-react';
import { useLoginForm } from '@/features/auth/hooks/use-login-form';
import { Button } from '@/shadcn/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shadcn/card';
import { Field, FieldLabel } from '@/shadcn/field';
import { Input } from '@/shadcn/input';

export function LoginForm() {
	const { isLoading, error, handleSubmit } = useLoginForm();

	return (
		<Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur-xl">
			<CardHeader className="space-y-1 text-center pb-2">
				<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-8 w-8 text-primary-foreground"
					>
						<title>ka</title>
						<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
						<polyline points="9 22 9 12 15 12 15 22" />
					</svg>
				</div>
				<CardTitle className="text-2xl font-bold tracking-tight">
					Welcome Back
				</CardTitle>
				<CardDescription className="text-muted-foreground">
					Sign in to Go Reserve - FILKOM UB Room Reservation System
				</CardDescription>
			</CardHeader>
			<CardContent className="pt-4">
				<form onSubmit={handleSubmit} className="space-y-4">
					{error && (
						<div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
							{error}
						</div>
					)}

					<Field>
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<div className="relative">
							<MailIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="you@filkom.ub.ac.id"
								required
								className="pl-10"
								autoComplete="email"
							/>
						</div>
					</Field>

					<Field>
						<FieldLabel htmlFor="password">Password</FieldLabel>
						<div className="relative">
							<LockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="Enter your password"
								required
								className="pl-10"
								autoComplete="current-password"
							/>
						</div>
					</Field>

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
								Signing in...
							</>
						) : (
							'Sign In'
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
