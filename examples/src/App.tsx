import './App.css'
import FlatDataSunburst from './Components/FlatDataSunburst/FlatDataSunburst'
import HierarchicalDataSunburst from './Components/HierarchicalDataSunburst/HierarchicalDataSunburst'
import LiveCemeterySunburst from './Components/LiveCemeterySunburst/LiveCemeterySunburst'

function App() {

  return (
    <div>
      <h1>Sunburst Demos</h1>
      <div className="content">
        <h2>Flat Data Demo</h2>
        <FlatDataSunburst />
      </div>
      <div className="content">
        <h2>Hierarchical Data Demo</h2>
        <HierarchicalDataSunburst />
      </div>
      <div className="content">
        <h2>Cemetery Sunburst</h2>
        <LiveCemeterySunburst />
      </div>
    </div>
  )
}

export default App
