// src/stores/theme.ts
import { writable } from 'svelte/store';

let initial = 'light';

// Only try to access localStorage in the browser
if (typeof localStorage !== 'undefined') {
	const stored = localStorage.getItem('theme');
	if (stored === 'light' || stored === 'dark') {
		initial = stored;
	}
}

export const theme = writable(initial);

// Update localStorage when store changes
theme.subscribe((value) => {
	if (typeof localStorage !== 'undefined') {
		console.log('[Theme Store] Updating to:', value); // ← Add this
		localStorage.setItem('theme', value);
		document.documentElement.classList.toggle('dark', value === 'dark');
	}
});
