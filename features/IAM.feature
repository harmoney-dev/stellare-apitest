Feature: Test IAM functions

  Scenario: Sign up
    Given The IAM is up and running
    When I sign up with email "svc.qauser@harmoney.co.nz"
    Then user sign up success