import { cn } from "@/lib/utils"
import { ArrowUpDown } from "lucide-react"


interface IProps {
    classname?: string,
}

export const SortPopup: React.FC<IProps> = ({ classname }) => {
    return (
        <div className={cn(
            'inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer', 
            classname
        )}>
            <ArrowUpDown size={16}/>
            <b>Сортировка</b>
            <b className='text-primary'>популярное</b>
        </div>
    )
}