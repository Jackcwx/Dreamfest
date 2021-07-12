import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Map from '../../components/Map/Map'
import { getUserLocation, getGardenLocations } from './homeHelper'

export default function Home () {
  const [userCoordinates, setUserCoordinates] = useState(null)
  const [gardensCoordinates, setGardensCoordinates] = useState([])
  const [addresses, setAddresses] = useState([])
  const [names, setNames] = useState([])

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getGardenLocations()
      .then(({ gardenCoords, addrs, names }) => {
        setGardensCoordinates(gardenCoords)
        setAddresses(addrs)
        setNames(names)
        return null
      })
  }, [])

  useEffect(() => {
    let mounted = true

    function isMounted () {
      return mounted
    }

    getUserLocation((location) => {
      setUserCoordinates(location)
    }, isMounted)

    // you can return a "clean up" function from useEffect - this runs when
    // the component unmounts
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className='flex-container'>
      <article className='home-container'>
        <p className='item'>Help your community get the most out of your garden with events and reporting and become eligible for government subsidies</p>
        <Link className='button-custom' to='/signin'>Get Started</Link>
      </article>
      <Map
        userCoordinates={userCoordinates}
        coordinates={gardensCoordinates}
        addresses={addresses}
        names={names}
      />
    </section>
  )
}
