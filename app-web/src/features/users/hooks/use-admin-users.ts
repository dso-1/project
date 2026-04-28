import * as React from 'react';
import { updateUserRoleFn, deleteUserFn } from '@/features/users/api/users.api';

interface User {
	id: string;
	name: string;
	email: string;
	nim: string | null;
	role: string;
	createdAt: string | Date;
	_count: { reservations: number };
}

interface Stats {
	total: number;
	admins: number;
	students: number;
}

export function useAdminUsers(initialUsers: User[], initialStats: Stats) {
	const [users, setUsers] = React.useState(initialUsers);
	const [stats, setStats] = React.useState(initialStats);
	const [searchQuery, setSearchQuery] = React.useState('');
	const [roleFilter, setRoleFilter] = React.useState<string>('ALL');
	const [loadingId, setLoadingId] = React.useState<string | null>(null);

	const filteredUsers = users.filter((user) => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.nim?.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
		return matchesSearch && matchesRole;
	});

	const handleRoleChange = async (
		userId: string,
		newRole: 'ADMIN' | 'MAHASISWA',
	) => {
		setLoadingId(userId);
		try {
			await updateUserRoleFn({ data: { id: userId, role: newRole } });
			setUsers((prev) =>
				prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)),
			);
			if (newRole === 'ADMIN') {
				setStats((prev) => ({
					...prev,
					admins: prev.admins + 1,
					students: prev.students - 1,
				}));
			} else {
				setStats((prev) => ({
					...prev,
					admins: prev.admins - 1,
					students: prev.students + 1,
				}));
			}
		} catch (err) {
			console.error('Update role error:', err);
		} finally {
			setLoadingId(null);
		}
	};

	const handleDelete = async (userId: string, userName: string) => {
		if (
			!confirm(
				`Are you sure you want to delete "${userName}"? This will also delete all their reservations.`,
			)
		) {
			return;
		}

		setLoadingId(userId);
		try {
			const userToDelete = users.find((u) => u.id === userId);
			await deleteUserFn({ data: userId });
			setUsers((prev) => prev.filter((u) => u.id !== userId));
			if (userToDelete?.role === 'ADMIN') {
				setStats((prev) => ({
					...prev,
					total: prev.total - 1,
					admins: prev.admins - 1,
				}));
			} else {
				setStats((prev) => ({
					...prev,
					total: prev.total - 1,
					students: prev.students - 1,
				}));
			}
		} catch (err) {
			console.error('Delete user error:', err);
		} finally {
			setLoadingId(null);
		}
	};

	return {
		users,
		stats,
		searchQuery,
		setSearchQuery,
		roleFilter,
		setRoleFilter,
		loadingId,
		filteredUsers,
		handleRoleChange,
		handleDelete,
	};
}
