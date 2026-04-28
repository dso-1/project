import 'dotenv/config';
import { PrismaClient } from '.prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { hash } from 'bcryptjs';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
	adapter,
});

async function main() {
	console.log('🌱 Seeding database...\n');

	console.log('Cleaning existing data...');
	await prisma.reservation.deleteMany();
	await prisma.room.deleteMany();
	await prisma.user.deleteMany();

	console.log('Creating users...');
	const adminPassword = await hash('admin123', 12);
	const studentPassword = await hash('student123', 12);

	const admin = await prisma.user.create({
		data: {
			email: 'admin@filkom.ub.ac.id',
			password: adminPassword,
			name: 'Administrator',
			role: 'ADMIN',
		},
	});
	console.log(`  ✓ Created admin: ${admin.email}`);

	const students = await Promise.all([
		prisma.user.create({
			data: {
				email: 'budi.santoso@student.ub.ac.id',
				password: studentPassword,
				name: 'Budi Santoso',
				nim: '215150200111001',
				role: 'MAHASISWA',
			},
		}),
		prisma.user.create({
			data: {
				email: 'siti.aminah@student.ub.ac.id',
				password: studentPassword,
				name: 'Siti Aminah',
				nim: '215150200111002',
				role: 'MAHASISWA',
			},
		}),
		prisma.user.create({
			data: {
				email: 'andi.wijaya@student.ub.ac.id',
				password: studentPassword,
				name: 'Andi Wijaya',
				nim: '215150200111003',
				role: 'MAHASISWA',
			},
		}),
		prisma.user.create({
			data: {
				email: 'dewi.putri@student.ub.ac.id',
				password: studentPassword,
				name: 'Dewi Putri',
				nim: '215150200111004',
				role: 'MAHASISWA',
			},
		}),
		prisma.user.create({
			data: {
				email: 'rizki.pratama@student.ub.ac.id',
				password: studentPassword,
				name: 'Rizki Pratama',
				nim: '215150200111005',
				role: 'MAHASISWA',
			},
		}),
	]);
	console.log(`  ✓ Created ${students.length} students`);

	// Create Rooms
	console.log('Creating rooms...');
	const rooms = await Promise.all([
		prisma.room.create({
			data: {
				name: 'Lab Komputer 1',
				capacity: 40,
				facilities: ['Projector', 'AC', 'Whiteboard', 'Computer', 'WiFi'],
				description:
					'Laboratorium komputer utama dengan 40 unit PC untuk praktikum pemrograman dan jaringan komputer.',
				location: 'Gedung F, Lantai 1, Ruang F1.1',
				status: 'AVAILABLE',
			},
		}),
		prisma.room.create({
			data: {
				name: 'Lab Komputer 2',
				capacity: 35,
				facilities: ['Projector', 'AC', 'Whiteboard', 'Computer', 'WiFi'],
				description:
					'Laboratorium komputer untuk praktikum basis data dan sistem informasi.',
				location: 'Gedung F, Lantai 1, Ruang F1.2',
				status: 'AVAILABLE',
			},
		}),
		prisma.room.create({
			data: {
				name: 'Lab Multimedia',
				capacity: 30,
				facilities: [
					'Projector',
					'AC',
					'Green Screen',
					'Camera',
					'Computer',
					'Sound System',
				],
				description:
					'Laboratorium multimedia untuk produksi video, editing, dan desain grafis.',
				location: 'Gedung G, Lantai 1, Ruang G1.1',
				status: 'MAINTENANCE',
			},
		}),
		prisma.room.create({
			data: {
				name: 'Ruang Seminar A',
				capacity: 100,
				facilities: [
					'Projector',
					'AC',
					'Sound System',
					'Podium',
					'Microphone',
					'WiFi',
				],
				description:
					'Ruang seminar besar untuk presentasi, sidang, dan acara akademik.',
				location: 'Gedung F, Lantai 2, Ruang F2.1',
				status: 'AVAILABLE',
			},
		}),
		prisma.room.create({
			data: {
				name: 'Ruang Seminar B',
				capacity: 80,
				facilities: [
					'Projector',
					'AC',
					'Sound System',
					'Podium',
					'Microphone',
					'WiFi',
				],
				description: 'Ruang seminar untuk workshop dan pelatihan.',
				location: 'Gedung F, Lantai 2, Ruang F2.2',
				status: 'AVAILABLE',
			},
		}),
		prisma.room.create({
			data: {
				name: 'Ruang Rapat 1',
				capacity: 20,
				facilities: [
					'Projector',
					'AC',
					'Whiteboard',
					'Conference Table',
					'WiFi',
				],
				description: 'Ruang rapat untuk diskusi kelompok dan meeting.',
				location: 'Gedung F, Lantai 3, Ruang F3.1',
				status: 'AVAILABLE',
			},
		}),
		prisma.room.create({
			data: {
				name: 'Ruang Rapat 2',
				capacity: 15,
				facilities: [
					'Projector',
					'AC',
					'Whiteboard',
					'Conference Table',
					'WiFi',
				],
				description: 'Ruang rapat kecil untuk diskusi tim.',
				location: 'Gedung F, Lantai 3, Ruang F3.2',
				status: 'AVAILABLE',
			},
		}),
		prisma.room.create({
			data: {
				name: 'Lab IoT',
				capacity: 25,
				facilities: [
					'Projector',
					'AC',
					'Workbench',
					'Electronics Tools',
					'WiFi',
					'Oscilloscope',
				],
				description:
					'Laboratorium Internet of Things untuk pengembangan embedded systems.',
				location: 'Gedung G, Lantai 2, Ruang G2.1',
				status: 'AVAILABLE',
			},
		}),
	]);
	console.log(`  ✓ Created ${rooms.length} rooms`);

	// Create Reservations
	console.log('Creating reservations...');

	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	const nextWeek = new Date(today);
	nextWeek.setDate(nextWeek.getDate() + 7);
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	const lastWeek = new Date(today);
	lastWeek.setDate(lastWeek.getDate() - 7);

	const reservations = await Promise.all([
		// Pending reservations
		prisma.reservation.create({
			data: {
				userId: students[0].id,
				roomId: rooms[0].id,
				startTime: new Date(tomorrow.setHours(9, 0, 0, 0)),
				endTime: new Date(tomorrow.setHours(12, 0, 0, 0)),
				purpose: 'Praktikum Pemrograman Web - Kelas A',
				notes: 'Membutuhkan akses admin untuk install software',
				status: 'PENDING',
			},
		}),
		prisma.reservation.create({
			data: {
				userId: students[1].id,
				roomId: rooms[3].id,
				startTime: new Date(nextWeek.setHours(13, 0, 0, 0)),
				endTime: new Date(nextWeek.setHours(16, 0, 0, 0)),
				purpose: 'Sidang Skripsi Mahasiswa Informatika',
				notes: 'Mohon disiapkan 5 kursi untuk penguji',
				status: 'PENDING',
			},
		}),
		prisma.reservation.create({
			data: {
				userId: students[2].id,
				roomId: rooms[5].id,
				startTime: new Date(tomorrow.setHours(14, 0, 0, 0)),
				endTime: new Date(tomorrow.setHours(16, 0, 0, 0)),
				purpose: 'Rapat Koordinasi Tim Capstone Project',
				status: 'PENDING',
			},
		}),

		// Approved reservations
		prisma.reservation.create({
			data: {
				userId: students[0].id,
				roomId: rooms[1].id,
				startTime: new Date(today.setHours(9, 0, 0, 0)),
				endTime: new Date(today.setHours(11, 0, 0, 0)),
				purpose: 'Workshop Database MySQL',
				status: 'APPROVED',
			},
		}),
		prisma.reservation.create({
			data: {
				userId: students[3].id,
				roomId: rooms[4].id,
				startTime: new Date(today.setHours(13, 0, 0, 0)),
				endTime: new Date(today.setHours(15, 0, 0, 0)),
				purpose: 'Seminar Teknologi Cloud Computing',
				notes: 'Diharapkan hadir 60 peserta',
				status: 'APPROVED',
			},
		}),
		prisma.reservation.create({
			data: {
				userId: students[4].id,
				roomId: rooms[7].id,
				startTime: new Date(tomorrow.setHours(10, 0, 0, 0)),
				endTime: new Date(tomorrow.setHours(12, 0, 0, 0)),
				purpose: 'Praktikum Embedded Systems',
				status: 'APPROVED',
			},
		}),

		// Rejected reservations
		prisma.reservation.create({
			data: {
				userId: students[1].id,
				roomId: rooms[2].id,
				startTime: new Date(yesterday.setHours(9, 0, 0, 0)),
				endTime: new Date(yesterday.setHours(12, 0, 0, 0)),
				purpose: 'Produksi Video Profil FILKOM',
				notes: 'Ditolak karena ruangan sedang maintenance',
				status: 'REJECTED',
			},
		}),
		prisma.reservation.create({
			data: {
				userId: students[2].id,
				roomId: rooms[0].id,
				startTime: new Date(lastWeek.setHours(8, 0, 0, 0)),
				endTime: new Date(lastWeek.setHours(10, 0, 0, 0)),
				purpose: 'Kelas Tambahan Algoritma',
				notes: 'Ditolak karena bentrok dengan jadwal kuliah reguler',
				status: 'REJECTED',
			},
		}),

		// Cancelled reservations
		prisma.reservation.create({
			data: {
				userId: students[3].id,
				roomId: rooms[5].id,
				startTime: new Date(yesterday.setHours(14, 0, 0, 0)),
				endTime: new Date(yesterday.setHours(16, 0, 0, 0)),
				purpose: 'Meeting Tim Proyek Akhir',
				notes: 'Dibatalkan oleh pemohon',
				status: 'CANCELLED',
			},
		}),

		// Past approved reservations
		prisma.reservation.create({
			data: {
				userId: students[0].id,
				roomId: rooms[3].id,
				startTime: new Date(lastWeek.setHours(9, 0, 0, 0)),
				endTime: new Date(lastWeek.setHours(12, 0, 0, 0)),
				purpose: 'Seminar Nasional Teknologi Informasi',
				status: 'APPROVED',
			},
		}),
		prisma.reservation.create({
			data: {
				userId: students[4].id,
				roomId: rooms[1].id,
				startTime: new Date(lastWeek.setHours(13, 0, 0, 0)),
				endTime: new Date(lastWeek.setHours(15, 0, 0, 0)),
				purpose: 'Lomba Competitive Programming Internal',
				status: 'APPROVED',
			},
		}),
	]);
	console.log(`  ✓ Created ${reservations.length} reservations`);

	console.log('\n✅ Seeding completed successfully!\n');
	console.log('📋 Summary:');
	console.log(`   - 1 Admin user`);
	console.log(`   - ${students.length} Student users`);
	console.log(`   - ${rooms.length} Rooms`);
	console.log(`   - ${reservations.length} Reservations`);
	console.log('\n🔐 Login credentials:');
	console.log('   Admin:   admin@filkom.ub.ac.id / admin123');
	console.log('   Student: budi.santoso@student.ub.ac.id / student123');
}

main()
	.catch((e) => {
		console.error('❌ Seeding failed:', e);
		process.exit(1);
	})
	.finally(async () => {
		await pool.end();
		await prisma.$disconnect();
	});
