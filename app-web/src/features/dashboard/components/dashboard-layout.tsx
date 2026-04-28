import type * as React from 'react';
import { cn } from '@/shared/utils';
import { Sidebar } from './sidebar';
import { useStore } from '@tanstack/react-store';
import { uiStore, uiActions } from '@/shared/stores/ui-store';
import { Button } from '@/shadcn/button';
import { MenuIcon } from 'lucide-react';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
	const sidebarCollapsed = useStore(uiStore, (state) => state.sidebarCollapsed);
	const mobileMenuOpen = useStore(uiStore, (state) => state.mobileMenuOpen);

	return (
		<div className="min-h-screen bg-background">
			{!mobileMenuOpen && (
				<div className="fixed left-4 top-4 z-40 lg:hidden">
					<Button
						variant="outline"
						size="icon"
						onClick={uiActions.toggleMobileMenu}
						className="bg-background shadow-lg"
					>
						<MenuIcon className="h-5 w-5" />
					</Button>
				</div>
			)}

			{mobileMenuOpen && (
				<button
					type="button"
					className="fixed inset-0 z-40 bg-black/50 lg:hidden"
					onClick={uiActions.closeMobileMenu}
					aria-label="Close menu"
				/>
			)}

			<div className="hidden lg:block">
				<Sidebar
					collapsed={sidebarCollapsed}
					onToggle={uiActions.toggleSidebar}
				/>
			</div>

			<div
				className={cn(
					'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:hidden',
					mobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
				)}
			>
				<Sidebar
					collapsed={false}
					onToggle={uiActions.closeMobileMenu}
					isMobile
				/>
			</div>

			<main
				className={cn(
					'min-h-screen transition-all duration-300',
					'lg:pl-64',
					sidebarCollapsed && 'lg:pl-[72px]',
				)}
			>
				<div className="container mx-auto px-4 py-6 pt-16 lg:pt-6">
					{children}
				</div>
			</main>
		</div>
	);
}
