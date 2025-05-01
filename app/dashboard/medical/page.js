'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getUser, logout } from '@/lib/auth';

export default function MedicalDashboard() {
	const [user, setUser] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const userData = getUser();

		if (!userData || userData.role !== 'medical') {
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
					<h1 className="text-3xl font-bold text-gray-900">Medical Professional Dashboard</h1>
					<Button variant="destructive" onClick={handleLogout}>
						Logout
					</Button>
				</div>

				<div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
					<p className="text-lg mb-4">
						Welcome, Dr. <span className="font-semibold">{user.username}</span>!
					</p>
					<p>
						You are logged in as a <span className="font-bold text-blue-600">Medical Professional</span>.
					</p>

					<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
						<div className="bg-blue-50 p-6 rounded-lg shadow-sm">
							<h3 className="text-xl font-semibold text-blue-800 mb-2">Patient Records</h3>
							<p className="text-gray-600">Access patient medical history and treatment plans</p>
						</div>
						<div className="bg-green-50 p-6 rounded-lg shadow-sm">
							<h3 className="text-xl font-semibold text-green-800 mb-2">Schedule Appointments</h3>
							<p className="text-gray-600">Manage your calendar and patient appointments</p>
						</div>
						<div className="bg-purple-50 p-6 rounded-lg shadow-sm">
							<h3 className="text-xl font-semibold text-purple-800 mb-2">Medication Management</h3>
							<p className="text-gray-600">Prescribe and track patient medications</p>
						</div>
					</div>

					<div className="mt-8">
						<h2 className="text-xl font-bold mb-4">Recent Patient Activity</h2>
						<div className="bg-gray-50 p-4 rounded-lg">
							<p className="text-gray-600">No recent updates from your patients</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
