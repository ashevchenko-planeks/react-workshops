export const BASE_ROUTES = {
    explore: {
        title: 'Explore',
        route: '/videos'
    },
    profile: {
        title: 'Profile',
        route: '/profile'
    }
}
export const ADMIN_ROUTES = {
    ...BASE_ROUTES,
    workshop: {
        title: 'Workshop',
        route: '/workshop'
    }
}
