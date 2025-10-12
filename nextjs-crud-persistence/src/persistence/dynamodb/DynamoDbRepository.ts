import {Item} from "@/app/types";
import {dynamoDbClient} from "@/persistence/dynamodb/DynamoDbClient";
import {
  DeleteItemCommand,
  GetItemCommand,
  ScanCommand,
  UpdateItemCommand
} from "@aws-sdk/client-dynamodb";
import {marshall, unmarshall} from "@aws-sdk/util-dynamodb";
import {PersistentRepository} from "@/persistence/PersistentRepository";
import { v4 as uuidv4 } from 'uuid';


const {client, tableName} = dynamoDbClient();
const dynamoDBClient = client;

class DynamoDbRepository implements PersistentRepository {

  async createItem(item: Item): Promise<Item> {
    const command = new UpdateItemCommand({
      Key: {
        "id":  { S: uuidv4() },
      },
      UpdateExpression: "SET #name = :name, #isEnabled = :isEnabled, #createdAt = :createdAt",
      ExpressionAttributeNames: {
        "#name": "name",
        "#isEnabled": "isEnabled",
        "#createdAt": "createdAt",
      },
      ExpressionAttributeValues: marshall({
        ":name": item.name,
        ":isEnabled": item.isEnabled,
        ":createdAt": new Date().toISOString(),
      }),
      TableName: tableName,
      ReturnValues: "ALL_NEW",
    });

    const result = await dynamoDBClient.send(command);
    item.id = `${result.Attributes?.id.S}`
    console.log('Successfully saved to DynamoDB:', item);
    return item;
  }

  async deleteItem(id: string): Promise<void> {
    const command = new DeleteItemCommand({
      TableName: tableName,
      Key: marshall({ id }),
    });

    await dynamoDBClient.send(command);

    console.log('Successfully deleted from DynamoDB: ', id);
  }

  async updateItem(item: Item): Promise<Item> {
    const command = new UpdateItemCommand({
      TableName: "dev-example-table",
      Key: marshall({ id: item.id }),
      UpdateExpression: "SET #name = :name, #isEnabled = :isEnabled, #updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        "#name": "name",
        "#isEnabled": "isEnabled",
        "#updatedAt": "updatedAt",
      },
      ExpressionAttributeValues: marshall({
        ":name": item.name,
        ":isEnabled": item.isEnabled,
        ":updatedAt": new Date().toISOString(),
      }),
      ReturnValues: "ALL_NEW",
    });

    const response = await dynamoDBClient.send(command);
    const raw = unmarshall(response.Attributes!)
    console.log('Successfully updated item:', raw);
    return {
      id: raw.id,
      name: raw.name,
      isEnabled: raw.isEnabled,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }
  }
  async getTableEntries(): Promise<Item[]> {
    try {
      const command = new ScanCommand({
        TableName: tableName,
      });

      const response = await dynamoDBClient.send(command);

      return response.Items?.map(item => {
        const raw = unmarshall(item);
        return {
          id: raw.id,
          name: raw.name,
          isEnabled: raw.isEnabled,
          createdAt: raw.createdAt,
          updatedAt: raw.updatedAt,
        }
      }) || [];
    } catch (error) {
      console.error("Error fetching data from DynamoDB:", error);
      return [];
    }
  }

  async getItemById(id: string): Promise<Item | null> {
    try {
      const command = new GetItemCommand({
        TableName: tableName,
        Key: marshall({ id }),
      });

      const response = await dynamoDBClient.send(command);

      if (response.Item) {
        const raw = unmarshall(response.Item);
        return {
          id: raw.id,
          name: raw.name,
          isEnabled: raw.isEnabled,
          createdAt: raw.createdAt,
        };
      }
    } catch (error) {
      console.error("Error fetching item from DynamoDB:", error);
    }
    return null;
  }
}

export const dynamoDbRepository = new DynamoDbRepository();