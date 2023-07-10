Feature: Test Auth0 functions

  @auth0
  Scenario: Sign up
    Given The Stellare "AU" is up and running
    When I sign up with email "svc.qauser@harmoney.co.nz"
    Then user sign up success

  @auth0
  Scenario: Sign in
    Given The Stellare "AU" is up and running
    When I sign in with email "svc.qauser+1688594142053@harmoney.co.nz" and password "Stellare123."
    Then user sign up success