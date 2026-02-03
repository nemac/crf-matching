import { Button} from '@mui/material';

const AltActionButton= () =>{
    return (
        <>
            <Button
                sx={{
                    width: '92px',
                    height: '37px',
                    pt: '8px',
                    pb: '8px',
                    backgroundColor: '#66CCFF',
                    '&:hover' :{
                        bgcolor: '#99DDFF',
                    },
                }}
            >
                Action
            </Button>
        </>
    ); 
};
export default AltActionButton;
