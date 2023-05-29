import * as messages from '@cucumber/messages';
import supertest from "supertest";
import {IWorldOptions, setWorldConstructor, World} from "@cucumber/cucumber";

export interface CucumberWorldConstructorParams {
    parameters: { [key: string]: string };
}

export interface ICustomWorld extends World {
  debug: boolean;
  feature?: messages.Pickle;
  server: {[key: string]: supertest.SuperTest<supertest.Test>};
  response?: any;
  testName?: string;
  startTime?: Date;
  variables?: Map<string, any>;

  [key: string]: any;
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
  debug = false;
  variables = new Map<string, any>();

  [key: string]: any;

  server: { [p: string]: supertest.SuperTest<supertest.Test> };
}

setWorldConstructor(CustomWorld);