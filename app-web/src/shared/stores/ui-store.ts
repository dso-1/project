import { Store } from '@tanstack/store';

interface UIState {
	sidebarCollapsed: boolean;
	theme: 'light' | 'dark' | 'system';
	mobileMenuOpen: boolean;
}

export const uiStore = new Store<UIState>({
	sidebarCollapsed: false,
	theme: 'system',
	mobileMenuOpen: false,
});

export const uiActions = {
	toggleSidebar: () => {
		uiStore.setState((state) => ({
			...state,
			sidebarCollapsed: !state.sidebarCollapsed,
		}));
	},

	setSidebarCollapsed: (collapsed: boolean) => {
		uiStore.setState((state) => ({
			...state,
			sidebarCollapsed: collapsed,
		}));
	},

	setTheme: (theme: UIState['theme']) => {
		uiStore.setState((state) => ({
			...state,
			theme,
		}));
	},

	toggleMobileMenu: () => {
		uiStore.setState((state) => ({
			...state,
			mobileMenuOpen: !state.mobileMenuOpen,
		}));
	},

	closeMobileMenu: () => {
		uiStore.setState((state) => ({
			...state,
			mobileMenuOpen: false,
		}));
	},
};
