import {useState, useEffect, useMemo} from 'react'
import { Box, Button, Typography } from "@mui/material"
import dayjs from 'dayjs'

const formatTime = (time) => {
    if (parseInt(time) < 10) {
        return `0${time}`
    }
    return time
}

const TimeTracker = () => {
    const [time, setTime] = useState(dayjs())
    const [startTime, setStartTime] = useState(null)
    useEffect(() => {
        const updateTime = setInterval(() => setTime(dayjs()), 1000)
        return () => clearInterval(updateTime)
    }, [])

    const toggleTime = () => {
        if (!startTime) {
            // Start
            console.log("START")
            setStartTime(dayjs())
        } else {
            // Stop
            console.log("STOP")
            setStartTime(null)
        }
    }

    const currentTime = useMemo(() => {
        if (startTime) {
            const hr = formatTime(Math.abs(startTime.diff(time, 'h') % 24))
            const mm = formatTime(Math.abs(startTime.diff(time, 'm') % 60))
            const ss = formatTime(Math.abs(startTime.diff(time, 's') % 60))
            return `${hr}:${mm}:${ss}`
        }
        return "00:00:00"
    }, [startTime, time])

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={1}>
            <Typography variant="h2">
                {currentTime}
            </Typography>
            <Button variant="contained" onClick={toggleTime}>
                { !startTime ? 'Start time' : 'Stop time'}
            </Button>
            <Typography>
                {time.format("MMM DD, YYYY | HH:MM:ss")}
            </Typography>
        </Box>
    )
}

export default TimeTracker