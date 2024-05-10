import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

const useFetch = (url: string) => {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");

	const fetchData = async () => {
		setLoading(true);

		const user = JSON.parse(window.localStorage.getItem("user") || "{}");

		try {
			const response = await axios.get(url, {
				headers: {
					auth: `Bearer ${user.accessToken}`,
				},
			});

			const result = response.data;
			setData(result);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				//Ambil error message dari backend
				const axiosError = error as AxiosError;
				if (axiosError.response && axiosError.response.status === 401) {
					setError("Unauthorized access. Please log in.");
				} else {
					setError("Error fetching data.");
				}
			} else {
				setError("Non-Axios error.");
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [url]);

	const refetch = () => {
		setLoading(true);
		fetchData();
	};

	return { data, loading, error, refetch };
};

export default useFetch;
