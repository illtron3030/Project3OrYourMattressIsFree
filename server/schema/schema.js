// Mongoose Models
const Project = require('../models/Project');
const Client = require('../models/Client');

const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLList, 
  GraphQLNonNull
} = require("graphql");

//Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLID },
    description: { type: GraphQLID },
    status: { type: GraphQLID },
    client: {
     type: ClientType,
     resolve(parent, args) {
      return client.findById(parent.clientId)

     }

    }
    
  }),
});

//Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLID },
    email: { type: GraphQLID },
    phone: { type: GraphQLID },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        returnProject.find();
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return Client.findById(args.id);
      },
    },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: {type: GraphQLNonNull(GraphQLString) },
        email: {type: GraphQLNonNull(GraphQLString) },
        phone: {type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id);
      }
    }
  },
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});
