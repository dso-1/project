export const GET_ROOMS = `
  query GetRooms($status: RoomStatus) {
    rooms(status: $status) {
      id
      name
      capacity
      facilities
      image
      description
      location
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_ROOM = `
  query GetRoom($id: ID!) {
    room(id: $id) {
      id
      name
      capacity
      facilities
      image
      description
      location
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_AVAILABLE_ROOMS = `
  query GetAvailableRooms($startTime: String!, $endTime: String!) {
    availableRooms(startTime: $startTime, endTime: $endTime) {
      id
      name
      capacity
      facilities
      image
      description
      location
      status
    }
  }
`;

export const CREATE_ROOM = `
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
      name
      capacity
      facilities
      image
      description
      location
      status
    }
  }
`;

export const UPDATE_ROOM = `
  mutation UpdateRoom($id: ID!, $input: UpdateRoomInput!) {
    updateRoom(id: $id, input: $input) {
      id
      name
      capacity
      facilities
      image
      description
      location
      status
    }
  }
`;

export const DELETE_ROOM = `
  mutation DeleteRoom($id: ID!) {
    deleteRoom(id: $id)
  }
`;
