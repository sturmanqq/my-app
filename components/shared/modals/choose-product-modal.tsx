"use client";

import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";
import { PizzaImage } from "../pizza-image";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { Dialog } from "@/components/ui";
import { DialogContent } from "@/components/ui/dialog";

interface IProps {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<IProps> = ({
    product,
    className,
}) => {
    const router = useRouter();
    const isPizzaForm = Boolean(product.items[0].pizzaType);

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
                    className
                )}
            >
                {isPizzaForm ? (
                    <ChoosePizzaForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        ingredients={product.ingredients}
                        items={product.items}
                    />
                ) : (
                    <ChooseProductForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
