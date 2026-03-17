import { combineResolvers } from "graphql-resolvers";
import { withFilter } from "graphql-subscriptions";
import { gql } from "graphql-tag";

import { ApolloError, isValid } from "../../helpers/grahql.js";
import Salary from "../../models/salary.js";
import { isAuthenticated } from "../middleware/index.js";
import pubsub from "../pubsub.js";

const typeDefs = gql`
  """
  The Salary model tracks employee Salaries for easier computations and aggregate data operations
  """
  type Salary {
    id: ID
    userId: ID
    amount: Float!
    jobTitle: String
    startDate: Date
    endDate: Date
    createdAt: Date
    updatedAt: Date
  }

  input CreateSalaryInput {
    id: ID
    userId: ID
    amount: Float!
    jobTitle: String
    startDate: Date
    endDate: Date
    updatedAt: Date
  }

  input UpdateSalaryInput {
    id: ID
    userId: ID
    amount: Float!
    jobTitle: String
    startDate: Date
    endDate: Date
    updatedAt: Date
  }

  extend type Query {
    salary: Salary
    getSalary(id: ID): Salary
    salaries: [Salary!]
  }

  extend type Mutation {
    createSalary(createSalaryInput: CreateSalaryInput): Salary
    updateSalary(updateSalaryInput: UpdateSalaryInput): Salary
    removeSalary(id: ID!): Boolean
  }
  extend type Subscription {
    salaryCreated: Salary
    salaryUpdated: Salary
    salaryDeleted: Boolean
  }
`;

const resolvers = {
  Query: {
    salary: combineResolvers(isAuthenticated, async (_, __, {user} ) => {
      try {
        const salary = await Salary.findOne({ userId: user.id });
        if (!salary) {
          ApolloError("Salary not found", "SALARY_NOT_FOUND");
        }
        return salary;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
    /* fieldName:(root, args, context, info) => { result } */
    getSalary: async (_, { id }) => {
      if (!isValid(id)) {
        ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID");
      }
      return await Salary.findById(id);
    },
    salaries: async () => await Salary.find({}),
  },
  Mutation: {
    createSalary: async (_, { createSalaryInput }) => {
      try {
        // See if an old comment exists with same user and message
        const oldSalary = await Salary.findOne({
          userId: createSalaryInput.userId,
        });

        if (oldSalary) {
          ApolloError(
            `A Salary already exists with ID ${createSalaryInput.userId}`,
            "Salary_ALREADY_EXISTS"
          );
        }
        // Build mongoose model
        const newSalary = new Salary({
          ...createSalaryInput,
        });

        // Save the user object
        const res = await newSalary.save();

        return {
          id: res.id,
          ...res._doc,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateSalary: combineResolvers(
      isAuthenticated,
      async (_, { updateSalaryInput }) => {
        try {
          // See if an old user exists with same email
          const oldSalary = await Salary.findById(updateSalaryInput.id);

          if (!oldSalary) {
            ApolloError(
              "No Salary was found with ID " + updateSalaryInput.id,
              "Salary_NOT_FOUND"
            );
          }

          // Update old account
          const res = await Salary.findOneAndUpdate(
            { _id: updateSalaryInput.id },
            updateSalaryInput,
            { new: true }
          );

          return {
            id: res.id,
            ...res._doc,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
  },
  Subscription: {
    salaryCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("salaryCreated"),
        (payload, variables) => {
          return payload.salaryCreated.userId === variables.userId;
        }
      ),
    },
    salaryUpdated: {
      subscribe: () => pubsub.asyncIterator("salaryUpdated"),
    },
    salaryDeleted: {
      subscribe: () => pubsub.asyncIterator("salaryDeleted"),
    },
  },
};

export { resolvers, typeDefs };
