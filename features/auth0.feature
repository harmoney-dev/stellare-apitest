Feature: Test Auth0 functions

  @auth0
  Scenario: Sign up
    Given The Stellare "AU" is up and running
    When I sign up with email "cicd.harmoney@gmail.com"
    Then user sign up success

  @auth0
  Scenario: Sign in
    Given The Stellare "AU" is up and running
    When I sign in with email "cicd.harmoney@gmail.com" and password "default"
    Then user sign up success