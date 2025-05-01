'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getUser, logout } from '@/lib/auth';

export default function CaregiverDashboard() {
	const [user, setUser] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const userData = getUser();

		if (!userData || userData.role !== 'caregiver') {
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
		<div className="min-h-screen bg-green-50">
			<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Caregiver Dashboard</h1>
					<Button variant="destructive" onClick={handleLogout}>
						Logout
					</Button>
				</div>

				<div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
					<p className="text-lg mb-4">
						Welcome, <span className="font-semibold">{user.username}</span>!
					</p>
					<p>
						You are logged in as a <span className="font-bold text-green-600">Caregiver</span>.
					</p>

					<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
						<div className="bg-green-50 p-6 rounded-lg shadow-sm">
							<h3 className="text-xl font-semibold text-green-800 mb-2">Daily Care Schedule</h3>
							<p className="text-gray-600">View your daily care assignments and tasks</p>
						</div>
						<div className="bg-blue-50 p-6 rounded-lg shadow-sm">
							<h3 className="text-xl font-semibold text-blue-800 mb-2">Patient Health Updates</h3>
							<p className="text-gray-600">Track vital signs and health changes</p>
						</div>
						<div className="bg-amber-50 p-6 rounded-lg shadow-sm">
							<h3 className="text-xl font-semibold text-amber-800 mb-2">Medication Reminders</h3>
							<p className="text-gray-600">Ensure patients take their medications on time</p>
						</div>
					</div>

					<div className="mt-8">
						<h2 className="text-xl font-bold mb-4">Todays Tasks</h2>
						<div className="space-y-3">
							<div className="flex items-center p-3 bg-gray-50 rounded-md">
								<div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
								<p>Check blood pressure for Mrs. Johnson - 10:00 AM</p>
							</div>
							<div className="flex items-center p-3 bg-gray-50 rounded-md">
								<div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
								<p>Administer medication for Mr. Wilson - 1:00 PM</p>
							</div>
							<div className="flex items-center p-3 bg-gray-50 rounded-md">
								<div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
								<p>Assist with physical therapy exercises - 3:30 PM</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
