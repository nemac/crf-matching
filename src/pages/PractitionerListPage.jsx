import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchAllPractitioners } from '../util/api';
import FullPageSpinner from '../components/FullPageSpinner';

function PractitionersPageLoaded({ practitioners }) {
  return (
    <div
      style={{
        width: '60vw',
        margin: 'auto',
      }}
    >
      <div>
        <h1>CRF Practitioner Directory</h1>
        <TableContainer component={Paper}>
          <Table aria-label="practitioners table">
            <TableHead>
              <TableRow>
                <TableCell>Organization</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {practitioners.map((practitioner, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    <a href={`#/practitioner/${practitioner.id}`}>{practitioner.org}</a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

function PractitionerListPage() {
  const [allPractitioners, setAllPractitioners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        await fetchAllPractitioners(setAllPractitioners);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  return <PractitionersPageLoaded practitioners={allPractitioners} />;
}

export default PractitionerListPage;
