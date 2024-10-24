import { cn } from "@/lib/utils"
import { Categories } from "./categories"
import { Container } from "./container"
import { SortPopup } from "./sort-popup"


interface IProps {
    classname?: string, 
}

export const TopBar: React.FC<IProps> = ({ classname }) => {
    return (
        <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', classname)}>
            <Container className='flex items-center justify-between'>
                <Categories/>
                <SortPopup/>
            </Container>
        </div>
    )
}