const express = require("express");
const bodyParser = require("body-parser");
const {GraphQLClient, gql} = require("graphql-request");

const app = express();
const client = new GraphQLClient("http://host.docker.internal:8080/v1/graphql", {});
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

const HASURA_OPERATION = `
mutation create_relationship($relahionships: [user_group_insert_input!]!) {
    insert_user_group(objects: $relahionships) {
      returning {
        user {
          lastname,
          firstname
        }
        group {
          id
          name
        }
      }
    }
  }
`;

app.post('/hello', async (req, res) => {
  return res.json({
    hello: "world"
  });
});

app.post('/applyUsersToGroup', async (req, res) => {
  const { groupId, userIds } = req.body.input;

  try {
    const {insert_user_group: {returning}} = await client.request(
        gql`${HASURA_OPERATION}`,
        {
            relahionships: userIds.map(userId => ({user_id: userId, group_id: groupId}))
        }
    );

    const formattedResponse = returning.reduce((acc, it) => ({
        ...acc,
        id: it.group.id,
        name: it.group.name,
        users: [...acc.users, it.user]
    }),{
        name: "",
        users: []
    });

    console.log(formattedResponse)

    return res.json(formattedResponse)
  } catch(err) {
    console.log(err);
  }
});

const start = async () => {
  try {
    await app.listen(PORT);
    console.log(`Started on ${PORT} port`)
  } catch(err) {
    console.log(err);
  }
}

start();
