import './App.css'

// import FlatDataSunburst from './Components/FlatDataSunburst'
// import HierarchicalDataSunburst from './Components/HierarchicalDataSunburst'
import { DataProviderSunburst } from './Components/DataProviderSunburst'
import { CemeteryDataProvider } from './Services/CemeteryDataProvider'
import { CemeteryList } from './Components/CemeteryList/CemeteryList'
import { useState } from 'react'
import { Cemetery } from './Services/CemeteryDataProvider/Types'

function App() {
  const [id, setID] = useState<number | undefined>(undefined)
  const [name, setName] = useState<string | undefined>(undefined)
  return (
    <div style={{ "display": "flex" }}>
      <div>
        <h2>Cemetery Sunburst</h2>
        {name && <h3>{name}</h3>}
        <DataProviderSunburst
          initialID={id}
          dataProvider={new CemeteryDataProvider()}
          onMouseEnter={(e, d) => { console.log(d.data) }}
        />
      </div>
      <div>
        <h2>Cemeteries of Chatham County</h2>
        <CemeteryList onClick={(item: Cemetery) => { setName(item.name); setID(item.id) }} />
      </div>
      {/* <div className="content">
        <h2>Flat Data Demo</h2>
        <FlatDataSunburst />
      </div>
      <div className="content">
        <h2>Hierarchical Data Demo</h2>
        <HierarchicalDataSunburst />
      </div> */}
    </div>
  )
}

export default App
