"use client";

import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { Input } from "../ui";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { FilterCheckbox } from "./filter-checkbox";
import { RangeSlider } from "./range-slider";
import { Title } from "./title";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface IProps {
    classname?: string;
}

interface IPriceProps {
    priceFrom: number;
    priceTo: number;
}

export const Filters: React.FC<IProps> = ({ classname }) => {
    const { ingredients, loading, onAddId, selectedIngredients } =  useFilterIngredients();

    const [ sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]))
    const [ pizzaTypes, { toggle: toggleizzaTypes }] = useSet(new Set<string>([]))

    const [prices, setPrice] = useState<IPriceProps>({
        priceFrom: 0,
        priceTo: 1000,
    });

    const items = ingredients.map((item) => ({
        value: String(item.id),
        text: item.name,
    }));

    const updatePrice = (name: keyof IPriceProps, value: number) => {
        setPrice({
            ...prices,
            [name]: value,
        });
    };

    useEffect(() => {
        console.log({prices, pizzaTypes, sizes, selectedIngredients})
    }, [ prices, pizzaTypes, sizes, selectedIngredients ])

    return (
        <div className={classname}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

            <CheckboxFiltersGroup
                title="Тип теста"
                name="pizzaTypes"
                className="mb-5"
                onClickCheckbox={toggleizzaTypes}
                selected={pizzaTypes}
                items={[
                    { text: "Тонкое", value: "1" },
                    { text: "Традиционное", value: "2" },
                ]}
            />

            <CheckboxFiltersGroup
                title="Размеры"
                name="sizes"
                className="mb-5"
                onClickCheckbox={toggleSizes}
                selected={sizes}
                items={[
                    { text: "20 см", value: "20" },
                    { text: "30 см", value: "30" },
                    { text: "40 см", value: "40" },
                ]}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={30000}
                        value={String(prices.priceFrom)}
                        onChange={(e) =>
                            updatePrice("priceFrom", Number(e.target.value))
                        }
                    />
                    <Input
                        type="number"
                        min={100}
                        max={30000}
                        placeholder="30000"
                        value={String(prices.priceTo)}
                        onChange={(e) =>
                            updatePrice("priceTo", Number(e.target.value))
                        }
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[prices.priceFrom, prices.priceTo]}
                    onValueChange={([priceFrom, priceTo]) =>
                        setPrice({ priceFrom, priceTo })
                    }
                />
            </div>

            <CheckboxFiltersGroup
                className="mt-5"
                name="ingredients"
                title="Формат"
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={onAddId}
                selected={selectedIngredients}
            />
        </div>
    );
};
