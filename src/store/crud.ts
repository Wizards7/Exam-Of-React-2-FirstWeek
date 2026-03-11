import { create } from "zustand";

export const useCrud = create<any>((set, get) => ({
  data: [
    {
      id: 1,
      img: "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
      name: "ali",
      age: 21,
      status: true,
    },
    {
      id: 2,
      img: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80",
      name: "ammm",
      age: 25,
      status: false,
    },
    {
      id: 3,
      img: "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740&q=80",
      name: "valid",
      age: 25,
      status: true,
    },
    {
      id: 4,
      img: "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?semt=ais_hybrid&w=740&q=80",
      name: "aab",
      age: 35,
      status: true,
    },
  ],

  //   Add User
  addUser: (newUser: any) =>
    set((state: any) => ({
      data: [...state.data, newUser],
    })),

  // Edit User
  editUser: (editing: any) =>
    set((state: any) => ({
      data: state.data.map((user: any) =>
        user.id == editing.id ? editing : user,
      ),
    })),

  // Delete User
  deleteUser: (id: number) =>
    set((state: any) => ({
      data: state.data.filter((elem: any) => elem.id != id),
    })),

  // toggle User
  toggle: (id: number) =>
    set((state: any) => ({
      data: state.data.map((elem: any) =>
        elem.id == id ? { ...elem, status: !elem.status } : elem,
      ),
    })),
}));
