type NavItems = {
    label: string,
    href: string,
    target: string
}

const NavItems: Array<NavItems> = [
    //{
    //    label: 'Logo',
    //    href: '#',
    //},
    //{
    //    label: 'About Us',
    //    href: '/aboutus'
    //}
    {
         label: 'Home',
         href: '/',
         target: ""
    },
    // {
    //     label: 'About',
    //     href: '/about',
    // },
    //{
    //     label: 'Launch',
    //     href: '/app',
    //},
    {
         label: 'Need crypto?',
         href: '/transak',
         target: ""
    },
    {
         label: 'Bridge',
         href: '/bridge',
         target: ""
    },
    {
        label: 'Blog',
        href: 'https://medium.com/gammaswap-labs',
        target: "_blank"
    }
];

export default NavItems