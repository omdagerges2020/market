import React from 'react'
import TopBackground from './PagesHome/TopBackground'
import SeeOurProducts from './PagesHome/SeeOurProducts'
import SeeOurSmartphones from './PagesHome/SeeOurSmartphones'
import SeeOurLaptops from './PagesHome/SeeOurLaptops'
import SeeOurFragrances from './PagesHome/SeeOurFragrances'
import SeeOurSkincare from './PagesHome/SeeOurSkincare'
import SeeOurGroceries from './PagesHome/SeeOurGroceries'
import SeeOurHomeDecoration from './PagesHome/SeeOurHomeDecoration'

const Home = () => {
  return (
    <div className="dark:bg-[#1d2029] bg-white">
        <TopBackground/>
        <SeeOurProducts/>
        <SeeOurSmartphones/>
        <SeeOurLaptops/>
        <SeeOurFragrances/>
        <SeeOurSkincare/>
        <SeeOurGroceries/>
        <SeeOurHomeDecoration/>
    </div>
  )
}
export default Home