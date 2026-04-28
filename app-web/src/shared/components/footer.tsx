import { Link } from '@tanstack/react-router';
import { DoorOpenIcon } from 'lucide-react';

const footerLinks = {
	product: [
		{ label: 'Features', to: '/services' },
		{ label: 'Pricing', to: '/services' },
		{ label: 'FAQ', to: '/about' },
	],
	company: [
		{ label: 'About', to: '/about' },
		{ label: 'Contact', to: '/contact' },
		{ label: 'Careers', to: '/about' },
	],
	legal: [
		{ label: 'Privacy', to: '/privacy' },
		{ label: 'Terms', to: '/terms' },
	],
};

export function Footer() {
	return (
		<footer className="border-t bg-card/50">
			<div className="container mx-auto px-6 py-12">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					<div className="space-y-4">
						<Link to="/" className="flex items-center gap-2">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/70">
								<DoorOpenIcon className="h-5 w-5 text-primary-foreground" />
							</div>
							<span className="text-xl font-bold">Go Reserve</span>
						</Link>
						<p className="text-sm text-muted-foreground">
							The official room reservation system for Faculty of Computer
							Science, Universitas Brawijaya.
						</p>
					</div>

					<div>
						<h4 className="mb-4 font-semibold">Product</h4>
						<ul className="space-y-2">
							{footerLinks.product.map((link) => (
								<li key={link.label}>
									<Link
										to={link.to}
										className="text-sm text-muted-foreground transition-colors hover:text-foreground"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="mb-4 font-semibold">Company</h4>
						<ul className="space-y-2">
							{footerLinks.company.map((link) => (
								<li key={link.label}>
									<Link
										to={link.to}
										className="text-sm text-muted-foreground transition-colors hover:text-foreground"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="mb-4 font-semibold">Legal</h4>
						<ul className="space-y-2">
							{footerLinks.legal.map((link) => (
								<li key={link.label}>
									<Link
										to={link.to}
										className="text-sm text-muted-foreground transition-colors hover:text-foreground"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} Go Reserve. Faculty of Computer
						Science, Universitas Brawijaya.
					</p>
					<div className="flex gap-4">
						<a
							href="https://filkom.ub.ac.id"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-muted-foreground transition-colors"
						>
							FILKOM UB
						</a>
						<a
							href="https://ub.ac.id"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							Universitas Brawijaya
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
