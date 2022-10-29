import Page from "@/components/Page";
import { useGetBlogByIdQuery } from "@/sections/admin/blogs/blogSlice";

import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function BlogDetail() {

    const { _id } = useParams()
    const {data : blog} = useGetBlogByIdQuery(_id)
    const { title = '', video = '', desc = '', createdAt } = blog || {}
    return (
        <Page title='Blog'>
            <Container>
                <Box component='iframe' src={`https://www.youtube.com/embed/${video}`} sx={{width: '100%', height: 500}} />
                <Typography variant="h5">Tiêu đề: {title}</Typography>
                <Typography gutterBottom >
                    Ngày đăng: {createdAt}
                </Typography>
                <Typography>Mô tả: {desc}</Typography>
            </Container>
        </Page>
    );
}

export default BlogDetail;