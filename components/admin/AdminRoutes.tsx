"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRoutesProps = {
    link: {
        url: string;
        text: string;
        blank: boolean;
    }
}

export default function AdminRoutes({link}: AdminRoutesProps) {
  const pathName = usePathname()
  const isActive = pathName.startsWith(link.url)
  return (
    <Link
        className={`${isActive ? 'bg-amber-400' : ''} font-bold text-lg border-t  border-gray-200 p-3 last-of-type:border-b`}
        href={link.url}
        target={link.blank ? '_blank': ''}
    >
    {link.text}
    </Link>
  )
}
