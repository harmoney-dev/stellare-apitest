Feature: Test API call to https://stellare.harmoneylabs.com/

  Scenario: Send a GET request to the API
    Given I am a user
    When I send a GET request to "https://stellare.harmoneylabs.com/"
    Then I should receive a 200 status code
