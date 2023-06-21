Feature: Test IAM functions

  @iam
  Scenario: Sign up
    Given The Stellare "AU" is up and running
    When I sign up with email "svc.qauser@harmoney.co.nz"
    Then user sign up success