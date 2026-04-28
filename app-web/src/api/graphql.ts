import { createSchema, createYoga } from 'graphql-yoga';
import { prisma } from '@/shared/lib/prisma';
import { hash, compare } from 'bcryptjs';

const typeDefs = `
  enum Role {
    ADMIN
    MAHASISWA
  }

  enum RoomStatus {
    AVAILABLE
    MAINTENANCE
    UNAVAILABLE
  }

  enum ReservationStatus {
    PENDING
    APPROVED
    REJECTED
    CANCELLED
  }

  type User {
    id: ID!
    email: String!
    name: String!
    nim: String
    role: Role!
    reservations: [Reservation!]!
    createdAt: String!
    updatedAt: String!
  }

  type Room {
    id: ID!
    name: String!
    capacity: Int!
    facilities: [String!]!
    image: String
    description: String
    location: String
    status: RoomStatus!
    reservations: [Reservation!]!
    createdAt: String!
    updatedAt: String!
  }

  type Reservation {
    id: ID!
    user: User!
    room: Room!
    startTime: String!
    endTime: String!
    status: ReservationStatus!
    purpose: String!
    notes: String
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    user: User!
    success: Boolean!
    message: String
  }

  input CreateUserInput {
    email: String!
    password: String!
    name: String!
    nim: String
    role: Role
  }

  input CreateRoomInput {
    name: String!
    capacity: Int!
    facilities: [String!]!
    image: String
    description: String
    location: String
    status: RoomStatus
  }

  input UpdateRoomInput {
    name: String
    capacity: Int
    facilities: [String!]
    image: String
    description: String
    location: String
    status: RoomStatus
  }

  input CreateReservationInput {
    roomId: ID!
    startTime: String!
    endTime: String!
    purpose: String!
    notes: String
  }

  input UpdateReservationStatusInput {
    status: ReservationStatus!
  }

  type Query {

    me: User
    users: [User!]!
    user(id: ID!): User


    rooms(status: RoomStatus): [Room!]!
    room(id: ID!): Room
    availableRooms(startTime: String!, endTime: String!): [Room!]!


    reservations(status: ReservationStatus): [Reservation!]!
    reservation(id: ID!): Reservation
    myReservations: [Reservation!]!
  }

  type Mutation {

    register(input: CreateUserInput!): AuthPayload!
    

    createRoom(input: CreateRoomInput!): Room!
    updateRoom(id: ID!, input: UpdateRoomInput!): Room!
    deleteRoom(id: ID!): Boolean!


    createReservation(input: CreateReservationInput!): Reservation!
    updateReservationStatus(id: ID!, input: UpdateReservationStatusInput!): Reservation!
    cancelReservation(id: ID!): Reservation!
  }
`;

interface GraphQLContext {
	userId?: string;
	role?: string;
}

const resolvers = {
	Query: {
		me: async (_: unknown, __: unknown, context: GraphQLContext) => {
			if (!context.userId) return null;
			return prisma.user.findUnique({
				where: { id: context.userId },
			});
		},

		users: async () => {
			return prisma.user.findMany({
				orderBy: { createdAt: 'desc' },
			});
		},

		user: async (_: unknown, { id }: { id: string }) => {
			return prisma.user.findUnique({
				where: { id },
			});
		},

		rooms: async (_: unknown, { status }: { status?: string }) => {
			return prisma.room.findMany({
				where: status
					? { status: status as 'AVAILABLE' | 'MAINTENANCE' | 'UNAVAILABLE' }
					: undefined,
				orderBy: { name: 'asc' },
			});
		},

		room: async (_: unknown, { id }: { id: string }) => {
			return prisma.room.findUnique({
				where: { id },
			});
		},

		availableRooms: async (
			_: unknown,
			{ startTime, endTime }: { startTime: string; endTime: string },
		) => {
			const start = new Date(startTime);
			const end = new Date(endTime);

			return prisma.room.findMany({
				where: {
					status: 'AVAILABLE',
					reservations: {
						none: {
							status: 'APPROVED',
							OR: [
								{
									startTime: { lte: end },
									endTime: { gte: start },
								},
							],
						},
					},
				},
				orderBy: { name: 'asc' },
			});
		},

		reservations: async (_: unknown, { status }: { status?: string }) => {
			return prisma.reservation.findMany({
				where: status ? { status: status as any } : undefined,
				include: { user: true, room: true },
				orderBy: { createdAt: 'desc' },
			});
		},

		reservation: async (_: unknown, { id }: { id: string }) => {
			return prisma.reservation.findUnique({
				where: { id },
				include: { user: true, room: true },
			});
		},

		myReservations: async (
			_: unknown,
			__: unknown,
			context: GraphQLContext,
		) => {
			if (!context.userId) return [];
			return prisma.reservation.findMany({
				where: { userId: context.userId },
				include: { room: true },
				orderBy: { createdAt: 'desc' },
			});
		},
	},

	Mutation: {
		register: async (_: unknown, { input }: { input: any }) => {
			const hashedPassword = await hash(input.password, 12);

			const user = await prisma.user.create({
				data: {
					...input,
					password: hashedPassword,
				},
			});

			return {
				user,
				success: true,
				message: 'User registered successfully',
			};
		},

		createRoom: async (
			_: unknown,
			{ input }: { input: any },
			context: GraphQLContext,
		) => {
			if (context.role !== 'ADMIN') {
				throw new Error('Unauthorized: Admin access required');
			}

			return prisma.room.create({
				data: input,
			});
		},

		updateRoom: async (
			_: unknown,
			{ id, input }: { id: string; input: any },
			context: GraphQLContext,
		) => {
			if (context.role !== 'ADMIN') {
				throw new Error('Unauthorized: Admin access required');
			}

			return prisma.room.update({
				where: { id },
				data: input,
			});
		},

		deleteRoom: async (
			_: unknown,
			{ id }: { id: string },
			context: GraphQLContext,
		) => {
			if (context.role !== 'ADMIN') {
				throw new Error('Unauthorized: Admin access required');
			}

			await prisma.room.delete({
				where: { id },
			});

			return true;
		},

		createReservation: async (
			_: unknown,
			{ input }: { input: any },
			context: GraphQLContext,
		) => {
			if (!context.userId) {
				throw new Error('Unauthorized: Please login first');
			}

			return prisma.reservation.create({
				data: {
					...input,
					userId: context.userId,
					startTime: new Date(input.startTime),
					endTime: new Date(input.endTime),
				},
				include: { user: true, room: true },
			});
		},

		updateReservationStatus: async (
			_: unknown,
			{ id, input }: { id: string; input: { status: string } },
			context: GraphQLContext,
		) => {
			if (context.role !== 'ADMIN') {
				throw new Error('Unauthorized: Admin access required');
			}

			return prisma.reservation.update({
				where: { id },
				data: { status: input.status as any },
				include: { user: true, room: true },
			});
		},

		cancelReservation: async (
			_: unknown,
			{ id }: { id: string },
			context: GraphQLContext,
		) => {
			if (!context.userId) {
				throw new Error('Unauthorized: Please login first');
			}

			const reservation = await prisma.reservation.findUnique({
				where: { id },
			});

			if (!reservation) {
				throw new Error('Reservation not found');
			}

			if (reservation.userId !== context.userId && context.role !== 'ADMIN') {
				throw new Error(
					'Unauthorized: You can only cancel your own reservations',
				);
			}

			return prisma.reservation.update({
				where: { id },
				data: { status: 'CANCELLED' },
				include: { user: true, room: true },
			});
		},
	},

	User: {
		reservations: async (parent: { id: string }) => {
			return prisma.reservation.findMany({
				where: { userId: parent.id },
			});
		},
	},

	Room: {
		reservations: async (parent: { id: string }) => {
			return prisma.reservation.findMany({
				where: { roomId: parent.id },
			});
		},
	},
};

const schema = createSchema({
	typeDefs,
	resolvers,
});

export const yoga = createYoga({
	schema,
	graphqlEndpoint: '/api/graphql',
	fetchAPI: globalThis,
	context: async ({ request }) => {
		const context: GraphQLContext = {};

		try {
			const cookieHeader = request.headers.get('cookie') || '';
		} catch {}

		return context;
	},
});

export default yoga;
