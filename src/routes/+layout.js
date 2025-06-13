import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function load({ url }) {
	const {
		data: { session }
	} = await supabase.auth.getSession();

	// Return session so children can access it
	return { session };
}
