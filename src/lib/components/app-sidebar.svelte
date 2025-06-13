<script module>
	import AudioWaveformIcon from '@lucide/svelte/icons/audio-waveform';
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import BotIcon from '@lucide/svelte/icons/bot';
	import ChartPieIcon from '@lucide/svelte/icons/chart-pie';
	import CommandIcon from '@lucide/svelte/icons/command';
	import FrameIcon from '@lucide/svelte/icons/frame';
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
	import MapIcon from '@lucide/svelte/icons/map';
	import HouseIcon from '@lucide/svelte/icons/house';
	import Settings2Icon from '@lucide/svelte/icons/settings-2';
	import SquareTerminalIcon from '@lucide/svelte/icons/square-terminal';
	import DumbbellIcon from '@lucide/svelte/icons/dumbbell';
	import LayoutTemplateIcon from '@lucide/svelte/icons/layout-template';
	import * as Drawer from '$lib/components/ui/drawer/index.js';

	export const navMain = [
		{
			title: 'Home',
			url: '#',
			icon: HouseIcon,
			isActive: true,

			items: [
				{ title: 'Daily Snapshot', url: '#' },
				{ title: 'Progress History', url: '#' }
				// { title: 'Settings', url: '#' }
			]
		},
		{
			title: 'Activities',
			url: '#',
			icon: DumbbellIcon,
			items: [
				{ title: 'Log Activity', url: '#' },
				{ title: 'Activity Library', url: '#' },
				{ title: 'New Activity', url: '/activities' }
			]
		},
		{
			title: 'Blocks',
			url: '#',
			icon: LayoutTemplateIcon,
			items: [
				{ title: 'Block Library', url: '/app/blocks' },
				{ title: 'Create Block', url: '/app/blocks/new' },
				{ title: 'Templates', url: '/app/blocks/templates' }
			]
		}
	];

	export const projects = [
		{ name: 'Placeholder', url: '#', icon: FrameIcon },
		{ name: 'Another Placeholder', url: '#', icon: ChartPieIcon },
		{ name: 'More Placeholders', url: '#', icon: MapIcon }
	];

	export const teams = [
		{ name: 'Acme Inc', logo: GalleryVerticalEndIcon, plan: 'Enterprise' },
		{ name: 'Acme Corp.', logo: AudioWaveformIcon, plan: 'Startup' },
		{ name: 'Evil Corp.', logo: CommandIcon, plan: 'Free' }
	];
</script>

<script>
	import NavMain from './nav-main.svelte';
	import NavProjects from './nav-projects.svelte';
	import NavUser from './nav-user.svelte';
	import TeamSwitcher from './team-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { user } from '$stores/user';

	let { ref = $bindable(null), collapsible = 'icon', ...restProps } = $props();
</script>

<Sidebar.Root {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher {teams} />
	</Sidebar.Header>

	<Sidebar.Content>
		<NavMain items={navMain} />
		<NavProjects {projects} />
	</Sidebar.Content>

	<Sidebar.Footer>
		{#if $user}
			<NavUser user={$user} />
		{/if}
	</Sidebar.Footer>

	<Sidebar.Rail />
</Sidebar.Root>
