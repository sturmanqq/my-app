import { useRouter, useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useState } from "react";

interface IPriceProps {
    priceFrom?: number;
    priceTo?: number;
}

export interface IQueryFilters extends IPriceProps {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export interface IFilters {
    sizes: Set<string>;
    pizzaTypes: Set<string>,
    selectedIngredients: Set<string>;
    prices: IPriceProps;
}

interface IReturnProps {
    setPrices: (name: keyof IPriceProps, value: number) => void;
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
}

export const useFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams() as unknown as Map<
        keyof IQueryFilters,
        string
    >;

    const [ selectedIngredients, { toggle: toggleIngredients } ] = useSet(new Set<string>(
        searchParams.get("ingredients")?.split(",")
    ))  

    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(
            searchParams.get("sizes")
                ? searchParams.get("sizes")?.split(",")
                : []
        )
    );

    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
        new Set<string>(
            searchParams.get("pizzaTypes")
                ? searchParams.get("pizzaTypes")?.split(",")
                : []
        )
    );

    const [prices, setPrices] = useState<IPriceProps>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
    });

    const updatePrice = (name: keyof IPriceProps, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return {
        sizes,
        pizzaTypes,
        selectedIngredients,
        prices,
        setPrices: updatePrice,
        setPizzaTypes: togglePizzaTypes,
        setSizes: toggleSizes,
        setSelectedIngredients: toggleIngredients,
    }
};
