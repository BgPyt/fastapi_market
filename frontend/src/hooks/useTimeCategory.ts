import $ from 'jquery'
import style from '../components/sample/Headers/headers.module.css'

export const useTimeCategory = (
    SetSelectCategory: React.Dispatch<React.SetStateAction<string>>) => {

    function SetTimeOutCategory(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        const spanCategory = $(event.target)
        const startSelect = setTimeout(() => {
            SetSelectCategory(spanCategory.text())}, 500)
        spanCategory.data('TimeOnContainer', startSelect)
    }

    function ClearTimeOutCategory(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        const spanCategory = $(event.target)
        clearTimeout(spanCategory.data('TimeOnContainer'))
    }

    return [SetTimeOutCategory, ClearTimeOutCategory]
}