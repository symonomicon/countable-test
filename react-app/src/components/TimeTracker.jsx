import {useState, useEffect, useMemo} from 'react'
import { Box, Button, FormControl, MenuItem, Select, Typography } from "@mui/material"
import axios from 'axios'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

const formatTime = (timeInMs) => {
    const timeInSeconds = timeInMs * 1000
    const hours = dayjs.duration(timeInSeconds).hours()
    const minutes = dayjs.duration(timeInSeconds).minutes()
    const seconds = dayjs.duration(timeInSeconds).seconds()

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const TimeTracker = ({projects}) => {
    const user = JSON.parse(localStorage.getItem('token') || "")
    const [clock, setClock] = useState(dayjs())
    const [startTime, setStartTime] = useState({
        baseTime: null,
        timer: null,
        running: false
    })
    const [elapsedTime, setElapsedTime] = useState(0)
    const [project, setProject] = useState(projects?.[0] || {})

    const date = useMemo(() => clock.format('YYYY-MM-DD'), [clock])

    useEffect(() => {
        axios.get('http://localhost:3000/time', {
                params: {
                    userId: user.id,
                    projectId: project.id,
                    date
                }
            })
            .then(({data}) => {
                const [record] = data
                if (record) {
                    setStartTime({
                        baseTime: +dayjs(record.date),
                        timer: record.time,
                        running: false
                    })
                    setElapsedTime(record.time)
                }
            })

        const updateTime = setInterval(() => setClock(dayjs()), 1000)
        return () => clearInterval(updateTime)
    }, [])

    const toggleTime = async () => {
        if (!startTime.running) {
            const baseTimestamp = +dayjs() // unix timestamp
            setStartTime({
                baseTime: baseTimestamp,
                timer: setInterval(() => setElapsedTime((prev) => prev + 1), 1000),
                running: true
            })
            const existingTime = await axios.get('http://localhost:3000/time', {
                params: {
                    userId: user.id,
                    projectId: project.id,
                    date
                }
            })
            const entry = existingTime?.data[0]
            if (entry) {
                await axios.put('http://localhost:3000/time',{
                    userId: user.id,
                    projectId: project.id,
                    date,
                    time: elapsedTime !== entry.time ? elapsedTime+entry.time : elapsedTime
                })
            } else {
                await axios.post('http://localhost:3000/time',{
                    userId: user.id,
                    projectId: project.id,
                    date
                })
            }
            
        } else {
            setStartTime({
                ...startTime,
                running: false
            })
            await axios.post('http://localhost:3000/time',{
                userId: user.id,
                projectId: project.id,
                date,
                time: elapsedTime
            })
            clearInterval(startTime.timer)
        }
    }

    const currentTime = useMemo(() => {
        return formatTime(elapsedTime)
    }, [elapsedTime])

    const handleProjectChange = (e) => {
        setProject(e.target.value)
    }

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={1}>
            <FormControl sx={{ minWidth: 120, flexDirection: 'row', alignItems: 'center', gap: 2 }} size="small">
                <Typography>
                    Current Project:
                </Typography>
                <Select
                    value={project.name}
                    onChange={handleProjectChange}
                >
                    {
                        projects.map((project) => (
                            <MenuItem key={project.id} value={project.name}>{project.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <Typography variant="h2">
                {currentTime}
            </Typography>
            <Button variant="contained" onClick={toggleTime}>
                { !startTime.running ? 'Start time' : 'Stop time'}
            </Button>
            <Typography>
                {clock.format("MMM DD, YYYY | HH:MM:ss")}
            </Typography>
        </Box>
    )
}

export default TimeTracker