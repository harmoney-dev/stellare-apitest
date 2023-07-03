Feature: Test Auth0 functions

  @auth0
  Scenario: Sign up
    Given The Stellare "AU" is up and running
    When I sign up with email "svc.qauser@harmoney.co.nz"
    Then user sign up success