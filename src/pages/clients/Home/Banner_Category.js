import { Divider, Typography } from "@mui/material";
import ListCategory from "./ListCategory";

function Banner_Category() {
    return (
        <>
            <Typography variant="h4" align="center">ListCategory</Typography>
            <Divider/>
            <ListCategory />
        </>
    );
}

export default Banner_Category;