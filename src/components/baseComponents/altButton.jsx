import { Button } from '@mui/material';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
const AltButton = () =>{
    console.log("uou see me");
    return(
        <>
            <Button
                startIcon={<VpnKeyOutlinedIcon/>}
            sx ={{
                    width: '85px',
                    height: '44px',
                    p: '8px',
                    gap: '4px',
                    backgroundColor: '#66CCFF',
                    '&hover':{
                        bgcolor: '#99DDFF',
                    },
                    my: '20px',
                    ml: '20px',
                }}
            >
                Get
            </Button>
        </>
    );

};

export default AltButton;
