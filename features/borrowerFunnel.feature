Feature: As a tester, I want to test the borrower funnel is working as expected

  @e2e
  Scenario: AU Bete borrower flow
    Given The Stellare "AU" is up and running
    When I sign up with email "svc.qauser@harmoney.co.nz"
    Then user sign up success
    When I complete user task username with name "faker"
    Then The task completed successfully
    When I complete user task loan-amount with following details
      | amount | residencyStatus |
      | 15000  | yes             |
    Then The task completed successfully
    When I submit user task loan-purpose with purpose "Education"
    Then The task completed successfully
    When I start the user task idv-welcome
    And I submit the user task idv-frankie-smart-ui with details
      | firstName | lastName | DOB        | driverLicence | docNumber  | address                          |
      | faker     | faker    | 1990-01-01 | 11111111      | 1111111111 | 74 Langdon Street, Cleveland QLD |
    Then The task completed successfully
    When I submit the user task income with income details
      | income salary         | income self employed | income benefit | income rent | income change |
      | 2000-weekly-full time |                      |                |             |               |
    Then The task completed successfully
    When I submit the user task household with following details
      | residentialStatus | expense rent | mortgage | dependants | expense child support | income child support | school fees | child care  | expense change     |
      | renting           | 200-weekly   |          | 2          | 300-weekly            | 200-weekly           | 100         | 200-monthly | 50-weekly-increase |
    Then The task completed successfully
    When I submit the user task living-expense with expense details
      | expense utilities | expense groceries | expense transport | expense insurance | expense medical | expense child care | expense other | expense change |
      | 100-weekly        |                   |                   |                   |                 |                    |               |                |
    Then The task completed successfully
    When I submit the user task connect-bank with following bank details
      | bank           | username         | password |
      | bank of custom | TestBank6652lsbZ | FRo$jJzV |
    And wait for user task load-bank-statement to complete
    Then The task completed successfully
    When I submit the user task asset with asset details
      | asset home apartment | asset vehicle | asset savings | asset shards bonds funds | asset boat | asset other |
      | 200                  |               |               |                          |            | 20-egg      |
    Then The task completed successfully
    When I submit the user task debt with following details
      | type                            | repaymentAmount | frequency   | provider | otherProvider | paysOutstandingBalance | outstandingBalance | isMortgageShared |
      | liability  credit  card         |                 |             |          |               |                        |                    |                  |
      | liability  personal  loan       | 500             | fortnightly | asb      |               |                        | 10000              |                  |
      | liability  mortgage             |                 |             |          |               |                        |                    |                  |
      | liability  overdraft            |                 |             |          |               |                        |                    |                  |
      | liability  buy  now  pay  later |                 |             |          |               |                        |                    |                  |
    Then The task completed successfully