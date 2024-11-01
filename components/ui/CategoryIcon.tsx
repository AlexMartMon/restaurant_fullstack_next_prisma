"use client"
import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({category}: CategoryIconProps) {
  const params = useParams<{slug: string}>()
  return (
    <div className={`${category.slug === params.slug ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-3
        last-of-type:border-b hover:bg-amber-300
    `}>
        <div className="w-16 h-16 relative">
        <Image
           fill
        src={`/icon_${category.slug}.svg`} 
        alt="category image" />
        </div>
        <Link className="text-xl font-bold" href={`/order/${category.slug}`}>{category.name}</Link>
        
    </div>
  )
}
