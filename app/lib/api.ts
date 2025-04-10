import axios from 'axios'


const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Users API
export const fetchUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const fetchUserById = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Posts API
export const fetchPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const fetchPostsByUser = async (userId: number) => {
  const response = await api.get(`/posts?userId=${userId}`);
  return response.data;
};

// Comments API
export const fetchCommentsByPost = async (postId: number) => {
  const response = await api.get(`/comments?postId=${postId}`);
  return response.data;
};


export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}


