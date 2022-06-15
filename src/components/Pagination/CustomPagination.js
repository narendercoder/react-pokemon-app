import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const darkTheme = createTheme({
    palette:{
        type: "dark"
    }
})
function CustomPagination({setPage,numOfPages = 57}) {
    const handlePageChange =(page)=>{
        setPage(page);
        window.scroll(0,0);
    };

  return (
    <div style={{
        width:"100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
    }}>
    <ThemeProvider theme={darkTheme}>
        <Pagination count={numOfPages} 
        onChange={(e)=>handlePageChange(e.target.textContent)} 
        hideNextButton
        hidePrevButton
        color="primary"
        size='large'
        />
    </ThemeProvider>
    </div>
  )
}
export default CustomPagination;