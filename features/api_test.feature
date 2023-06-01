Feature: Stellare Life Cycle
  As a user
  I want to login and update my preferred name
  So that my user profile is updated

  Scenario: User login and updates preferred name
    When I create a new user
    Then I should receive a status code of 201
    When I update the preferred name of the user
    Then I should receive a status code of 200
