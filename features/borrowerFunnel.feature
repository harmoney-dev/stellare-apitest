Feature: As a tester, I want to test the borrower funnel is working as expected

  @e2e
  Scenario: borrower funnel
    Given The Stellare "AU" is up and running
    When I sign up with email "cicd.harmoney@gmail.com"
    Then user sign up success
    When I submit username with name "faker"
    Then The user task "username" completed successfully
    When I submit loan amount with following details
      | amount | residencyStatus |
      | 8000   | yes             |
    Then The user task "loan-amount" completed successfully
    When I submit loan purpose with purpose "Education"
    Then The user task "loan-purpose" completed successfully
    When I submit the mobile number with number "unique"
    Then The user task "collect-user-phone-number" completed successfully
    When I start the idv process
    And I submit the IDV user info with details
      | firstName | lastName | DOB   | driverLicence | docNumber | address | idType          |
      | faker     | faker    | faker | faker         | faker     | faker   | DRIVERS_LICENCE |
    Then The user task "idv-frankie-smart-ui" completed successfully
    When I submit the user household with following details
      | residentialStatus | expense rent | mortgage | dependants | relationshipStatus | expense child support | income child support | school fees | child care | expense change |
      | renting           | 200-monthly  |          | 2          | MARRIED            | 300-monthly           | 200-weekly           |             |            |                |
    Then The user task "household" completed successfully
    When I submit the user income with income details
      | income salary           | income self employed | income benefit                  | income rent    | income change        | income partner |
      | 14500-monthly-full time |                      | 200-monthly-Sole Parent Support | 200-monthly-no | 100-monthly-increase | 0--false       |
    Then The user task "income" completed successfully
    When I submit the living expense with expense details
      | expense utilities | expense groceries | expense transport | expense insurance | expense medical | expense child care | expense other | expense change |
      | 100-weekly        | 200-weekly        | 300-weekly        | 400-weekly        | 500-weekly      | 600-weekly         |               |                |
    Then The user task "living-expense" completed successfully
    When I submit the Proviso with following bank details
      | bank           | username         | password |
      | bank of custom | TestBank6876bhkb | CJbb0IzL |
    Then The user task "connect-bank" completed successfully
    When I wait for user task load-bank-statement to complete
    And I submit the asset with following details
      | asset home apartment | asset vehicle | asset savings | asset shards bonds funds | asset boat | asset other |
      | 200                  |               |               |                          |            |             |
    Then The user task "asset" completed successfully
    When I submit the user debts with following details
      | type                            | repaymentAmount | frequency   | provider | otherProvider | creditLimit | outstandingBalance | isMortgageShared |
      | liability  credit  card         | 100             | monthly     | tsb      |               | 10000       |                    |                  |
      | liability  personal  loan       | 100             | fortnightly | asb      |               |             | 10000              |                  |
      | liability  mortgage             | 100             | weekly      | anz      |               |             | 200000             | false            |
      | liability  overdraft            |                 |             |          |               |             |                    |                  |
      | liability  buy  now  pay  later |                 |             |          |               |             |                    |                  |
    Then The user task "debt" completed successfully
    When I submit the user task financial-summary
    Then I can check the application status
    When I submit user task loan-quote with loan amount "max" and term "7"
    Then I can get the repayment details
    When I choose repayment frequency "weekly" and the next "10" days as the start date
    And I check the email verify status
    Then The user task "verify-email" completed successfully
    Then The user task "fulfilment" completed successfully
    And The user task "loan-disbursing" completed successfully
    Then I can do the final check on application status