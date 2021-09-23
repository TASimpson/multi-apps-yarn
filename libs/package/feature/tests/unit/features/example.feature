Feature: Hellow World

Scenario: Opening the initial web page
    Given The page is open in a browser
    When I inspect the page
    Then I should see the landing page