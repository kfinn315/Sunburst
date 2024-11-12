import './App.css'

import { useCallback, useState } from 'react'

import FlatDataSunburst from './Components/FlatDataSunburst/FlatDataSunburst'
import HierarchicalDataSunburst from './Components/HierarchicalDataSunburst/HierarchicalDataSunburst'
import { CemeteryDataProvider, LiveCemeterySunburst } from "./Components/LiveCemeterySunburst"
import { DataProvider, SunburstItemNode } from './sunburstLibrary'

function App() {
  const [dataProvider, setDataProvider] = useState<DataProvider<SunburstItemNode>>(new CemeteryDataProvider())

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const arcClickHandler = useCallback((e: MouseEvent, d): void => {
    setDataProvider(new CemeteryDataProvider({ id: Math.round(Math.random() * 100) }))
  }, [])

  return (
    <div>
      <h1>Sunburst Demos</h1>
      <div className="content">
        <h2>Cemetery Sunburst</h2>
        <LiveCemeterySunburst
          dataProvider={dataProvider}
          onArcClick={arcClickHandler}
          onMouseEnter={(e, d) => { console.log(d.data) }}
        />
      </div>
      <div className="content">
        <h2>Flat Data Demo</h2>
        <FlatDataSunburst />
      </div>
      <div className="content">
        <h2>Hierarchical Data Demo</h2>
        <HierarchicalDataSunburst />
      </div>
    </div>
  )
}

export default App
