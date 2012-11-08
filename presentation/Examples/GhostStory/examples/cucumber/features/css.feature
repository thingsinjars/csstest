Feature: CSS
    As a Web Designer
    I would like to test my CSS

    Scenario: CSS
        Given I go to "/csstest.html"
         Then the "Main title" should have "font family" of "Coolvetica, arial"
          And the "Main title" should have "color" of "rgb(54, 54, 54)"
          And run
