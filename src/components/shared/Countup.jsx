import CountUp from 'react-countup';
import React from 'react'

export default function Countup({children}) {
    let number = Number(children);
  return (
    <CountUp end={number} duration={4}   decimals={number % 1 !== 0 ? 1 : 0}>{number}</CountUp>
  )
}
