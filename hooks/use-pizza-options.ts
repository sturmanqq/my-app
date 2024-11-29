import { IVariant } from "@/components/shared/group-variants";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { getAvailablePizzaSizes } from "@/lib";
import { ProductItem } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface IReturnProps {
    size: PizzaSize;
    type: PizzaType;
    availableSizes: IVariant[];
    selectedIngredients: Set<number>;
    setSize: (size: PizzaSize) => void;
    setType: (type: PizzaType) => void;
    addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): IReturnProps => {

    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);

    const [selectedIngredients, { toggle: addIngredient }] = useSet(
        new Set<number>([])
    );

    const availableSizes = getAvailablePizzaSizes(type, items);
    
    useEffect(() => {
        const isAvailableSize = availableSizes?.find(
            (item) => Number(item.value) === size && !item.disabled
        );

        const availableSize = availableSizes?.find((item) => !item.disabled)

        if(!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type])

    return {
        size,
        type,
        selectedIngredients,
        availableSizes,
        setSize,
        setType,
        addIngredient,
    }
}