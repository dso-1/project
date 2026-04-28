import * as React from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { cn } from '@/shared/utils';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Button } from '@/shadcn/button';
import {
	LayoutDashboardIcon,
	DoorOpenIcon,
	CalendarIcon,
	HistoryIcon,
	UsersIcon,
	LogOutIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	XIcon,
} from 'lucide-react';

interface NavItem {
	label: string;
	href: string;
	icon: React.ElementType;
	adminOnly?: boolean;
	studentOnly?: boolean;
}

const navItems: NavItem[] = [
	{
		label: 'Dashboard',
		href: '/admin',
		icon: LayoutDashboardIcon,
		adminOnly: true,
	},
	{
		label: 'Dashboard',
		href: '/student',
		icon: LayoutDashboardIcon,
		studentOnly: true,
	},
	{ label: 'Rooms', href: '/admin/rooms', icon: DoorOpenIcon, adminOnly: true },
	{
		label: 'Browse Rooms',
		href: '/student/rooms',
		icon: DoorOpenIcon,
		studentOnly: true,
	},
	{
		label: 'Reservations',
		href: '/admin/reservations',
		icon: CalendarIcon,
		adminOnly: true,
	},
	{
		label: 'My Bookings',
		href: '/student/history',
		icon: HistoryIcon,
		studentOnly: true,
	},
	{ label: 'Users', href: '/admin/users', icon: UsersIcon, adminOnly: true },
];

interface SidebarProps {
	collapsed?: boolean;
	onToggle?: () => void;
	isMobile?: boolean;
}

export function Sidebar({
	collapsed = false,
	onToggle,
	isMobile = false,
}: SidebarProps) {
	const { user, logout } = useAuth();
	const location = useLocation();
	const isAdmin = user?.role === 'ADMIN';

	const filteredNavItems = navItems.filter((item) => {
		if (item.adminOnly && !isAdmin) return false;
		if (item.studentOnly && isAdmin) return false;
		return true;
	});

	const handleNavClick = () => {
		if (isMobile && onToggle) {
			onToggle();
		}
	};

	return (
		<aside
			className={cn(
				'flex flex-col border-r bg-card transition-all duration-300',
				isMobile ? 'h-full shadow-xl' : 'fixed left-0 top-0 z-40 h-screen',
				collapsed ? 'w-[72px]' : 'w-64',
			)}
		>
			<div className="flex h-16 items-center justify-between border-b px-4">
				{!collapsed && (
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
							<DoorOpenIcon className="h-4 w-4 text-primary-foreground" />
						</div>
						<span className="font-bold text-lg">Go Reserve</span>
					</div>
				)}
				<Button
					variant="ghost"
					size="icon"
					onClick={(e) => {
						e.stopPropagation();
						onToggle?.();
					}}
					className={cn('shrink-0', collapsed && 'mx-auto')}
				>
					{isMobile ? (
						<XIcon className="h-4 w-4" />
					) : collapsed ? (
						<ChevronRightIcon className="h-4 w-4" />
					) : (
						<ChevronLeftIcon className="h-4 w-4" />
					)}
				</Button>
			</div>

			{/* Navigation */}
			<nav className="flex-1 overflow-y-auto p-3">
				<ul className="space-y-1">
					{filteredNavItems.map((item) => {
						const isActive = location.pathname === item.href;
						return (
							<li key={item.href}>
								<Link
									to={item.href}
									onClick={handleNavClick}
									className={cn(
										'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
										isActive
											? 'bg-primary text-primary-foreground'
											: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
										collapsed && 'justify-center px-2',
									)}
								>
									<item.icon className="h-5 w-5 shrink-0" />
									{!collapsed && <span>{item.label}</span>}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>

			<div className="border-t p-3">
				{user && (
					<div
						className={cn(
							'mb-3 rounded-lg bg-accent/50 p-3',
							collapsed && 'p-2',
						)}
					>
						{!collapsed ? (
							<>
								<p className="font-medium text-sm truncate">{user.name}</p>
								<p className="text-xs text-muted-foreground truncate">
									{user.email}
								</p>
								<span
									className={cn(
										'mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium',
										isAdmin
											? 'bg-primary/20 text-primary'
											: 'bg-blue-500/20 text-blue-600',
									)}
								>
									{isAdmin ? 'Admin' : 'Mahasiswa'}
								</span>
							</>
						) : (
							<div className="flex justify-center">
								<div
									className={cn(
										'h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold',
										isAdmin
											? 'bg-primary text-primary-foreground'
											: 'bg-blue-500 text-white',
									)}
								>
									{user.name.charAt(0).toUpperCase()}
								</div>
							</div>
						)}
					</div>
				)}
				<Button
					variant="destructive"
					className={cn(
						'w-full justify-start gap-3',
						collapsed && 'justify-center px-2',
					)}
					onClick={logout}
				>
					<LogOutIcon className="h-5 w-5" />
					{!collapsed && <span>Sign Out</span>}
				</Button>
			</div>
		</aside>
	);
}
