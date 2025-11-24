"use client"
import { getAllFraksi } from '@/action/get-list-fraksi';
import FraksiComponent from '@/components/custom/client-component/fraksi-card';
import HeaderPages from '@/components/custom/header-pages'
import { useEffect, useState } from 'react';


const FraksiPage = () => {
  const [ fraksis, setFraksis] = useState([])


  const fetchData = async () => {
    const data = await getAllFraksi()
    setFraksis(data)
  }

  useEffect(() => {
    document.title = 'Fraksi | DPRK WAROPEN',
    fetchData()
  }, [])

  return (
    <>
        <HeaderPages title={"Fraksi-fraksi Dewan Perwakilan Rakyat Kabupaten Waropen"} />
        <FraksiComponent fraksiData={fraksis} />
    </>
  )
}

export default FraksiPage