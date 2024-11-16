import { cn } from "@/lib/utils"
import { Categories } from "./categories"
import { Container } from "./container"
import { SortPopup } from "./sort-popup"
import { Category } from "@prisma/client"
import { categories } from "@/prisma/constants"


interface IProps {
    categories: Category[],
    classname?: string, 
}

export const TopBar: React.FC<IProps> = ({ categories, classname }) => {
    return (
        <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', classname)}>
            <Container className='flex items-center justify-between'>
                <Categories items={categories}/>
                <SortPopup/>
            </Container>
        </div>
    )
}