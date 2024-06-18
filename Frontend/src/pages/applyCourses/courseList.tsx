import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@mui/material';

interface Course {
    id: number;
    name: string;
    category: string;
}

interface Application {
    id: number;
    courseName: string;
    action: string;
    status: string;
}

interface NewCoursesTableProps {
    courses: Course[];
    onApply: (courseId: number) => void;
}

interface ApplicationStatusTableProps {
    applications: Application[];
}

const NewCoursesTable: React.FC<NewCoursesTableProps> = ({ courses, onApply }) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Course Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {courses.map((course, index) => (
                    <TableRow key={course.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="success" onClick={() => onApply(course.id)}>
                                Apply
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

const ApplicationStatusTable: React.FC<ApplicationStatusTableProps> = ({ applications }) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Course Name</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Your Application Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {applications.map((application, index) => (
                    <TableRow key={application.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{application.courseName}</TableCell>
                        <TableCell>{application.action}</TableCell>
                        <TableCell>
                            <span style={{ color: application.status === 'Accepted' ? 'green' : 'red' }}>
                                {application.status}
                            </span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

const CoursesPage: React.FC = () => {
    const newCourses: Course[] = [
        { id: 1, name: 'DevOps Fundamentals', category: 'DevOps' },
        { id: 2, name: 'Node.js Essentials', category: 'Backend' },
        { id: 3, name: 'Data Science with R', category: 'Data Science' },
        { id: 4, name: 'Machine Learning Basics with Python', category: 'Backend' },
        { id: 5, name: 'React.js for Beginner', category: 'Frontend' }
    ];

    const applications: Application[] = [
        { id: 1, courseName: 'Cloud Computing Essentials', action: 'applied', status: 'Accepted' },
        { id: 2, courseName: 'Data Science with R', action: 'applied', status: 'Rejected' }
    ];

    const handleApply = (courseId: number) => {
        console.log(`Apply for course ${courseId}`);
        // Implement your apply logic here
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>New Courses to Apply</h2>
            <NewCoursesTable courses={newCourses} onApply={handleApply} />
            <h2>Application Status</h2>
            <ApplicationStatusTable applications={applications} />
        </div>
    );
};

export default CoursesPage;
