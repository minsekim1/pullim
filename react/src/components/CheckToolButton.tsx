import React, { useState } from 'react'

function CheckToolButton({setCheckTool}: any) {
  return (
    <button style={{
      width: "100px",
      height: "40px",
      background: "royalblue",
      borderRadius: "5px",
      color: "white",
      fontSize: "11px",
      margin: "3px"
    }}
    onClick={() =>setCheckTool((prev: any) => !prev)}>
      검사툴
    </button>
  )
}

export default CheckToolButton