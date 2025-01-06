import {create} from "zustand";
import {toast} from "react-hot-toast";
import {axiosInstance} from "../request/axios.js";
import { storeAuth } from "./storeAuth.js";

export const storeChat = create((set,get) => ({
    messages : [],
    users: [],
    selectedUsers: null,
    isUsersLoading: false,
    isMessagesLoading: false,



    getUsers: async () => {
        set({isUsersLoading: true})
        try {
            const response = await axiosInstance.get('/messages/users')
            set({users: response.data})
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch users")
            
        } finally {
            set({isUsersLoading: false})
        }
    },

    getMessages: async (userId) => {
        set({isMessagesLoading: true})
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({messages: response.data})
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch messages")
            
        } finally {
            set({isMessagesLoading: false})
        }
    },

    sendMessage: async(messageData) => {
        const {selectedUsers,messages} = get();
        try {
            const response = await axiosInstance.post(`/messages/send/${selectedUsers._id}`, messageData)
            set({messages:[...messages,response.data]})
        } catch (error) {
            toast.error(error.response.error.message)
        }
    
    },

    subscribeToMessages: () => {
        const {selectedUsers} = get()
        if(!selectedUsers) return;

        const socket = storeAuth.getState().socket;

        socket.on("newMessage",(newMessage) => {
            if(newMessage.sender._id !== selectedUsers._id) return;
                set ({
                    messages:[...get().messages, newMessage]
                });
        });

    },

    unsubscribeFromMessages: () => {
        const socket = storeAuth.getState().socket;
        socket.off("newMessage");
    },

    
    

    setSelectedUser: (selectedUsers) => set({selectedUsers}),

}));