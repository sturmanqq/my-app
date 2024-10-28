'use client'

import { cn } from "@/lib/utils";
import { Title } from "./title";
import { ProductCart } from "./product-cart";
import { useEffect, useRef } from "react";
import { useIntersection } from 'react-use';
import { useCategoryStore } from "@/store/category";

interface IProps {
    title: string;
    items: any[];
    categoryId?: number;
    className?: string;
    listClassName?: string;
}

export const ProductsGroupList: React.FC<IProps> = ({
    title,
    items,
    categoryId,
    className,
    listClassName,
}) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);  
    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    })

    useEffect(() => {
        if(intersection?.isIntersecting) {
            setActiveCategoryId(categoryId!);
        }
    }, [categoryId, intersection?.isIntersecting, setActiveCategoryId, title])

    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5"/>

            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
               {
                items.map((product) => (
                    <ProductCart
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={product.items[0].price}
                    />
                ))
               } 
            </div>
        </div>
    )
};
