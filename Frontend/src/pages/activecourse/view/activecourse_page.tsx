import React, { useMemo, useState } from 'react'
import StudentNav from '../../../global/components/navbar/student/student_navbar'
import CourseCard from './components/card-news3/CourseCard'
import Grid from '@mui/material/Unstable_Grid2';
import useFetch from '../../../global/hooks/useFetch';



function activecourse_page() {
 const data = useFetch("http://localhost:3002/course/getCourses")
//   fetch("http://localhost:3002/course/getCourses",{
//   method: 'GET',
//   headers:{
//     'Content-Type': 'application/json'
//   }
// }).then(res=>{
//   return res.json()
// })
// .then(data=>console.log(data))
// .catch(error=>console.log('Error'))

  return (
    <>
      <StudentNav />

      <Grid container spacing={3} justifyContent={"center"} marginTop={"100px"} marginBottom={"180px"}>
        <Grid>
          <CourseCard
            image={"https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"}
            status={"ACTIVE"}
            title={"Introduction to Programming"}
            numSessions={"8"}
            numChapters={"10"}
          />
        </Grid>

        <Grid>
          <CourseCard
            image={"https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"}
            status={"ACTIVE"}
            title={"Introduction to Programming"}
            numSessions={"8"}
            numChapters={"10"}
          />
        </Grid>

        <Grid >
          <CourseCard
            image={"https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"}
            status={"ACTIVE"}
            title={"Introduction to Programming"}
            numSessions={"8"}
            numChapters={"10"}
          />
        </Grid>

      </Grid>
      <Grid container spacing={3} justifyContent={"center"} marginTop={"100px"} marginBottom={"180px"}>
        <Grid>
          <CourseCard
            image={"https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"}
            status={"ACTIVE"}
            title={"Introduction to Programming"}
            numSessions={"8"}
            numChapters={"10"}
          />
        </Grid>

        <Grid>
          <CourseCard
            image={"https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"}
            status={"ACTIVE"}
            title={"Introduction to Programming"}
            numSessions={"8"}
            numChapters={"10"}
          />
        </Grid>

        <Grid >
          <CourseCard
            image={"https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"}
            status={"ACTIVE"}
            title={"Introduction to Programming"}
            numSessions={"8"}
            numChapters={"10"}
          />
        </Grid>

      </Grid>
      <Grid container spacing={3} justifyContent={"center"} marginTop={"100px"} marginBottom={"180px"}>
        <Grid>
          <CourseCard
            image={"https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"}
            status={"ACTIVE"}
            title={"Introduction to Programming"}
            numSessions={"8"}
            numChapters={"10"}
          />
        </Grid>

        <Grid>
          <CourseCard
            image={"https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"}
            status={"ACTIVE"}
            title={"Introduction to Programming"}
            numSessions={"8"}
            numChapters={"10"}
          />
        </Grid>

        <Grid >
          <CourseCard
            image={"https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"}
            status={"ACTIVE"}
            title={"Introduction to Programming"}
            numSessions={"8"}
            numChapters={"10"}
          />
        </Grid>

      </Grid>
    </>

  )
}

export default activecourse_page