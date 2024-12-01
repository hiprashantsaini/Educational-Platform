import React from 'react'
import SearchFilters from '../components/SearchFilters'
import Connections from './Connections'

const ConnectExplore = () => {
  return (
    <div className='w-full sm:w-[95%] xl:w-[1240px] mx-auto'>
       <SearchFilters/>
       <Connections/>
    </div>
  )
}

export default ConnectExplore