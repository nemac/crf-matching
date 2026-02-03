import {Chip} from '@mui/material';

const BroadServiceProvider = () => {
    console.log("awooo");
    return(
        <>
            <Chip
                sx ={{
                    width: '210px',
                    height: '51px',
                    pt: '16px',
                    pr: '24px',
                    pb: '16px',
                    pl : '24px',
                    gap: '4px',
                    backgroundColor: '#66CCFF',
                    border: 'rounded',
                    borderRadius: '9999px'
                }}
                label ="Border service provider" />    
        </>
    );
};
export default BroadServiceProvider;
