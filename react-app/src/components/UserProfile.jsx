import { Box, Typography } from "@mui/material"

const UserProfile = () => {
    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2}>
            <img src="https://placebacon.net/150/150" alt="" style={{borderRadius: '50%', border: '3px solid grey'}}/>
            <Typography variant="h6">
                Template Name
            </Typography>
            <Typography>
                Template Title - Software Dev
            </Typography>
        </Box>
    )
}

export default UserProfile