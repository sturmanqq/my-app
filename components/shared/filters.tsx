"use client";

import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { Input } from "../ui";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { FilterCheckbox } from "./filter-checkbox";
import { RangeSlider } from "./range-slider";
import { Title } from "./title";
import { useState } from "react";

interface IProps {
    classname?: string;
}

interface IPriceProps {
    priceFrom: number;
    priceTo: number;
}

export const Filters: React.FC<IProps> = ({ classname }) => {
    const { ingredients, loading, onAddId, selectedIds } =
        useFilterIngredients();
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

    return (
        <div className={classname}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Можно собирать" value="1" />
                <FilterCheckbox text="Новики" value="2" />
            </div>

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
                    onValueChange={([ priceFrom, priceTo ]) => setPrice({ priceFrom, priceTo })}
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
                selectedIds={selectedIds}
            />
        </div>
    );
};
