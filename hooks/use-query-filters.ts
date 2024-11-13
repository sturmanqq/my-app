import { useEffect } from "react";
import { IFilters, IQueryFilters } from "./use-filters";
import { useRouter } from "next/navigation";
import qs from "qs";


export const useQueryFilters = (filters: IFilters) => {
    const router = useRouter();

    useEffect(() => {
        const params = {
            ...filters.prices,
            pizzaTypes: Array.from(filters.pizzaTypes),
            sizes: Array.from(filters.sizes),
            ingredients: Array.from(filters.selectedIngredients),
        };

        const query = qs.stringify(params, { arrayFormat: "comma" });

        router.push(`?${query}`, { scroll: false });
    }, [filters, router]);
}