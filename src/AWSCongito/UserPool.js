import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_1ideWQ3uC",
    ClientId: "7arop3faj2t6nu7n8pe9ij6bru"
}

export default new CognitoUserPool(poolData);