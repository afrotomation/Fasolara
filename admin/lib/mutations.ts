import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($loginInput: LoginInput!) {
    loginUser(loginInput: $loginInput) {
      id
      email
      firstName
      lastName
      role
      token
    }
  }
`;

export const CREATE_ADDRESS = gql`
  mutation CreateAddress(
    $name: String!
    $address: String!
    $villageId: ID
    $locationId: ID
    $addressType: String
    $mobileNumber: String
    $dotcolor: String
  ) {
    createAddress(
      name: $name
      address: $address
      villageId: $villageId
      locationId: $locationId
      addressType: $addressType
      mobileNumber: $mobileNumber
      dotcolor: $dotcolor
    ) {
      id
      name
      address
    }
  }
`;
