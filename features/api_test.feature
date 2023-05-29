Feature: Test API call to https://stellare.harmoneylabs.com/

  Scenario: Sign up
    Given the home page is ready
    When user sign up with email "" and password ""
    Then user sign up success