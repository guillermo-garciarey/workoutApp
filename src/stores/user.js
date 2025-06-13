import { writable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';

export const user = writable(null); // Contains { id, email, name, avatar }

async function loadUser() {
	const {
		data: { session },
		error
	} = await supabase.auth.getSession();

	if (error || !session?.user) {
		user.set(null);
		return;
	}

	const authUser = session.user;

	// Fetch profile
	const { data: profileData, error: profileError } = await supabase
		.from('profiles')
		.select('name, avatar')
		.eq('id', authUser.id)
		.single();

	if (profileError) {
		console.warn('⚠️ No profile found, using fallback info:', profileError.message);
	}

	user.set({
		id: authUser.id,
		email: authUser.email,
		name: profileData?.name ?? authUser.email,
		avatar: profileData?.avatar ?? '/default-avatar.svg'
	});
}

// Auth changes
supabase.auth.onAuthStateChange((_event, session) => {
	if (session?.user) loadUser();
	else user.set(null);
});

export { loadUser };
