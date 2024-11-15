import { useEffect, useState } from "react";
import { CemeteryAPI } from "../../Services/CemeteryDataProvider/CemeteryAPI";
import { Cemetery } from "../../Services/CemeteryDataProvider/Types";

interface Props {
    onClick: (item: Cemetery) => void
}

function Cemetery({ data, onClick }: { data: Cemetery, onClick: (item: Cemetery) => void }) {
    return <li><a href='#' onClick={() => { onClick(data) }}>{data.name}</a></li>
}

export function CemeteryList(props: Props) {
    const { onClick } = props;
    const [items, setItems] = useState<Cemetery[]>([])

    const cemeteryAPI = new CemeteryAPI()

    useEffect(() => {
        cemeteryAPI.getAllCemeteries().then((cemeteries) => { setItems(cemeteries) })
    })
    return (
        <ul>
            {items.map(x => <Cemetery key={x.id} data={x} onClick={(item: Cemetery) => { onClick(item) }} />)}
        </ul>
    )
}