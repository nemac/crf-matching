import {Chip} from '@mui/material';

const SpecialistLabel = () => {
    return(
        <>
            <Chip
                sx ={{
                    width: '119px',
                    '& .MuiChip-label': {
                        overflow: 'visible',
                        textOverflow: 'unset',
                        whiteSpace: 'nowrap',
                    },
                    height: '51px',
                    pt: '16px',
                    pr: '24px',
                    pb: '16px',
                    pl : '24px',
                    gap: '4px',
                    backgroundColor: '#FFDDBB',
                    border: 'rounded',
                    borderRadius: '9999px'
                }}
                label ="Specialist"/>    
        </>
    );
};
export default SpecialistLabel;
