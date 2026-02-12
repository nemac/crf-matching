import { Button,Typography} from '@mui/material';

const AltActionButton= props =>{
    const {text,textSx} = props
    return (
        <>
            <Button
                sx={{
                    width: 'auto',
                    height: '37px',
                    pt: '8px',
                    pb: '8px',
                    backgroundColor: '#66CCFF',
                    '&:hover' :{
                        bgcolor: '#99DDFF',
                    },
                }}
            >
                <Typography sx = {textSx}>
                    {text ?? "Nan"}
                </Typography>

            </Button>
        </>
    ); 
};
export default AltActionButton;
