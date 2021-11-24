import * as AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000"
});

export const DynamoDB = {

    async addData(params) {
        return await dynamodb.put(params).promise();
    },
    async getData(params) {
       const actor_data = await dynamodb.query(params).promise();
       return actor_data;
    },
    async deleteData(params) {
        await dynamodb.delete(params).promise();
    }
}