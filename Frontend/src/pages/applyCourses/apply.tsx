// src/CertificationForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import './apply.css'; // Assuming you create some basic styles

const CertificationForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
        setError('');
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) {
            setError('This Field Is Required');
            return;
        }
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
        }, 2000); // Simulating an API call delay
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Course name :</label>
                    <input type="text" value="DevOps Fundamentals" readOnly />
                </div>
                <div>
                    <label>Tutor name :</label>
                    <input type="text" value="Steven Jo" readOnly />
                </div>
                <div>
                    <label>Upload Certification :</label>
                    <input type="file" onChange={handleFileChange} />
                    {error && <div className="error">{error}</div>}
                </div>
                <button type="submit" disabled={submitting || submitted}>
                    {submitting ? 'Submitting...' : submitted ? 'Submitted' : 'Submit'}
                </button>
            </form>
            {file && !submitting && (
                <div className="certificate-preview">
                    <img src={URL.createObjectURL(file)} alt="Certificate Preview" />
                </div>
            )}
        </div>
    );
};

export default CertificationForm;
