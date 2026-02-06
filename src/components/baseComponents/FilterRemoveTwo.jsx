import Chip from '@mui/material/Chip';

const FilterRemoveTwo = () =>{
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };
    return (
        <>
            <Chip 
                sx = {{
                    width: '136px',
                    height: '31px',
                    borderRadius: '9999px',
                    pt: '6px',
                    pr: '14px',
                    pl: '14px',
                    pb: '6px',
                    gap: '9px',
                    backgroundColor: '#FFDDBB',
                    '& .MuiChip-label': {
                        font: 'roboto',
                        fontStyle: 'regular',
                        color: '#2D3F5D',
                        fontWeight: 400,
                        fontSize: 16,
                        overflow: 'visible',
                        textOverflow: 'unset',
                        whiteSpace: 'nowrap',

                    },
                    '& .MuiChip-deleteIcon':{
                        color: '#2D3F5D',
                        borderRadius: '9999px',
                        p: '4px',
                        gap: '10px',
                    },
                }}
                label="Filter Name" onDelete={handleDelete} />
        </>
    );
};

export default FilterRemoveTwo;

