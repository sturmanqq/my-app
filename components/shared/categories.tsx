"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { Category } from "@prisma/client";
import React from "react";

interface IProps {
    items: Category[]
    classname?: string;
}



export const Categories: React.FC<IProps> = ({ items, classname }) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId);

    return (
        <div
            className={cn(
                "inline-flex gap-1 bg-gray-100 p1 rounded-2xl",
                classname
            )}
        >
            {items.map(({ id, name }, index) => (
                <a
                    href={`/#${name}`}
                    key={index}
                    className={cn(
                        "flex items-center font-bold h-11 rounded-2xl px-5",
                        categoryActiveId === id &&
                            "bg-white shadow-md shadow-gray-200 text-primary"
                    )}
                >
                    <button>{name}</button>
                </a>
            ))}
        </div>
    );
};
