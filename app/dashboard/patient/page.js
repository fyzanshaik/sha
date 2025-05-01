'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getUser, logout } from '@/lib/auth';

export default function PatientDashboard() {
	const [user, setUser] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const userData = getUser();

		if (!userData || userData.role !== 'patient') {
			router.push('/login');
			return;
		}

		setUser(userData);
	}, [router]);

	const handleLogout = () => {
		logout();
		router.push('/');
	};

	if (!user) return null;

	return (
		<div className="min-h-screen bg-blue-50">
			<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
					<Button variant="destructive" onClick={handleLogout}>
						Logout
					</Button>
				</div>

				<div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
					<p className="text-lg mb-4">
						Welcome, <span className="font-semibold">{user.username}</span>!
					</p>
					<p>
						You are logged in as a <span className="font-bold text-indigo-600">Patient</span>.
					</p>

					<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
						<div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
							<h3 className="text-xl font-semibold text-indigo-800 mb-2">My Health Summary</h3>
							<p className="text-gray-600">View your current health status and vital signs</p>
						</div>
						<div className="bg-amber-50 p-6 rounded-lg shadow-sm">
							<h3 className="text-xl font-semibold text-amber-800 mb-2">Medications</h3>
							<p className="text-gray-600">View and track your medication schedule</p>
						</div>
						<div className="bg-green-50 p-6 rounded-lg shadow-sm">
							<h3 className="text-xl font-semibold text-green-800 mb-2">Upcoming Appointments</h3>
							<p className="text-gray-600">See your scheduled appointments with medical staff</p>
						</div>
					</div>

					<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h2 className="text-xl font-bold mb-4">Todays Medication</h2>
							<div className="space-y-3">
								<div className="flex justify-between p-3 bg-gray-50 rounded-md">
									<span>Blood Pressure Medication</span>
									<span className="text-blue-600">8:00 AM</span>
								</div>
								<div className="flex justify-between p-3 bg-gray-50 rounded-md">
									<span>Vitamin D Supplement</span>
									<span className="text-blue-600">12:00 PM</span>
								</div>
								<div className="flex justify-between p-3 bg-gray-50 rounded-md">
									<span>Pain Reliever</span>
									<span className="text-blue-600">8:00 PM</span>
								</div>
							</div>
						</div>
						<div>
							<h2 className="text-xl font-bold mb-4">Health Metrics</h2>
							<div className="space-y-3">
								<div className="flex justify-between p-3 bg-gray-50 rounded-md">
									<span>Blood Pressure</span>
									<span className="text-green-600">120/80 (Normal)</span>
								</div>
								<div className="flex justify-between p-3 bg-gray-50 rounded-md">
									<span>Heart Rate</span>
									<span className="text-green-600">72 bpm</span>
								</div>
								<div className="flex justify-between p-3 bg-gray-50 rounded-md">
									<span>Blood Glucose</span>
									<span className="text-yellow-600">110 mg/dL (Check again)</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
