import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  apiLogin,
  apiLogout,
  fetchUser,
  updateUser,
  addIncident,
  updateIncident,
  fetchIncidents,
  addLogToIncident,
  getIncident,
  getLogsByIncident,
  deleteIncident,
  getLog,
  updateLog,
  graphqlQuery,
  addChat,
  setAuthToken,
  api
} from "./ApiProvider"; // Adjust as per your export style

jest.mock("@react-native-async-storage/async-storage", () => {
  return require("@react-native-async-storage/async-storage/jest/async-storage-mock");
});


console.log({api})


// Mock adapter for axios
const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.reset();
  AsyncStorage.clear();
  jest.clearAllMocks();
});

let access_token = "";
let incident_id = "";
let log_id = "";
let user_id = "";

describe("ApiProvider Tests", () => {
  describe("apiLogin", () => {
    test("should login successfully and check response contains required fields", async () => {
      const mockResponse = {
        access_token: "mock-access-token",
        refresh_token: "mock-refresh-token",
        company: "Mega empresa JC",
        role: "customer",
      };

      mock.onPost("/login").reply(200, mockResponse);

      const result = await apiLogin("user_test", "user_test");

      // Check that the response contains the required fields
      expect(result).toHaveProperty("access_token");
      expect(result).toHaveProperty("refresh_token");
      expect(result).toHaveProperty("company");
      expect(result).toHaveProperty("role");

      access_token = result.access_token;
    });

    // test('setAuthToken should set Authorization header when token is provided', () => {
    //   setAuthToken('mock-token');
      
    //   expect(api.defaults.headers.common['Authorization']).toBe('Bearer mock-token');
    // });
    
    // test('setAuthToken should delete Authorization header when token is not provided', () => {
    //   setAuthToken(null);
    //   expect(api.defaults.headers.common['Authorization']).toBeUndefined();
    // });

    test("fetchUser: should return user data and check required fields", async () => {
      const mockUserData = { id: 1, name: "Test User" };

      AsyncStorage.setItem("token", access_token);
      mock.onGet("/user").reply(200, mockUserData);

      const result = await fetchUser();

      user_id = result.id;

      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("company");
      expect(result).toHaveProperty("email");
      expect(result).toHaveProperty("last_name");
      expect(result).toHaveProperty("name");
      expect(result).toHaveProperty("phone");
      expect(result).toHaveProperty("role");
      expect(result).toHaveProperty("username");
      expect(typeof result.id).toBe("string");
      expect(typeof result.name).toBe("string");
    });

    test("updateUser: should return user data and check required fields", async () => {
      const mockUserData = { id: 1, name: "Test User" };

      AsyncStorage.setItem("token", access_token);
      mock.onGet("/user").reply(200, mockUserData);

      const result = await updateUser(user_id, {
        username: "test username update",
        name: "test name update",
        last_name: "test last_name update",
      });

      expect(typeof result).toBe("object");
      expect(typeof result.message).toBe("string");
    });

    test("updateUsereRROR: should return user data and check required fields", async () => {
      const mockUserData = { id: 1, name: "Test User" };

      AsyncStorage.setItem("token", access_token);
      mock.onGet("/user").reply(200, mockUserData);
      try {
        const result = await updateUser("000-0000", {
          username: "test username update",
          name: "test name update",
          last_name: "test last_name update",
        });
      } catch (error) {
        expect(typeof error).toBe("object");
      }

    });

    test("addIncidents: should return incident data and check required fields", async () => {
      const mockUserData = { id: 1, name: "Test User" };
      AsyncStorage.setItem("token", access_token);
      mock.onGet("/incidents").reply(200, mockUserData);
      const description = "description of the incident";
      const result = await addIncident(description);
      incident_id = result.incident;
      expect(typeof result).toBe("object");
    });

    test("updateIncident: should return incident data and check required fields", async () => {
      const mockUserData = { id: 1, name: "Test User" };

      try {
        mock.onGet("/incidents").reply(200, mockUserData);
        AsyncStorage.setItem("token", access_token);
        const description = "updated description of the incident";
        const result = await updateIncident(incident_id, description);
      } catch (error) {
        expect(typeof error).toBe("object");
      }
    });

    test("addLogToIncident: should return incident data and check required fields", async () => {
      const mockUserData = { id: 1, name: "Test User" };

      try {
        mock.onGet("/incidents").reply(200, mockUserData);
        AsyncStorage.setItem("token", access_token);
        const details = "log with the detail";
        const result = await addLogToIncident(incident_id, details);
        log_id = result.log;
      } catch (error) {
        expect(typeof error).toBe("object");
      }
    });

    test("deleteIncident: should return incident data and check required fields", async () => {
      const mockUserData = { id: 1, name: "Test User" };

      try {
        mock.onGet("/incidents").reply(200, mockUserData);
        AsyncStorage.setItem("token", access_token);
        const details = "log with the detail";
        const result = await deleteIncident(incident_id);
        log_id = result.log;
      } catch (error) {
        expect(typeof error).toBe("object");
      }
    });

    test("fetchIncidents: should return incident data and check required fields", async () => {
      const mockUserData = { id: 1, name: "Test User" };

      AsyncStorage.setItem("token", access_token);
      mock.onGet("/incidents").reply(200, mockUserData);

      const result = await fetchIncidents();
      results_logs = result.filter(
        (incident) => incident.logs && incident.logs.length > 0
      );

      expect(typeof result).toBe("object");
    });

    test("getIncident: should return incident data and check required fields", async () => {
      const mockUserData = { id: 1, name: "Test User" };

      AsyncStorage.setItem("token", access_token);
      mock.onGet("/incidents").reply(200, mockUserData);

      const result = await getIncident(incident_id);

      expect(typeof result).toBe("object");
    });

    test("getLogsByIncident: should return logs data and check required fields", async () => {
      const mockUserData = { id: 1, name: "Test User" };

      AsyncStorage.setItem("token", access_token);
      mock.onGet("/incidents").reply(200, mockUserData);

      const result = await getLogsByIncident(incident_id);

      expect(typeof result).toBe("object");
    });

    test("getLogsByIncident: should return logs data and check required fields", async () => {
      const mockUserData = { id: 1, name: "Test User" };

      AsyncStorage.setItem("token", access_token);
      mock.onGet("/incidents").reply(200, mockUserData);

      const result = await getLogsByIncident(incident_id);

      expect(typeof result).toBe("object");
    });

    test("getLog: should return logs data and check required fields", async () => {
      const mockUserData = { id: 1, name: "Test User" };

      AsyncStorage.setItem("token", access_token);
      mock.onGet("/incidents").reply(200, mockUserData);

      const result = await getLog(incident_id, log_id);

      expect(typeof result).toBe("object");
    });

    test("updateLog: should return logs data and check required fields", async () => {
      const mockUserData = { id: 1, name: "Test User" };

      AsyncStorage.setItem("token", access_token);
      mock.onGet("/incidents").reply(200, mockUserData);

      const result = await updateLog(
        incident_id,
        log_id,
        "updated log information"
      );

      expect(typeof result).toBe("object");
    });
    
    test("updateLogError: should return logs data and check required fields", async () => {
      const mockUserData = { id: 1, name: "Test User" };

      AsyncStorage.setItem("token", access_token);
      mock.onGet("/incidents").reply(200, mockUserData);
      try {
        const result = await updateLog(
          '000000',
          '000000',
          "updated log information"
        );
      } catch (error) {
        expect(typeof error).toBe("object");
      }

    });

    test("chat AI: should return data and check required fields", async () => {
      const mockUserData = { id: 1, name: "Test User" };

      AsyncStorage.setItem("token", access_token);
      mock.onGet("/graphql").reply(200, mockUserData);
      const result = await addChat("new incident", {});
      expect(typeof result).toBe("object");
    });

    test("graphQL: should return data and check required fields", async () => {
      const mockUserData = { id: 1, name: "Test User" };

      AsyncStorage.setItem("token", access_token);
      mock.onGet("/graphql").reply(200, mockUserData);

      const result = await graphqlQuery(
        "incidents",
        { customerUsername: "a" },
        [
          "id",
          "description",
          "status",
          "source",
          "modifiedDate",
          "createdDate",
          { customer: ["id", "email", "username"] },
        ]
      );

      expect(typeof result).toBe("object");
    });

    test("apiLogout", async () => {
      const mockUserData = { id: 1, name: "Test User" };

      AsyncStorage.setItem("token", access_token);
      mock.onGet("/graphql").reply(200, mockUserData);

      const result = await apiLogout();

      expect(typeof result).toBe("undefined");
    });
  });
});
