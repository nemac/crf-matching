
import { Typography } from "@mui/material"
import Cell from "./Cell"

export default function Section ({ header='', type, cards, key }) {
  const cardComps = cards.map((label, index) => Cell({ label, type, key: index }))
  return (
    <div key={ key }>
      <Typography
        variant="h5"
        style={{
          minHeight: '25px',
        }}
      ></Typography>
      <h4
        style={{
          minHeight: '20px'
        }}
      >{ header }</h4>
      { cardComps }
    </div>
  )
}

