import { GraphQLClient } from 'graphql-request';

const GRAPHQL_URL = 'https://backend-781163639586.us-central1.run.app/api/graphql';

const client = new GraphQLClient(GRAPHQL_URL);

export const fetchGraphQL = async (record, filters, fields) => {
  try {
    const response = await api.post('/grapql', { description, source });
    

    const filterString = Object.entries(filters || {})
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join(', ');

    const query = `
      query MyQuery {
        ${record}(${filterString}) {
          ${fields.join('\n')}
        }
      }
    `;

    console.log(query)
    const data = await client.request(query);
    return data[record];
  } catch (error) {
    console.error('GraphQL query error:', error);
    throw error;
  }
};
