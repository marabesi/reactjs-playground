import {PersistentRepository} from "@/persistence/PersistentRepository";
import {dynamoDbRepository} from "@/persistence/dynamodb/DynamoDbRepository";
import {inMemoryRepository} from "@/persistence/InMemory";

export function createPersistenceInMemory(): PersistentRepository { return inMemoryRepository; }
export function createPersistenceDynamoDb(): PersistentRepository { return dynamoDbRepository; }

export default createPersistenceInMemory;