import { Box, Typography } from "@mui/material"

const UserProfile = () => {
    const user = JSON.parse(localStorage.getItem('token'))
    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2}>
            <img src="https://placedog.net/150/150?random" alt="" style={{borderRadius: '50%', border: '3px solid grey'}}/>
            <Typography variant="h6">
                {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Typography>
                {`${user.email}`}
            </Typography>
        </Box>
    )
}

export default UserProfile