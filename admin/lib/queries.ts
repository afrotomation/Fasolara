import { gql } from "@apollo/client";

export const GET_ADDRESSES = gql`
  query GetAddresses {
    addresses {
      id
      name
      address
      villageId
      addressType
      mobileNumber
      dotcolor
      createdAt
    }
  }
`;

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      id
      name
      code
      flag
    }
  }
`;

export const GET_PROVINCES = gql`
  query GetProvinces {
    provinces {
      id
      name
      countryId
    }
  }
`;

export const GET_VILLAGES = gql`
  query GetVillages {
    villages {
      id
      name
      provinceId
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      title
      description
      orderDate
      userId
      quantity
      currency
      purchaseCost
      status
    }
  }
`;

export const GET_PANELS = gql`
  query GetPanels {
    panels {
      id
      serialNumber
      installCost
      orderId
      groupId
      isActive
      isInstalled
      isReplacement
      ratedCapacity
      maintenanceDates
      createdAt
      updatedAt
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
      email
      role
      avatar
      createdAt
    }
  }
`;

export const GET_CONVERSATIONS = gql`
  query GetConversations {
    conversations {
      id
      title
      participants {
        id
        firstName
        lastName
        avatar
      }
      lastMessage {
        id
        body
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
