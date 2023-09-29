import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      email
      username
    }
  }
}
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($description: String!, $bookId: String!, $title: String!) {
  saveBook(description: $description, bookId: $bookId, title: $title) {
    _id
    email
    savedBooks {
      _id
      authors
      bookId
      description
      image
      title
      link
    }
    username
  }
}
`;

export const DELETE_BOOK = gql`
mutation deleteBook($bookId: ID!) {
  deleteBook(bookId: $bookId) {
    _id
    email
    savedBooks {
      _id
      authors
      bookId
      description
      image
      link
      title
    }
    username
  }
}
`;