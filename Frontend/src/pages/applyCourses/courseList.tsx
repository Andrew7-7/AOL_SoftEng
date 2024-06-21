import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material';
import React, { useState, useEffect } from 'react';

interface Course {
    id: string;
    name: string;
    tutorName: string;
}

interface Application {
    id: number;
    courseName: string;
    action: string;
    status: string;
}

interface NewCoursesTableProps {
    courses: Course[];
    onApply: (courseId: string) => void;
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
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {courses.map((course, index) => (
                    <TableRow key={course.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{course.name}</TableCell>
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
                            <span style={{ color: getStatusColor(application.status) }}>
                                {application.status || 'On Process'}
                            </span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

const getStatusColor = (status: string) => {
    if (status === 'Accepted') return 'green';
    if (status === 'Denied') return 'red';
    if (status === '') return 'orange';
}

const CoursesPage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [newCourses, setNewCourses] = useState<Course[]>([]);
    const [applications, setApplications] = useState<Application[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [certificateFile, setCertificateFile] = useState<File | null>(null);

    useEffect(() => {
        fetchCourseList();
        fetchPermission();
    }, []);

    const fetchPermission = async () => {
        try {
            const response = await fetch(`http://localhost:3002/apply/getPermissions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': 'Bearer aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k'
                },
            })
            if (!response.ok) {
                throw new Error('Failed to fetch application');
            }
            const data = await response.json();
            const extractedApplications: Application[] = data.permissions.map((permission: any, index: number) => ({
                id: index + 1,
                courseName: permission.requestedClass,
                action: 'applied',
                status: permission.status || ''
            }));

            setApplications(extractedApplications);
        } catch (error) {
            setError((error as Error).message);
        }
    }

    const fetchCourseList = async () => {
        try {
            const response = await fetch(`http://localhost:3002/apply/getTutorCourses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': 'Bearer aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k'
                },
            })
            if (!response.ok) {
                throw new Error('Failed to fetch course list');
            }
            const data = await response.json();
            const extractedCourses: Course[] = [];

            data.tutorCourses.forEach((tutor: any) => {
                tutor.courses.forEach((course: any) => {
                    extractedCourses.push({
                        id: course.CourseID,
                        name: course.CourseName,
                        tutorName: tutor.TutorName
                    });
                });
            });

            setNewCourses(extractedCourses);
        } catch (error) {
            setError((error as Error).message);
        }
    }

    const handleApply = (courseId: string) => {
        const course = newCourses.find(c => c.id === courseId);
        if (course) {
            setSelectedCourse(course);
            setOpen(true);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setCertificateFile(event.target.files[0]);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCourse(null);
        setCertificateFile(null);
    };

    const handleSubmit = async () => {
        if (!selectedCourse || !certificateFile) return;

        const formData = new FormData();
        formData.append('permissionID', `${new Date().getTime()}`);
        formData.append('requestedClass', selectedCourse.name);
        formData.append('requestedClassID', selectedCourse.id);
        formData.append('tutorName', selectedCourse.tutorName);
        formData.append('certificateImg', certificateFile);

        try {
            const response = await fetch('http://localhost:3002/apply/postPermission', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to submit application');
            }

            handleClose();
            fetchPermission();
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>New Courses to Apply</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <NewCoursesTable courses={newCourses} onApply={handleApply} />
            <h2>Application Status</h2>
            <ApplicationStatusTable applications={applications} />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Apply Course Form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To apply for this course, please upload your certification.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        label="Course name"
                        type="text"
                        fullWidth
                        value={selectedCourse?.name || ''}
                        disabled
                    />
                    <TextField
                        margin="dense"
                        label="Tutor name"
                        type="text"
                        fullWidth
                        value={selectedCourse?.tutorName || ''}
                        disabled
                    />
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        style={{ marginTop: '20px' }}
                    >
                        Upload Certification
                        <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CoursesPage;
