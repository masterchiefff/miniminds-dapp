import Image from 'next/image'
import { Book, Home, Star, Wallet } from 'lucide-react';
import AsideItems from './aside-items';

const menuItems = [
    {
      link: '/dashboard',
      Icon: Home,
      title: 'Dashboard',
      color: 'blue'
    },
    {
        link: '/learn',
        Icon: Book,
        title: 'Learn',
        color: 'green'
    },
    {
        link: '/achievements',
        Icon: Star,
        title: 'Achievements',
        color: 'purple'
    },
    {
        link: '/wallet',
        Icon: Wallet,
        title: 'Wallet',
        color: 'yellow'
    },
];

export default function Aside() {
    return (
        <aside className="w-20 flex flex-col items-center py-8 bg-yellow-300 sticky top-0 h-screen">
            <div className="mb-8">
                <Image src="/placeholder.svg?height=48&width=48" width={48} height={48} alt="Logo" className="rounded-full" />
            </div>
            <nav className="flex flex-col items-center space-y-6 flex-grow justify-center">
                {menuItems.map((menuItem, index) => (
                <AsideItems
                    key={index}
                    link={menuItem.link}
                    Icon={menuItem.Icon}
                    title={menuItem.title}
                    color={menuItem.color}
                />
                ))}
            </nav>
        </aside>
    )
}