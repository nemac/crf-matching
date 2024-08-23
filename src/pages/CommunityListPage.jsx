// styles
import styles from '../styles'

// react
import { useState, useEffect } from 'react'

// material UI 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// API 
import { fetchAllCommunities } from '../util/api'

// components
import FullPageSpinner from '../components/FullPageSpinner';


function CommunitiesPageLoaded({ communities }) {
  return (
    <div
      style={{
        width: '60vw',
        margin: 'auto'
      }}
    >
      <div>
        <h1>CRF Community Matching Tool</h1>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Community</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {communities.map((community, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <a
                        href={ `#/community/${community.id}`}
                      >{ community.name }</a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

function CommunityListPage() {

  const [ allCommunities, setAllCommunities ] = useState([])

  useEffect(() => {
    fetchAllCommunities(setAllCommunities)
  }, [])

  if (allCommunities.length) {
    return (
      <div
        style={{
          ...styles.global,
        }}
      >
        <CommunitiesPageLoaded
          communities={ allCommunities }
        ></CommunitiesPageLoaded>
      </div>
    )
  } else {
    return (
      <FullPageSpinner></FullPageSpinner>
    )
  }



}

export default CommunityListPage