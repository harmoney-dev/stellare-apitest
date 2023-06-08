Feature: As a tester, I want to test the borrower funnel is working as expected

  Scenario: AU Bete borrower flow
    Given The IAM is up and running
    When I sign up with email "svc.qauser@harmoney.co.nz"
    Then user sign up success
    When I complete page username with name 'random'
    Then The user name saved successfully