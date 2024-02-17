import { useState, useEffect } from 'react'

import classes from './css/SolutionStatBoxes.module.css'
import SolutionStatBox from './SolutionStatBox'

function SolutionStatBoxes() {
  const [solutionStatsObj, setSolutionStatsObj] = useState({});

  async function getSolutionStats(){
    try{
      const response = await fetch(`${process.env.REACT_APP_ORIGIN}/solution-stats`)
      const data = await response.json()
      setSolutionStatsObj((prevState) => {
        const newState = { ...prevState, ...data }
        sessionStorage.setItem('solutionStatsObj_local', JSON.stringify(newState))
        return newState
      })
      console.log(data)
    }catch(err){
      alert('Something went wrong :(')
      console.log(err)
    }
  }

  useEffect(() => {
    // // dummy data
    // const dummy_obj = {
    //   cpp: 999,
    //   js: 50,
    //   sql: 120
    // }
    // setSolutionStatsObj(dummy_obj)
    // return
    //getSolutionStats()

    if(sessionStorage.getItem('solutionStatsObj_local')){
      setSolutionStatsObj(JSON.parse(sessionStorage.getItem('solutionStatsObj_local')))
    }else{
      getSolutionStats()
    }
  }, [])

  return (
    <div className={classes.statBoxContainer}>
      {
        Object.keys(solutionStatsObj).length > 0 ? (
          <>
            <SolutionStatBox language='CPP' solvedCount={solutionStatsObj.cpp} />
            <SolutionStatBox language='JS'solvedCount={solutionStatsObj.js} />
            <SolutionStatBox language='SQL' solvedCount={solutionStatsObj.sql} />
          </>
        ) : ( <></> )
      }
    </div>
  )
}

export default SolutionStatBoxes