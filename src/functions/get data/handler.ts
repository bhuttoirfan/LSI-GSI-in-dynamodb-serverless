import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { DynamoDB } from '../../libs/dynamodb';

import schema from './schema';

const get_data: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const p_data = event.body;

    // Get data partitioned by single partition key
    // const query = {
    //   TableName: "Media-Table",
    //   KeyConditionExpression: "actor = :ac",
    //   ExpressionAttributeValues: {
    //     ":ac" : p_data.actor
    //   }
    // }

    // All actor items whose movie name begins with given input
    // const query = {
    //   TableName: "Media-Table",
    //   KeyConditionExpression: "actor = :ac and begins_with(movie, :mv)",
    //   ExpressionAttributeValues: {
    //     ":ac" : p_data.actor,
    //     ":mv": p_data.movie
    //   }
    // }

    // Actor who has action movies 
    // const query = {
    //   TableName: "Media-Table",
    //   KeyConditionExpression: "actor = :ac",
    //   FilterExpression: "genre = :genre",
    //   ExpressionAttributeValues: {
    //     ":ac" : p_data.actor,
    //     ":genre": p_data.movie
    //   }
    // }

    // Only role, year and movie attributes are returned
    // const query = {
    //   TableName: "Media-Table",
    //   KeyConditionExpression: "actor = :ac",
    //   ProjectionExpression: "#rl, #yr, #mov",
    //   ExpressionAttributeNames: {
    //     "#rl": "role",
    //     "#yr": "yr",
    //     "#mov": "movie"
    //   },
    //   ExpressionAttributeValues: {
    //     ":ac" : p_data.actor
    //   }
    // }

    // Only role, year and movie columns are returned
    // const query = {
    //   TableName: "Media-Table",
    //   KeyConditionExpression: "actor = :ac",
    //   ProjectionExpression: "#rl, #yr, #mov",
    //   ExpressionAttributeNames: {
    //     "#rl": "role",
    //     "#yr": "year",
    //     "#mov": "movie"
    //   },
    //   ExpressionAttributeValues: {
    //     ":ac" : p_data.actor
    //   }
    // }

    const query = {
      TableName: "Media-Table",
      IndexName: "GenreYearIndex",
      KeyConditionExpression: "genre = :ac and #year = :yr",
      ExpressionAttributeNames: {
        "#year": "year"
      },
      ExpressionAttributeValues: {
        ":ac" : p_data.actor,
        ":yr": p_data.movie
      }
    }

    
    const data = await DynamoDB.getData(query);

    return formatJSONResponse({
      data
    });
  } catch (err) {
    console.log(err);
  }
}

export const main = middyfy(get_data);
